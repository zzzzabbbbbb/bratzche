"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "lg";
  href?: string;
}

export default function Logo({ size = "lg", href = "/" }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const dimensions = {
    lg: { width: 600, height: 270, className: "w-[clamp(280px,60vw,600px)]" },
    sm: { width: 160, height: 72, className: "w-[clamp(100px,12vw,160px)]" },
  };

  const { width, height, className } = dimensions[size];

  const content = (
    <div
      className={`
        relative cursor-pointer select-none
        transition-all duration-500 ease-in-out
        ${size === "sm" ? "p-1" : "p-6"}
        ${isHovered ? "bg-blanco" : "bg-transparent"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/images/logo.png"
        alt="bratzche journal"
        width={width}
        height={height}
        priority
        className={`
          ${className} h-auto
          transition-all duration-500 ease-in-out
          ${isHovered ? "invert" : ""}
        `}
      />
    </div>
  );

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
