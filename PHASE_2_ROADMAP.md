# Phase 2 Roadmap — LET THEM EAT CAKE

This is a working roadmap for what comes after the Phase 1 MVP, grouped by effort and impact. Nothing here is built yet — this is planning only.

## Data quality (highest priority — do this before heavy feature work)

The MVP ships with 21 verified companies and roughly 109 illustrative estimates. The single highest-leverage Phase 2 work is closing that gap:

- Pull real `ceoPay` / `medianWorkerPay` / `fiscalYear` for the remaining companies from SEC EDGAR full-text search (DEF 14A filings) or the AFL-CIO Executive Paywatch company-pay-ratios database, which already aggregates this.
- Consider a lightweight internal script (`scripts/verify-company.ts`) that takes a ticker and prints the relevant proxy excerpt, to speed up manual verification.
- Add a `lastVerifiedDate` field so stale records can be flagged for re-check each proxy season (most US companies file proxies February through April).

## Database migration (Supabase)

The original brief specified Supabase; the MVP intentionally shipped on a static file instead, to avoid setup friction. When ready:

- Tables: `companies` (id, ticker, name, industry, slug) and `compensation` (company_id, year, ceo_pay, median_worker_pay, ratio, source, verified).
- Migrate `src/data/companies.ts` into a seed SQL script.
- Swap `getCompanyBySlug` / `searchCompanies` for Supabase queries; keep the same function signatures so components don't need to change.
- This unlocks the historical trend feature below, since a single static file isn't a great fit for multi-year time series per company.

## Historical trend charts

The original brief asked for a "CEO Pay Ratio Over Time" chart per company. This needs multi-year data per company, which means it depends on the Supabase migration above (or at minimum, restructuring the data file to support an array of `{year, ceoPay, medianWorkerPay}` per company). Once the data model supports it:

- Add a Recharts line chart to the company page, styled to match the CRT aesthetic (phosphor-green line, pixel-grid background).
- Surface "most improved" and "most worsened" year-over-year movers on the Rankings page, as in the original brief.

## Industry-level views

- Industry comparison on the company page ("this company vs. the {industry} average ratio").
- Dedicated industry pages or filters on Rankings (filter by the `Industry` enum, already present in the data model).

## SEC API / live data ingestion

- Automate pulling DEF 14A pay-ratio disclosures directly from SEC EDGAR's full-text search API on a yearly cadence, rather than relying on manual verification.
- This is a meaningfully larger effort (parsing inconsistent proxy language across thousands of filers) and should probably wait until the manually-verified core dataset proves the product has traction.

## Sharing and virality features

- Per the original brief's "screenshot moment" goal: an OG image generator for company pages (Next.js `ImageResponse`) so shared links show the Cake Ratio and worker grid as a preview card.
- A dedicated, stripped-down "share card" view of the years-to-earn calculator result, optimized for screenshotting.

## Things explicitly not recommended soon

- User accounts and authentication — there's no clear product need yet; this is a lookup tool, not a platform with personalization needs.
- Watchlists and notifications — premature without first validating that people return to the site at all.
- AI features — there's no clear use case here that beats a clean, sourced data table; resist adding AI for its own sake.
- An admin panel — until there's a non-technical person who needs to edit data without touching code, a CSV-to-seed-script workflow is simpler than building CRUD admin UI.
