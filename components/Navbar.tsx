"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Icons";
import { site } from "@/data/site";

const links = [
  { href: "/properties/?deal=Buy", label: "Buy" },
  { href: "/properties/?deal=Rent", label: "Rent" },
  { href: "/#areas", label: "Areas" },
  { href: "/#agents", label: "Agents" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-forest">Northgate</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[15px] font-medium text-slate md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-forest">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a href={`tel:${site.phone}`} className="text-sm font-medium text-slate hover:text-forest">
            {site.phone}
          </a>
          <Link href="/#contact" className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine">
            Book a valuation
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-5 pb-6 md:hidden">
          <ul className="py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3.5 text-lg font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg bg-forest py-3 text-center font-semibold text-white"
          >
            Book a valuation
          </Link>
          <a href={`tel:${site.phone}`} className="mt-3 block text-center text-sm text-slate">
            Call {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
