"use client";

import { useState } from "react";
import { cleanName, cleanPhone, PHONE_MIN, sendForm } from "@/lib/web3forms";

export const field =
  "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-slate/60 outline-none transition-colors focus:border-forest";

// One form used for both the home-page contact form and the
// "arrange a viewing" form on each property page.
export default function LeadForm({
  subject,
  topics,
  defaultMessage = "",
  submitLabel,
  successTitle,
  extra = {},
}: {
  subject: string;
  topics?: string[];
  defaultMessage?: string;
  submitLabel: string;
  successTitle: string;
  extra?: Record<string, string>;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Enter your name using letters only.");
    if (phone.length < PHONE_MIN) return setError("Enter a phone number of 10 to 15 digits.");

    const f = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await sendForm(subject, {
        name: name.trim(),
        phone,
        email: String(f.get("email") || ""),
        topic: String(f.get("topic") || ""),
        message: String(f.get("message") || ""),
        ...extra,
      });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(`The message didn't send (${err instanceof Error ? err.message : "network error"}). Call us instead.`);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-forest/20 bg-sage p-6">
        <p className="font-display text-xl font-bold text-forest">{successTitle}</p>
        <p className="mt-2 text-sm text-slate">We&apos;ll call {name.split(" ")[0]} on {phone} within one working day.</p>
        <button
          onClick={() => {
            setStatus("idle");
            setName("");
            setPhone("");
          }}
          className="mt-4 text-sm font-semibold text-forest underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-sm font-medium">Full name</span>
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={50}
            value={name}
            onChange={(e) => setName(cleanName(e.target.value))}
            placeholder="Your name"
            className={field}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-medium">Phone</span>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            required
            autoComplete="tel"
            maxLength={15}
            value={phone}
            onChange={(e) => setPhone(cleanPhone(e.target.value))}
            placeholder="Numbers only"
            className={field}
          />
        </label>
      </div>
      <label>
        <span className="mb-1.5 block text-sm font-medium">
          Email <span className="font-normal text-slate">(optional)</span>
        </span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      {topics && (
        <label>
          <span className="mb-1.5 block text-sm font-medium">I&apos;m interested in</span>
          <select name="topic" className={field} defaultValue={topics[0]}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      )}
      <label>
        <span className="mb-1.5 block text-sm font-medium">Message</span>
        <textarea name="message" rows={4} defaultValue={defaultMessage} className={field} />
      </label>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 rounded-lg bg-forest py-3.5 font-semibold text-white transition-colors hover:bg-pine disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
