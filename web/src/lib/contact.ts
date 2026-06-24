export type ContactInput = {
  name: string;
  org: string;
  email: string;
  service: string;
  message: string;
  honeypot?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  input: Partial<ContactInput>
): { ok: true; data: ContactInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (input.honeypot) errors.push("spam");
  const name = (input.name ?? "").trim();
  const org = (input.org ?? "").trim();
  const email = (input.email ?? "").trim();
  const service = (input.service ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.push("Name is required.");
  if (!org) errors.push("Organization is required.");
  if (!EMAIL_RE.test(email)) errors.push("A valid email is required.");
  if (!service) errors.push("Please select a service.");
  if (message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: { name, org, email, service, message } };
}

export function buildEmail(data: ContactInput): { subject: string; text: string } {
  return {
    subject: `New enquiry from ${data.org}`,
    text:
      `New website enquiry\n\n` +
      `Name: ${data.name}\n` +
      `Organization: ${data.org}\n` +
      `Email: ${data.email}\n` +
      `Service of interest: ${data.service}\n\n` +
      `Message:\n${data.message}\n`,
  };
}
