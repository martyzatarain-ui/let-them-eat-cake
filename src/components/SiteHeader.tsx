import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b-2 border-crt-border bg-crt-black sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-pixel text-[11px] sm:text-sm text-cake-gold-bright gold-glow group-hover:text-cake-gold transition-colors">
            LET THEM EAT CAKE
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 font-mono text-sm text-crt-green-dim">
          <Link href="/rankings" className="hover:text-crt-green-bright transition-colors">
            RANKINGS
          </Link>
          <Link href="/compare" className="hover:text-crt-green-bright transition-colors">
            COMPARE
          </Link>
          <Link href="/calculator" className="hover:text-crt-green-bright transition-colors">
            CALCULATOR
          </Link>
        </nav>
      </div>
    </header>
  );
}
