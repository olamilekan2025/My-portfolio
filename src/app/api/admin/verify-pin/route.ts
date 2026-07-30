import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    if (!pin) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }
    console.log("PIN RECEIVED:", pin);

console.log(
  "HASH:",
  process.env.ADMIN_PIN_HASH
);

    const valid = await bcrypt.compare(
      pin,
      process.env.ADMIN_PIN_HASH!
    );
    console.log("VALID:", valid);

    if (!valid) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    // Clear all NextAuth session cookies to force login after PIN verification
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");
    response.cookies.delete("authjs.session-token");
    response.cookies.delete("__Secure-authjs.session-token");

    response.cookies.set("admin-gate", "true", {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 5,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}