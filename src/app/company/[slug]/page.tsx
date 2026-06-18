import { getCompanyBySlug, companies } from "@/data/companies";
import { getCakeRank, getSeverity, formatCurrencyFull, formatRatio } from "@/lib/cake-ratio";
import SiteHeader from "@/components/SiteHeader";
import WorkerGrid from "@/components/WorkerGrid";
import CompanyCalculator from "@/components/CompanyCalculator";
import Link from "next/link";
import { notFound } from "next/navigation";

type CompanyPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: CompanyPageParams;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: "Not Found — Let Them Eat Cake" };
  return {
    title: `${company.name} — ${formatRatio(company.ratio)} Cake Ratio | Let Them Eat Cake`,
    description: `${company.name}'s CEO earned ${formatCurrencyFull(company.ceoPay)} while the median worker earned ${formatCurrencyFull(company.medianWorkerPay)} — a ratio of ${formatRatio(company.ratio)}.`,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: CompanyPageParams;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const rank = getCakeRank(company.ratio);
  const severity = getSeverity(company.ratio);
  const isFlashing = severity.label === "APOCALYPTIC" || severity.label === "EXTREME";

  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="font-mono text-xs text-crt-green-dim hover:text-crt-green-bright"
        >
          &lt; BACK TO TERMINAL
        </Link>

        <div className="mt-6 mb-8">
          <p className="font-mono text-xs text-crt-green-dim mb-1">
            [{company.ticker}] CORPORATE COMPENSATION RECORD — FY{company.fiscalYear}
          </p>
          <h1 className="font-pixel text-xl sm:text-3xl text-crt-green-bright phosphor-text leading-relaxed">
            {company.name.toUpperCase()}
          </h1>
          <p className="font-mono text-sm text-crt-green-dim mt-1">
            {company.industry} &middot; CEO: {company.ceoName}
          </p>
        </div>

        <div className="border-2 border-crt-border bg-crt-panel divide-y divide-crt-border mb-8">
          <DataRow label="CEO PAY" value={formatCurrencyFull(company.ceoPay)} />
          <DataRow
            label="MEDIAN WORKER PAY"
            value={formatCurrencyFull(company.medianWorkerPay)}
          />
          <DataRow
            label="CAKE RATIO™"
            value={formatRatio(company.ratio)}
            valueClassName="text-cake-gold-bright gold-glow text-lg"
          />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-mono text-sm text-crt-green-dim">STATUS</span>
            <span
              className={`font-pixel text-xs sm:text-sm ${severity.colorClass} ${
                isFlashing ? "animate-flash-red" : ""
              }`}
            >
              [{severity.label}]
            </span>
          </div>
        </div>

        <div className="border-2 border-cake-gold bg-crt-panel p-4 mb-8">
          <p className="font-pixel text-[10px] text-cake-gold-bright mb-2">
            ARISTOCRACY INDEX: {rank.label}
          </p>
          <p className="font-mono text-sm text-crt-green-dim leading-relaxed">
            {rank.description}
          </p>
        </div>

        <div className="mb-8">
          <WorkerGrid ratio={company.ratio} companyName={company.name} />
        </div>

        <div className="mb-8">
          <CompanyCalculator company={company} />
        </div>

        <div className="border border-crt-border bg-crt-black p-4">
          <p className="font-mono text-xs text-crt-green-dim leading-relaxed">
            <span className="text-crt-green">SOURCE: </span>
            {company.source}
            {!company.verified && (
              <span className="block mt-2 text-cake-gold-dim">
                ⚠ This record is an illustrative estimate, not a verified
                figure from {company.name}&apos;s actual SEC filing. See the
                Phase 2 roadmap for verified-data expansion.
              </span>
            )}
          </p>
        </div>
      </main>
    </>
  );
}

function DataRow({
  label,
  value,
  valueClassName = "text-crt-green-bright",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="font-mono text-sm text-crt-green-dim">{label}</span>
      <span className={`font-mono ${valueClassName}`}>{value}</span>
    </div>
  );
}
