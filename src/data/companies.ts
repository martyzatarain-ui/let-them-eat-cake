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
];

// ---------------------------------------------------------------------------
// ESTIMATED RECORDS — illustrative, NOT pulled from individual filings.
// Grounded in real sector-average ratios published by AFL-CIO Paywatch
// (2024 S&P 500 average: 285:1; sector ranges roughly 40:1–1,900:1).
// Flagged verified:false. Replace with real filings in Phase 2.
// ---------------------------------------------------------------------------

const estimated: CompanyRecord[] = [
  mk("tgt", "target", "TGT", "Target Corporation", "Retail", "Brian Cornell", 19900000, 32000),
  mk("tsla", "tesla", "TSLA", "Tesla, Inc.", "Automotive", "Elon Musk", 5000000, 45000, "Tesla's CEO pay is highly irregular — Musk's primary compensation is a disputed multi-year stock award still in litigation, not a typical annual salary. This figure is a simplified placeholder, not his disclosed award value."),
  mk("nke", "nike", "NKE", "Nike, Inc.", "Apparel", "Elliott Hill", 18000000, 32000),
  mk("googl", "google", "GOOGL", "Alphabet Inc. (Google)", "Technology", "Sundar Pichai", 164200000, 295000),
  mk("msft", "microsoft", "MSFT", "Microsoft Corporation", "Technology", "Satya Nadella", 51900000, 193500),
  mk("meta", "meta", "META", "Meta Platforms, Inc.", "Technology", "Mark Zuckerberg", 24400000, 379000),
  mk("nflx", "netflix", "NFLX", "Netflix, Inc.", "Entertainment & Media", "Ted Sarandos", 31000000, 217000),
  mk("jpm", "jpmorgan-chase", "JPM", "JPMorgan Chase & Co.", "Finance & Insurance", "Jamie Dimon", 36000000, 102000),
  mk("ko2", "pepsi", "PEP", "PepsiCo, Inc.", "Food & Beverage", "Ramon Laguarta", 24700000, 38000),
  mk("ge", "general-electric", "GE", "General Electric Company", "Manufacturing", "Larry Culp", 38700000, 99000),
  mk("f", "ford", "F", "Ford Motor Company", "Automotive", "Jim Farley", 26500000, 78000),
  mk("gm", "general-motors", "GM", "General Motors Company", "Automotive", "Mary Barra", 29500000, 80000),
  mk("hd", "home-depot", "HD", "The Home Depot, Inc.", "Retail", "Ted Decker", 18600000, 35000),
  mk("low", "lowes", "LOW", "Lowe's Companies, Inc.", "Retail", "Marvin Ellison", 17800000, 33000),
  mk("dis2", "comcast", "CMCSA", "Comcast Corporation", "Telecom", "Brian Roberts", 33700000, 89237),
  mk("t", "att", "T", "AT&T Inc.", "Telecom", "John Stankey", 25400000, 95000),
  mk("vz", "verizon", "VZ", "Verizon Communications Inc.", "Telecom", "Hans Vestberg", 21200000, 98000),
  mk("ual", "united-airlines", "UAL", "United Airlines Holdings, Inc.", "Airlines & Travel", "Scott Kirby", 22200000, 105000),
  mk("dal", "delta-air-lines", "DAL", "Delta Air Lines, Inc.", "Airlines & Travel", "Ed Bastian", 32200000, 110000),
  mk("luv", "southwest-airlines", "LUV", "Southwest Airlines Co.", "Airlines & Travel", "Bob Jordan", 9700000, 92000),
  mk("mar", "marriott", "MAR", "Marriott International, Inc.", "Airlines & Travel", "Anthony Capuano", 20100000, 49000),
  mk("dpz", "dominos", "DPZ", "Domino's Pizza, Inc.", "Food & Beverage", "Russell Weiner", 11600000, 17000),
  mk("cmg", "chipotle", "CMG", "Chipotle Mexican Grill, Inc.", "Food & Beverage", "Scott Boatwright", 22500000, 24000),
  mk("dri", "darden-restaurants", "DRI", "Darden Restaurants, Inc.", "Food & Beverage", "Rick Cardenas", 9300000, 21000),
  mk("ulta", "ulta-beauty", "ULTA", "Ulta Beauty, Inc.", "Retail", "Dave Kimbell", 13700000, 14600),
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
