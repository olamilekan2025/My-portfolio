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

    const unreadCount = await Message.countDocuments({ status: "pending" });
    const unreadMessages = await Message.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({ 
      unreadCount,
      unreadMessages 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
