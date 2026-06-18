import type { Reference } from "@/lib/pieces";

interface ReferencesProps {
  items: Reference[];
  defaultOpen?: boolean;
  preliminary?: boolean;
}

export default function References({
  items,
  defaultOpen = false,
  preliminary = false,
}: ReferencesProps) {
  if (!items?.length) return null;

  return (
    <details
      open={defaultOpen}
      className="group mt-16 pt-12 border-t border-gris-oscuro max-w-2xl"
    >
      <summary className="flex items-center gap-3 cursor-pointer list-none select-none text-neon font-mono text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-blanco [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className="inline-block text-[0.7rem] leading-none transition-transform duration-300 group-open:rotate-90"
        >
          ▸
        </span>
        <span>
          referencias
          <span className="text-gris"> · {items.length}</span>
          {preliminary ? <span className="text-gris"> · preliminar</span> : null}
        </span>
      </summary>

      <ol className="mt-8 space-y-5">
        {items.map((ref, i) => (
          <li key={i} className="flex gap-4 text-[0.8rem] leading-[1.6] text-gris">
            <span className="shrink-0 pt-[0.15rem] font-mono text-[0.62rem] tabular-nums text-gris-oscuro">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="text-blanco">{ref.author}</span>
              {ref.year ? <span className="text-gris"> ({ref.year})</span> : null}
              {". "}
              <span className="italic">{ref.title}</span>
              {ref.source ? <span>. {ref.source}</span> : null}
              {ref.url ? (
                <>
                  {" "}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon transition-colors duration-300 hover:text-blanco"
                    aria-label={`Enlace a ${ref.title}`}
                  >
                    ↗
                  </a>
                </>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
