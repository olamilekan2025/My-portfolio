import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
    } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existingEmail =
      await Admin.findOne({
        email,
      });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

   await Admin.create({
  name,
  email,
  password: hashedPassword,
  role: "admin",
});
    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}