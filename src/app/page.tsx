import SearchBox from "@/components/SearchBox";
import FactTerminal from "@/components/FactTerminal";
import SiteHeader from "@/components/SiteHeader";
import BootGate from "@/components/BootGate";
import { CrownGlyph } from "@/components/PixelGlyphs";
import Link from "next/link";
import { companies } from "@/data/companies";

const EXAMPLE_SLUGS = ["walmart", "disney", "apple", "amazon", "starbucks"];

export default function HomePage() {
  const examples = EXAMPLE_SLUGS.map((slug) =>
    companies.find((c) => c.slug === slug)
  ).filter(Boolean);

  return (
    <BootGate>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <section className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <CrownGlyph size={48} className="text-cake-gold-bright gold-glow" />
          </div>
          <h1 className="font-pixel text-2xl sm:text-4xl text-cake-gold-bright gold-glow leading-relaxed mb-4">
            LET THEM
            <br />
            EAT CAKE
          </h1>
          <p className="font-mono text-crt-green-bright text-base sm:text-lg mb-1">
            CORPORATE COMPENSATION DATABASE
          </p>
          <p className="font-mono text-crt-green-dim text-sm sm:text-base">
            How many workers equal one CEO?
          </p>
        </section>

        <section className="mb-12">
          <SearchBox autoFocus />
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {examples.map(
              (c) =>
                c && (
                  <Link
                    key={c.id}
                    href={`/company/${c.slug}`}
                    className="font-mono text-xs sm:text-sm px-3 py-1 border border-crt-border text-crt-green-dim hover:text-crt-green-bright hover:border-crt-green transition-colors"
                  >
                    {c.name}
                  </Link>
                )
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link
            href="/rankings"
            className="border-2 border-crt-border bg-crt-panel p-5 hover:border-crt-green transition-colors group"
          >
            <p className="font-pixel text-[10px] text-cake-gold-bright mb-2">
              RANKINGS
            </p>
            <p className="font-mono text-sm text-crt-green-dim group-hover:text-crt-green-bright">
              View the highest and lowest pay ratios on record.
            </p>
          </Link>
          <Link
            href="/compare"
            className="border-2 border-crt-border bg-crt-panel p-5 hover:border-crt-green transition-colors group"
          >
            <p className="font-pixel text-[10px] text-cake-gold-bright mb-2">
              COMPARE
            </p>
            <p className="font-mono text-sm text-crt-green-dim group-hover:text-crt-green-bright">
              Put companies side by side.
            </p>
          </Link>
          <Link
            href="/calculator"
            className="border-2 border-crt-border bg-crt-panel p-5 hover:border-crt-green transition-colors group"
          >
            <p className="font-pixel text-[10px] text-cake-gold-bright mb-2">
              CAKE CALCULATOR
            </p>
            <p className="font-mono text-sm text-crt-green-dim group-hover:text-crt-green-bright">
              Enter your salary. See how long you&apos;d need to work.
            </p>
          </Link>
        </section>

        <section className="max-w-md mx-auto">
          <FactTerminal />
        </section>

        <footer className="text-center mt-16 font-mono text-xs text-crt-green-dim">
          <p>
            DATA SOURCED FROM SEC PROXY FILINGS &amp; AFL-CIO EXECUTIVE
            PAYWATCH. SOME RECORDS ARE ILLUSTRATIVE ESTIMATES — SEE EACH
            COMPANY PAGE FOR SOURCING.
          </p>
        </footer>
      </main>
    </BootGate>
  );
}
