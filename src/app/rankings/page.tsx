"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { companies } from "@/data/companies";
import { formatRatio } from "@/lib/cake-ratio";
import Link from "next/link";

type Tab = "highest" | "lowest";

export default function RankingsPage() {
  const [tab, setTab] = useState<Tab>("highest");

  const sorted = [...companies].sort((a, b) =>
    tab === "highest" ? b.ratio - a.ratio : a.ratio - b.ratio
  );
  const top25 = sorted.slice(0, 25);

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="font-pixel text-lg sm:text-2xl text-cake-gold-bright gold-glow mb-2 leading-relaxed">
          ARISTOCRACY RANKINGS
        </h1>
        <p className="font-mono text-sm text-crt-green-dim mb-6">
          The widest and narrowest CEO-to-worker pay ratios in the database.
        </p>

        <div className="flex gap-2 mb-6">
          <TabButton active={tab === "highest"} onClick={() => setTab("highest")}>
            TOP 25 HIGHEST
          </TabButton>
          <TabButton active={tab === "lowest"} onClick={() => setTab("lowest")}>
            TOP 25 LOWEST
          </TabButton>
        </div>

        <div className="border-2 border-crt-border bg-crt-panel">
          <div className="grid grid-cols-[2.5rem_1fr_6rem] sm:grid-cols-[3rem_1fr_8rem] gap-2 px-3 sm:px-4 py-2 border-b-2 border-crt-border font-mono text-xs text-crt-green-dim">
            <span>#</span>
            <span>COMPANY</span>
            <span className="text-right">RATIO</span>
          </div>
          {top25.map((c, i) => (
            <Link
              key={c.id}
              href={`/company/${c.slug}`}
              className={`grid grid-cols-[2.5rem_1fr_6rem] sm:grid-cols-[3rem_1fr_8rem] gap-2 px-3 sm:px-4 py-2.5 border-b border-crt-border last:border-b-0 hover:bg-crt-black transition-colors items-center ${
                i === 0 ? "bg-crt-black" : ""
              }`}
            >
              <span className="font-mono text-sm text-crt-green-dim">
                {i + 1}
              </span>
              <span className="font-mono text-sm text-crt-green-bright truncate">
                {c.name}
                {!c.verified && (
                  <span className="text-cake-gold-dim text-xs ml-1">
                    (est.)
                  </span>
                )}
              </span>
              <span
                className={`font-mono text-sm text-right ${
                  i === 0
                    ? "text-cake-gold-bright gold-glow"
                    : "text-crt-green-bright"
                }`}
              >
                {formatRatio(c.ratio)}
              </span>
            </Link>
          ))}
        </div>

        <p className="font-mono text-xs text-crt-green-dim mt-4">
          Entries marked &quot;(est.)&quot; are illustrative estimates, not
          verified figures from that company&apos;s actual SEC filing.
        </p>
      </main>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-pixel text-[10px] sm:text-xs px-3 sm:px-4 py-2 border-2 transition-colors ${
        active
          ? "border-cake-gold text-cake-gold-bright bg-crt-black"
          : "border-crt-border text-crt-green-dim hover:border-crt-green"
      }`}
    >
      {children}
    </button>
  );
}
