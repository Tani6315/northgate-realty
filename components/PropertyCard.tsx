import Link from "next/link";
import SafeImage from "./SafeImage";
import { AreaIcon, BathIcon, BedIcon, PinIcon } from "./Icons";
import { formatPrice, type Property } from "@/data/site";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link href={`/properties/${p.slug}/`} className="group block">
      <div className="relative overflow-hidden rounded-xl">
        <SafeImage
          src={p.photos[0].replace("w=1200", "w=800")}
          alt={p.title}
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-forest shadow-sm">
            {p.deal === "Buy" ? "For sale" : "To rent"}
          </span>
          {p.isNew && <span className="rounded-md bg-brass px-2.5 py-1 text-xs font-semibold text-white shadow-sm">New</span>}
        </div>
      </div>

      <div className="pt-4">
        <p className="font-display text-2xl font-bold tracking-tight text-forest">{formatPrice(p)}</p>
        <h3 className="mt-1 text-[17px] font-semibold group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate">
          <PinIcon className="h-3.5 w-3.5" />
          {p.area}
        </p>
        <dl className="mt-3 flex gap-5 border-t border-line pt-3 text-sm text-slate">
          <div className="flex items-center gap-1.5"><BedIcon /><dt className="sr-only">Bedrooms</dt><dd>{p.beds} bed</dd></div>
          <div className="flex items-center gap-1.5"><BathIcon /><dt className="sr-only">Bathrooms</dt><dd>{p.baths} bath</dd></div>
          <div className="flex items-center gap-1.5"><AreaIcon /><dt className="sr-only">Floor area</dt><dd>{p.sqft.toLocaleString("en-US")} sq ft</dd></div>
        </dl>
      </div>
    </Link>
  );
}
