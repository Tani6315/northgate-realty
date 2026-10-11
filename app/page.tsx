import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import LeadForm from "@/components/LeadForm";
import PropertyCard from "@/components/PropertyCard";
import SafeImage from "@/components/SafeImage";
import { AreaIcon, BathIcon, BedIcon } from "@/components/Icons";
import { agents, areas, formatPrice, initialsOf, properties, site, testimonials } from "@/data/site";

export default function Home() {
  const spotlight = properties[0];
  const latest = properties.filter((p) => p.isNew).concat(properties.filter((p) => !p.isNew)).slice(0, 6);

  return (
    <>
      {/* Hero: search first, with one real listing beside it */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-forest sm:text-6xl">
              Homes across Harbor City, shown by people who live here.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
              Search {properties.length} houses, apartments and villas for sale or rent, or ask us what your own home is worth.
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          <Link href={`/properties/${spotlight.slug}/`} className="group relative block">
            <SafeImage
              src={spotlight.photos[0]}
              alt={spotlight.title}
              eager
              className="aspect-[4/5] w-full rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white p-5 shadow-xl sm:inset-x-auto sm:left-4 sm:w-80">
              <p className="text-xs font-semibold text-brass">Just listed in {spotlight.area}</p>
              <p className="mt-1 font-display text-2xl font-bold text-forest">{formatPrice(spotlight)}</p>
              <p className="font-semibold group-hover:underline group-hover:underline-offset-4">{spotlight.title}</p>
              <div className="mt-3 flex gap-4 text-sm text-slate">
                <span className="flex items-center gap-1.5"><BedIcon />{spotlight.beds} bed</span>
                <span className="flex items-center gap-1.5"><BathIcon />{spotlight.baths} bath</span>
                <span className="flex items-center gap-1.5"><AreaIcon />{spotlight.sqft.toLocaleString("en-US")} sq ft</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest listings */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-forest md:text-4xl">New to the market</h2>
            <p className="mt-2 text-slate">Homes listed in the last two weeks.</p>
          </div>
          <Link href="/properties/" className="rounded-lg border border-forest px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white">
            See all {properties.length} homes
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="scroll-mt-16 bg-mist py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest md:text-4xl">Explore by neighbourhood</h2>
          <p className="mt-2 max-w-xl text-slate">Each area has its own pace. Pick one to see what&apos;s available there now.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a) => {
              const count = properties.filter((p) => p.area === a.name).length;
              return (
                <Link key={a.name} href={`/properties/?area=${encodeURIComponent(a.name)}`} className="group relative block overflow-hidden rounded-xl">
                  <SafeImage src={a.photo} alt={a.name} className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-2xl font-bold">{a.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{a.blurb}</p>
                    <p className="mt-3 text-sm font-semibold">{count} {count === 1 ? "home" : "homes"} available</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest md:text-4xl">
            Whether you&apos;re buying, selling or renting, one agent stays with you start to finish.
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { t: "Buying", d: "Hear about homes before they go online, and get honest advice on what to offer." },
              { t: "Selling", d: "A free valuation within 48 hours, professional photos, and weekly updates until it's sold." },
              { t: "Renting", d: "Verified listings, video viewings for people moving from abroad, and a tenancy agreement in plain English." },
            ].map((s) => (
              <div key={s.t} className="border-t-2 border-brass pt-4">
                <h3 className="font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="scroll-mt-16 border-t border-line py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest md:text-4xl">Meet the team</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {agents.map((a) => (
              <div key={a.id}>
                <SafeImage src={a.photo} alt={a.name} initials={initialsOf(a.name)} className="aspect-square w-full rounded-xl" />
                <h3 className="mt-4 font-semibold">{a.name}</h3>
                <p className="text-sm text-slate">{a.role}</p>
                <p className="mt-1 text-sm text-slate">{a.sold} homes sold or let</p>
                <a href={`tel:${a.phone}`} className="mt-2 inline-block text-sm font-semibold text-forest underline underline-offset-4">
                  Call {a.name.split(" ")[0]}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-forest py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote className="font-display text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-white/70">
                <span className="font-semibold text-white">{t.name}</span>, {t.detail.toLowerCase()}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact / valuation */}
      <section id="contact" className="scroll-mt-16 mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest md:text-4xl">Book a free valuation, or just ask a question</h2>
          <p className="mt-4 max-w-md text-slate">
            Tell us a little about what you need and an agent will call you back within one working day.
          </p>
          <dl className="mt-8 space-y-4 text-[15px]">
            <div><dt className="text-sm text-slate">Call the office</dt><dd className="font-semibold"><a href={`tel:${site.phone}`}>{site.phone}</a></dd></div>
            <div><dt className="text-sm text-slate">Visit us</dt><dd className="font-semibold">{site.address}</dd></div>
            <div><dt className="text-sm text-slate">Opening hours</dt><dd className="font-semibold">{site.hours}</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-line p-6 sm:p-8">
          <LeadForm
            subject="New enquiry from the website"
            topics={["Selling my home (free valuation)", "Buying a home", "Renting a home", "Letting my property"]}
            submitLabel="Send message"
            successTitle="Message sent"
          />
        </div>
      </section>
    </>
  );
}
