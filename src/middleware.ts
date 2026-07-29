import { NextRequest, NextResponse } from "next/server";
const GATE_EXEMPT_PATHS = ["/admin", "/admin/login", "/admin/signup"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const gate = request.cookies.get("admin-gate")?.value === "true";

  const session =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!session;

  // STEP 1: block everything except the PIN gate + login/signup if no gate cookie
  if (!gate && !GATE_EXEMPT_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // STEP 2: once gated, if already logged in, skip login/signup/PIN page
  if (
    pathname === "/admin" ||
    pathname === "/admin/login" ||
    pathname === "/admin/signup"
  ) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // STEP 3: dashboard and everything else needs a real session
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}