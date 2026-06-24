"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, siteMeta } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/brand/atw-logo.png" alt={siteMeta.name} width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-sm font-bold">{siteMeta.shortName}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </Link>
          ))}
          <Button href="/contact">Request a quote</Button>
        </nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted hover:text-text">
                {l.label}
              </Link>
            ))}
            <Button href="/contact" className="w-full">
              Request a quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
