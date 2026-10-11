import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import LeadForm from "@/components/LeadForm";
import MortgageCalculator from "@/components/MortgageCalculator";
import PropertyCard from "@/components/PropertyCard";
import SafeImage from "@/components/SafeImage";
import { AreaIcon, BathIcon, BedIcon, CalendarIcon, CarIcon, CheckIcon, PinIcon } from "@/components/Icons";
import { formatPrice, getAgent, getProperty, initialsOf, properties } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

// Build one static page per listing.
export const dynamicParams = false;
export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProperty((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.area}`,
    description: `${p.beds} bed ${p.type.toLowerCase()} ${p.deal === "Buy" ? "for sale" : "to rent"} in ${p.area}. ${formatPrice(p)}.`,
  };
}

export default async function PropertyPage({ params }: Props) {
  const p = getProperty((await params).slug);
  if (!p) notFound();
  const agent = getAgent(p.agent);

  const similar = properties
    .filter((o) => o.slug !== p.slug && o.deal === p.deal && (o.area === p.area || o.type === p.type))
    .slice(0, 3);

  const facts = [
    { icon: <BedIcon className="h-5 w-5" />, label: "Bedrooms", value: p.beds },
    { icon: <BathIcon className="h-5 w-5" />, label: "Bathrooms", value: p.baths },
    { icon: <AreaIcon className="h-5 w-5" />, label: "Floor area", value: `${p.sqft.toLocaleString("en-US")} sq ft` },
    { icon: <CalendarIcon className="h-5 w-5" />, label: "Built", value: p.year },
    { icon: <CarIcon className="h-5 w-5" />, label: "Parking", value: p.parking ? `${p.parking} spaces` : "Street" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-slate">
        <Link href={`/properties/?deal=${p.deal}`} className="hover:text-forest">
          {p.deal === "Buy" ? "Homes for sale" : "Homes to rent"}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/properties/?area=${encodeURIComponent(p.area)}`} className="hover:text-forest">{p.area}</Link>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-forest md:text-5xl">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-slate"><PinIcon />{p.address}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-bold text-forest md:text-4xl">{formatPrice(p)}</p>
          <p className="text-sm text-slate">{p.type} {p.deal === "Buy" ? "for sale" : "to rent"}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          <Gallery photos={p.photos} title={p.title} />

          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-mist p-5 sm:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="flex items-center gap-2 text-sm text-slate">{f.icon}{f.label}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h2 className="font-display text-2xl font-bold text-forest">About this home</h2>
            <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-ink/85">{p.summary}</p>
            <ul className="mt-6 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage text-forest"><CheckIcon className="h-3.5 w-3.5" /></span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(p.address + ", Harbor City")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4"
            >
              <PinIcon />Open location in Google Maps
            </a>
          </section>

          {p.deal === "Buy" && <MortgageCalculator price={p.price} />}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line p-6">
            <div className="flex items-center gap-4">
              <SafeImage src={agent.photo} alt={agent.name} initials={initialsOf(agent.name)} initialsClass="text-lg" className="h-16 w-16 shrink-0 rounded-full" />
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-slate">{agent.role}</p>
                <a href={`tel:${agent.phone}`} className="text-sm font-semibold text-forest">{agent.phone}</a>
              </div>
            </div>
            <h2 className="mt-6 font-display text-xl font-bold text-forest">Arrange a viewing</h2>
            <div className="mt-4">
              <LeadForm
                subject={`Viewing request: ${p.title}`}
                defaultMessage={`I'd like to arrange a viewing of ${p.title}.`}
                submitLabel="Request a viewing"
                successTitle="Viewing requested"
                extra={{ property: `${p.title} (${formatPrice(p)})`, agent: agent.name }}
              />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20 border-t border-line pt-14">
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest">Similar homes</h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((o) => (
              <PropertyCard key={o.slug} p={o} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
