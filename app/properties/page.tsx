import type { Metadata } from "next";
import { Suspense } from "react";
import ListingsBrowser from "@/components/ListingsBrowser";

export const metadata: Metadata = {
  title: "Homes for sale and rent",
  description: "Filter houses, apartments, villas and townhouses by area, price and bedrooms.",
};

export default function PropertiesPage() {
  // The browser reads filters from the URL, which needs a Suspense boundary on static pages.
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-7xl px-5 py-14 text-slate">Loading homes…</div>}>
      <ListingsBrowser />
    </Suspense>
  );
}
