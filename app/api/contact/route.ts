import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const MIN_FILL_TIME_MS = 2000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Best-effort per-instance rate limiting. Serverless deployments spin up
// fresh instances, so this resets on cold starts — it deters casual abuse
// from a single warm instance, not a determined attacker. A durable limit
// would need shared storage (e.g. Upstash Redis or Vercel KV).
const requestLog = new Map<string, number[]>();

interface ContactEmail {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function buildEmailText({ firstName, lastName, email, message }: ContactEmail) {
  return `From: ${firstName} ${lastName} <${email}>\n\n${message}`;
}

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);
}

async function sendWithSmtp(contact: ContactEmail, toEmail: string) {
  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || `"Portfolio" <${process.env.SMTP_USER}>`,
    to: toEmail,
    replyTo: contact.email,
    subject: `[Portfolio] ${contact.subject}`,
    text: buildEmailText(contact),
  });
}

async function sendWithResend(contact: ContactEmail, toEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const resend = new Resend(apiKey);
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: contact.email,
    subject: `[Portfolio] ${contact.subject}`,
    text: buildEmailText(contact),
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, subject, message, company, startedAt } = parsed.data;

  const isHoneypotTriggered = Boolean(company);
  const isTooFast = Date.now() - startedAt < MIN_FILL_TIME_MS;

  if (isHoneypotTriggered) {
    // Respond as if it succeeded so automated senders don't learn to adapt.
    return NextResponse.json({ ok: true });
  }

  if (isTooFast) {
    return NextResponse.json(
      { error: "Please wait a moment before sending your message." },
      { status: 400 }
    );
  }

  try {
    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json({ error: "Contact delivery is not configured." }, { status: 503 });
    }

    const contact = { firstName, lastName, email, subject, message };

    if (hasSmtpConfig()) {
      await sendWithSmtp(contact, toEmail);
    } else if (process.env.RESEND_API_KEY) {
      await sendWithResend(contact, toEmail);
    } else {
      return NextResponse.json({ error: "Contact delivery is not configured." }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
