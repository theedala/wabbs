"use client";
import { useState } from "react";
import { services } from "@/lib/content";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors([]);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrors(json.errors ?? ["Something went wrong."]);
      }
    } catch {
      setStatus("error");
      setErrors(["Network error. Please try again."]);
    }
  }

  const field =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-accent-cyan focus:outline-none";

  if (status === "ok") {
    return (
      <p className="rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 p-6 text-accent-cyan">
        Thank you — your enquiry has been sent. We&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input name="name" placeholder="Your name" required className={field} />
      <input name="org" placeholder="Organization" required className={field} />
      <input name="email" type="email" placeholder="Email address" required className={field} />
      <select name="service" required defaultValue="" className={field}>
        <option value="" disabled>
          Service of interest…
        </option>
        {services.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title}
          </option>
        ))}
      </select>
      <textarea name="message" placeholder="How can we help?" required rows={5} className={field} />
      {status === "error" && (
        <ul className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {errors.map((er, i) => (
            <li key={i}>{er}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent-cyan px-6 py-3 font-medium text-bg transition-colors hover:bg-accent-cyan/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
