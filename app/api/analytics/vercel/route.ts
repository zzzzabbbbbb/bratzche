import { NextRequest, NextResponse } from "next/server";
import {
  isAnalyticsRequestAuthorized,
  unauthorizedAnalyticsResponse,
} from "@/lib/analytics/auth";
import { asNumber, parseJsonSafely } from "@/lib/analytics/http";
import { getAnalyticsDateRange, parseAnalyticsPeriod } from "@/lib/analytics/period";

type RankedValue = { label: string; value: number };
type Deployment = {
  uid?: string;
  createdAt?: number;
  target?: string;
  readyState?: string;
  buildingAt?: number;
  ready?: number;
};

function toRanked(values: unknown): RankedValue[] {
  if (!Array.isArray(values)) return [];

  return values
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;

      const label =
        (typeof record.path === "string" && record.path) ||
        (typeof record.name === "string" && record.name) ||
        (typeof record.label === "string" && record.label) ||
        "unknown";

      const value =
        asNumber(record.value as string | number | null | undefined) ||
        asNumber(record.views as string | number | null | undefined) ||
        asNumber(record.count as string | number | null | undefined) ||
        asNumber(record.visitors as string | number | null | undefined);

      return { label, value };
    })
    .filter((item): item is RankedValue => item !== null)
    .filter((item) => item.value > 0)
    .slice(0, 10);
}

function normalizeVercelAnalytics(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return {
      metrics: {
        pageViews: 0,
        uniqueVisitors: 0,
      },
      topPaths: [] as RankedValue[],
      webVitals: [] as RankedValue[],
      raw: null,
    };
  }

  const data = payload as Record<string, unknown>;
  const metrics = (data.metrics ?? data.summary ?? data.totals) as Record<string, unknown> | undefined;

  return {
    metrics: {
      pageViews:
        asNumber(metrics?.pageViews as string | number | null | undefined) ||
        asNumber(data.pageViews as string | number | null | undefined) ||
        asNumber(data.views as string | number | null | undefined),
      uniqueVisitors:
        asNumber(metrics?.uniqueVisitors as string | number | null | undefined) ||
        asNumber(data.uniqueVisitors as string | number | null | undefined) ||
        asNumber(data.visitors as string | number | null | undefined),
    },
    topPaths: toRanked(data.topPaths ?? data.paths ?? data.pages),
    webVitals: toRanked(data.webVitals ?? data.vitals),
    raw: data,
  };
}

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isAnalyticsRequestAuthorized(request)) {
    return unauthorizedAnalyticsResponse();
  }

  const period = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));
  const range = getAnalyticsDateRange(period);
  const token = process.env.VERCEL_ACCESS_TOKEN?.trim();
  const projectRef =
    process.env.VERCEL_PROJECT_ID_OR_NAME?.trim() ||
    process.env.VERCEL_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const teamId = process.env.VERCEL_TEAM_ID?.trim();

  if (!token || !projectRef) {
    return NextResponse.json({
      source: "vercel",
      configured: false,
      period,
      range,
      message: "Faltan VERCEL_ACCESS_TOKEN o VERCEL_PROJECT_ID_OR_NAME",
    });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const withTeamId = (url: URL) => {
    if (teamId) {
      url.searchParams.set("teamId", teamId);
    }
    return url;
  };

  const projectUrl = withTeamId(new URL(`https://api.vercel.com/v9/projects/${projectRef}`));
  const projectRes = await fetch(projectUrl, {
    headers,
    cache: "no-store",
  });
  const projectData = await parseJsonSafely(projectRes);

  const analyticsCandidates = [
    withTeamId(new URL(`https://api.vercel.com/v1/projects/${projectRef}/analytics`)),
    withTeamId(new URL(`https://api.vercel.com/v1/projects/${projectRef}/web-analytics`)),
    withTeamId(new URL("https://api.vercel.com/v1/web/analytics")),
  ];

  let analyticsPayload: unknown = null;
  let analyticsStatus = 0;
  let analyticsEndpoint = "";
  const attempts: Array<{ endpoint: string; status: number }> = [];

  for (const candidate of analyticsCandidates) {
    candidate.searchParams.set("from", range.fromISO);
    candidate.searchParams.set("to", range.toISO);
    candidate.searchParams.set("period", period);
    candidate.searchParams.set("projectId", projectRef);

    const res = await fetch(candidate, {
      headers,
      cache: "no-store",
    });

    analyticsStatus = res.status;
    analyticsEndpoint = candidate.pathname;
    attempts.push({ endpoint: candidate.pathname, status: res.status });

    if (!res.ok) {
      continue;
    }

    analyticsPayload = await parseJsonSafely(res);
    break;
  }

  const normalized = normalizeVercelAnalytics(analyticsPayload);
  const analyticsAvailable = Boolean(analyticsPayload);

  const sinceMs = Date.parse(range.fromISO);
  const deploymentsUrl = withTeamId(new URL("https://api.vercel.com/v6/deployments"));
  deploymentsUrl.searchParams.set("projectId", projectRef);
  deploymentsUrl.searchParams.set("limit", "100");
  deploymentsUrl.searchParams.set("since", Number.isFinite(sinceMs) ? String(sinceMs) : "0");

  const deploymentsRes = await fetch(deploymentsUrl, {
    headers,
    cache: "no-store",
  });
  const deploymentsData = (await parseJsonSafely(deploymentsRes)) as
    | { deployments?: Deployment[] }
    | null;
  const deployments = deploymentsData?.deployments ?? [];

  const successful = deployments.filter((d) => d.readyState === "READY").length;
  const production = deployments.filter((d) => d.target === "production").length;
  const failed = deployments.filter((d) => d.readyState === "ERROR").length;
  const avgBuildMs = (() => {
    const samples = deployments
      .map((d) =>
        typeof d.ready === "number" && typeof d.buildingAt === "number"
          ? d.ready - d.buildingAt
          : null,
      )
      .filter((n): n is number => n !== null && n > 0);

    if (samples.length === 0) return 0;
    return Math.round(samples.reduce((acc, n) => acc + n, 0) / samples.length);
  })();

  const projectFlags =
    projectData && typeof projectData === "object"
      ? {
          webAnalyticsEnabled: Boolean(
            (projectData as Record<string, unknown>).features &&
              typeof (projectData as Record<string, unknown>).features === "object" &&
              (
                (projectData as Record<string, unknown>).features as Record<string, unknown>
              ).webAnalytics,
          ),
          webAnalyticsHasData: Boolean(
            (projectData as Record<string, unknown>).webAnalytics &&
              typeof (projectData as Record<string, unknown>).webAnalytics === "object" &&
              ((projectData as Record<string, unknown>).webAnalytics as Record<string, unknown>)
                .hasData,
          ),
        }
      : {
          webAnalyticsEnabled: false,
          webAnalyticsHasData: false,
        };

  return NextResponse.json({
    source: "vercel",
    configured: true,
    period,
    range,
    project: {
      ref: projectRef,
      name:
        (projectData && typeof projectData === "object" && "name" in projectData
          ? String((projectData as Record<string, unknown>).name)
          : null),
      status: projectRes.status,
    },
    metrics: normalized.metrics,
    deploymentStats: {
      total: deployments.length,
      successful,
      production,
      failed,
      avgBuildMs,
      sourceStatus: deploymentsRes.status,
    },
    projectFlags,
    topPaths: normalized.topPaths,
    webVitals: normalized.webVitals,
    message: analyticsAvailable
      ? null
      : "No hay acceso a Web Analytics API para este proyecto/token (revisar plan y permisos).",
    diagnostics: {
      analyticsEndpoint,
      analyticsStatus,
      analyticsAvailable,
      attempts,
    },
  });
}
