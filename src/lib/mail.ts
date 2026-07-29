import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure: process.env.SMTP_PORT === "465",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,

    to: process.env.CONTACT_EMAIL,

    replyTo: email,

    subject: `Portfolio Contact • ${subject}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:24px">
        <h2>New Portfolio Contact</h2>

        <hr/>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

        <hr/>

        <p style="white-space:pre-wrap">
          ${message}
        </p>
      </div>
    `,
  });
}