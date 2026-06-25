import { describe, expect, test } from "vitest";
import { validateNewsletter, buildNewsletterEmail } from "./newsletter";

describe("newsletter", () => {
  test("accepts a valid email", () => {
    const r = validateNewsletter({ email: "  jane@example.com " });
    expect(r).toEqual({ ok: true, data: { email: "jane@example.com" } });
  });

  test("rejects an invalid email", () => {
    const r = validateNewsletter({ email: "not-an-email" });
    expect(r.ok).toBe(false);
  });

  test("treats honeypot as spam", () => {
    const r = validateNewsletter({ email: "jane@example.com", honeypot: "bot" });
    expect(r).toEqual({ ok: false, errors: ["spam"] });
  });

  test("builds a subscriber notification email", () => {
    const { subject, text } = buildNewsletterEmail("jane@example.com");
    expect(subject).toMatch(/subscriber/i);
    expect(text).toContain("jane@example.com");
  });
});
