import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import {
  isAnalyticsRequestAuthorized,
  unauthorizedAnalyticsResponse,
} from "@/lib/analytics/auth";
import { asNumber, asPercent } from "@/lib/analytics/http";
import { getAnalyticsDateRange, parseAnalyticsPeriod } from "@/lib/analytics/period";

type ReportRow = {
  dimensionValues?: Array<{ value?: string | null } | null> | null;
  metricValues?: Array<{ value?: string | null } | null> | null;
};

type ReportResponse = {
  rows?: ReportRow[] | null;
  totals?: Array<{ metricValues?: Array<{ value?: string | null } | null> | null } | null> | null;
};

function rowsToList(report: ReportResponse, labelIndex = 0, metricIndex = 0) {
  return (report.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[labelIndex]?.value ?? "unknown",
    value: asNumber(row.metricValues?.[metricIndex]?.value),
  }));
}

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isAnalyticsRequestAuthorized(request)) {
    return unauthorizedAnalyticsResponse();
  }

  const period = parseAnalyticsPeriod(request.nextUrl.searchParams.get("period"));
  const range = getAnalyticsDateRange(period);
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const credentialsJson = process.env.GA4_CREDENTIALS_JSON?.trim();

  if (!propertyId || !credentialsJson) {
    return NextResponse.json({
      source: "ga4",
      configured: false,
      period,
      range,
      message: "Faltan GA4_PROPERTY_ID o GA4_CREDENTIALS_JSON",
    });
  }

  let credentials: { client_email: string; private_key: string } | null = null;
  try {
    const parsed = JSON.parse(credentialsJson) as Record<string, unknown>;
    const clientEmail = parsed.client_email;
    const privateKey = parsed.private_key;

    if (typeof clientEmail !== "string" || typeof privateKey !== "string") {
      return NextResponse.json(
        {
          source: "ga4",
          configured: false,
          period,
          range,
          message: "GA4_CREDENTIALS_JSON no contiene client_email/private_key validos",
        },
        { status: 400 },
      );
    }

    credentials = {
      client_email: clientEmail,
      private_key: privateKey,
    };
  } catch {
    return NextResponse.json(
      {
        source: "ga4",
        configured: false,
        period,
        range,
        message: "GA4_CREDENTIALS_JSON no es JSON valido",
      },
      { status: 400 },
    );
  }

  try {
    if (!credentials) {
      return NextResponse.json(
        {
          source: "ga4",
          configured: false,
          period,
          range,
          message: "No se pudieron preparar credenciales GA4",
        },
        { status: 400 },
      );
    }

    const client = new BetaAnalyticsDataClient({
      credentials,
    });

    const base = {
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    };

    const [summaryReport] = await client.runReport({
      ...base,
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "sessionsPerUser" },
        { name: "bounceRate" },
      ],
    });

    const [pagesReport] = await client.runReport({
      ...base,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    const [countriesReport] = await client.runReport({
      ...base,
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 10,
    });

    const [trafficReport] = await client.runReport({
      ...base,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    });

    const [devicesReport] = await client.runReport({
      ...base,
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 10,
    });

    const totals = summaryReport.totals?.[0]?.metricValues ?? [];

    return NextResponse.json({
      source: "ga4",
      configured: true,
      period,
      range,
      metrics: {
        pageViews: asNumber(totals[0]?.value),
        activeUsers: asNumber(totals[1]?.value),
        sessions: asNumber(totals[2]?.value),
        sessionsPerUser: asPercent(totals[3]?.value),
        bounceRate: asPercent(totals[4]?.value),
      },
      topPages: rowsToList(pagesReport),
      topCountries: rowsToList(countriesReport),
      trafficSources: rowsToList(trafficReport),
      devices: rowsToList(devicesReport),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        source: "ga4",
        configured: true,
        period,
        range,
        error: "No se pudo consultar GA4",
        detail: message,
      },
      { status: 502 },
    );
  }
}
