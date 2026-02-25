import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-negro overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10">
        <Logo size="lg" href="/archivo" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-8 bg-gris"
          style={{ animation: "pulse-line 2s ease-in-out infinite" }}
        />
        <span className="font-mono text-[0.55rem] tracking-[0.3em] text-gris uppercase">
          entrar
        </span>
      </div>
    </main>
  );
}
