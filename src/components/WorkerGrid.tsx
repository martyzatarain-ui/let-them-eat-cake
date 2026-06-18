import { WorkerGlyph, CrownGlyph } from "./PixelGlyphs";

interface WorkerGridProps {
  ratio: number;
  companyName: string;
}

// Caps the literal rendered grid so the DOM doesn't choke on a 6,666-cell
// grid — beyond this we render a representative sample and say so plainly,
// which is more honest than silently truncating.
const MAX_RENDERED = 400;

export default function WorkerGrid({ ratio, companyName }: WorkerGridProps) {
  const renderCount = Math.min(ratio, MAX_RENDERED);
  const truncated = ratio > MAX_RENDERED;
  const cols = renderCount > 100 ? 25 : renderCount > 36 ? 12 : 8;

  return (
    <div className="border-2 border-crt-border bg-crt-panel p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="text-xs sm:text-sm text-crt-green-dim font-mono">
          [ WORKFORCE EQUIVALENCY GRID ]
        </span>
        <span className="text-xs sm:text-sm text-crt-green-dim font-mono">
          {companyName.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4 text-cake-gold-bright">
        <CrownGlyph size={28} className="gold-glow" />
        <span className="font-pixel text-[10px] sm:text-xs gold-glow">
          1 CEO
        </span>
        <span className="font-mono text-crt-green text-lg sm:text-xl px-2">
          =
        </span>
        <span className="font-pixel text-[10px] sm:text-xs phosphor-text text-crt-green">
          {ratio.toLocaleString("en-US")} WORKER{ratio !== 1 ? "S" : ""}
        </span>
      </div>

      <div
        className="grid gap-[3px] sm:gap-1 justify-center mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: cols * 20,
        }}
        role="img"
        aria-label={`Visualization showing 1 CEO equals ${ratio} workers at ${companyName}`}
      >
        {Array.from({ length: renderCount }).map((_, i) => (
          <WorkerGlyph
            key={i}
            size={14}
            className="text-crt-green-dim hover:text-crt-green-bright transition-colors"
          />
        ))}
      </div>

      {truncated && (
        <p className="text-center text-[10px] sm:text-xs text-crt-green-dim mt-4 font-mono">
          GRID CAPPED AT {MAX_RENDERED} UNITS FOR DISPLAY — ACTUAL RATIO IS{" "}
          {ratio.toLocaleString("en-US")} WORKERS PER CEO
        </p>
      )}
    </div>
  );
}
