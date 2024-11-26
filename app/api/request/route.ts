import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, number, serviceType, scopeOfWork } = await req.json();

        if (!name || !email || !number || !serviceType || !scopeOfWork) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.REQUEST_HOST_SERVER,
            port: Number(process.env.REQUEST_PORT),
            secure: true,
            auth: {
                user: process.env.REQUEST_USER,
                pass: process.env.REQUEST_PASSWD,
            },
        });

        const mailOptions = {
            from: process.env.REQUEST_FROM,
            to: process.env.REQUEST_TO,
            subject: "New Service Inquiry",
            html: `
                <h2>New Service Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${number}</p>
                <p<strong>Type Of Service:</strong> ${serviceType}</p>
                <p><strong>Scope of Work:</strong></p>
                <p>${scopeOfWork}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}
