import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ANALYTICS_COOKIE_NAME = "bratzche_analytics_session";

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function getAnalyticsPassword(): string {
  return process.env.ANALYTICS_PASSWORD?.trim() ?? "";
}

function getAnalyticsSessionToken(): string {
  const password = getAnalyticsPassword();
  if (!password) return "";

  return hash(`bratzche-analytics:${password}`);
}

export function isAnalyticsPasswordValid(value: string | null | undefined): boolean {
  const expected = getAnalyticsPassword();
  const candidate = value?.trim() ?? "";

  if (!expected || !candidate) {
    return false;
  }

  return safeEqual(candidate, expected);
}

export function isAnalyticsSessionValid(value: string | null | undefined): boolean {
  const expected = getAnalyticsSessionToken();
  const candidate = value?.trim() ?? "";

  if (!expected || !candidate) {
    return false;
  }

  return safeEqual(candidate, expected);
}

export async function hasAnalyticsSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ANALYTICS_COOKIE_NAME)?.value;
  return isAnalyticsSessionValid(sessionCookie);
}

export function isAnalyticsRequestAuthorized(request: NextRequest): boolean {
  const passwordHeader = request.headers.get("x-analytics-password");
  if (isAnalyticsPasswordValid(passwordHeader)) {
    return true;
  }

  const sessionCookie = request.cookies.get(ANALYTICS_COOKIE_NAME)?.value;
  return isAnalyticsSessionValid(sessionCookie);
}

export function getAnalyticsCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export function createAnalyticsSessionCookie() {
  const token = getAnalyticsSessionToken();
  if (!token) return null;

  return {
    name: ANALYTICS_COOKIE_NAME,
    value: token,
    options: getAnalyticsCookieOptions(),
  };
}

export function unauthorizedAnalyticsResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
