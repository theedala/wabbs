import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, buildEmail } from "@/lib/contact";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  const result = validateContact(body as Record<string, string>);
  if (!result.ok) {
    // Honeypot spam: pretend success so bots get no signal.
    if (result.errors.includes("spam")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, errors: ["Email is not configured."] }, { status: 500 });

  const { subject, text } = buildEmail(result.data);
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "ATW Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "alexandrawabbs@gmail.com",
      replyTo: result.data.email,
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, errors: ["Could not send your message. Please try again."] }, { status: 500 });
  }
}
