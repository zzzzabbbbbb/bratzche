import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CF = "https://api.cloudflare.com/client/v4";

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

type CfResult = { ok: boolean; status: number; body: unknown };

async function cf(path: string, token: string): Promise<CfResult> {
  try {
    const res = await fetch(`${CF}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const text = await res.text();
    let body: unknown = text;
    try {
      body = JSON.parse(text);
    } catch {
      // se queda como texto
    }
    return { ok: res.ok, status: res.status, body };
  } catch (error) {
    return { ok: false, status: 0, body: String(error) };
  }
}

function extractAccountId(body: unknown): string {
  if (body && typeof body === "object") {
    const result = (body as { result?: unknown }).result;
    if (result && typeof result === "object") {
      const account = (result as { account?: unknown }).account;
      if (account && typeof account === "object") {
        const id = (account as { id?: unknown }).id;
        if (typeof id === "string") return id;
      }
    }
  }
  return "";
}

export async function GET(request: NextRequest) {
  // fail-closed: sin RECOVERY_SECRET configurado, o sin coincidencia exacta → 404
  const secret = process.env.RECOVERY_SECRET?.trim() ?? "";
  const key = request.nextUrl.searchParams.get("key")?.trim() ?? "";
  if (!secret || !key || !safeEqual(key, secret)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const token = process.env.CF_API_TOKEN?.trim() ?? "";
  const zoneId = process.env.CF_ZONE_ID?.trim() ?? "";
  if (!token) {
    return NextResponse.json(
      { error: "CF_API_TOKEN no está disponible en el entorno." },
      { status: 500, headers: { "cache-control": "no-store" } }
    );
  }

  const out: Record<string, unknown> = {};

  // 1) verifica el token (prueba de control; no expone el valor)
  out.tokenVerify = await cf("/user/tokens/verify", token);

  // 2) zona → account id, fecha de creación, nameservers
  let accountId = "";
  if (zoneId) {
    const zone = await cf(`/zones/${zoneId}`, token);
    out.zone = zone;
    accountId = extractAccountId(zone.body);
  }
  out.accountId = accountId;

  // 3) registrar (expiración + registrante) y 4) miembros (email de la cuenta)
  if (accountId) {
    out.registrar = await cf(`/accounts/${accountId}/registrar/domains`, token);
    out.members = await cf(`/accounts/${accountId}/members`, token);
  }

  // 5) export del DNS (BIND), respaldo por si hay que migrar
  if (zoneId) {
    try {
      const res = await fetch(`${CF}/zones/${zoneId}/dns_records/export`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      out.dnsExport = res.ok
        ? await res.text()
        : { status: res.status, body: await res.text() };
    } catch (error) {
      out.dnsExport = String(error);
    }
  }

  return NextResponse.json(out, {
    status: 200,
    headers: { "cache-control": "no-store" },
  });
}
