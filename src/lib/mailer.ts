import nodemailer from "nodemailer";

/**
 * Gmail SMTP transport built from env vars. Returns null when not configured
 * so callers can respond gracefully instead of throwing.
 *
 * Required env (see .env.local.example):
 *   SMTP_USER  – the Gmail address (also the authenticated sender)
 *   SMTP_PASS  – a Gmail App Password (NOT the account password)
 */
export function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

/** The address that receives website mail (defaults to the SMTP user). */
export function mailTo() {
  return process.env.CONTACT_TO ?? process.env.SMTP_USER ?? "alexandrawabbs@gmail.com";
}

/** The From header. Gmail requires this to be the authenticated user. */
export function mailFrom() {
  const user = process.env.SMTP_USER ?? "alexandrawabbs@gmail.com";
  return `ATW Technologies <${user}>`;
}
