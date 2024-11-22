import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, number, message } = await req.json();

        if (!name || !email || !number || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // Configure your transporter
        const transporter = nodemailer.createTransport({
            host: process.env.CONTACT_HOST_SERVER, // Update based on your email provider
            port: Number(process.env.CONTACT_PORT),
            secure: true,
            auth: {
                user: process.env.CONTACT_USER, // Your email address
                pass: process.env.CONTACT_PASSWD, // Use an app password if needed
            },
        });

        // Configure email options
        const mailOptions = {
            from: process.env.CONTACT_FROM, // Sender address
            to: process.env.CONTACT_TO, // Recipient email
            subject: "New Contact Form Submission",
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${number}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}
