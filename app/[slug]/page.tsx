import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
            <span className="text-[0.65rem] tracking-wide text-gris block mb-6">
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
            {piece.image && (
              <div className="mb-10 border border-gris-oscuro bg-negro p-3 md:p-4">
                <div className="relative overflow-hidden border border-gris-oscuro bg-negro">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            )}
            {piece.pdf ? (
              <PdfSection url={piece.pdf} />
            ) : (
              <div className="w-full border border-gris-oscuro bg-negro/40 px-5 py-8">
                <p className="font-mono text-[0.62rem] tracking-[0.22em] text-gris uppercase">
                  pdf no disponible por ahora
                </p>
              </div>
            )}
          </section>

          {piece.pdf && (
            <div className="mt-8">
              <a
                href={piece.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-wide text-neon hover:text-blanco transition-colors duration-300 group border border-neon/30 hover:border-blanco/30 px-5 py-3"
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
          )}

          <div className="mt-16 pt-12 border-t border-gris-oscuro">
            <div className="max-w-2xl space-y-10">
              {piece.epigraphs.map((line, i) => {
                const isQuote = line.startsWith('"') || line.startsWith('"');
                const isQuestion = line.endsWith("?");
                return (
                  <p
                    key={i}
                    className={`
                      leading-[1.6]
                      ${isQuestion ? "text-xl md:text-2xl font-bold text-blanco" : ""}
                      ${isQuote && !isQuestion ? "text-base md:text-lg italic text-gris" : ""}
                      ${!isQuote && !isQuestion ? "text-sm md:text-base text-gris/70" : ""}
                    `}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            <div className="mt-16 max-w-2xl space-y-6">
              <p className="text-[0.65rem] tracking-wide text-gris-oscuro mb-6">
                del ensayo
              </p>
              {piece.content.split("\n\n").slice(0, 3).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[0.9rem] md:text-base leading-[1.9] text-gris/60 font-light"
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
                <span className="text-[0.55rem] tracking-wide text-gris block mb-2">
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
                <span className="text-[0.55rem] tracking-wide text-gris block mb-2">
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
