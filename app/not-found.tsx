import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-forest">This page has moved or no longer exists</h1>
      <p className="mt-4 text-slate">The home you&apos;re looking for may have been sold or let.</p>
      <Link href="/properties/" className="mt-8 inline-block rounded-lg bg-forest px-5 py-3 font-semibold text-white hover:bg-pine">
        Browse available homes
      </Link>
    </div>
  );
}
