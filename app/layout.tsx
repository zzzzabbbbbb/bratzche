import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
