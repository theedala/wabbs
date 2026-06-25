"use client";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";

type Status = "idle" | "sending" | "ok" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/newsletter", {
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
        setError(json.errors?.[0] ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section className="border-b border-border bg-bg-subtle py-16">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-md">
          <MonoLabel className="text-accent">Stay updated</MonoLabel>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            Security insights, straight to your inbox.
          </h2>
        </div>
        <div className="w-full max-w-md">
          {status === "ok" ? (
            <p className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-center text-sm text-accent">
              You&apos;re subscribed — thank you!
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-11 flex-1 rounded-lg border border-border bg-bg px-4 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="h-11 shrink-0 rounded-lg bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {status === "sending" ? "…" : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && <p className="mt-2 text-left text-xs text-rose-500">{error}</p>}
        </div>
      </Container>
    </section>
  );
}
