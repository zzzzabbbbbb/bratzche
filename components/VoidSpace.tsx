"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAGMENTS = [
  "ψ(x) = ∫ e^(ipx/ℏ) φ(p) dp",
  "el observador colapsa la función",
  "00110101 00101110",
  "undefined is not a function",
  "∂μψ̄γμψ",
  "quien observa al observador",
  "NULL",
  "la máscara debajo de la máscara",
  "entropy++",
  "el campo no tiene afuera",
  "rm -rf /self",
  "なにもない",
  "SEGMENTATION FAULT",
  "el deseo es siempre deseo de otra cosa",
  "0x00000000",
  "cogito ergo sum (error)",
  "∞ → 0",
  "la estructura es el sujeto",
  "S(◉̀ꈊ◉́)ノ",
  "no hay metalenguaje",
  "kill -9 consciousness",
  "todo lo sólido se desvanece",
  "das Ding",
  "el significante representa al sujeto para otro significante",
  "void main() { return; }",
  "śūnyatā",
  "CORE DUMPED",
  "el mapa no es el territorio",
  "pero el territorio tampoco es el territorio",
  "10101̷0̷1̷0̷1̷",
  "jouissance",
  "el Otro no existe",
  "fatal: not a git repository",
  "∇ × E = -∂B/∂t",
  "¿y si la salida es la entrada?",
  "NaN",
  "objet petit a",
  "ERROR: stack overflow at line 1",
];

const COLORS = ["#FF0000", "#00FF00", "#FF00FF", "#00FFFF", "#000000"];
const VOID_FONT_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

interface Fragment {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  skew: number;
  duration: number;
  born: number;
  glitch: boolean;
  glitchOffset: number;
  color: string;
  fontFamily: string;
  textShadow: string;
  renderedText: string;
}

interface Trail {
  id: number;
  text: string;
  x: number;
  y: number;
  born: number;
}

export default function VoidSpace() {
  const [bgColor, setBgColor] = useState("#000000");
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [flash, setFlash] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const fragIdRef = useRef(0);
  const trailIdRef = useRef(0);
  const lastTrailRef = useRef(0);

  const makeVisualState = useCallback((text: string) => {
    const glitch = Math.random() > 0.85;
    return {
      glitch,
      glitchOffset: glitch ? (Math.random() - 0.5) * 10 : 0,
      color: Math.random() > 0.7 ? "#00FF00" : "#FFFFFF",
      fontFamily: VOID_FONT_STACK,
      textShadow: glitch
        ? `${Math.random() * 4 - 2}px 0 #FF0000, ${Math.random() * 4 - 2}px 0 #00FFFF`
        : "none",
      renderedText: glitch
        ? text
            .split("")
            .map((c) => (Math.random() > 0.8 ? c + c : c))
            .join("")
        : text,
    };
  }, []);

  const randomFragment = useCallback((): Fragment => {
    const id = fragIdRef.current++;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const sizes = isMobile
      ? [10, 12, 14, 16, 20, 24, 30, 36]
      : [12, 14, 16, 20, 24, 32, 48, 64, 72];
    const baseText = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    const text = isMobile && baseText.length > 22 ? baseText.slice(0, 20) : baseText;
    const visual = makeVisualState(text);
    return {
      id,
      text,
      x: Math.random() * 80 + 5,
      y: Math.random() * 80 + 5,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      opacity: Math.random() * 0.7 + 0.3,
      skew: (Math.random() - 0.5) * 15,
      duration: 1000 + Math.random() * 3000,
      born: Date.now(),
      ...visual,
    };
  }, [makeVisualState]);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }, 200 + Math.random() * 200);

    const fragInterval = setInterval(() => {
      const f = randomFragment();
      setFragments((prev) => {
        const now = Date.now();
        const alive = prev
          .filter((p) => now - p.born < p.duration)
          .map((p) => (Math.random() > 0.82 ? { ...p, ...makeVisualState(p.text) } : p));
        return [...alive.slice(-25), f];
      });
    }, 300);

    const seedTimer = setTimeout(() => {
      setFragments(Array.from({ length: 8 }, randomFragment));
    }, 0);

    return () => {
      clearTimeout(seedTimer);
      clearInterval(bgInterval);
      clearInterval(fragInterval);
    };
  }, [makeVisualState, randomFragment]);

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(Date.now());
    }, 80);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrails((prev) => prev.filter((t) => now - t.born < 1500));
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTrailRef.current < 80) return;
    lastTrailRef.current = now;

    const id = trailIdRef.current++;
    const text = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    setTrails((prev) => [
      ...prev.slice(-15),
      { id, text, x: e.clientX, y: e.clientY, born: now },
    ]);
  };

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 100);

    const burst = Array.from({ length: 5 }, randomFragment);
    setFragments((prev) => [...prev, ...burst]);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.05s",
        cursor: "none",
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {flash && (
        <div className="fixed inset-0 bg-blanco z-50 pointer-events-none" />
      )}

      {fragments.map((f) => {
        const age = now - f.born;
        const progress = age / f.duration;
        const fadeOut = progress > 0.7 ? Math.max(0, 1 - (progress - 0.7) / 0.3) : 1;

        return (
          <span
            key={f.id}
            className="absolute pointer-events-none break-all max-w-[85vw]"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              fontSize: f.size,
              opacity: f.opacity * fadeOut,
              transform: `skewX(${f.skew}deg) ${f.glitch ? `translateX(${f.glitchOffset}px)` : ""}`,
              color: f.color,
              fontFamily: f.fontFamily,
              textShadow: f.textShadow,
              mixBlendMode: "difference",
            }}
          >
            {f.renderedText}
          </span>
        );
      })}

      {trails.map((t) => {
        const age = now - t.born;
        const opacity = Math.max(0, 1 - age / 1500);
        return (
          <span
            key={t.id}
            className="fixed pointer-events-none text-neon"
            style={{
              left: t.x,
              top: t.y,
              fontSize: 11,
              opacity: opacity * 0.6,
              transform: "translate(-50%, -50%)",
              fontFamily: VOID_FONT_STACK,
              mixBlendMode: "difference",
            }}
          >
            {t.text.slice(0, 20)}
          </span>
        );
      })}

      <div
        className="fixed bottom-4 right-4 text-[8px] pointer-events-none"
        style={{
          opacity: 0.08,
          fontFamily: VOID_FONT_STACK,
          color: "#FFFFFF",
          mixBlendMode: "difference",
        }}
      >
        br△tzche
      </div>
    </div>
  );
}
