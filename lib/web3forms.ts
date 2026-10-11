import { forms, site } from "@/data/site";

// Sends a form to Web3Forms, which emails it to the agency.
export async function sendForm(subject: string, fields: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: forms.web3formsKey,
      subject,
      from_name: `${site.name} website`,
      ...fields,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    console.error("Web3Forms error:", res.status, data);
    throw new Error(data.message || `HTTP ${res.status}`);
  }
}

// Name: letters (any language) and single spaces only.
export const cleanName = (v: string) =>
  v.replace(/[^\p{L}\s]/gu, "").replace(/\s{2,}/g, " ").replace(/^\s+/, "");

// Phone: digits only, max 15.
export const PHONE_MIN = 10;
export const cleanPhone = (v: string) => v.replace(/\D/g, "").slice(0, 15);
