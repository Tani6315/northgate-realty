"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { areas, type Deal } from "@/data/site";

export const priceOptions: Record<Deal, number[]> = {
  Buy: [500_000, 750_000, 1_000_000, 1_500_000, 2_500_000],
  Rent: [2_000, 3_000, 4_000, 5_000],
};

export const priceLabel = (n: number) =>
  n >= 1_000_000 ? `$${n / 1_000_000}M` : n >= 10_000 ? `$${n / 1000}k` : `$${n.toLocaleString("en-US")}`;

const select =
  "w-full appearance-none rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-forest";

export default function HeroSearch() {
  const router = useRouter();
  const [deal, setDeal] = useState<Deal>("Buy");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");

  function search(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ deal });
    if (area) q.set("area", area);
    if (type) q.set("type", type);
    if (max) q.set("max", max);
    router.push(`/properties/?${q.toString()}`);
  }

  return (
    <form onSubmit={search} className="rounded-2xl border border-line bg-white p-4 shadow-[0_20px_50px_-24px_rgba(22,61,51,.35)] sm:p-5">
      <div role="radiogroup" aria-label="Buy or rent" className="mb-4 inline-flex rounded-lg bg-mist p-1">
        {(["Buy", "Rent"] as Deal[]).map((d) => (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={deal === d}
            onClick={() => {
              setDeal(d);
              setMax("");
            }}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors ${
              deal === d ? "bg-white text-forest shadow-sm" : "text-slate hover:text-forest"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label>
          <span className="mb-1.5 block text-xs font-medium text-slate">Area</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className={select}>
            <option value="">Anywhere in Harbor City</option>
            {areas.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-medium text-slate">Property type</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className={select}>
            <option value="">Any type</option>
            {["House", "Apartment", "Villa", "Townhouse"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-medium text-slate">{deal === "Buy" ? "Max price" : "Max rent per month"}</span>
          <select value={max} onChange={(e) => setMax(e.target.value)} className={select}>
            <option value="">No limit</option>
            {priceOptions[deal].map((n) => (
              <option key={n} value={n}>
                {priceLabel(n)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="self-end rounded-lg bg-forest px-7 py-3 font-semibold text-white transition-colors hover:bg-pine sm:col-span-2 lg:col-span-1"
        >
          Search homes
        </button>
      </div>
    </form>
  );
}
