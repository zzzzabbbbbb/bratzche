import { NextRequest, NextResponse } from "next/server";
import { ANALYTICS_COOKIE_NAME, getAnalyticsCookieOptions } from "@/lib/analytics/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/analytics", request.url));
  response.cookies.set(ANALYTICS_COOKIE_NAME, "", {
    ...getAnalyticsCookieOptions(),
    maxAge: 0,
  });
  return response;
}
