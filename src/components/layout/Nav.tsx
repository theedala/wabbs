"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, siteMeta } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-bg/60 backdrop-blur"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/atw-logo.png"
            alt={siteMeta.name}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-base font-bold tracking-tight text-ink">{siteMeta.shortName}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" arrow>
            Get protected
          </Button>
        </nav>
        <button
          className="text-ink md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Button href="/contact" className="w-full" arrow>
              Get protected
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
