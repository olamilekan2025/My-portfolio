// import { NextRequest, NextResponse } from "next/server";
// const GATE_EXEMPT_PATHS = ["/admin", "/auth/login", "/admin/signup"];

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (!pathname.startsWith("/admin")) {
//     return NextResponse.next();
//   }

//   const gate = request.cookies.get("admin-gate")?.value === "true";

//   const session =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value ||
//     request.cookies.get("authjs.session-token")?.value ||
//     request.cookies.get("__Secure-authjs.session-token")?.value;

//   const isLoggedIn = !!session;

//   // STEP 1: block everything except the PIN gate + login/signup if no gate cookie
//   if (!gate && !GATE_EXEMPT_PATHS.includes(pathname)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // STEP 2: once gated, if already logged in, skip login/signup/PIN page
//   if (
//     pathname === "/admin" ||
//     pathname === "/auth/login" ||
//     pathname === "/admin/signup"
//   ) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//     return NextResponse.next();
//   }

//   // STEP 3: dashboard and everything else needs a real session
//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   return NextResponse.next();
// }



import { NextRequest, NextResponse } from "next/server";

const ADMIN_GATE_PATH = "/admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Only protect /admin routes.
   */
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  /*
   * The admin gate cookie is the first layer.
   */
  const hasAdminGate =
    request.cookies.get("admin-gate")?.value === "true";

  /*
   * Supported NextAuth/Auth.js session cookie names.
   */
  const sessionCookie =
    request.cookies.get(
      "next-auth.session-token"
    )?.value ||
    request.cookies.get(
      "__Secure-next-auth.session-token"
    )?.value ||
    request.cookies.get(
      "authjs.session-token"
    )?.value ||
    request.cookies.get(
      "__Secure-authjs.session-token"
    )?.value;

  const hasSession = Boolean(sessionCookie);

  /*
   * ---------------------------------------------------------
   * ADMIN GATE
   * ---------------------------------------------------------
   *
   * /admin is the gate page.
   *
   * If the user hasn't passed the PIN gate, keep them
   * on the public/admin gate page.
   */

  if (!hasAdminGate && pathname !== ADMIN_GATE_PATH) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  /*
   * ---------------------------------------------------------
   * ALREADY AUTHENTICATED
   * ---------------------------------------------------------
   *
   * If the user has both:
   * - passed the admin gate
   * - authenticated successfully
   *
   * send them directly to the dashboard when they visit
   * /admin.
   */

  if (
    pathname === ADMIN_GATE_PATH &&
    hasAdminGate &&
    hasSession
  ) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  /*
   * ---------------------------------------------------------
   * AUTHENTICATION
   * ---------------------------------------------------------
   *
   * Once the gate has been passed, all other admin pages
   * require a session.
   */

  if (!hasSession) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

/*
 * Only execute middleware for /admin routes.
 */
export const config = {
  matcher: ["/admin/:path*"],
};