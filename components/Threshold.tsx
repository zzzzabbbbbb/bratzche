"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Threshold() {
  const [phase, setPhase] = useState<"landing" | "exit">("landing");
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoInverted, setLogoInverted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (phase !== "landing") return;
    const frame = requestAnimationFrame(() => {
      setLogoVisible(true);
    });
    const invertTimer = setTimeout(() => {
      setLogoInverted(true);
    }, 700);
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2400);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(invertTimer);
      clearTimeout(exitTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = setTimeout(() => router.push("/archivo"), 800);
    return () => clearTimeout(timer);
  }, [phase, router]);

  return (
    <div className="fixed inset-0 bg-negro">
      <main className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03)_0%,transparent_70%)]" />
        <div
          className="relative z-10"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: phase === "exit" ? "translate3d(0,-40px,0)" : "translate3d(0,0,0)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            willChange: "opacity, transform",
          }}
        >
          <div
            className="relative select-none p-6"
            style={{
              backgroundColor: logoInverted ? "#FFFFFF" : "#000000",
              transition: "background-color 0.7s ease",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="bratzche journal"
              width={600}
              height={270}
              priority
              className="w-[clamp(280px,60vw,600px)] h-auto"
              style={{
                filter: logoInverted ? "invert(1)" : "invert(0)",
                transition: "filter 0.7s ease",
              }}
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
    </div>
  );
}
