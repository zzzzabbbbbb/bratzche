import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Navigation from "@/components/Navigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "claudette — bratzche journal",
  description: "un gatito bailando.",
};

const NOTES = ["♪", "♫", "♩", "♬", "♪", "♫"];

export default function ClaudettePage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.floor} aria-hidden />

        <div className={styles.notes} aria-hidden>
          {NOTES.map((note, i) => (
            <span
              key={i}
              className={styles.note}
              style={{ "--i": i } as CSSProperties}
            >
              {note}
            </span>
          ))}
        </div>

        <div className={styles.stage}>
          <div className={styles.cat} role="img" aria-label="gatito bailando">
            🐱
          </div>
          <div className={styles.shadow} aria-hidden />
        </div>

        <h1 className={styles.title}>claudette</h1>
        <p className={styles.caption}>un gatito bailando</p>
      </main>
    </>
  );
}
