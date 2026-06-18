"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { searchCompanies, companies, CompanyRecord } from "@/data/companies";
import { formatRatio, formatCurrencyFull } from "@/lib/cake-ratio";

const DEFAULT_SLUGS = ["costco", "walmart", "disney"];

export default function ComparePage() {
  const defaults = DEFAULT_SLUGS.map((s) => companies.find((c) => c.slug === s)).filter(
    Boolean
  ) as CompanyRecord[];

  const [selected, setSelected] = useState<CompanyRecord[]>(defaults);
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0 ? searchCompanies(query).slice(0, 6) : [];
  const maxRatio = selected.length > 0 ? Math.max(...selected.map((c) => c.ratio)) : 0;

  function addCompany(c: CompanyRecord) {
    if (selected.length >= 6) return;
    if (selected.find((s) => s.id === c.id)) return;
    setSelected([...selected, c]);
    setQuery("");
  }

  function removeCompany(id: string) {
    setSelected(selected.filter((c) => c.id !== id));
  }

  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="font-pixel text-lg sm:text-2xl text-cake-gold-bright gold-glow mb-2 leading-relaxed">
          COMPARE COMPANIES
        </h1>
        <p className="font-mono text-sm text-crt-green-dim mb-6">
          Add up to 6 companies to compare side by side. Highest ratio is
          highlighted.
        </p>

        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ADD A COMPANY..."
            className="w-full bg-crt-black border-2 border-crt-green text-crt-green-bright placeholder:text-crt-green-dim font-mono text-base py-3 px-4 outline-none"
          />
          {results.length > 0 && (
            <div className="absolute z-10 w-full border-2 border-crt-green border-t-0 bg-crt-black max-h-56 overflow-y-auto">
              {results.map((c) => (
                <button
                  key={c.id}
                  onClick={() => addCompany(c)}
                  className="w-full text-left px-4 py-2 hover:bg-crt-panel border-b border-crt-border last:border-b-0"
                >
                  <span className="font-mono text-sm text-crt-green-bright">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected.length === 0 ? (
          <p className="font-mono text-sm text-crt-green-dim">
            No companies selected. Search above to add some.
          </p>
        ) : (
          <div className="border-2 border-crt-border bg-crt-panel">
            <div className="grid grid-cols-[1fr_5.5rem_3rem] sm:grid-cols-[1fr_8rem_4rem] gap-2 px-3 sm:px-4 py-2 border-b-2 border-crt-border font-mono text-xs text-crt-green-dim">
              <span>COMPANY</span>
              <span className="text-right">CAKE RATIO</span>
              <span className="text-right">&nbsp;</span>
            </div>
            {selected
              .slice()
              .sort((a, b) => b.ratio - a.ratio)
              .map((c) => {
                const isMax = c.ratio === maxRatio;
                return (
                  <div
                    key={c.id}
                    className={`grid grid-cols-[1fr_5.5rem_3rem] sm:grid-cols-[1fr_8rem_4rem] gap-2 px-3 sm:px-4 py-3 border-b border-crt-border last:border-b-0 items-center ${
                      isMax ? "bg-crt-black" : ""
                    }`}
                  >
                    <div>
                      <p className="font-mono text-sm text-crt-green-bright">
                        {c.name}
                      </p>
                      <p className="font-mono text-xs text-crt-green-dim">
                        CEO {formatCurrencyFull(c.ceoPay)} / Median{" "}
                        {formatCurrencyFull(c.medianWorkerPay)}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-sm text-right ${
                        isMax
                          ? "text-cake-gold-bright gold-glow"
                          : "text-crt-green-bright"
                      }`}
                    >
                      {formatRatio(c.ratio)}
                    </span>
                    <button
                      onClick={() => removeCompany(c.id)}
                      className="text-right font-mono text-xs text-crt-green-dim hover:text-status-apocalyptic"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </main>
    </>
  );
}
