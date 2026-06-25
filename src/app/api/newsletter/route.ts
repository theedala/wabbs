import { NextResponse } from "next/server";
import { validateNewsletter, buildNewsletterEmail } from "@/lib/newsletter";
import { getTransport, mailTo, mailFrom } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  const result = validateNewsletter(body as Record<string, string>);
  if (!result.ok) {
    // Honeypot spam: pretend success so bots get no signal.
    if (result.errors.includes("spam")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const transport = getTransport();
  if (!transport) {
    return NextResponse.json({ ok: false, errors: ["Email is not configured."] }, { status: 500 });
  }

  const { subject, text } = buildNewsletterEmail(result.data.email);
  try {
    await transport.sendMail({
      from: mailFrom(),
      to: mailTo(),
      replyTo: result.data.email,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Could not subscribe. Please try again."] },
      { status: 500 }
    );
  }
}
