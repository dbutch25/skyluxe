import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RequestFormSchema } from "@/lib/schemas";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { headers } from "next/headers";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.REQUEST_HOST_SERVER,
    port: Number(process.env.REQUEST_PORT),
    secure: true,
    auth: {
      user: process.env.REQUEST_USER,
      pass: process.env.REQUEST_PASSWD,
    },
  });
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    // Rate limit: 5 quote requests per 10 minutes per IP
    const ip = getClientIp(await headers());
    const { allowed } = rateLimit(`request:${ip}`, 5, 10 * 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validate with Zod
    const body = await req.json();
    const parsed = RequestFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, number, serviceType, scopeOfWork } = parsed.data;

    await createTransporter().sendMail({
      from: process.env.REQUEST_FROM,
      to: process.env.REQUEST_TO,
      subject: "New Service Inquiry",
      html: `
        <h2>New Service Inquiry</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Phone Number:</strong> ${sanitize(number)}</p>
        <p><strong>Type Of Service:</strong> ${sanitize(serviceType)}</p>
        <p><strong>Scope of Work:</strong></p>
        <p>${sanitize(scopeOfWork).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending request email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
