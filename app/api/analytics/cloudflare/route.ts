import { NextRequest, NextResponse } from "next/server";
import {
  isAnalyticsRequestAuthorized,
  unauthorizedAnalyticsResponse,
} from "@/lib/analytics/auth";
import { asNumber } from "@/lib/analytics/http";
import { getAnalyticsDateRange, parseAnalyticsPeriod } from "@/lib/analytics/period";

type CloudflareResponse = {
  data?: {
    viewer?: {
      zones?: Array<{
        totals1d?: Array<{
          sum?: {
            requests?: number;
            bytes?: number;
            threats?: number;
            countryMap?: Array<{ clientCountryName?: string; requests?: number }>;
          };
          uniq?: { uniques?: number };
        }>;
        overview?: Array<{
          sum?: { requests?: number; bytes?: number; visits?: number };
        }>;
        countries?: Array<{
          dimensions?: { clientCountryName?: string };
          sum?: { visits?: number };
        }>;
        paths?: Array<{
          dimensions?: { clientRequestPath?: string };
          sum?: { visits?: number };
        }>;
      }>;
    };
  };
  errors?: Array<{ message?: string }>;
};

type Totals1dRow = {
  sum?: {
    requests?: number;
    bytes?: number;
    threats?: number;
    countryMap?: Array<{ clientCountryName?: string; requests?: number }>;
  };
  uniq?: { uniques?: number };
};

const TOTALS_QUERY = `
query AnalyticsTotals(
  $zoneTag: string
  $startDate: Date
  $endDate: Date
) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      totals1d: httpRequests1dGroups(
        limit: 93
        filter: { date_geq: $startDate, date_leq: $endDate }
      ) {
        sum {
          requests
          bytes
          threats
          countryMap {
            clientCountryName
            requests
          }
        }
        uniq {
          uniques
        }
      }
    }
  }
}
`;

const TOPS_24H_QUERY = `
query AnalyticsTops24h(
  $zoneTag: string
  $from: Time
  $to: Time
) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      overview: httpRequestsOverviewAdaptiveGroups(
        limit: 1
        filter: { datetime_geq: $from, datetime_leq: $to }
      ) {
        sum {
          requests
          bytes
          visits
        }
      }
      countries: httpRequestsAdaptiveGroups(
        limit: 10
        orderBy: [sum_visits_DESC]
        filter: { datetime_geq: $from, datetime_leq: $to }
      ) {
        dimensions {
          clientCountryName
        }
        sum {
          visits
        }
      }
      paths: httpRequestsAdaptiveGroups(
        limit: 10
        orderBy: [sum_visits_DESC]
        filter: { datetime_geq: $from, datetime_leq: $to }
      ) {
        dimensions {
          clientRequestPath
        }
        sum {
          visits
        }
      }
    }
  }
}
`;

export const runtime = "nodejs";

function aggregateCountriesFromTotals(totals1d: Totals1dRow[] = []) {
  const countryMap = new Map<string, number>();

  for (const day of totals1d ?? []) {
    for (const item of day.sum?.countryMap ?? []) {
      const key = item.clientCountryName ?? "unknown";
      countryMap.set(key, (countryMap.get(key) ?? 0) + asNumber(item.requests));
    }
  }

  return [...countryMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));
}

export async function GET(request: NextRequest) {
  if (!isAnalyticsRequestAuthorized(request)) {
    return unauthorizedAnalyticsResponse();
  }

  const period = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));
  const range = getAnalyticsDateRange(period);
  const token = process.env.CF_API_TOKEN?.trim();
  const zoneId = process.env.CF_ZONE_ID?.trim();

  if (!token || !zoneId) {
    return NextResponse.json({
      source: "cloudflare",
      configured: false,
      period,
      range,
      message: "Faltan CF_API_TOKEN o CF_ZONE_ID",
    });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const totalsRes = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      query: TOTALS_QUERY,
      variables: {
        zoneTag: zoneId,
        startDate: range.startDate,
        endDate: range.endDate,
      },
    }),
  });
  const totalsPayload = (await totalsRes.json()) as CloudflareResponse;

  if (!totalsRes.ok || totalsPayload.errors?.length) {
    return NextResponse.json(
      {
        source: "cloudflare",
        configured: true,
        period,
        range,
        error: "No se pudo consultar Cloudflare GraphQL",
        detail: totalsPayload.errors?.map((item) => item.message).filter(Boolean) ?? [],
      },
      { status: 502 },
    );
  }

  const liveTo = new Date(range.toISO);
  const liveFrom = new Date(liveTo);
  liveFrom.setUTCHours(liveFrom.getUTCHours() - 24);

  const topsRes = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      query: TOPS_24H_QUERY,
      variables: {
        zoneTag: zoneId,
        from: liveFrom.toISOString(),
        to: liveTo.toISOString(),
      },
    }),
  });
  const topsPayload = (await topsRes.json()) as CloudflareResponse;

  const zoneTotals = totalsPayload.data?.viewer?.zones?.[0];
  const zoneLive = topsPayload.data?.viewer?.zones?.[0];
  const overview = zoneLive?.overview?.[0];
  const totals1d = zoneTotals?.totals1d ?? [];

  const requestsTotal = totals1d.reduce((acc, item) => acc + asNumber(item.sum?.requests), 0);
  const threatsTotal = totals1d.reduce((acc, item) => acc + asNumber(item.sum?.threats), 0);
  const uniquesApprox = totals1d.reduce((acc, item) => acc + asNumber(item.uniq?.uniques), 0);
  const bandwidthBytes =
    asNumber(overview?.sum?.bytes) ||
    totals1d.reduce((acc, item) => acc + asNumber(item.sum?.bytes), 0);

  const topCountriesFromLive = (zoneLive?.countries ?? []).map((item) => ({
    label: item.dimensions?.clientCountryName ?? "unknown",
    value: asNumber(item.sum?.visits),
  })).filter((item) => item.value > 0);

  const topPathsFromLive = (zoneLive?.paths ?? []).map((item) => ({
    label: item.dimensions?.clientRequestPath ?? "unknown",
    value: asNumber(item.sum?.visits),
  })).filter((item) => item.value > 0);

  return NextResponse.json({
    source: "cloudflare",
    configured: true,
    period,
    range,
    diagnostics: {
      topsWindowHours: 24,
      topsStatus: topsRes.status,
      topsErrors: topsPayload.errors?.map((item) => item.message).filter(Boolean) ?? [],
    },
    metrics: {
      requests: requestsTotal || asNumber(overview?.sum?.requests),
      uniqueVisitors: asNumber(overview?.sum?.visits) || uniquesApprox,
      bandwidthBytes,
      threatsBlocked: threatsTotal,
    },
    topCountries:
      topCountriesFromLive.length > 0
        ? topCountriesFromLive
        : aggregateCountriesFromTotals(totals1d),
    topPaths: topPathsFromLive,
  });
}
