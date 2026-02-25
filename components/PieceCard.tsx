"use client";

import Link from "next/link";
import type { Piece } from "@/lib/pieces";

interface PieceCardProps {
  piece: Piece;
  index: number;
}

export default function PieceCard({ piece, index }: PieceCardProps) {
  const isEven = index % 2 === 0;
  const layoutVariants = [
    "ml-0 mr-auto max-w-[75%]",
    "ml-auto mr-0 max-w-[60%]",
    "mx-auto max-w-[85%]",
  ];
  const layout = layoutVariants[index % 3];

  const titleSizes = [
    "text-[clamp(3rem,10vw,8rem)]",
    "text-[clamp(2.5rem,8vw,6rem)]",
    "text-[clamp(3.5rem,12vw,9rem)]",
  ];
  const titleSize = titleSizes[index % 3];

  return (
    <Link href={`/${piece.slug}`} className="block group">
      <article
        className={`${layout} py-24 md:py-32 relative`}
        style={{
          animation: "fadeIn 0.8s ease-out forwards",
          animationDelay: `${index * 0.15}s`,
          opacity: 0,
        }}
      >
        <div className="relative">
          <span className="text-[0.65rem] tracking-wide text-gris block mb-4 group-hover:text-neon transition-colors duration-500">
            {piece.date}
          </span>

          <h2
            className={`
              ${titleSize}
              font-bold leading-[0.85] tracking-tight
              text-blanco
              group-hover:text-neon
              transition-colors duration-500
              ${isEven ? "" : "text-right"}
            `}
          >
            {piece.title}
          </h2>

          <p
            className={`
              mt-6 text-sm md:text-base leading-relaxed max-w-md
              text-gris group-hover:text-blanco
              transition-colors duration-500
              ${isEven ? "" : "ml-auto text-right"}
            `}
          >
            {piece.excerpt}
          </p>

          <div
            className={`
              flex gap-2 mt-4 flex-wrap
              ${isEven ? "" : "justify-end"}
            `}
          >
            {piece.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.6rem] tracking-wider text-gris-oscuro group-hover:text-neon/40 transition-colors duration-500 border border-gris-oscuro group-hover:border-neon/20 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gris-oscuro group-hover:bg-neon/30 transition-colors duration-700" />
      </article>
    </Link>
  );
}
