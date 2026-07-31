import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Settings } from "@/models/settings";
import { auth } from "@/lib/auth";

// GET /api/admin/settings - Fetch current settings
export async function GET() {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let settings = await Settings.findOne();

    // If no settings exist, create default settings
    if (!settings) {
      settings = await Settings.create({
        email: session.user.email || "admin@example.com",
        emailNotifications: {
          newMessages: true,
          weeklySummary: false,
          securityAlerts: true,
        },
        inAppNotifications: {
          projectUpdates: true,
          messageReminders: true,
          systemUpdates: false,
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET /api/admin/settings error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load settings." },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update settings
export async function PUT(request: Request) {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    let settings = await Settings.findOne();

    if (!settings) {
      // Create settings if they don't exist
      settings = await Settings.create(body);
    } else {
      // Update existing settings
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { $set: body },
        { new: true, runValidators: true }
      );
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("PUT /api/admin/settings error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update settings." },
      { status: 500 }
    );
  }
}
