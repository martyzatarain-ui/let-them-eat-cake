// Hand-built 8x8 pixel-grid glyphs rendered as SVG, so the "worker vs CEO"
// visualization reads as actual pixel art on a CRT grid rather than
// OS-dependent emoji. Each glyph is a binary 8x8 (or 8x10) bitmap scaled up.

interface GlyphProps {
  size?: number;
  className?: string;
}

// 1 = filled pixel, 0 = empty. 8 wide x 9 tall.
const WORKER_BITMAP = [
  "00011000",
  "00011000",
  "00111100",
  "01111110",
  "01111110",
  "00111100",
  "00100100",
  "00100100",
  "01100110",
];

// Crown glyph, 8 wide x 7 tall. Three points across the top, tapered body,
// solid base band.
const CROWN_BITMAP = [
  "11011011",
  "11111111",
  "01111110",
  "01111110",
  "01111110",
  "11111111",
  "11111111",
];

function PixelGlyph({
  bitmap,
  size = 16,
  className = "",
  color = "currentColor",
}: {
  bitmap: string[];
  size?: number;
  className?: string;
  color?: string;
}) {
  const cols = bitmap[0].length;
  const rows = bitmap.length;
  const cell = size / Math.max(cols, rows);

  return (
    <svg
      width={cols * cell}
      height={rows * cell}
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      className={`pixelated ${className}`}
      aria-hidden="true"
    >
      {bitmap.map((row, y) =>
        row.split("").map((bit, x) =>
          bit === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function WorkerGlyph({ size = 16, className = "" }: GlyphProps) {
  return <PixelGlyph bitmap={WORKER_BITMAP} size={size} className={className} />;
}

export function CrownGlyph({ size = 16, className = "" }: GlyphProps) {
  return <PixelGlyph bitmap={CROWN_BITMAP} size={size} className={className} />;
}
