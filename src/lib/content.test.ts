import { describe, expect, test } from "vitest";
import { products, services, pricing, socials, faqs, contact } from "./content";

describe("content", () => {
  test("has three products", () => {
    expect(products).toHaveLength(3);
    expect(products.map((p) => p.icon)).toEqual(["radar", "hardhat", "fraud"]);
  });

  test("has six services", () => {
    expect(services).toHaveLength(6);
  });

  test("pricing has exactly one highlighted tier", () => {
    expect(pricing.filter((p) => p.highlight)).toHaveLength(1);
  });

  test("socials are the real configured accounts", () => {
    expect(socials.map((s) => s.icon)).toEqual(["facebook", "linkedin", "tiktok", "whatsapp"]);
    expect(socials.every((s) => s.href.startsWith("http"))).toBe(true);
  });

  test("faqs are populated", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(4);
  });

  test("contact exposes the working address", () => {
    expect(contact.address).toContain("Borrowdale");
  });
});
