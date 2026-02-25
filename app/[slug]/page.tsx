import { notFound } from "next/navigation";
import Link from "next/link";
import { pieces, getPieceBySlug, getAllSlugs } from "@/lib/pieces";
import Navigation from "@/components/Navigation";
import PdfSection from "@/components/PdfSection";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);
  if (!piece) return { title: "No encontrado — bratzche" };
  return {
    title: `${piece.title} — bratzche journal`,
    description: piece.excerpt,
  };
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);
  if (!piece) notFound();

  const currentIndex = pieces.findIndex((p) => p.slug === slug);
  const prevPiece = currentIndex > 0 ? pieces[currentIndex - 1] : null;
  const nextPiece =
    currentIndex < pieces.length - 1 ? pieces[currentIndex + 1] : null;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-negro px-6 md:px-16 lg:px-24 pt-28 pb-32">
        <article className="max-w-4xl mx-auto">
          <header className="mb-16 md:mb-24">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] text-gris uppercase block mb-6">
              {piece.date}
            </span>

            <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.85] tracking-tight text-blanco mb-8">
              {piece.title}
            </h1>

            <div className="flex gap-2 flex-wrap">
              {piece.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6rem] tracking-wider text-gris border border-gris-oscuro px-2 py-0.5 hover:text-neon hover:border-neon/30 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <section className="mb-16">
            <PdfSection url={piece.pdf} />
          </section>

          <div className="mt-8">
            <a
              href={piece.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-neon hover:text-blanco transition-colors duration-300 group border border-neon/30 hover:border-blanco/30 px-5 py-3"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path
                  d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              descargar pdf
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-gris-oscuro">
            <h2 className="font-mono text-[0.65rem] tracking-[0.3em] text-gris uppercase mb-8">
              extracto
            </h2>
            <div className="max-w-2xl space-y-6">
              {piece.content.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[0.95rem] md:text-base leading-[1.8] text-gris font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <nav className="mt-24 pt-8 border-t border-gris-oscuro flex justify-between items-start">
            {prevPiece ? (
              <Link
                href={`/${prevPiece.slug}`}
                className="group text-left max-w-[45%]"
              >
                <span className="font-mono text-[0.55rem] tracking-[0.3em] text-gris uppercase block mb-2">
                  anterior
                </span>
                <span className="text-lg font-bold text-gris group-hover:text-neon transition-colors duration-300">
                  {prevPiece.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPiece ? (
              <Link
                href={`/${nextPiece.slug}`}
                className="group text-right max-w-[45%]"
              >
                <span className="font-mono text-[0.55rem] tracking-[0.3em] text-gris uppercase block mb-2">
                  siguiente
                </span>
                <span className="text-lg font-bold text-gris group-hover:text-neon transition-colors duration-300">
                  {nextPiece.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>
    </>
  );
}
