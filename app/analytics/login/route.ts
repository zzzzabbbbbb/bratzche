import { NextRequest, NextResponse } from "next/server";
import {
  createAnalyticsSessionCookie,
  isAnalyticsPasswordValid,
} from "@/lib/analytics/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!isAnalyticsPasswordValid(password)) {
    const errorUrl = new URL("/analytics", request.url);
    errorUrl.searchParams.set("error", "invalid_password");
    return NextResponse.redirect(errorUrl);
  }

  const cookie = createAnalyticsSessionCookie();
  if (!cookie) {
    const errorUrl = new URL("/analytics", request.url);
    errorUrl.searchParams.set("error", "missing_env");
    return NextResponse.redirect(errorUrl);
  }

  const response = NextResponse.redirect(new URL("/analytics", request.url));
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
