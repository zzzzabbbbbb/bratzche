"use client";

import { useEffect, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "./page.module.css";

type MathEquationProps = {
  latex: string;
  display?: boolean;
  className?: string;
};

export default function MathEquation({
  latex,
  display = false,
  className = "",
}: MathEquationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.equationWrap} ${
        display ? styles.equationDisplay : styles.equationInline
      } ${visible ? styles.equationVisible : ""} ${className}`}
    >
      {display ? <BlockMath math={latex} /> : <InlineMath math={latex} />}
    </div>
  );
}
