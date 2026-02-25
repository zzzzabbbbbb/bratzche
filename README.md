# bratzche journal

Archivo experimental de ensayos filosóficos, arte generativo y código.

**[bratzche.com](https://bratzche.com)**

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- react-pdf para visor de PDFs
- Deploy en Vercel
- DNS en Cloudflare

## Estructura

```
app/
  page.tsx              landing — logo centrado, fondo negro
  archivo/page.tsx      scroll con todas las piezas
  [slug]/page.tsx       página individual con visor PDF

components/
  Logo.tsx              logo warped, hover invierte colores
  PieceCard.tsx         tarjeta asimétrica para el archivo
  PdfViewer.tsx         visor PDF con lazy loading por página
  PdfSection.tsx        wrapper client para carga dinámica
  Navigation.tsx        nav fija con logo

lib/
  pieces.ts             data de piezas (título, fecha, tags, contenido, pdf)

public/
  pdfs/                 archivos PDF descargables
  images/               logo y assets
```

## Piezas

- Irrelevancia — nihilismo, entropía, Nietzsche
- Máscara — Lacan, Foucault, hipocresía
- Fluctuación — física cuántica, budismo, campos
- Topología del Deseo — Lacan, topología, psicoanálisis

## Dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vercel --prod --yes
```
