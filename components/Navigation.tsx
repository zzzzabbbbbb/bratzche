"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2">
      <Logo size="sm" href="/" />

      <div className="flex gap-6 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
        <Link
          href="/archivo"
          className={`transition-colors duration-300 ${
            pathname === "/archivo" ? "text-neon" : "text-gris hover:text-blanco"
          }`}
        >
          archivo
        </Link>
      </div>
    </nav>
  );
}
