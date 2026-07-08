import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactFormSchema } from "@/lib/schemas";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { headers } from "next/headers";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.CONTACT_HOST_SERVER,
    port: Number(process.env.CONTACT_PORT),
    secure: true,
    auth: {
      user: process.env.CONTACT_USER,
      pass: process.env.CONTACT_PASSWD,
    },
  });
}

// Sanitize text to prevent HTML injection in email body
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    // Rate limit: 5 contact submissions per 10 minutes per IP
    const ip = getClientIp(await headers());
    const { allowed } = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validate with Zod
    const body = await req.json();
    const parsed = ContactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, number, message } = parsed.data;

    await createTransporter().sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Phone Number:</strong> ${sanitize(number)}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitize(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
