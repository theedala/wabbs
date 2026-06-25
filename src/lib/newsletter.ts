export type NewsletterInput = { email: string; honeypot?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateNewsletter(
  input: Partial<NewsletterInput>
): { ok: true; data: { email: string } } | { ok: false; errors: string[] } {
  if (input.honeypot) return { ok: false, errors: ["spam"] };
  const email = (input.email ?? "").trim();
  if (!EMAIL_RE.test(email)) return { ok: false, errors: ["A valid email is required."] };
  return { ok: true, data: { email } };
}

export function buildNewsletterEmail(email: string): { subject: string; text: string } {
  return {
    subject: "New newsletter subscriber",
    text: `A new visitor subscribed to the ATW newsletter:\n\n${email}\n`,
  };
}
