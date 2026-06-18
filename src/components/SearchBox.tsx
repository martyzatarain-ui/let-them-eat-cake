"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { searchCompanies } from "@/data/companies";

export default function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0 ? searchCompanies(query).slice(0, 8) : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToCompany(slug: string) {
    setShowResults(false);
    setQuery("");
    router.push(`/company/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      goToCompany(results[0].slug);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex items-stretch border-2 border-crt-green bg-crt-black shadow-crt">
          <span className="flex items-center px-3 text-crt-green-bright font-mono text-lg sm:text-xl select-none">
            &gt;
          </span>
          <input
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            type="text"
            placeholder="SEARCH A PUBLIC COMPANY..."
            className="flex-1 bg-transparent text-crt-green-bright placeholder:text-crt-green-dim font-mono text-base sm:text-lg py-3 px-1 outline-none tracking-wide"
          />
          <button
            type="submit"
            className="px-4 sm:px-6 bg-crt-green-dim text-crt-black font-pixel text-[10px] sm:text-xs hover:bg-crt-green transition-colors"
          >
            FIND
          </button>
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-20 w-full mt-1 border-2 border-crt-green bg-crt-black shadow-crt max-h-72 overflow-y-auto">
          {results.map((c) => (
            <button
              key={c.id}
              onClick={() => goToCompany(c.slug)}
              className="w-full text-left px-4 py-2 hover:bg-crt-panel border-b border-crt-border last:border-b-0 flex items-center justify-between gap-3 group"
            >
              <span className="font-mono text-crt-green-bright text-sm sm:text-base">
                {c.name}{" "}
                <span className="text-crt-green-dim">[{c.ticker}]</span>
              </span>
              <span className="font-mono text-xs sm:text-sm text-cake-gold-bright whitespace-nowrap">
                {c.ratio.toLocaleString("en-US")}:1
              </span>
            </button>
          ))}
        </div>
      )}

      {showResults && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute z-20 w-full mt-1 border-2 border-crt-green bg-crt-black shadow-crt px-4 py-3">
          <span className="font-mono text-sm text-crt-green-dim">
            NO RECORDS FOUND FOR &quot;{query.toUpperCase()}&quot;
          </span>
        </div>
      )}
    </div>
  );
}
