"use client";

import { useState } from "react";

// Standard repayment mortgage formula:
// M = P * r(1+r)^n / ((1+r)^n - 1), where r = monthly rate, n = number of months.
function monthlyPayment(loan: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (loan <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function MortgageCalculator({ price }: { price: number }) {
  const [deposit, setDeposit] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(25);

  const loan = price * (1 - deposit / 100);
  const monthly = monthlyPayment(loan, rate, years);
  const totalInterest = monthly * years * 12 - loan;

  return (
    <section aria-labelledby="mortgage" className="rounded-2xl border border-line p-6">
      <h2 id="mortgage" className="font-display text-2xl font-bold text-forest">
        Estimate your monthly payment
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-5">
          <label className="block">
            <span className="flex justify-between text-sm font-medium">
              Deposit <span className="text-slate">{deposit}% · {money(price * (deposit / 100))}</span>
            </span>
            <input type="range" min={5} max={60} step={5} value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="mt-2 w-full accent-forest" />
          </label>
          <label className="block">
            <span className="flex justify-between text-sm font-medium">
              Interest rate <span className="text-slate">{rate.toFixed(1)}% a year</span>
            </span>
            <input type="range" min={2} max={12} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="mt-2 w-full accent-forest" />
          </label>
          <label className="block">
            <span className="flex justify-between text-sm font-medium">
              Loan term <span className="text-slate">{years} years</span>
            </span>
            <input type="range" min={5} max={35} step={5} value={years} onChange={(e) => setYears(+e.target.value)} className="mt-2 w-full accent-forest" />
          </label>
        </div>

        <div className="rounded-xl bg-forest p-6 text-white md:w-60">
          <p className="text-sm text-white/70">Monthly payment</p>
          <p className="mt-1 font-display text-4xl font-bold" aria-live="polite">{money(monthly)}</p>
          <dl className="mt-5 space-y-1.5 border-t border-white/15 pt-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-white/70">Loan</dt><dd>{money(loan)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/70">Total interest</dt><dd>{money(totalInterest)}</dd></div>
          </dl>
        </div>
      </div>
      <p className="mt-5 text-xs text-slate">An estimate only. Your lender will confirm the actual rate and payment.</p>
    </section>
  );
}
