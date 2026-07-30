import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";
import { transporter } from "@/lib/mail";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { reply } = body;

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    // Send reply email to visitor
    await transporter.sendMail({
      from: `"${session.user.name}" <${process.env.SMTP_USER}>`,
      to: message.email,
      subject: `Re: ${message.subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px">
          <h2>Reply to your message</h2>
          <hr/>
          <p><strong>Original Subject:</strong> ${message.subject}</p>
          <p><strong>Your Message:</strong></p>
          <p style="white-space:pre-wrap; background:#f5f5f5; padding:16px; border-radius:8px;">
            ${message.message}
          </p>
          <hr/>
          <p><strong>Reply:</strong></p>
          <p style="white-space:pre-wrap">
            ${reply}
          </p>
        </div>
      `,
    });

    // Update message in database
    await Message.findByIdAndUpdate(id, {
      reply,
      status: "replied",
      repliedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    await Message.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
