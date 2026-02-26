import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HS9YXQ7VP3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HS9YXQ7VP3');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
