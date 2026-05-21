"use client";

import React, { useState, useEffect } from "react";

interface LoadingBarProps {
  onComplete: () => void;
}

export default function LoadingBar({ onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const triggerComplete = () => {
    setIsFading(true);
    setTimeout(onComplete, 600);
  };

  // Progress animation
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 2200; // ms total

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / duration, 1);
      const p = Math.round(raw * 100);

      setProgress(p);

      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // Brief pause at 100% before dismissing
        setTimeout(triggerComplete, 400);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b] select-none transition-all duration-600 ease-in-out ${isFading ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
        }`}
    >
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Loading bar */}
      <div className="relative z-20 w-full max-w-sm px-8">
        {/* Text and percentage */}
        <div className="mb-6 text-center">
          <p className="text-sm text-[rgba(255,255,255,0.7)]">Loading</p>
          <p className="text-2xl font-semibold text-[#1793d1]">{progress}%</p>
        </div>

        {/* Track */}
        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, rgba(23,147,209,0.6) 0%, #1793d1 100%)",
              boxShadow: "0 0 8px rgba(23,147,209,0.5)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
