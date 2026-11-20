"use client";

import { useEffect, useState } from "react";

export default function MinimalLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const enterTimer = requestAnimationFrame(() => {
      setEntered(true);
    });

    const fadeTimer = setTimeout(() => {
      setFading(true);
      onComplete?.();
    }, 850);

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, 1350);

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#fafafa] text-[#111111] flex items-center justify-center transition-opacity duration-500 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      <span
        className={`text-[15px] md:text-[18px] uppercase transition-all duration-700 ease-out select-none ${
          fading
            ? "opacity-0 -translate-y-1 tracking-[0.22em]"
            : entered
              ? "opacity-100 translate-y-0 tracking-[0.22em]"
              : "opacity-0 translate-y-1 tracking-[0.34em]"
        }`}
      >
        ETHAN SIA
      </span>
    </div>
  );
}
