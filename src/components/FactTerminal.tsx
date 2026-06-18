"use client";

import { useEffect, useState } from "react";

// Facts kept strictly factual and sourced — no editorializing, per product
// direction. Each one is traceable to a figure used elsewhere in the app.
const FACTS = [
  "The average S&P 500 CEO-to-worker pay ratio was 285:1 in 2024, according to AFL-CIO Executive Paywatch.",
  "Starbucks reported the highest CEO-to-median-worker pay ratio in the S&P 500 for fiscal year 2024, at 6,666:1.",
  "Apple's CEO pay ratio was 672:1 for fiscal year 2023, per its 2024 SEC proxy filing.",
  "Costco's CEO-to-worker pay ratio was 262:1 in fiscal year 2024 — among the lowest of major retailers.",
  "Companies have been required to disclose CEO-to-median-worker pay ratios since 2018, under Dodd-Frank Section 953(b).",
  "McDonald's median employee for pay-ratio purposes is a restaurant worker in Poland, due to its majority-franchised ownership structure.",
  "The median U.S. worker earned $49,500 in 2024, while the average S&P 500 CEO earned $18.9 million.",
  "Disney's CEO pay ratio rose from 595:1 in fiscal 2023 to 746:1 in fiscal 2024.",
  "A company's reported pay ratio depends on its own chosen methodology — two companies can calculate it differently under the same SEC rule.",
  "The arts, entertainment, and recreation sector had the highest average CEO pay ratio of any S&P 500 sector in 2024, at 1,924:1.",
];

export default function FactTerminal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * FACTS.length));
  }, []);

  function nextFact() {
    setIndex((i) => (i + 1) % FACTS.length);
  }

  return (
    <div className="border-2 border-crt-border bg-crt-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-pixel text-[9px] text-crt-green-dim">
          FACT TERMINAL
        </span>
        <span className="w-2 h-2 rounded-full bg-crt-green animate-pulse" />
      </div>
      <p className="font-mono text-sm text-crt-green-bright leading-relaxed min-h-[80px]">
        {FACTS[index]}
      </p>
      <button
        onClick={nextFact}
        className="mt-3 text-xs font-mono text-crt-green-dim hover:text-crt-green underline"
      >
        [ NEXT FACT ]
      </button>
    </div>
  );
}
