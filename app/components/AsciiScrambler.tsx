"use client";

import React, { useState, useEffect } from "react";

interface AsciiScramblerProps {
  text: string;
  isLoaded: boolean;
  delay?: number;
  speed?: number;
  resolveCount?: number;
}

export default function AsciiScrambler({
  text,
  isLoaded,
  delay = 0,
  speed = 30, // Beautifully paced default
  resolveCount = 1, // Single-character locks for visual texturing
}: AsciiScramblerProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const symbols = ["@", "#", "$", "%", "^", "&", "*", "!", "?", "/", "\\", "|", "+", "=", "<", ">", ";", ":", "~"];

    let iterations = 0;
    const totalLength = text.length;
    let isDecrypting = false;

    // Helper to generate a fully scrambled representation
    const getFullScramble = () =>
      text
        .split("")
        .map((char) => (char === " " ? " " : symbols[Math.floor(Math.random() * symbols.length)]))
        .join("");

    // Start a continuous full scrambling cycle immediately
    const scrambleInterval = setInterval(() => {
      if (!isLoaded || !isDecrypting) {
        setDisplayText(getFullScramble());
      }
    }, 50);

    let decryptInterval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (isLoaded) {
      timeout = setTimeout(() => {
        // Clear the full scramble loop and start the step-by-step resolution sweep
        clearInterval(scrambleInterval);
        isDecrypting = true;

        decryptInterval = setInterval(() => {
          const currentFrame = text
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return char;
              }
              if (char === " ") {
                return " ";
              }
              return symbols[Math.floor(Math.random() * symbols.length)];
            })
            .join("");

          setDisplayText(currentFrame);

          if (iterations >= totalLength) {
            if (decryptInterval) clearInterval(decryptInterval);
          }

          iterations += resolveCount;
        }, speed);
      }, delay);
    }

    return () => {
      clearInterval(scrambleInterval);
      if (decryptInterval) clearInterval(decryptInterval);
      if (timeout) clearTimeout(timeout);
    };
  }, [text, isLoaded, delay, speed, resolveCount]);

  return <>{displayText}</>;
}
