"use client";

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  return (
    <div className="w-full">
      <div
        className="w-full border border-gris-oscuro overflow-hidden"
        style={{ height: "80vh", backgroundColor: "#111111" }}
      >
        <iframe
          src={url}
          title="PDF"
          className="w-full h-full border-0"
          style={{ colorScheme: "dark" }}
        />
      </div>
    </div>
  );
}
