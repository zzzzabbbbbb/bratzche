import { pieces } from "@/lib/pieces";
import PieceCard from "@/components/PieceCard";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "archivo — bratzche journal",
};

const experimentalEntries = [
  {
    slug: "autorreferencia-experimental",
    href: "/ensayos/autorreferencia",
    title: "Autorreferencia",
    date: "2026-02-27",
    tags: ["fisica", "matematicas"],
    excerpt:
      "Ensayo vivo: observador, mapa, recursion y ruina en una interfaz que se altera al leerla.",
  },
] as const;

export default function Archivo() {
  const archiveEntries = [...experimentalEntries, ...pieces];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-negro px-6 md:px-16 lg:px-24 pt-24 pb-32">
        <header className="mb-16 md:mb-32">
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.8] tracking-tighter text-blanco">
            archivo
          </h1>
          <p className="mt-4 text-[0.65rem] tracking-wide text-gris">
            {archiveEntries.length} piezas
          </p>
        </header>

        <section>
          {archiveEntries.map((piece, i) => (
            <PieceCard key={piece.slug} piece={piece} index={i} />
          ))}
        </section>

        <footer className="mt-32 border-t border-gris-oscuro pt-8">
          <p className="text-[0.55rem] tracking-wide text-gris">
            bratzche journal
          </p>
        </footer>
      </main>
    </>
  );
}
