"use client";

import { useEffect, useMemo, useState } from "react";
import { ANALYTICS_PERIODS, type AnalyticsPeriod } from "@/lib/analytics/period";

type RankedValue = { label: string; value: number };

type SourceState = {
  loading: boolean;
  error: string | null;
  data: Record<string, unknown> | null;
};

function formatNumber(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value ?? 0);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("es-ES");
}

function formatPercent(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value ?? 0);
  if (!Number.isFinite(n)) return "0%";
  return `${n.toFixed(2)}%`;
}

function formatBytes(value: unknown): string {
  const bytes = typeof value === "number" ? value : Number(value ?? 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }

  return `${size.toFixed(2)} ${units[unit]}`;
}

function getErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "No se pudo cargar la fuente";
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  return "No se pudo cargar la fuente";
}

async function fetchSource(path: string, period: AnalyticsPeriod, signal: AbortSignal) {
  const response = await fetch(`${path}?period=${period}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    signal,
  });
  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    throw new Error(getErrorMessage(payload));
  }

  return payload && typeof payload === "object"
    ? (payload as Record<string, unknown>)
    : null;
}

function Section({
  title,
  loading,
  error,
  metrics,
  topItems,
}: {
  title: string;
  loading: boolean;
  error: string | null;
  metrics: Array<{ label: string; value: string }>;
  topItems?: Array<{ title: string; items: RankedValue[] }>;
}) {
  if (loading) {
    return (
      <section className="border border-gris-oscuro p-6 md:p-8 animate-pulse">
        <h2 className="font-mono text-[0.75rem] tracking-[0.24em] text-gris">{title}</h2>
        <p className="mt-6 text-[0.75rem] text-gris">cargando...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border border-gris-oscuro p-6 md:p-8">
        <h2 className="font-mono text-[0.75rem] tracking-[0.24em] text-gris">{title}</h2>
        <p className="mt-6 text-[0.75rem] text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="border border-gris-oscuro p-6 md:p-8">
      <h2 className="font-mono text-[0.75rem] tracking-[0.24em] text-gris">{title}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="border border-gris-oscuro/70 p-4">
            <p className="text-[0.62rem] tracking-wider text-gris">{metric.label}</p>
            <p className="mt-2 text-xl md:text-2xl font-semibold text-blanco">{metric.value}</p>
          </div>
        ))}
      </div>

      {topItems && topItems.length > 0 && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {topItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-[0.62rem] tracking-wider text-neon">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.length === 0 && (
                  <li className="text-[0.72rem] text-gris">sin datos</li>
                )}
                {group.items.slice(0, 8).map((item) => (
                  <li key={`${group.title}-${item.label}`} className="flex items-start justify-between gap-4">
                    <span className="text-[0.72rem] text-gris break-all">{item.label}</span>
                    <span className="font-mono text-[0.72rem] text-blanco">{formatNumber(item.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("30d");
  const [ga4, setGa4] = useState<SourceState>({ loading: true, error: null, data: null });
  const [vercel, setVercel] = useState<SourceState>({ loading: true, error: null, data: null });
  const [cloudflare, setCloudflare] = useState<SourceState>({ loading: true, error: null, data: null });

  useEffect(() => {
    const controller = new AbortController();
    const load = async (
      path: string,
      setter: (value: SourceState) => void,
    ) => {
      setter({ loading: true, error: null, data: null });
      try {
        const data = await fetchSource(path, period, controller.signal);
        setter({ loading: false, error: null, data });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado";
        setter({ loading: false, error: message, data: null });
      }
    };

    void Promise.all([
      load("/api/analytics/ga4", setGa4),
      load("/api/analytics/vercel", setVercel),
      load("/api/analytics/cloudflare", setCloudflare),
    ]);

    return () => controller.abort();
  }, [period]);

  const ga4Metrics = useMemo(() => {
    const metrics = (ga4.data?.metrics ?? {}) as Record<string, unknown>;
    return [
      { label: "page views", value: formatNumber(metrics.pageViews) },
      { label: "usuarios activos", value: formatNumber(metrics.activeUsers) },
      { label: "sesiones", value: formatNumber(metrics.sessions) },
      { label: "paginas/sesion", value: formatNumber(metrics.sessionsPerUser) },
      { label: "bounce rate", value: formatPercent(metrics.bounceRate) },
    ];
  }, [ga4.data]);

  const vercelMetrics = useMemo(() => {
    const metrics = (vercel.data?.metrics ?? {}) as Record<string, unknown>;
    const deploy = (vercel.data?.deploymentStats ?? {}) as Record<string, unknown>;
    const flags = (vercel.data?.projectFlags ?? {}) as Record<string, unknown>;
    const endpoint = String(
      ((vercel.data?.diagnostics as Record<string, unknown> | undefined)?.analyticsEndpoint ??
        "n/a"),
    );

    return [
      { label: "page views", value: formatNumber(metrics.pageViews) },
      { label: "visitantes unicos", value: formatNumber(metrics.uniqueVisitors) },
      { label: "deploys periodo", value: formatNumber(deploy.total) },
      { label: "deploys prod", value: formatNumber(deploy.production) },
      { label: "build avg (s)", value: formatNumber(Math.round(Number(deploy.avgBuildMs ?? 0) / 1000)) },
      { label: "web analytics data", value: Boolean(flags.webAnalyticsHasData) ? "si" : "no" },
      { label: "api endpoint", value: endpoint },
    ];
  }, [vercel.data]);

  const cloudflareMetrics = useMemo(() => {
    const metrics = (cloudflare.data?.metrics ?? {}) as Record<string, unknown>;
    return [
      { label: "requests", value: formatNumber(metrics.requests) },
      { label: "visitantes unicos", value: formatNumber(metrics.uniqueVisitors) },
      { label: "bandwidth", value: formatBytes(metrics.bandwidthBytes) },
      { label: "threats blocked", value: formatNumber(metrics.threatsBlocked) },
    ];
  }, [cloudflare.data]);

  return (
    <main className="min-h-screen bg-negro px-6 md:px-16 lg:px-24 py-20">
      <header className="mb-12 md:mb-16 border-b border-gris-oscuro pb-8">
        <p className="font-mono text-[0.62rem] tracking-[0.28em] text-neon">ANALYTICS</p>
        <h1 className="mt-3 text-[clamp(2.2rem,7vw,5rem)] leading-[0.9] tracking-tight text-blanco">
          dashboard privado
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {ANALYTICS_PERIODS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPeriod(option)}
              className={`border px-4 py-2 font-mono text-[0.62rem] tracking-wider transition-colors ${
                period === option
                  ? "border-neon text-neon"
                  : "border-gris-oscuro text-gris hover:text-blanco hover:border-blanco"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        <Section
          title="Google Analytics 4"
          loading={ga4.loading}
          error={ga4.error}
          metrics={ga4Metrics}
          topItems={[
            { title: "Top paginas", items: (ga4.data?.topPages as RankedValue[]) ?? [] },
            { title: "Top paises", items: (ga4.data?.topCountries as RankedValue[]) ?? [] },
            { title: "Fuentes de trafico", items: (ga4.data?.trafficSources as RankedValue[]) ?? [] },
            { title: "Dispositivos", items: (ga4.data?.devices as RankedValue[]) ?? [] },
          ]}
        />

        <Section
          title="Vercel Analytics"
          loading={vercel.loading}
          error={vercel.error}
          metrics={vercelMetrics}
          topItems={[
            { title: "Top paths", items: (vercel.data?.topPaths as RankedValue[]) ?? [] },
            { title: "Web vitals", items: (vercel.data?.webVitals as RankedValue[]) ?? [] },
          ]}
        />

        <Section
          title="Cloudflare Analytics"
          loading={cloudflare.loading}
          error={cloudflare.error}
          metrics={cloudflareMetrics}
          topItems={[
            { title: "Top paises", items: (cloudflare.data?.topCountries as RankedValue[]) ?? [] },
            { title: "Top paths", items: (cloudflare.data?.topPaths as RankedValue[]) ?? [] },
          ]}
        />
      </div>
    </main>
  );
}
