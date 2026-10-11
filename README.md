# Northgate Realty

A real estate agency website with searchable listings, a page for every property, a mortgage calculator and viewing requests, built with Next.js, TypeScript and Tailwind CSS.

**Live demo:** "https://northgate-realty.vercel.app/"

## Features

- **Property search** from the home page by deal type (buy or rent), area, property type and maximum price
- **Listings page** with filters for area, type, bedrooms and price, plus sorting by price or size
  - Filters are kept in the URL, so any search can be bookmarked or shared
  - Browser back and forward buttons restore previous searches
  - Clear empty state when nothing matches
- **A static page for every property** with a photo gallery, key facts, feature list, Google Maps link and similar homes
- **Mortgage calculator** on homes for sale, with adjustable deposit, interest rate and loan term
- **Viewing request and contact forms** delivered by email through Web3Forms, with letters-only name and digits-only phone validation
- Neighbourhood guides, agent profiles and client testimonials
- Responsive from mobile to desktop, keyboard accessible, and respects reduced-motion settings
- Static export: deploys to Vercel, Netlify or any standard web host

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 15 (App Router, static export, `generateStaticParams`) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Forms | Web3Forms |
| Hosting | Vercel |

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Then open [Northgate](https://northgate-realty.vercel.app/).

## Project structure

```
app/
  page.tsx                    Home page
  properties/page.tsx         Listings with filters
  properties/[slug]/page.tsx  Property detail page (one per listing)
  not-found.tsx               404 page
components/                   Search, filters, gallery, calculator, forms, cards
data/
  site.ts                     Agency details, listings, agents, areas, testimonials
lib/
  web3forms.ts                Form submission and input validation
```

## Configuration

All content lives in `data/site.ts`:

- `site`: agency name, city, phone, email, address and opening hours
- `properties`: listings with price, size, photos, features and assigned agent
- `agents`, `areas`, `testimonials`
- `forms.web3formsKey`: the Web3Forms access key that receives enquiries

Adding a listing to `properties` automatically creates its page, adds it to search results and updates the counts on the home page.

Brand colours are defined in the `@theme` block of `app/globals.css`.

