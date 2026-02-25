"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { Piece } from "@/lib/pieces";

interface PieceCardProps {
  piece: Piece;
  index: number;
}

export default function PieceCard({ piece, index }: PieceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const delays = [0, 150, 80, 200, 120];
  const baseDelay = delays[index % delays.length];

  return (
    <Link href={`/${piece.slug}`} className="block group">
      <article
        ref={ref}
        className={`${layout} py-24 md:py-32 relative`}
      >
        <div className="relative">
          <span
            className="text-[0.65rem] tracking-wide text-gris block mb-4 group-hover:text-neon transition-colors duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.8s ease ${baseDelay}ms, transform 0.8s ease ${baseDelay}ms`,
            }}
          >
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
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) skewX(0deg)" : "translateY(30px) skewX(-2deg)",
              filter: visible ? "blur(0px)" : "blur(4px)",
              transition: `opacity 1s ease ${baseDelay + 100}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + 100}ms, filter 1s ease ${baseDelay + 100}ms`,
            }}
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
            style={{
              opacity: visible ? 0.7 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 1.2s ease ${baseDelay + 300}ms, transform 1.2s ease ${baseDelay + 300}ms`,
            }}
          >
            {piece.excerpt}
          </p>

          <div
            className={`
              flex gap-2 mt-4 flex-wrap
              ${isEven ? "" : "justify-end"}
            `}
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 1.5s ease ${baseDelay + 500}ms`,
            }}
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

        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gris-oscuro group-hover:bg-neon/30 transition-colors duration-700"
          style={{
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: isEven ? "left" : "right",
            transition: `transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + 400}ms`,
          }}
        />
      </article>
    </Link>
  );
}
