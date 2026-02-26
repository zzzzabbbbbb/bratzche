import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getAnalyticsPassword, hasAnalyticsSession } from "@/lib/analytics/auth";

export const metadata = {
  title: "analytics — bratzche journal",
};

function errorCopy(errorCode: string | null): string | null {
  if (errorCode === "invalid_password") return "contrasena incorrecta";
  if (errorCode === "missing_env") return "falta ANALYTICS_PASSWORD en el entorno";
  return null;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const rawError = params.error;
  const errorCode = typeof rawError === "string" ? rawError : null;
  const authError = errorCopy(errorCode);
  const hasPasswordConfigured = Boolean(getAnalyticsPassword());
  const authenticated = await hasAnalyticsSession();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-negro px-6 md:px-16 lg:px-24 py-24">
        <section className="mx-auto max-w-xl border border-gris-oscuro p-8 md:p-10">
          <p className="font-mono text-[0.62rem] tracking-[0.28em] text-neon">ANALYTICS</p>
          <h1 className="mt-4 text-[clamp(1.8rem,5vw,3rem)] tracking-tight text-blanco">
            acceso privado
          </h1>
          <p className="mt-3 text-sm text-gris">
            dashboard interno para metricas combinadas de GA4, Vercel y Cloudflare.
          </p>

          {authError && <p className="mt-6 text-sm text-red-400">{authError}</p>}
          {!hasPasswordConfigured && (
            <p className="mt-6 text-sm text-red-400">configura `ANALYTICS_PASSWORD` para habilitar acceso</p>
          )}

          <form action="/analytics/login" method="post" className="mt-8">
            <label htmlFor="password" className="block text-[0.62rem] tracking-wider text-gris">
              contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 w-full border border-gris-oscuro bg-negro px-4 py-3 text-sm text-blanco outline-none focus:border-neon"
            />
            <button
              type="submit"
              className="mt-4 border border-neon px-5 py-2 font-mono text-[0.62rem] tracking-wider text-neon transition-colors hover:bg-neon hover:text-negro"
            >
              entrar
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <form action="/analytics/logout" method="post">
          <button
            type="submit"
            className="border border-gris-oscuro bg-negro px-3 py-2 font-mono text-[0.58rem] tracking-widest text-gris hover:text-blanco hover:border-blanco"
          >
            salir
          </button>
        </form>
      </div>
      <AnalyticsDashboard />
    </>
  );
}
