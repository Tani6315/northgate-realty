import Link from "next/link";
import { Logo } from "./Icons";
import { areas, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-lg font-bold text-white">Northgate</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Independent estate agents helping people buy, sell and rent homes across {site.city} since 2009.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Browse</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/properties/?deal=Buy" className="hover:text-white">Homes for sale</Link></li>
            <li><Link href="/properties/?deal=Rent" className="hover:text-white">Homes to rent</Link></li>
            <li><Link href="/properties/" className="hover:text-white">All listings</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Areas</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.name}>
                <Link href={`/properties/?area=${encodeURIComponent(a.name)}`} className="hover:text-white">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">Visit the office</h3>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{site.address}</p>
            <p>{site.hours}</p>
            <p><a href={`tel:${site.phone}`} className="hover:text-white">{site.phone}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-white/60">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
