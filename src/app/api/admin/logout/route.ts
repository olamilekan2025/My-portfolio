import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin-gate", "", { expires: new Date(0), path: "/" });
  response.cookies.set("authjs.session-token", "", { expires: new Date(0), path: "/" });
  response.cookies.set("next-auth.session-token", "", { expires: new Date(0), path: "/" });

  return response;
}