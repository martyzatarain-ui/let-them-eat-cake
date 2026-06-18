"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "ARISTOCRACY TRACKING SYSTEM v1.0",
  "COPYRIGHT (C) NO ONE IN PARTICULAR",
  "",
  "INITIALIZING TRANSPARENCY TERMINAL...",
  "MOUNTING SEC PROXY ARCHIVE..............OK",
  "LOADING COMPENSATION DISCLOSURES........OK",
  "CALIBRATING CAKE RATIO ENGINE...........OK",
  "CROSS-REFERENCING ROYAL LEDGERS.........OK",
  "DECRYPTING AFL-CIO PAYWATCH FEED.........OK",
  "",
  "COMPENSATION DATABASE ONLINE",
  "",
  "PRESS ANY KEY OR WAIT TO CONTINUE",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      setSkippable(true);
      const timeout = setTimeout(onDone, 900);
      return () => clearTimeout(timeout);
    }
    const delay = BOOT_LINES[visibleLines] === "" ? 90 : 160;
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timeout);
  }, [visibleLines, onDone]);

  useEffect(() => {
    function handleKey() {
      if (skippable) onDone();
    }
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleKey);
    };
  }, [skippable, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-crt-black px-4">
      <div className="w-full max-w-2xl font-mono text-crt-green text-sm sm:text-base leading-relaxed phosphor-text">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line || "\u00A0"}
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <span className="inline-block w-2 h-4 bg-crt-green animate-blink align-middle ml-1" />
        )}
      </div>
    </div>
  );
}
