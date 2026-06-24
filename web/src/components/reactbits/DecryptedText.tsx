"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=<>?/";

// React Bits "DecryptedText" style: scrambles characters, then settles to the
// real text. Reduced motion shows the final text immediately.
export function DecryptedText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const total = text.length;
    const speed = 1.5; // characters revealed per ~frame-tick

    const tick = () => {
      const revealed = Math.floor(frame / 3 / speed);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      frame++;
      if (revealed <= total) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
