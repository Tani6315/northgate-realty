// ------------------------------------------------------------
// All agency content lives here: company details, listings,
// agents, areas and form settings.
// ------------------------------------------------------------

export const site = {
  name: "Northgate Realty",
  city: "Harbor City",
  phone: "+1 (555) 018-4420",
  whatsapp: "15550184420",
  email: "hello@northgaterealty.example",
  address: "40 Quayside Avenue, Harbor City",
  hours: "Mon – Sat, 9:00 AM – 6:00 PM",
};

export const forms = {
  // Free key from https://web3forms.com — enquiries arrive at the email linked to it.
  web3formsKey: "24f9c113-e8bc-4a5b-9de5-6bf739c5bb2c",
};

// Free Unsplash photos. Replace with the agency's own photos in /public/images.
export const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export type Deal = "Buy" | "Rent";
export type PropertyType = "House" | "Apartment" | "Villa" | "Townhouse";

export type Property = {
  slug: string;
  title: string;
  deal: Deal;
  type: PropertyType;
  area: string;
  address: string;
  price: number; // sale price, or monthly rent
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  parking: number;
  photos: string[];
  summary: string;
  features: string[];
  agent: string; // agent id
  isNew?: boolean;
};

export const agents = [
  // Each agent has a backup photo: if the first one fails to load, the second is used,
  // and if both fail, the agent's initials are shown instead.
  { id: "adam", name: "Adam Collins", role: "Senior Sales Agent", phone: "+1 (555) 018-4421", photo: [img("photo-1500648767791-00dcc994a43e", 600), img("photo-1566492031773-4f4e44671857", 600)], sold: 142 },
  { id: "daniel", name: "Daniel Reyes", role: "Lettings Manager", phone: "+1 (555) 018-4422", photo: [img("photo-1472099645785-5658abf4ff4e", 600), img("photo-1599566150163-29194dcaad36", 600)], sold: 96 },
  { id: "omar", name: "Omar Rahman", role: "Luxury Homes Specialist", phone: "+1 (555) 018-4423", photo: [img("photo-1560250097-0b93528c311a", 600), img("photo-1570295999919-56ceb5ecca61", 600)], sold: 118 },
  { id: "tom", name: "Tom Becker", role: "New Developments", phone: "+1 (555) 018-4424", photo: [img("photo-1506794778202-cad84cf45f1d", 600), img("photo-1519085360753-af0119f7cbe7", 600)], sold: 87 },
];

export const areas = [
  { name: "Marina Bay", blurb: "Waterfront apartments, walkable cafés", photo: img("photo-1502672260266-1c1ef2d93688", 900) },
  { name: "Hillcrest", blurb: "Quiet streets, family homes, top schools", photo: img("photo-1568605114967-8130f3a36994", 900) },
  { name: "Old Town", blurb: "Restored townhouses near the market", photo: img("photo-1570129477492-45c003edd2be", 900) },
  { name: "Westbrook", blurb: "Large plots and modern villas", photo: img("photo-1613490493576-7fde63acd811", 900) },
];

const interiors = [
  img("photo-1600607687939-ce8a6c25118c"),
  img("photo-1600566753190-17f0baa2a6c3"),
  img("photo-1600210492486-724fe5c67fb0"),
  img("photo-1586023492125-27b2c045efd7"),
  img("photo-1560448204-e02f11c3d0e2"),
  img("photo-1507089947368-19c1da9775ae"),
];
const withInteriors = (cover: string, i: number) => [
  cover,
  interiors[i % 6],
  interiors[(i + 2) % 6],
  interiors[(i + 4) % 6],
];

export const properties: Property[] = [
  {
    slug: "glass-house-westbrook",
    title: "The Glass House",
    deal: "Buy", type: "Villa", area: "Westbrook", address: "12 Linden Rise, Westbrook",
    price: 1_480_000, beds: 5, baths: 4, sqft: 4200, year: 2021, parking: 3,
    photos: withInteriors(img("photo-1600596542815-ffad4c1539a9"), 0),
    summary: "A light-filled modern villa on a half-acre plot, with floor-to-ceiling glazing, an open-plan kitchen and a heated pool facing the evening sun.",
    features: ["Heated pool", "Solar panels", "Home office", "Smart lighting", "Double-height living room", "Landscaped garden"],
    agent: "omar", isNew: true,
  },
  {
    slug: "marina-view-apartment",
    title: "Marina View Apartment",
    deal: "Rent", type: "Apartment", area: "Marina Bay", address: "Apt 1402, Harbourline Tower",
    price: 3_200, beds: 2, baths: 2, sqft: 1150, year: 2019, parking: 1,
    photos: withInteriors(img("photo-1522708323590-d24dbb6b0267"), 1),
    summary: "A 14th-floor corner apartment with wraparound balcony views over the marina. Building gym, pool and 24-hour concierge included.",
    features: ["Balcony", "Concierge", "Gym and pool", "Fitted kitchen", "Air conditioning", "Pet friendly"],
    agent: "daniel",
  },
  {
    slug: "hillcrest-family-home",
    title: "Hillcrest Family Home",
    deal: "Buy", type: "House", area: "Hillcrest", address: "7 Orchard Lane, Hillcrest",
    price: 685_000, beds: 4, baths: 3, sqft: 2600, year: 2012, parking: 2,
    photos: withInteriors(img("photo-1568605114967-8130f3a36994"), 2),
    summary: "A well-kept detached home on a tree-lined street, five minutes' walk from Hillcrest Primary. Large back garden and a converted loft.",
    features: ["Back garden", "Loft conversion", "Garage", "Near schools", "Utility room", "Fireplace"],
    agent: "adam",
  },
  {
    slug: "old-town-townhouse",
    title: "Restored Old Town Townhouse",
    deal: "Buy", type: "Townhouse", area: "Old Town", address: "22 Weavers Row, Old Town",
    price: 540_000, beds: 3, baths: 2, sqft: 1800, year: 1924, parking: 1,
    photos: withInteriors(img("photo-1570129477492-45c003edd2be"), 3),
    summary: "A 1920s townhouse restored with original timber floors and sash windows, plus a new kitchen and bathrooms. Two minutes from the market square.",
    features: ["Original features", "New kitchen", "Courtyard", "Walk to market", "Cellar storage", "Period windows"],
    agent: "adam",
  },
  {
    slug: "skyline-penthouse",
    title: "Skyline Penthouse",
    deal: "Buy", type: "Apartment", area: "Marina Bay", address: "Penthouse, The Meridian",
    price: 1_150_000, beds: 3, baths: 3, sqft: 2300, year: 2022, parking: 2,
    photos: withInteriors(img("photo-1600585154340-be6161a56a0c"), 4),
    summary: "A top-floor penthouse with a private roof terrace and panoramic city views. Private lift access and two secure parking bays.",
    features: ["Roof terrace", "Private lift", "Underfloor heating", "Wine store", "Concierge", "Secure parking"],
    agent: "omar", isNew: true,
  },
  {
    slug: "westbrook-garden-house",
    title: "Westbrook Garden House",
    deal: "Rent", type: "House", area: "Westbrook", address: "3 Meadow Close, Westbrook",
    price: 4_100, beds: 4, baths: 3, sqft: 2900, year: 2016, parking: 2,
    photos: withInteriors(img("photo-1580587771525-78b9dba3b914"), 5),
    summary: "A spacious family house to rent on a quiet cul-de-sac, with a large lawn, play area and a double garage.",
    features: ["Large lawn", "Double garage", "Play area", "Furnished option", "Storage room", "Quiet street"],
    agent: "daniel",
  },
  {
    slug: "riverside-studio-loft",
    title: "Riverside Loft",
    deal: "Rent", type: "Apartment", area: "Old Town", address: "Unit 5, The Mill Building",
    price: 1_650, beds: 1, baths: 1, sqft: 720, year: 2008, parking: 0,
    photos: withInteriors(img("photo-1560448204-e02f11c3d0e2"), 0),
    summary: "A loft apartment in a converted mill with exposed brick, high ceilings and big industrial windows over the river.",
    features: ["High ceilings", "Exposed brick", "River views", "Bike storage", "Fibre broadband", "Furnished"],
    agent: "daniel", isNew: true,
  },
  {
    slug: "palm-court-villa",
    title: "Palm Court Villa",
    deal: "Buy", type: "Villa", area: "Westbrook", address: "1 Palm Court, Westbrook",
    price: 2_250_000, beds: 6, baths: 6, sqft: 5600, year: 2020, parking: 4,
    photos: withInteriors(img("photo-1613490493576-7fde63acd811"), 1),
    summary: "A gated villa with an infinity pool, guest suite and home cinema, set behind mature palms on one of Westbrook's largest plots.",
    features: ["Infinity pool", "Home cinema", "Guest suite", "Gated entry", "Outdoor kitchen", "Staff quarters"],
    agent: "omar",
  },
  {
    slug: "hillcrest-corner-townhouse",
    title: "Hillcrest Corner Townhouse",
    deal: "Rent", type: "Townhouse", area: "Hillcrest", address: "48 Beacon Street, Hillcrest",
    price: 2_700, beds: 3, baths: 2, sqft: 1600, year: 2015, parking: 1,
    photos: withInteriors(img("photo-1564013799919-ab600027ffc6"), 2),
    summary: "An end-of-terrace townhouse with a sunny patio, close to Hillcrest park and the train station.",
    features: ["Patio", "Near station", "Near park", "Built-in wardrobes", "Dishwasher", "Gas heating"],
    agent: "tom",
  },
  {
    slug: "the-oaks-new-build",
    title: "The Oaks, Plot 4",
    deal: "Buy", type: "House", area: "Hillcrest", address: "Plot 4, The Oaks Development",
    price: 795_000, beds: 4, baths: 3, sqft: 2800, year: 2026, parking: 2,
    photos: withInteriors(img("photo-1600047509807-ba8f99d2cdde"), 3),
    summary: "A new-build family home with a 10-year warranty, EV charger and an energy rating of A. Choose your own kitchen finish.",
    features: ["New build", "10-year warranty", "EV charger", "A energy rating", "Open-plan kitchen", "South-facing garden"],
    agent: "tom", isNew: true,
  },
  {
    slug: "harbour-lights-apartment",
    title: "Harbour Lights Apartment",
    deal: "Buy", type: "Apartment", area: "Marina Bay", address: "Apt 608, Harbour Lights",
    price: 465_000, beds: 2, baths: 2, sqft: 1050, year: 2017, parking: 1,
    photos: withInteriors(img("photo-1512917774080-9991f1c4c750"), 4),
    summary: "A bright two-bedroom apartment with a south-facing balcony, a short walk from the waterfront promenade.",
    features: ["Balcony", "Residents' gym", "Lift", "Secure entry", "Storage locker", "Walk to waterfront"],
    agent: "adam",
  },
  {
    slug: "willow-mews-house",
    title: "Willow Mews House",
    deal: "Rent", type: "House", area: "Old Town", address: "9 Willow Mews, Old Town",
    price: 2_950, beds: 3, baths: 2, sqft: 1700, year: 2005, parking: 1,
    photos: withInteriors(img("photo-1605276374104-dee2a0ed3cd6"), 5),
    summary: "A cobbled-mews house with a private garage and roof garden, tucked away from the Old Town bustle.",
    features: ["Roof garden", "Private garage", "Quiet mews", "Wood floors", "Walk-in shower", "Home office"],
    agent: "tom",
  },
];

export const initialsOf = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export const getAgent = (id: string) => agents.find((a) => a.id === id)!;
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export function formatPrice(p: Pick<Property, "price" | "deal">) {
  const amount = "$" + p.price.toLocaleString("en-US");
  return p.deal === "Rent" ? `${amount} / month` : amount;
}

export const testimonials = [
  { quote: "Adam found us a house in Hillcrest before it even went online. We moved in six weeks after our first call.", name: "Priya and Sam", detail: "Bought in Hillcrest" },
  { quote: "They sold our townhouse above asking in nine days, and handled every bit of paperwork.", name: "Robert Hale", detail: "Sold in Old Town" },
  { quote: "Renting from abroad felt risky. Daniel did video viewings and had the keys ready the day we landed.", name: "Lena Park", detail: "Rented in Marina Bay" },
];
