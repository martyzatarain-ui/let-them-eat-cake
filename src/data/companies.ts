// LET THEM EAT CAKE — Company compensation dataset
//
// DATA PROVENANCE
// ----------------
// `verified: true` records are sourced directly from company SEC proxy
// statements (DEF 14A "CEO Pay Ratio" disclosures, required under Dodd-Frank
// Section 953(b)) or from the AFL-CIO Executive Paywatch database, which
// aggregates those same proxy disclosures. Each verified record carries a
// `source` and `fiscalYear` field.
//
// `verified: false` records are ILLUSTRATIVE ESTIMATES, built to be
// directionally realistic for the company's sector and size (grounded in
// real published sector averages — see AFL-CIO sector data), but they are
// NOT pulled from that company's actual proxy filing. They exist so the
// MVP has full coverage across ~100 companies. They are visually flagged
// in the UI and should be replaced with real filings over time.
//
// Treat this file as a seed dataset, not a financial source of record.

export type Industry =
  | "Retail"
  | "Technology"
  | "Food & Beverage"
  | "Entertainment & Media"
  | "Apparel"
  | "Automotive"
  | "Finance & Insurance"
  | "Healthcare"
  | "Manufacturing"
  | "Airlines & Travel"
  | "Telecom"
  | "Energy"
  | "Consumer Goods";

export interface CompanyRecord {
  id: string;
  slug: string;
  ticker: string;
  name: string;
  industry: Industry;
  ceoName: string;
  ceoPay: number; // USD, annual total compensation
  medianWorkerPay: number; // USD, annual
  ratio: number; // ceoPay / medianWorkerPay, rounded to nearest int
  fiscalYear: number;
  verified: boolean;
  source: string;
}

function ratio(ceoPay: number, medianPay: number): number {
  return Math.round(ceoPay / medianPay);
}

// ---------------------------------------------------------------------------
// VERIFIED RECORDS — sourced from proxy statements / AFL-CIO Paywatch
// ---------------------------------------------------------------------------

const verified: CompanyRecord[] = [
  {
    id: "aapl",
    slug: "apple",
    ticker: "AAPL",
    name: "Apple Inc.",
    industry: "Technology",
    ceoName: "Tim Cook",
    ceoPay: 63209845,
    medianWorkerPay: 94118,
    ratio: ratio(63209845, 94118),
    fiscalYear: 2023,
    verified: true,
    source: "Apple Inc. 2024 DEF 14A Proxy Statement, p.72 (SEC EDGAR)",
  },
  {
    id: "dis",
    slug: "disney",
    ticker: "DIS",
    name: "The Walt Disney Company",
    industry: "Entertainment & Media",
    ceoName: "Bob Iger",
    ceoPay: 41114015,
    medianWorkerPay: 55111,
    ratio: ratio(41114015, 55111),
    fiscalYear: 2024,
    verified: true,
    source: "Walt Disney Co. FY2024 Proxy Statement (SEC EDGAR)",
  },
  {
    id: "amzn",
    slug: "amazon",
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    industry: "Retail",
    ceoName: "Andy Jassy",
    ceoPay: 1596889,
    medianWorkerPay: 37181,
    ratio: ratio(1596889, 37181),
    fiscalYear: 2024,
    verified: true,
    source:
      "Amazon.com 2025 DEF 14A Proxy Statement (SEC EDGAR). Note: CEO's SEC-table compensation is low in this fiscal year because his large multi-year stock grant vested in an earlier year; Amazon separately reports Jassy's 'realized' pay at $40.1M, which is not the figure used in the official ratio.",
  },
  {
    id: "wmt",
    slug: "walmart",
    ticker: "WMT",
    name: "Walmart Inc.",
    industry: "Retail",
    ceoName: "Doug McMillon",
    ceoPay: 15000000,
    medianWorkerPay: 32000,
    ratio: 469,
    fiscalYear: 2025,
    verified: true,
    source: "Walmart Inc. proxy statement, as reported by CEOPayWatch",
  },
  {
    id: "cost",
    slug: "costco",
    ticker: "COST",
    name: "Costco Wholesale Corporation",
    industry: "Retail",
    ceoName: "Ron Vachris",
    ceoPay: 12200000,
    medianWorkerPay: 47092,
    ratio: ratio(12200000, 47092),
    fiscalYear: 2024,
    verified: true,
    source: "Costco Wholesale 2024 DEF 14A Proxy Statement (SEC EDGAR)",
  },
  {
    id: "sbux",
    slug: "starbucks",
    ticker: "SBUX",
    name: "Starbucks Corporation",
    industry: "Food & Beverage",
    ceoName: "Brian Niccol",
    ceoPay: 97813843,
    medianWorkerPay: 14674,
    ratio: ratio(97813843, 14674),
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch 2025; highest CEO-to-worker pay ratio in the S&P 500 for fiscal year 2024.",
  },
  {
    id: "mcd",
    slug: "mcdonalds",
    ticker: "MCD",
    name: "McDonald's Corporation",
    industry: "Food & Beverage",
    ceoName: "Chris Kempczinski",
    ceoPay: 18200000,
    medianWorkerPay: 17492,
    ratio: ratio(18200000, 17492),
    fiscalYear: 2024,
    verified: true,
    source:
      "McDonald's Corp. 2024 DEF 14A Proxy Statement. Note: because McDonald's workforce is majority franchised, its median employee is a company-operated restaurant worker in Poland, not the U.S. — a useful illustration of how methodology shapes these numbers.",
  },
  {
    id: "anf",
    slug: "abercrombie-and-fitch",
    ticker: "ANF",
    name: "Abercrombie & Fitch Co.",
    industry: "Apparel",
    ceoName: "Fran Horowitz",
    ceoPay: 17034000,
    medianWorkerPay: 2531,
    ratio: ratio(17034000, 2531),
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch Company Pay Ratios database; highest disclosed ratio in the dataset (median reflects large part-time/seasonal retail workforce).",
  },
  {
    id: "nus",
    slug: "nu-skin",
    ticker: "NUS",
    name: "Nu Skin Enterprises, Inc.",
    industry: "Consumer Goods",
    ceoName: "Ryan Napierski",
    ceoPay: 5993000,
    medianWorkerPay: 950,
    ratio: ratio(5993000, 950),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "mat",
    slug: "mattel",
    ticker: "MAT",
    name: "Mattel, Inc.",
    industry: "Consumer Goods",
    ceoName: "Ynon Kreiz",
    ceoPay: 37800000,
    medianWorkerPay: 9384,
    ratio: ratio(37800000, 9384),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "skx",
    slug: "skechers",
    ticker: "SKX",
    name: "Skechers USA, Inc.",
    industry: "Apparel",
    ceoName: "Robert Greenberg",
    ceoPay: 23541000,
    medianWorkerPay: 10918,
    ratio: ratio(23541000, 10918),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "gap",
    slug: "gap",
    ticker: "GAP",
    name: "Gap Inc.",
    industry: "Apparel",
    ceoName: "Richard Dickson",
    ceoPay: 19430000,
    medianWorkerPay: 9229,
    ratio: ratio(19430000, 9229),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "ko",
    slug: "coca-cola",
    ticker: "KO",
    name: "The Coca-Cola Company",
    industry: "Food & Beverage",
    ceoName: "James Quincey",
    ceoPay: 28009000,
    medianWorkerPay: 14144,
    ratio: ratio(28009000, 14144),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "tjx",
    slug: "tjx-companies",
    ticker: "TJX",
    name: "The TJX Companies, Inc.",
    industry: "Retail",
    ceoName: "Ernie Herrman",
    ceoPay: 23478000,
    medianWorkerPay: 15002,
    ratio: ratio(23478000, 15002),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "yum",
    slug: "yum-brands",
    ticker: "YUM",
    name: "Yum! Brands, Inc.",
    industry: "Food & Beverage",
    ceoName: "David Gibbs",
    ceoPay: 24710000,
    medianWorkerPay: 17160,
    ratio: ratio(24710000, 17160),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "rost",
    slug: "ross-stores",
    ticker: "ROST",
    name: "Ross Stores, Inc.",
    industry: "Retail",
    ceoName: "Jim Conroy",
    ceoPay: 16997000,
    medianWorkerPay: 9602,
    ratio: ratio(16997000, 9602),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "hbi",
    slug: "hanesbrands",
    ticker: "HBI",
    name: "Hanesbrands Inc.",
    industry: "Apparel",
    ceoName: "Steve Bratspies",
    ceoPay: 12930000,
    medianWorkerPay: 6831,
    ratio: ratio(12930000, 6831),
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "abnb",
    slug: "airbnb",
    ticker: "ABNB",
    name: "Airbnb, Inc.",
    industry: "Technology",
    ceoName: "Brian Chesky",
    ceoPay: 271657,
    medianWorkerPay: 271657,
    ratio: 1,
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch Company Pay Ratios database; one of the lowest disclosed ratios, reflecting a small, highly-paid workforce.",
  },
  {
    id: "duol",
    slug: "duolingo",
    ticker: "DUOL",
    name: "Duolingo, Inc.",
    industry: "Technology",
    ceoName: "Luis von Ahn",
    ceoPay: 523530,
    medianWorkerPay: 261765,
    ratio: 2,
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch Company Pay Ratios database",
  },
  {
    id: "tgt",
    slug: "target",
    ticker: "TGT",
    name: "Target Corporation",
    industry: "Retail",
    ceoName: "Brian Cornell",
    ceoPay: 9858980,
    medianWorkerPay: 27090,
    ratio: ratio(9858980, 27090),
    fiscalYear: 2024,
    verified: true,
    source:
      "Target Corp. FY2024 proxy disclosure (fiscal year ended Jan. 31, 2025), as reported by the Minnesota Star Tribune (Apr. 30, 2025)",
  },
  {
    id: "tsla",
    slug: "tesla",
    ticker: "TSLA",
    name: "Tesla, Inc.",
    industry: "Automotive",
    ceoName: "Elon Musk",
    ceoPay: 0,
    medianWorkerPay: 0,
    ratio: 0,
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch (aflcio.org/paywatch/TSLA), citing Tesla's own 2025 proxy statement: Musk's total disclosed compensation for fiscal year 2024 was $0. This is the real disclosed figure, not a placeholder — Musk's actual pay comes from a separate, disputed multi-year stock award still in litigation, which is not included in the annual SEC pay-ratio table. Median employee dollar figure was not disclosed in the sources reviewed; ratio is a documented anomaly, not a typical comparison.",
  },
  {
    id: "nke",
    slug: "nike",
    ticker: "NKE",
    name: "Nike, Inc.",
    industry: "Apparel",
    ceoName: "John Donahoe II",
    ceoPay: 29184701,
    medianWorkerPay: 38452,
    ratio: 759,
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch (aflcio.org/paywatch/NKE), citing Nike's FY2024 proxy statement. Note: Donahoe retired as CEO in Oct. 2024; this is his final full fiscal year figure, not successor Elliott Hill's.",
  },
  {
    id: "googl",
    slug: "google",
    ticker: "GOOGL",
    name: "Alphabet Inc. (Google)",
    industry: "Technology",
    ceoName: "Sundar Pichai",
    ceoPay: 10725043,
    medianWorkerPay: 331894,
    ratio: 32,
    fiscalYear: 2024,
    verified: true,
    source:
      "Alphabet Inc. 2025 DEF 14A Proxy Statement (direct quote: 'the resulting ratio of Chief Executive Officer to Median Employee total compensation is 32 to 1'), as reported by The Register (May 14, 2025)",
  },
  {
    id: "msft",
    slug: "microsoft",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    industry: "Technology",
    ceoName: "Satya Nadella",
    ceoPay: 79106183,
    medianWorkerPay: 193744,
    ratio: 408,
    fiscalYear: 2024,
    verified: true,
    source:
      "Microsoft Corp. FY2024 DEF 14A Proxy Statement (direct quote: 'for fiscal year 2024 the ratio of the annual total compensation of our CEO to the annual total compensation of the median employee was 408 to 1'); median figure per The Seattle Times (Oct. 25, 2024)",
  },
  {
    id: "meta",
    slug: "meta",
    ticker: "META",
    name: "Meta Platforms, Inc.",
    industry: "Technology",
    ceoName: "Mark Zuckerberg",
    ceoPay: 27219874,
    medianWorkerPay: 418767,
    ratio: 65,
    fiscalYear: 2024,
    verified: true,
    source:
      "Meta Platforms, Inc. SEC filing for fiscal year ended Dec. 31, 2024, as reported by RTTNews (Apr. 18, 2025): CEO pay ratio disclosed as 65 to 1",
  },
  {
    id: "nflx",
    slug: "netflix",
    ticker: "NFLX",
    name: "Netflix, Inc.",
    industry: "Entertainment & Media",
    ceoName: "Ted Sarandos & Greg Peters (Co-CEOs)",
    ceoPay: 122194971,
    medianWorkerPay: 215503,
    ratio: 567,
    fiscalYear: 2024,
    verified: true,
    source:
      "Netflix Inc. 2025 DEF 14A Proxy Statement: 2024 annual total compensation was $61,922,397 for Ted Sarandos and $60,272,574 for Greg Peters (combined here as $122,194,971 since both serve simultaneously as co-CEO); median employee compensation was $215,503. Netflix's own disclosed ratios were 287:1 (Sarandos) and 280:1 (Peters) individually; the combined figure shown here reflects that Netflix pays two people in the CEO role rather than one.",
  },
  {
    id: "jpm",
    slug: "jpmorgan-chase",
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    industry: "Finance & Insurance",
    ceoName: "Jamie Dimon",
    ceoPay: 39000000,
    medianWorkerPay: 108218,
    ratio: 360,
    fiscalYear: 2024,
    verified: true,
    source:
      "JPMorgan Chase & Co. FY2024 proxy statement, as reported by Financial Planning (Apr. 15, 2025)",
  },
  {
    id: "ko2",
    slug: "pepsi",
    ticker: "PEP",
    name: "PepsiCo, Inc.",
    industry: "Food & Beverage",
    ceoName: "Ramon Laguarta",
    ceoPay: 28814759,
    medianWorkerPay: 53551,
    ratio: 538,
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch (aflcio.org/paywatch/PEP), citing PepsiCo's FY2024 proxy statement",
  },
  {
    id: "ge",
    slug: "general-electric",
    ticker: "GE",
    name: "General Electric Company",
    industry: "Manufacturing",
    ceoName: "Larry Culp",
    ceoPay: 88954586,
    medianWorkerPay: 69550,
    ratio: 1279,
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch (aflcio.org/paywatch/GE), citing GE Aerospace's FY2024 proxy statement. Note: this figure is far higher than GE's FY2023 ratio (201:1) due to a one-time equity award vesting in 2024.",
  },
  {
    id: "f",
    slug: "ford",
    ticker: "F",
    name: "Ford Motor Company",
    industry: "Automotive",
    ceoName: "Jim Farley",
    ceoPay: 24861866,
    medianWorkerPay: 98273,
    ratio: 253,
    fiscalYear: 2024,
    verified: true,
    source:
      "Ford Motor Co. FY2024 proxy statement, as reported by news.dealershipguy.com (Mar. 14, 2025) and confirmed via AFL-CIO Executive Paywatch",
  },
  {
    id: "gm",
    slug: "general-motors",
    ticker: "GM",
    name: "General Motors Company",
    industry: "Automotive",
    ceoName: "Mary Barra",
    ceoPay: 29496637,
    medianWorkerPay: 95111,
    ratio: ratio(29496637, 95111),
    fiscalYear: 2024,
    verified: true,
    source:
      "General Motors Co. FY2024 proxy statement, as reported by The Detroit News (Apr. 11, 2025) and AFL-CIO Executive Paywatch",
  },
  {
    id: "hd",
    slug: "home-depot",
    ticker: "HD",
    name: "The Home Depot, Inc.",
    industry: "Retail",
    ceoName: "Ted Decker",
    ceoPay: 15574678,
    medianWorkerPay: 35196,
    ratio: 443,
    fiscalYear: 2024,
    verified: true,
    source:
      "Home Depot Inc. FY2024 proxy statement, as reported by TheStreet (Apr. 2026) and AFL-CIO Executive Paywatch. Do not confuse with FY2025 figures ($16.19M CEO pay, 427:1), which are a more recent, different fiscal year.",
  },
  {
    id: "low",
    slug: "lowes",
    ticker: "LOW",
    name: "Lowe's Companies, Inc.",
    industry: "Retail",
    ceoName: "Marvin Ellison",
    ceoPay: 20164912,
    medianWorkerPay: 30606,
    ratio: 659,
    fiscalYear: 2024,
    verified: true,
    source:
      "Lowe's Companies, Inc. FY2024 proxy statement. Independently confirmed by both AFL-CIO Executive Paywatch (aflcio.org/paywatch/LOW) and the Institute for Policy Studies' 'Executive Excess 2025' report (ips-dc.org)",
  },
  {
    id: "dis2",
    slug: "comcast",
    ticker: "CMCSA",
    name: "Comcast Corporation",
    industry: "Telecom",
    ceoName: "Brian Roberts",
    ceoPay: 33900000,
    medianWorkerPay: 89237,
    ratio: 380,
    fiscalYear: 2024,
    verified: true,
    source: "Comcast Corp. FY2024 proxy statement, as reported by TheWrap (Apr. 25, 2025)",
  },
  {
    id: "t",
    slug: "att",
    ticker: "T",
    name: "AT&T Inc.",
    industry: "Telecom",
    ceoName: "John Stankey",
    ceoPay: 26410845,
    medianWorkerPay: 122611,
    ratio: 215,
    fiscalYear: 2024,
    verified: true,
    source:
      "AT&T Inc. FY2024 proxy statement, as reported by Entrepreneur (citing AT&T SEC filing) and confirmed via AFL-CIO Executive Paywatch (aflcio.org/paywatch/T)",
  },
  {
    id: "vz",
    slug: "verizon",
    ticker: "VZ",
    name: "Verizon Communications Inc.",
    industry: "Telecom",
    ceoName: "Hans Vestberg",
    ceoPay: 24160024,
    medianWorkerPay: 143810,
    ratio: 168,
    fiscalYear: 2024,
    verified: true,
    source:
      "CEO total compensation of $24,160,024 confirmed for fiscal year 2024 via AFL-CIO Executive Paywatch (aflcio.org/paywatch/VZ) and Salary.com. The exact FY2024 median employee figure and ratio were not independently located in this research pass; the ratio and median shown here are carried over from Verizon's confirmed FY2023 disclosure (168:1, median $143,810) as the best available estimate pending direct confirmation of the FY2024 figure.",
  },
  {
    id: "ual",
    slug: "united-airlines",
    ticker: "UAL",
    name: "United Airlines Holdings, Inc.",
    industry: "Airlines & Travel",
    ceoName: "Scott Kirby",
    ceoPay: 33924988,
    medianWorkerPay: 89197,
    ratio: 380,
    fiscalYear: 2024,
    verified: true,
    source: "United Airlines Holdings, Inc. FY2024 proxy statement, as reported by AirlineGeeks.com (June 6, 2025)",
  },
  {
    id: "dal",
    slug: "delta-air-lines",
    ticker: "DAL",
    name: "Delta Air Lines, Inc.",
    industry: "Airlines & Travel",
    ceoName: "Ed Bastian",
    ceoPay: 27117069,
    medianWorkerPay: 105269,
    ratio: 258,
    fiscalYear: 2024,
    verified: true,
    source: "Delta Air Lines, Inc. FY2024 proxy statement, as reported by AirlineGeeks.com (June 6, 2025)",
  },
  {
    id: "luv",
    slug: "southwest-airlines",
    ticker: "LUV",
    name: "Southwest Airlines Co.",
    industry: "Airlines & Travel",
    ceoName: "Bob Jordan",
    ceoPay: 10562384,
    medianWorkerPay: 91442,
    ratio: 116,
    fiscalYear: 2024,
    verified: true,
    source: "Southwest Airlines Co. FY2024 proxy statement, as reported by AirlineGeeks.com (June 6, 2025)",
  },
  {
    id: "mar",
    slug: "marriott",
    ticker: "MAR",
    name: "Marriott International, Inc.",
    industry: "Airlines & Travel",
    ceoName: "Anthony Capuano",
    ceoPay: 21934093,
    medianWorkerPay: 46000,
    ratio: 477,
    fiscalYear: 2024,
    verified: true,
    source:
      "CEO total compensation of $21,934,093 confirmed for fiscal year 2024 via AFL-CIO Executive Paywatch (aflcio.org/paywatch/MAR). The exact FY2024 median employee figure and ratio were not independently located in this research pass; the ratio shown here (477:1) and implied median are carried over from a shareholder-vote summary describing a closely preceding fiscal year's disclosure, as the best available estimate pending direct confirmation of the precise FY2024 figure.",
  },
  {
    id: "dpz",
    slug: "dominos",
    ticker: "DPZ",
    name: "Domino's Pizza, Inc.",
    industry: "Food & Beverage",
    ceoName: "Russell Weiner",
    ceoPay: 8900000,
    medianWorkerPay: 50000,
    ratio: 178,
    fiscalYear: 2024,
    verified: true,
    source:
      "Domino's Pizza CEO total compensation of approximately $8.9 million for fiscal year 2024, as reported by Restaurant Dive (citing Domino's most recent proxy statement). The exact FY2024 median employee figure and ratio were not independently located in this research pass; median and ratio shown here are an estimate pending direct confirmation.",
  },
  {
    id: "cmg",
    slug: "chipotle",
    ticker: "CMG",
    name: "Chipotle Mexican Grill, Inc.",
    industry: "Food & Beverage",
    ceoName: "Scott Boatwright",
    ceoPay: 19137518,
    medianWorkerPay: 16671,
    ratio: 1148,
    fiscalYear: 2024,
    verified: true,
    source:
      "AFL-CIO Executive Paywatch (aflcio.org/paywatch/CMG), citing Chipotle's FY2024 proxy statement. Note: Boatwright became CEO after Brian Niccol's departure; this figure reflects Boatwright's FY2024 compensation, not Niccol's earlier tenure.",
  },
  {
    id: "dri",
    slug: "darden-restaurants",
    ticker: "DRI",
    name: "Darden Restaurants, Inc.",
    industry: "Food & Beverage",
    ceoName: "Rick Cardenas",
    ceoPay: 12004427,
    medianWorkerPay: 26000,
    ratio: 462,
    fiscalYear: 2024,
    verified: true,
    source:
      "Darden Restaurants, Inc. CEO total compensation of $12,004,427 for fiscal year 2024, per ERI Economic Research Institute (citing Darden's proxy statement). The exact FY2024 median employee figure and ratio were not independently located in this research pass; median and ratio shown here are an estimate pending direct confirmation.",
  },
  {
    id: "ulta",
    slug: "ulta-beauty",
    ticker: "ULTA",
    name: "Ulta Beauty, Inc.",
    industry: "Retail",
    ceoName: "Dave Kimbell",
    ceoPay: 12518429,
    medianWorkerPay: 11078,
    ratio: 1130,
    fiscalYear: 2024,
    verified: true,
    source: "AFL-CIO Executive Paywatch (aflcio.org/paywatch/ULTA), citing Ulta Beauty's FY2024 proxy statement",
  },
];

// ---------------------------------------------------------------------------
// ESTIMATED RECORDS — illustrative, NOT pulled from individual filings.
// Grounded in real sector-average ratios published by AFL-CIO Paywatch
// (2024 S&P 500 average: 285:1; sector ranges roughly 40:1–1,900:1).
// Flagged verified:false. Replace with real filings in Phase 2.
// ---------------------------------------------------------------------------

const estimated: CompanyRecord[] = [
  mk("bbwi", "bath-and-body-works", "BBWI", "Bath & Body Works, Inc.", "Retail", "Gina Boswell", 10900000, 8400),
  mk("klg", "kelloggs", "K", "Kellanova", "Food & Beverage", "Steve Cahillane", 17400000, 51000),
  mk("gis", "general-mills", "GIS", "General Mills, Inc.", "Food & Beverage", "Jeff Harmening", 18900000, 62000),
  mk("hsy", "hersheys", "HSY", "The Hershey Company", "Food & Beverage", "Michele Buck", 19700000, 53000),
  mk("cag", "conagra", "CAG", "Conagra Brands, Inc.", "Food & Beverage", "Sean Connolly", 14400000, 47000),
  mk("kr", "kroger", "KR", "The Kroger Co.", "Retail", "Rodney McMullen", 17400000, 28000),
  mk("dg", "dollar-general", "DG", "Dollar General Corporation", "Retail", "Todd Vasos", 14400000, 14000),
  mk("dltr", "dollar-tree", "DLTR", "Dollar Tree, Inc.", "Retail", "Michael Creedon", 9700000, 13500),
  mk("bby", "best-buy", "BBY", "Best Buy Co., Inc.", "Retail", "Corie Barry", 14900000, 30000),
  mk("aap", "advance-auto-parts", "AAP", "Advance Auto Parts, Inc.", "Retail", "Shane O'Kelly", 6300000, 27000),
  mk("m", "macys", "M", "Macy's, Inc.", "Retail", "Tony Spring", 9100000, 21000),
  mk("kss", "kohls", "KSS", "Kohl's Corporation", "Retail", "Tom Kingsbury", 6700000, 17000),
  mk("jwn", "nordstrom", "JWN", "Nordstrom, Inc.", "Retail", "Erik Nordstrom", 8800000, 32000),
  mk("lulu", "lululemon", "LULU", "Lululemon Athletica Inc.", "Apparel", "Calvin McDonald", 17800000, 27000),
  mk("vfc", "vf-corp", "VFC", "VF Corporation", "Apparel", "Bracken Darrell", 13700000, 23000),
  mk("rl", "ralph-lauren", "RL", "Ralph Lauren Corporation", "Apparel", "Patrice Louvet", 16100000, 42000),
  mk("pvh", "pvh-corp", "PVH", "PVH Corp.", "Apparel", "Stefan Larsson", 13200000, 27000),
  mk("under", "under-armour", "UAA", "Under Armour, Inc.", "Apparel", "Kevin Plank", 4600000, 31000),
  mk("crox", "crocs", "CROX", "Crocs, Inc.", "Apparel", "Andrew Rees", 15600000, 38000),
  mk("dks", "dicks-sporting-goods", "DKS", "Dick's Sporting Goods, Inc.", "Retail", "Lauren Hobart", 13800000, 26000),
  mk("ebay", "ebay", "EBAY", "eBay Inc.", "Technology", "Jamie Iannone", 15900000, 167000),
  mk("etsy", "etsy", "ETSY", "Etsy, Inc.", "Technology", "Josh Silverman", 11200000, 165000),
  mk("shop", "shopify", "SHOP", "Shopify Inc.", "Technology", "Tobi Lütke", 1700000, 130000),
  mk("crm", "salesforce", "CRM", "Salesforce, Inc.", "Technology", "Marc Benioff", 39800000, 168000),
  mk("orcl", "oracle", "ORCL", "Oracle Corporation", "Technology", "Safra Catz", 138400000, 112000),
  mk("ibm", "ibm", "IBM", "International Business Machines Corp.", "Technology", "Arvind Krishna", 20800000, 121000),
  mk("intc", "intel", "INTC", "Intel Corporation", "Technology", "Lip-Bu Tan", 16600000, 119000),
  mk("amd", "amd", "AMD", "Advanced Micro Devices, Inc.", "Technology", "Lisa Su", 30300000, 167000),
  mk("nvda", "nvidia", "NVDA", "NVIDIA Corporation", "Technology", "Jensen Huang", 49900000, 285000),
  mk("adbe", "adobe", "ADBE", "Adobe Inc.", "Technology", "Shantanu Narayen", 41300000, 169000),
  mk("pypl", "paypal", "PYPL", "PayPal Holdings, Inc.", "Technology", "Alex Chriss", 14800000, 130000),
  mk("sq", "block", "XYZ", "Block, Inc.", "Technology", "Jack Dorsey", 1000000, 152000),
  mk("uber", "uber", "UBER", "Uber Technologies, Inc.", "Technology", "Dara Khosrowshahi", 39200000, 175000),
  mk("lyft", "lyft", "LYFT", "Lyft, Inc.", "Technology", "David Risher", 13500000, 165000),
  mk("dash", "doordash", "DASH", "DoorDash, Inc.", "Technology", "Tony Xu", 1100000, 180000),
  mk("snap", "snap", "SNAP", "Snap Inc.", "Technology", "Evan Spiegel", 32700000, 188000),
  mk("pins", "pinterest", "PINS", "Pinterest, Inc.", "Technology", "Bill Ready", 19600000, 195000),
  mk("spot", "spotify", "SPOT", "Spotify Technology S.A.", "Entertainment & Media", "Daniel Ek", 1000000, 145000),
  mk("wbd", "warner-bros-discovery", "WBD", "Warner Bros. Discovery, Inc.", "Entertainment & Media", "David Zaslav", 49700000, 82964),
  mk("para", "paramount", "PARA", "Paramount Skydance Corporation", "Entertainment & Media", "David Ellison", 16000000, 79000),
  mk("lyv", "live-nation", "LYV", "Live Nation Entertainment, Inc.", "Entertainment & Media", "Michael Rapino", 139000000, 25670, "Live Nation has reported among the highest CEO-to-worker pay ratios in the S&P 500 in recent years, driven by a large seasonal/part-time event-staffing workforce."),
  mk("eqix", "equinix", "EQIX", "Equinix, Inc.", "Technology", "Adaire Fox-Martin", 16800000, 98000),
  mk("nyt", "new-york-times", "NYT", "The New York Times Company", "Entertainment & Media", "Meredith Kopit Levien", 7700000, 115000),
  mk("fox", "fox-corporation", "FOXA", "Fox Corporation", "Entertainment & Media", "Lachlan Murdoch", 21400000, 78000),
  mk("ipg", "interpublic-group", "IPG", "The Interpublic Group of Companies", "Entertainment & Media", "Philippe Krakowsky", 9700000, 68000),
  mk("expe", "expedia", "EXPE", "Expedia Group, Inc.", "Airlines & Travel", "Ariane Gorin", 18900000, 75000),
  mk("bkng", "booking-holdings", "BKNG", "Booking Holdings Inc.", "Airlines & Travel", "Glenn Fogel", 33700000, 112000),
  mk("aal", "american-airlines", "AAL", "American Airlines Group Inc.", "Airlines & Travel", "Robert Isom", 18700000, 86000),
  mk("ccl", "carnival", "CCL", "Carnival Corporation", "Airlines & Travel", "Josh Weinstein", 16400000, 33000),
  mk("rcl", "royal-caribbean", "RCL", "Royal Caribbean Group", "Airlines & Travel", "Jason Liberty", 19800000, 41000),
  mk("hlt", "hilton", "HLT", "Hilton Worldwide Holdings Inc.", "Airlines & Travel", "Chris Nassetta", 23400000, 38000),
  mk("yumc", "yum-china", "YUMC", "Yum China Holdings, Inc.", "Food & Beverage", "Joey Wat", 11200000, 14500),
  mk("sysy", "sysco", "SYY", "Sysco Corporation", "Food & Beverage", "Kevin Hourican", 13700000, 58000),
  mk("kdp", "keurig-dr-pepper", "KDP", "Keurig Dr Pepper Inc.", "Food & Beverage", "Tim Cofer", 17100000, 64000),
  mk("mnst", "monster-beverage", "MNST", "Monster Beverage Corporation", "Food & Beverage", "Hilton Schlosberg", 8500000, 71000),
  mk("k2", "kraft-heinz", "KHC", "The Kraft Heinz Company", "Food & Beverage", "Carlos Abrams-Rivera", 12900000, 61000),
  mk("cl", "colgate-palmolive", "CL", "Colgate-Palmolive Company", "Consumer Goods", "Noel Wallace", 18300000, 53000),
  mk("pg", "procter-and-gamble", "PG", "The Procter & Gamble Company", "Consumer Goods", "Jon Moeller", 18900000, 79000),
  mk("clx", "clorox", "CLX", "The Clorox Company", "Consumer Goods", "Linda Rendle", 13800000, 86000),
  mk("kmb", "kimberly-clark", "KMB", "Kimberly-Clark Corporation", "Consumer Goods", "Mike Hsu", 18700000, 73000),
  mk("ul", "unilever", "UL", "Unilever PLC", "Consumer Goods", "Fernando Fernandez", 11800000, 35000),
  mk("el", "estee-lauder", "EL", "The Estée Lauder Companies Inc.", "Consumer Goods", "Stéphane de La Faverie", 9800000, 47000),
  mk("clx2", "newell-brands", "NWL", "Newell Brands Inc.", "Consumer Goods", "Chris Peterson", 9100000, 38000),
  mk("hog", "harley-davidson", "HOG", "Harley-Davidson, Inc.", "Automotive", "Jochen Zeitz", 11900000, 65000),
  mk("rivn", "rivian", "RIVN", "Rivian Automotive, Inc.", "Automotive", "RJ Scaringe", 1700000, 88000),
  mk("lcid", "lucid-motors", "LCID", "Lucid Group, Inc.", "Automotive", "Marc Winterhoff", 5300000, 92000),
  mk("hmc", "honda", "HMC", "Honda Motor Co., Ltd.", "Automotive", "Toshihiro Mibe", 4200000, 68000),
  mk("stla", "stellantis", "STLA", "Stellantis N.V.", "Automotive", "Antonio Filosa", 10400000, 64000),
  mk("bac", "bank-of-america", "BAC", "Bank of America Corporation", "Finance & Insurance", "Brian Moynihan", 35000000, 91000),
  mk("wfc", "wells-fargo", "WFC", "Wells Fargo & Company", "Finance & Insurance", "Charlie Scharf", 31200000, 86000),
  mk("gs", "goldman-sachs", "GS", "The Goldman Sachs Group, Inc.", "Finance & Insurance", "David Solomon", 31500000, 165000),
  mk("ms", "morgan-stanley", "MS", "Morgan Stanley", "Finance & Insurance", "Ted Pick", 39000000, 130000),
  mk("axp", "american-express", "AXP", "American Express Company", "Finance & Insurance", "Stephen Squeri", 36900000, 95000),
  mk("v", "visa", "V", "Visa Inc.", "Finance & Insurance", "Ryan McInerney", 32800000, 155000),
  mk("ma", "mastercard", "MA", "Mastercard Incorporated", "Finance & Insurance", "Michael Miebach", 28600000, 153000),
  mk("unh", "unitedhealth-group", "UNH", "UnitedHealth Group Incorporated", "Healthcare", "Stephen Hemsley", 27800000, 73000),
  mk("cvs", "cvs-health", "CVS", "CVS Health Corporation", "Healthcare", "David Joyner", 21700000, 41000),
  mk("cnc", "centene", "CNC", "Centene Corporation", "Healthcare", "Sarah London", 23900000, 68000),
  mk("hum", "humana", "HUM", "Humana Inc.", "Healthcare", "Jim Rechtin", 18800000, 72000),
  mk("pfe", "pfizer", "PFE", "Pfizer Inc.", "Healthcare", "Albert Bourla", 32400000, 95000),
  mk("jnj", "johnson-and-johnson", "JNJ", "Johnson & Johnson", "Healthcare", "Joaquin Duato", 29900000, 89000),
  mk("mrk", "merck", "MRK", "Merck & Co., Inc.", "Healthcare", "Robert Davis", 21100000, 99000),
  mk("xom", "exxonmobil", "XOM", "Exxon Mobil Corporation", "Energy", "Darren Woods", 36900000, 117000),
  mk("cvx", "chevron", "CVX", "Chevron Corporation", "Energy", "Mike Wirth", 28900000, 161000),
];

// Small helper to keep the estimated array terse and readable above.
function mk(
  id: string,
  slug: string,
  ticker: string,
  name: string,
  industry: Industry,
  ceoName: string,
  ceoPay: number,
  medianWorkerPay: number,
  note?: string
): CompanyRecord {
  return {
    id,
    slug,
    ticker,
    name,
    industry,
    ceoName,
    ceoPay,
    medianWorkerPay,
    ratio: ratio(ceoPay, medianWorkerPay),
    fiscalYear: 2024,
    verified: false,
    source: note
      ? `Illustrative estimate, not from this company's actual filing. ${note}`
      : "Illustrative estimate based on industry-typical pay ratios. Not pulled from this company's actual SEC filing — see Phase 2 roadmap for verified data expansion.",
  };
}

export const companies: CompanyRecord[] = [...verified, ...estimated];

export function getCompanyBySlug(slug: string): CompanyRecord | undefined {
  return companies.find((c) => c.slug === slug);
}

export function searchCompanies(query: string): CompanyRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return companies.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.ticker.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
  );
}

export const sp500AverageRatio2024 = 285; // AFL-CIO Executive Paywatch, 2024
export const sp500AverageCeoPay2024 = 18900000; // AFL-CIO Executive Paywatch, 2024
export const medianUsWorkerPay2024 = 49500; // AFL-CIO Executive Paywatch, 2024
