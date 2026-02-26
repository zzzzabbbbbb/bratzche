export const ANALYTICS_PERIODS = ["7d", "30d", "90d"] as const;

export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number];

const PERIOD_DAYS: Record<AnalyticsPeriod, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function parseAnalyticsPeriod(value: string | null | undefined): AnalyticsPeriod {
  if (value === "7d" || value === "30d" || value === "90d") {
    return value;
  }

  return "30d";
}

export function getAnalyticsDateRange(period: AnalyticsPeriod) {
  const days = PERIOD_DAYS[period];
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  return {
    days,
    startDate: formatDate(start),
    endDate: formatDate(end),
    fromISO: start.toISOString(),
    toISO: end.toISOString(),
  };
}
