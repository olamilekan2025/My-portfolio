import { NextResponse } from "next/server";

import { contactSchema } from "@/components/sections/contact/schema";

import { sendContactEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
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

    await sendContactEmail(result.data);

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to send email.",
      },
      {
        status: 500,
      }
    );
  }
}