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

    if (!isLoaded) {
      setDisplayText(
        text
          .split("")
          .map((char) => (char === " " ? " " : symbols[Math.floor(Math.random() * symbols.length)]))
          .join("")
      );
      return;
    }

    let iterations = 0;
    const totalLength = text.length;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
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
          clearInterval(interval);
        }

        iterations += resolveCount;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isLoaded, delay, speed, resolveCount]);

  return <>{displayText}</>;
}
