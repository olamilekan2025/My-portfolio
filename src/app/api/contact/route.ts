import { NextResponse } from "next/server";

import { contactSchema } from "@/components/sections/contact/schema";

import { sendContactEmail } from "@/lib/mail";
import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const result =
      contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data.",
        },
        {
          status: 400,
        }
      );
    }

    // Save message to database
    await Message.create({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
    });

    // Send email to admin
    await sendContactEmail(result.data);

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}