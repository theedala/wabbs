"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, siteMeta } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
        <Link href="/" className="flex items-center" aria-label={siteMeta.name}>
          <Image
            src="/brand/new_logo.png"
            alt={siteMeta.name}
            width={500}
            height={500}
            priority
            className="h-14 w-14 object-contain"
          />
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
          <ThemeToggle />
          <Button href="/contact" arrow>
            Get protected
          </Button>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-ink"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
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
