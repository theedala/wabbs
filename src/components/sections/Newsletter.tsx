import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { contact } from "@/lib/content";

export function Newsletter() {
  return (
    <section className="border-b border-border bg-bg-subtle py-16">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-md">
          <MonoLabel className="text-accent">Stay updated</MonoLabel>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            Security insights, straight to your inbox.
          </h2>
        </div>
        <form
          action={`mailto:${contact.email}`}
          method="post"
          encType="text/plain"
          className="flex w-full max-w-md items-center gap-2"
        >
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
            className="h-11 shrink-0 rounded-lg bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/90"
          >
            Subscribe
          </button>
        </form>
      </Container>
    </section>
  );
}
