"use client";

import { useState } from "react";
import { calculateYearsToEarn, formatCurrencyFull } from "@/lib/cake-ratio";
import type { CompanyRecord } from "@/data/companies";

export default function CompanyCalculator({ company }: { company: CompanyRecord }) {
  const [salary, setSalary] = useState("");
  const parsedSalary = parseFloat(salary.replace(/[^0-9.]/g, ""));
  const hasValidSalary = !isNaN(parsedSalary) && parsedSalary > 0;
  const result = hasValidSalary
    ? calculateYearsToEarn(parsedSalary, company.ceoPay)
    : null;

  return (
    <div className="border-2 border-crt-border bg-crt-panel p-4 sm:p-6">
      <p className="font-pixel text-[10px] text-cake-gold-bright mb-3">
        HOW LONG WOULD YOU HAVE TO WORK?
      </p>
      <p className="font-mono text-sm text-crt-green-dim mb-4">
        Enter your annual salary to see how long it would take to earn what{" "}
        {company.ceoName} earned in one year at {company.name}.
      </p>

      <div className="flex items-stretch border-2 border-crt-green bg-crt-black mb-4">
        <span className="flex items-center px-3 text-crt-green-bright font-mono text-lg select-none">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="YOUR ANNUAL SALARY"
          className="flex-1 bg-transparent text-crt-green-bright placeholder:text-crt-green-dim font-mono text-base py-3 px-1 outline-none"
        />
      </div>

      {result && (
        <div className="border border-cake-gold p-4 text-center">
          <p className="font-mono text-xs text-crt-green-dim mb-2">
            AT {formatCurrencyFull(parsedSalary)}/YEAR, YOU WOULD NEED TO
            WORK:
          </p>
          <p className="font-pixel text-lg sm:text-2xl text-cake-gold-bright gold-glow leading-relaxed">
            {result.years.toLocaleString("en-US")} YEARS
          </p>
          <p className="font-mono text-sm text-crt-green-dim mt-1">
            {result.months} months, {result.days} days
          </p>
          <p className="font-mono text-xs text-crt-green-dim mt-3">
            to earn {company.ceoName}&apos;s {company.fiscalYear} compensation
            of {formatCurrencyFull(company.ceoPay)}.
          </p>
        </div>
      )}
    </div>
  );
}
