// Core domain logic for LET THEM EAT CAKE.
//
// Per product direction: the underlying numbers are reported with zero
// editorializing — "CEO earned $X. Median employee earned $Y. Ratio: Z:1."
// All commentary lives in the classification LABELS, not in the data itself.

export interface CakeRank {
  label: string;
  shortLabel: string;
  minRatio: number;
  colorClass: string; // tailwind text color class
  description: string;
}

// "Cake Ratio™" tiers — satirical monarchy framing, ordered ascending.
export const CAKE_RANKS: CakeRank[] = [
  {
    label: "LOCAL BAKERY",
    shortLabel: "Bakery",
    minRatio: 0,
    colorClass: "text-status-low",
    description: "A modest gap. The CEO and the median worker are, relatively speaking, eating from the same table.",
  },
  {
    label: "MERCHANT",
    shortLabel: "Merchant",
    minRatio: 25,
    colorClass: "text-status-low",
    description: "Comfortable, not courtly. The kind of gap a successful shopkeeper might command.",
  },
  {
    label: "NOBLE",
    shortLabel: "Noble",
    minRatio: 100,
    colorClass: "text-status-moderate",
    description: "Minor nobility. The CEO has a country house. The median worker has heard of country houses.",
  },
  {
    label: "BARON",
    shortLabel: "Baron",
    minRatio: 250,
    colorClass: "text-status-moderate",
    description: "A landholding gap. Title, staff, and a seat near the front of the cathedral.",
  },
  {
    label: "DUKE",
    shortLabel: "Duke",
    minRatio: 500,
    colorClass: "text-status-high",
    description: "High nobility. The gap between this CEO and the median worker now requires its own coat of arms.",
  },
  {
    label: "ROYALTY",
    shortLabel: "Royalty",
    minRatio: 1000,
    colorClass: "text-status-extreme",
    description: "The crown itself. At this ratio, 'compensation' starts to resemble 'tribute.'",
  },
  {
    label: "LET THEM EAT CAKE",
    shortLabel: "Apocalyptic",
    minRatio: 2000,
    colorClass: "text-status-apocalyptic",
    description: "The historical reference point. A gap this size is the namesake of this entire database.",
  },
];

export function getCakeRank(ratio: number): CakeRank {
  let result = CAKE_RANKS[0];
  for (const rank of CAKE_RANKS) {
    if (ratio >= rank.minRatio) {
      result = rank;
    }
  }
  return result;
}

// Legacy/simple severity tiers used for compact badges (LOW / MODERATE / HIGH / EXTREME / APOCALYPTIC)
export function getSeverity(ratio: number): {
  label: string;
  colorClass: string;
} {
  if (ratio < 50) return { label: "LOW", colorClass: "text-status-low" };
  if (ratio < 150) return { label: "MODERATE", colorClass: "text-status-moderate" };
  if (ratio < 500) return { label: "HIGH", colorClass: "text-status-high" };
  if (ratio < 1500) return { label: "EXTREME", colorClass: "text-status-extreme" };
  return { label: "APOCALYPTIC", colorClass: "text-status-apocalyptic" };
}

export interface YearsToEarnResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

// "How long would you have to work?" — the viral calculator.
// Computes how many years/months/days at `yourAnnualPay` it would take
// to earn `ceoPay`.
export function calculateYearsToEarn(
  yourAnnualPay: number,
  ceoPay: number
): YearsToEarnResult {
  if (yourAnnualPay <= 0) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }
  const totalYears = ceoPay / yourAnnualPay;
  const totalDays = Math.round(totalYears * 365.25);
  const years = Math.floor(totalDays / 365.25);
  const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  const days = Math.round(remainingDaysAfterYears - months * 30.44);
  return { years, months, days, totalDays };
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  return `$${value.toLocaleString("en-US")}`;
}

export function formatCurrencyFull(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatRatio(ratio: number): string {
  return `${ratio.toLocaleString("en-US")}:1`;
}
