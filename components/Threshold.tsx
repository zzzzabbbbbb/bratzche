"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FRAGMENTS = [
  "ψ(x) = ∫ e^(ipx/ℏ) φ(p) dp",
  "el observador colapsa la función",
  "00110101",
  "undefined",
  "quien observa al observador",
  "NULL",
  "la máscara debajo de la máscara",
  "el campo no tiene afuera",
  "なにもない",
  "FAULT",
  "el deseo es deseo de otra cosa",
  "rm -rf /self",
];

const COLORS = ["#FF0000", "#00FF00", "#FF00FF", "#00FFFF", "#000000"];

interface Fragment {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  skew: number;
}

export default function Threshold() {
  const [phase, setPhase] = useState<"chaos" | "fadeout" | "landing" | "exit">("chaos");
  const [bgColor, setBgColor] = useState("#000000");
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const fragIdRef = useRef(0);
  const router = useRouter();

  const randomFrag = useCallback((): Fragment => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const sizes = isMobile
      ? [10, 12, 14, 16, 18, 22, 26, 30]
      : [14, 16, 20, 24, 30, 36, 44, 52, 60];
    const text = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
    return {
      id: fragIdRef.current++,
      text: isMobile && text.length > 20 ? text.slice(0, 18) : text,
      x: Math.random() * 80 + 5,
      y: Math.random() * 80 + 5,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      opacity: Math.random() * 0.7 + 0.3,
      skew: (Math.random() - 0.5) * 12,
    };
  }, []);

  useEffect(() => {
    if (phase !== "chaos") return;

    setFragments(Array.from({ length: 6 }, randomFrag));

    const bgInterval = setInterval(() => {
      setBgColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }, 300);

    const fragInterval = setInterval(() => {
      setFragments((prev) => {
        const next = [...prev.slice(-20), randomFrag()];
        if (Math.random() > 0.6 && next.length > 3) {
          next.splice(Math.floor(Math.random() * next.length), 1);
        }
        return next;
      });
    }, 250);

    const timer = setTimeout(() => {
      clearInterval(bgInterval);
      clearInterval(fragInterval);
      setBgColor("#000000");
      setPhase("fadeout");
    }, 4000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(fragInterval);
      clearTimeout(timer);
    };
  }, [phase, randomFrag]);

  useEffect(() => {
    if (phase !== "fadeout") return;
    const timer = setTimeout(() => setPhase("landing"), 600);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "landing") return;
    const timer = setTimeout(() => setPhase("exit"), 2500);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = setTimeout(() => router.push("/archivo"), 800);
    return () => clearTimeout(timer);
  }, [phase, router]);

  return (
    <div className="fixed inset-0 bg-negro">
      {phase === "chaos" && (
        <div
          className="fixed inset-0 overflow-hidden select-none"
          style={{
            backgroundColor: bgColor,
            transition: "background-color 0.05s",
          }}
        >
          {fragments.map((f) => (
            <span
              key={f.id}
              className="absolute pointer-events-none font-mono break-all max-w-[80vw]"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                fontSize: f.size,
                opacity: f.opacity,
                transform: `skewX(${f.skew}deg)`,
                color: Math.random() > 0.6 ? "#00FF00" : "#FFFFFF",
                mixBlendMode: "difference",
              }}
            >
              {f.text}
            </span>
          ))}
        </div>
      )}

      {phase === "fadeout" && (
        <div
          className="fixed inset-0"
          style={{
            backgroundColor: "#000",
            animation: "fadeIn 0.5s ease forwards",
          }}
        />
      )}

      {(phase === "landing" || phase === "exit") && (
        <main className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03)_0%,transparent_70%)]" />
          <div
            className="relative z-10"
            style={{
              animation: phase === "landing"
                ? "fadeIn 0.8s ease forwards"
                : "none",
              opacity: phase === "exit" ? 1 : undefined,
              transform: phase === "exit" ? "translateY(-40px)" : undefined,
              transition: phase === "exit" ? "opacity 0.8s ease, transform 0.8s ease" : undefined,
            }}
          >
            <div
              className="relative select-none p-6 transition-all duration-500 bg-blanco"
            >
              <Image
                src="/images/logo.png"
                alt="bratzche journal"
                width={600}
                height={270}
                priority
                className="w-[clamp(280px,60vw,600px)] h-auto invert"
              />
            </div>
          </div>

          {phase === "exit" && (
            <div
              className="fixed inset-0 bg-negro z-20"
              style={{
                animation: "fadeIn 0.7s ease 0.3s forwards",
                opacity: 0,
              }}
            />
          )}
        </main>
      )}
    </div>
  );
}
