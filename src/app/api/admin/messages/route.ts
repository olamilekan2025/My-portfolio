import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
