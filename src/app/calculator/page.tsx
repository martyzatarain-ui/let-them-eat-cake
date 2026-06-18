"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { searchCompanies, companies } from "@/data/companies";
import { calculateYearsToEarn, formatCurrencyFull } from "@/lib/cake-ratio";
import Link from "next/link";

export default function CalculatorPage() {
  const [salary, setSalary] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const parsedSalary = parseFloat(salary.replace(/[^0-9.]/g, ""));
  const hasValidSalary = !isNaN(parsedSalary) && parsedSalary > 0;
  const results = query.trim().length > 0 ? searchCompanies(query).slice(0, 6) : [];
  const selected = companies.find((c) => c.id === selectedId);

  const result =
    hasValidSalary && selected
      ? calculateYearsToEarn(parsedSalary, selected.ceoPay)
      : null;

  return (
    <>
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="font-pixel text-lg sm:text-2xl text-cake-gold-bright gold-glow mb-2 leading-relaxed">
          CAKE CALCULATOR
        </h1>
        <p className="font-mono text-sm text-crt-green-dim mb-8">
          Enter your salary, pick a company, and find out how long you would
          need to work to earn what its CEO earned in a single year.
        </p>

        <div className="border-2 border-crt-border bg-crt-panel p-4 sm:p-6 space-y-6">
          <div>
            <label className="font-mono text-xs text-crt-green-dim block mb-2">
              STEP 1 — YOUR ANNUAL SALARY
            </label>
            <div className="flex items-stretch border-2 border-crt-green bg-crt-black">
              <span className="flex items-center px-3 text-crt-green-bright font-mono text-lg select-none">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="70000"
                className="flex-1 bg-transparent text-crt-green-bright placeholder:text-crt-green-dim font-mono text-base py-3 px-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-crt-green-dim block mb-2">
              STEP 2 — SEARCH A COMPANY
            </label>
            <div className="flex items-stretch border-2 border-crt-green bg-crt-black">
              <span className="flex items-center px-3 text-crt-green-bright font-mono text-lg select-none">
                &gt;
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedId(null);
                }}
                placeholder="e.g. Starbucks"
                className="flex-1 bg-transparent text-crt-green-bright placeholder:text-crt-green-dim font-mono text-base py-3 px-1 outline-none"
              />
            </div>
            {results.length > 0 && !selected && (
              <div className="border-2 border-crt-green border-t-0 bg-crt-black max-h-56 overflow-y-auto">
                {results.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedId(c.id);
                      setQuery(c.name);
                    }}
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
        </div>

        {result && selected && (
          <div className="border-2 border-cake-gold bg-crt-panel p-6 mt-6 text-center">
            <p className="font-mono text-xs text-crt-green-dim mb-3">
              AT {formatCurrencyFull(parsedSalary)}/YEAR, TO MATCH{" "}
              {selected.ceoName.toUpperCase()}&apos;S {selected.fiscalYear}{" "}
              PAY AT {selected.name.toUpperCase()}, YOU WOULD NEED TO WORK:
            </p>
            <p className="font-pixel text-2xl sm:text-4xl text-cake-gold-bright gold-glow leading-relaxed">
              {result.years.toLocaleString("en-US")}
            </p>
            <p className="font-pixel text-xs sm:text-sm text-cake-gold-bright mb-2">
              YEARS
            </p>
            <p className="font-mono text-sm text-crt-green-dim">
              {result.months} months, {result.days} days
            </p>
            <Link
              href={`/company/${selected.slug}`}
              className="inline-block mt-4 font-mono text-xs text-crt-green-dim hover:text-crt-green-bright underline"
            >
              VIEW FULL RECORD FOR {selected.name.toUpperCase()}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
