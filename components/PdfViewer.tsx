"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visiblePages, setVisiblePages] = useState<Set<number>>(new Set([1, 2]));
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    setContainerWidth(container.clientWidth);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!numPages) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePages((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            const page = Number(entry.target.getAttribute("data-page"));
            if (entry.isIntersecting) {
              next.add(page);
              if (page > 1) next.add(page - 1);
              if (page < numPages) next.add(page + 1);
            }
          }
          return next;
        });
      },
      { root: container, rootMargin: "200px 0px" }
    );

    pageRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [numPages]);

  const setPageRef = useCallback((page: number, el: HTMLDivElement | null) => {
    if (el) pageRefs.current.set(page, el);
    else pageRefs.current.delete(page);
  }, []);

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    setVisiblePages(new Set([1, 2, 3]));
  }

  const pageWidth = containerWidth ? containerWidth * scale : undefined;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))}
            className="text-xs text-gris hover:text-neon transition-colors border border-gris-oscuro hover:border-neon/30 w-7 h-7 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-[0.6rem] text-gris tabular-nums w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.5, +(s + 0.25).toFixed(2)))}
            className="text-xs text-gris hover:text-neon transition-colors border border-gris-oscuro hover:border-neon/30 w-7 h-7 flex items-center justify-center"
          >
            +
          </button>
          <button
            onClick={() => setScale(1)}
            className="text-[0.6rem] text-gris hover:text-neon transition-colors border border-gris-oscuro hover:border-neon/30 px-2 py-1"
          >
            fit
          </button>
        </div>

        {numPages > 0 && (
          <span className="text-[0.6rem] tracking-wide text-gris">
            {numPages} {numPages === 1 ? "página" : "páginas"}
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-auto border border-gris-oscuro"
        style={{ height: "80vh", backgroundColor: "#111" }}
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center" style={{ height: "80vh" }}>
              <span className="text-[0.65rem] tracking-wide text-gris animate-pulse">
                cargando...
              </span>
            </div>
          }
          error={
            <div className="flex items-center justify-center" style={{ height: "80vh" }}>
              <span className="text-[0.65rem] tracking-wide text-gris">
                pdf no disponible
              </span>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => {
            const pageNum = i + 1;
            return (
              <div
                key={pageNum}
                ref={(el) => setPageRef(pageNum, el)}
                data-page={pageNum}
                className="mb-1"
                style={{
                  minHeight: visiblePages.has(pageNum) ? undefined : 800,
                }}
              >
                {visiblePages.has(pageNum) && (
                  <Page
                    pageNumber={pageNum}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="[&_canvas]:mx-auto [&_canvas]:!w-full [&_canvas]:!h-auto"
                  />
                )}
              </div>
            );
          })}
        </Document>
      </div>
    </div>
  );
}
