import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Northgate Realty | Homes for sale and rent in Harbor City",
    template: "%s | Northgate Realty",
  },
  description:
    "Browse houses, apartments and villas for sale and rent across Marina Bay, Hillcrest, Old Town and Westbrook, or book a free home valuation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
