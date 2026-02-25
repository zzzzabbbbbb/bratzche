"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full border border-gris-oscuro flex items-center justify-center"
      style={{ height: "80vh", backgroundColor: "#111111" }}
    >
      <span className="font-mono text-[0.65rem] tracking-[0.3em] text-gris uppercase animate-pulse">
        cargando pdf...
      </span>
    </div>
  ),
});

export default function PdfSection({ url }: { url: string }) {
  return <PdfViewer url={url} />;
}
