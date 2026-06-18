# LET THEM EAT CAKE

**Corporate Compensation Database — How many workers equal one CEO?**

A retro CRT-terminal web app that lets people search a public company and instantly see CEO pay, median worker pay, the resulting "Cake Ratio™," and how many years an average earner would need to work to match the CEO's annual pay.

This is the **Phase 1 MVP**. See `PHASE_2_ROADMAP.md` for what's deliberately deferred and planned next.

---

## What's in this MVP

- Retro CRT / Windows-98 / pixel-terminal visual design (scanlines, phosphor glow, pixel type)
- Boot sequence on first visit ("INITIALIZING TRANSPARENCY TERMINAL...")
- Company search (130 companies seeded)
- Company profile page: CEO pay, median worker pay, Cake Ratio™, severity status, Aristocracy Index tier
- Signature visualization: a pixel-art worker grid showing "1 CEO = N workers"
- "How Long Would You Have To Work?" calculator, both embedded per-company and as a standalone page
- Rankings page: Top 25 highest and lowest ratios
- Compare page: side-by-side comparison of up to 6 companies, highest ratio highlighted
- Full data provenance: every record is tagged `verified` or `estimated`, with a source citation shown on the company page

## What's deliberately NOT in this MVP

Per the product scoping for this phase: no user accounts, no authentication, no Supabase/database (data is a local TypeScript file, easy to migrate later), no admin panel, no live SEC API integration, no historical trend ingestion, no notifications, watchlists, social features, complex charts, or AI features. See `PHASE_2_ROADMAP.md`.

---

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom CRT/aristocracy design tokens)
- **React 19**
- Static data file instead of a database for this phase (see Data section below)

No Supabase, no Recharts, no Shadcn/UI are wired up in this MVP — the original brief called for them, but the agreed Phase 1 scope is intentionally leaner. They're easy to add in Phase 2; see the roadmap doc.

---

## Project structure

```
let-them-eat-cake/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout, fonts, CRT overlay
│   │   ├── globals.css               # CRT effects, scanlines, phosphor glow
│   │   ├── not-found.tsx             # Themed 404
│   │   ├── company/[slug]/page.tsx   # Company profile page
│   │   ├── rankings/page.tsx         # Top 25 highest/lowest
│   │   ├── compare/page.tsx          # Side-by-side comparison
│   │   └── calculator/page.tsx       # Standalone Cake Calculator
│   ├── components/
│   │   ├── BootScreen.tsx            # Boot sequence
│   │   ├── BootGate.tsx              # Shows boot screen once per session
│   │   ├── SiteHeader.tsx            # Nav
│   │   ├── SearchBox.tsx             # Homepage search w/ live results
│   │   ├── WorkerGrid.tsx            # Signature pixel-grid visualization
│   │   ├── PixelGlyphs.tsx           # Hand-built pixel worker/crown SVGs
│   │   ├── FactTerminal.tsx          # Rotating fact sidebar
│   │   └── CompanyCalculator.tsx     # Embedded years-to-earn calculator
│   ├── data/
│   │   └── companies.ts              # Seed dataset (130 companies)
│   └── lib/
│       └── cake-ratio.ts             # Cake Ratio tiers, severity, calculator math
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## Data and sourcing — please read this

This matters for a transparency tool, so it's worth being explicit. Every record in `src/data/companies.ts` has a `verified` boolean and a `source` string.

- **`verified: true`** (21 companies, including Apple, Disney, Amazon, Walmart, Costco, Starbucks, McDonald's, and several others) — these figures come from the company's actual SEC proxy statement (the "CEO Pay Ratio" disclosure required under Dodd-Frank Section 953(b)) or from the AFL-CIO Executive Paywatch database, which aggregates those same proxy filings. The fiscal year is recorded for each.
- **`verified: false`** (the remaining ~109 companies) — these are **illustrative estimates**, built to be directionally realistic for the company's size and sector (grounded in real published sector-average ratios), but they are **not** pulled from that specific company's actual filing. They exist so the MVP has full, immediately-usable coverage across 130 companies rather than shipping with only 21 working results. Every estimated company page displays a visible warning saying so, and the Rankings page marks them `(est.)`.

If you only want to ship verified data, filter `companies` by `c.verified` before going live, or treat the verified set as your "ready for primetime" tier and keep expanding it (see Phase 2 roadmap).

---

## Local installation

Requires Node.js 18.18 or later.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the app
# http://localhost:3000
```

That's it — there is no database to provision and no environment variables to set for this MVP. The app runs entirely off the static dataset in `src/data/companies.ts`.

To build for production locally:

```bash
npm run build
npm run start
```

---

## Deploying to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions — once set up, you never need to run a build command yourself. Every time you push new code to the `main` branch, it rebuilds and republishes the site automatically.

### One-time setup

1. **Check the repo name matches the config.** Open `next.config.js` and confirm the `repoName` constant matches your actual GitHub repository name exactly (e.g. if your repo is `github.com/yourname/let-them-eat-cake`, `repoName` should be `"/let-them-eat-cake"`). If you renamed the repo, update this value and re-push.
2. **Push this code to a GitHub repository** named to match (see `repoName` above).
3. In your repository on GitHub, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to **"GitHub Actions"** (not "Deploy from a branch" — that's the older method and won't work with this setup).
5. Push any commit to `main` (or go to the **Actions** tab and manually run the "Deploy to GitHub Pages" workflow).
6. Wait 1–3 minutes. Check the **Actions** tab — when the workflow shows a green checkmark, your site is live.
7. Your URL will be `https://<your-github-username>.github.io/<repo-name>/` (note the trailing slash matters).

### How this works under the hood

- `next.config.js` is set to `output: 'export'`, which tells Next.js to pre-build every page into a plain HTML file at build time, since GitHub Pages can only serve static files (it has no ability to run a live server).
- `.github/workflows/deploy.yml` is a GitHub Actions workflow: it automatically installs dependencies, runs the build, and publishes the result every time you push to `main`.
- `public/.nojekyll` tells GitHub not to run its default Jekyll processing step, which would otherwise interfere with Next.js's `_next` folder.

### If you'd rather use Vercel or Netlify instead

This same codebase deploys to Vercel or Netlify without any of the GitHub Pages-specific configuration above — both of those platforms run a real server, so static export isn't required. If you switch later, just remove the `output`, `basePath`, and `assetPrefix` lines from `next.config.js` and import the repo into Vercel or Netlify as normal; both auto-detect Next.js with zero extra configuration.

---

## Adding or correcting a company record

Open `src/data/companies.ts`. Each company is a `CompanyRecord`:

```ts
{
  id: "wmt",
  slug: "walmart",          // used in the URL: /company/walmart
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
}
```

To upgrade an estimated company to verified, find its real figures in the company's most recent DEF 14A proxy statement (search SEC EDGAR full-text search, or the AFL-CIO Paywatch company-pay-ratios database), update `ceoPay`, `medianWorkerPay`, `fiscalYear`, and `source`, and flip `verified` to `true`.

---

## License / disclaimer

This is a satirical-branded transparency tool. The branding ("Cake Ratio," "Aristocracy Index," etc.) is commentary; the underlying compensation figures are reported as plainly as possible and sourced per company. This project is not affiliated with the SEC, AFL-CIO, or any company listed in the dataset.
