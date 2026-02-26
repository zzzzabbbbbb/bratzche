import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bratzche journal",
  description:
    "Archivo experimental de ensayos filosóficos, arte generativo y código.",
  keywords: [
    "filosofía",
    "física cuántica",
    "psicoanálisis",
    "budismo",
    "ensayos",
    "arte generativo",
  ],
  openGraph: {
    title: "bratzche journal",
    description:
      "Archivo experimental de ensayos filosóficos, arte generativo y código.",
    url: "https://bratzche.com",
    siteName: "bratzche",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HS9YXQ7VP3"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HS9YXQ7VP3');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
