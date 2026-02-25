import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-negro overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10">
        <Logo size="lg" href="/archivo" />
      </div>

    </main>
  );
}
