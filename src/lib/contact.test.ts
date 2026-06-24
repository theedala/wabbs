import { describe, it, expect } from "vitest";
import { validateContact, buildEmail } from "./contact";

const valid = {
  name: "Jane",
  org: "HIT",
  email: "jane@hit.ac.zw",
  service: "Consulting",
  message: "We need a security audit.",
};

describe("validateContact", () => {
  it("accepts a complete valid submission", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
  });

  it("rejects when required fields are missing", () => {
    const r = validateContact({ name: "", org: "", email: "", service: "", message: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.length).toBeGreaterThan(0);
  });

  it("rejects an invalid email", () => {
    const r = validateContact({ ...valid, email: "not-an-email" });
    expect(r.ok).toBe(false);
  });

  it("rejects a too-short message", () => {
    const r = validateContact({ ...valid, message: "hi" });
    expect(r.ok).toBe(false);
  });

  it("treats a filled honeypot as invalid (spam)", () => {
    const r = validateContact({ ...valid, honeypot: "bot" });
    expect(r.ok).toBe(false);
  });
});

describe("buildEmail", () => {
  it("produces a subject and body containing the org and message", () => {
    const r = buildEmail(valid);
    expect(r.subject).toContain("HIT");
    expect(r.text).toContain("We need a security audit.");
    expect(r.text).toContain("jane@hit.ac.zw");
  });
});
