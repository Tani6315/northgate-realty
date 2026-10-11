"use client";

import { type ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import PropertyCard from "./PropertyCard";
import { priceLabel, priceOptions } from "./HeroSearch";
import { areas, properties, type Deal } from "@/data/site";

const sorts = {
  featured: "Recommended",
  "price-asc": "Lowest price",
  "price-desc": "Highest price",
  size: "Largest first",
} as const;
type SortKey = keyof typeof sorts;

type Filters = { deal: Deal | ""; area: string; type: string; beds: number; max: number; sort: SortKey };

function fromParams(p: URLSearchParams | ReadonlyURLSearchParams): Filters {
  const deal = p.get("deal");
  const sort = p.get("sort");
  return {
    deal: deal === "Buy" || deal === "Rent" ? deal : "",
    area: p.get("area") ?? "",
    type: p.get("type") ?? "",
    beds: Number(p.get("beds")) || 0,
    max: Number(p.get("max")) || 0,
    sort: sort && sort in sorts ? (sort as SortKey) : "featured",
  };
}

// Always the same key order, so the same filters give the same URL.
function toQuery(f: Filters) {
  const q = new URLSearchParams();
  if (f.deal) q.set("deal", f.deal);
  if (f.area) q.set("area", f.area);
  if (f.type) q.set("type", f.type);
  if (f.beds) q.set("beds", String(f.beds));
  if (f.max) q.set("max", String(f.max));
  if (f.sort !== "featured") q.set("sort", f.sort);
  return q.toString();
}

const select =
  "w-full appearance-none rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest";

export default function ListingsBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // Filters are kept in local state (so quick, back-to-back changes never
  // overwrite each other) and mirrored to the URL so a search can be shared.
  const [filters, setFilters] = useState<Filters>(() => fromParams(params));
  const query = toQuery(filters);
  const pushed = useRef(new Set<string>());

  // URL changed from outside (e.g. the Buy / Rent links in the menu): follow it.
  useEffect(() => {
    const current = params.toString();
    if (pushed.current.delete(current)) return; // our own update arriving
    if (current !== query) setFilters(fromParams(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Filters changed here: write them to the URL.
  useEffect(() => {
    if (query === params.toString()) return;
    pushed.current.add(query);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { deal, area, type, beds, max, sort } = filters;

  function update(key: keyof Filters, value: string) {
    setFilters((f) => {
      const next = { ...f, [key]: key === "beds" || key === "max" ? Number(value) || 0 : value } as Filters;
      // A max price for sale makes no sense for rentals, and vice versa.
      if (key === "deal") next.max = 0;
      if (key === "sort" && !value) next.sort = "featured";
      return next;
    });
  }

  function clearAll() {
    setFilters(fromParams(new URLSearchParams()));
  }

  const results = useMemo(() => {
    const list = properties.filter(
      (p) =>
        (!deal || p.deal === deal) &&
        (!area || p.area === area) &&
        (!type || p.type === type) &&
        (!beds || p.beds >= beds) &&
        (!max || p.price <= max)
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "size") list.sort((a, b) => b.sqft - a.sqft);
    return list;
  }, [deal, area, type, beds, max, sort]);

  const heading =
    deal === "Buy" ? "Homes for sale" : deal === "Rent" ? "Homes to rent" : "All homes";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight text-forest md:text-5xl">
        {heading}
        {area && <span className="text-ink"> in {area}</span>}
      </h1>

      <div className="mt-8 rounded-xl border border-line bg-mist p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div role="radiogroup" aria-label="Buy or rent" className="inline-flex rounded-lg border border-line bg-white p-1">
            {[["", "All"], ["Buy", "Buy"], ["Rent", "Rent"]].map(([v, label]) => (
              <button
                key={label}
                role="radio"
                aria-checked={deal === v}
                onClick={() => update("deal", v)}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  deal === v ? "bg-forest text-white" : "text-slate hover:text-forest"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="min-w-[150px] flex-1">
            <span className="mb-1 block text-xs font-medium text-slate">Area</span>
            <select value={area} onChange={(e) => update("area", e.target.value)} className={select}>
              <option value="">All areas</option>
              {areas.map((a) => (
                <option key={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
          <label className="min-w-[130px] flex-1">
            <span className="mb-1 block text-xs font-medium text-slate">Type</span>
            <select value={type} onChange={(e) => update("type", e.target.value)} className={select}>
              <option value="">Any type</option>
              {["House", "Apartment", "Villa", "Townhouse"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="min-w-[110px] flex-1">
            <span className="mb-1 block text-xs font-medium text-slate">Bedrooms</span>
            <select value={beds || ""} onChange={(e) => update("beds", e.target.value)} className={select}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-[130px] flex-1">
            <span className="mb-1 block text-xs font-medium text-slate">Max price</span>
            <select
              value={max || ""}
              onChange={(e) => update("max", e.target.value)}
              disabled={!deal}
              title={deal ? undefined : "Choose Buy or Rent first"}
              className={`${select} disabled:bg-mist disabled:text-slate/60`}
            >
              <option value="">{deal ? "No limit" : "Choose Buy or Rent"}</option>
              {deal &&
                priceOptions[deal].map((n) => (
                  <option key={n} value={n}>
                    {priceLabel(n)}
                    {deal === "Rent" ? " / mo" : ""}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-slate" aria-live="polite">
          <strong className="font-semibold text-ink">{results.length}</strong> {results.length === 1 ? "home" : "homes"}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate">
          Sort by
          <select value={sort} onChange={(e) => update("sort", e.target.value)} className={`${select} w-auto`}>
            {Object.entries(sorts).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-2xl font-bold text-forest">No homes match these filters</p>
          <p className="mx-auto mt-2 max-w-md text-slate">
            Try a higher price, fewer bedrooms or another area. New homes are listed every week.
          </p>
          <button
            onClick={clearAll}
            className="mt-6 rounded-lg bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-pine"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
