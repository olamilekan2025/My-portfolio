import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { connectDB } from "@/lib/mongodb";
import VisitorEvent from "@/models/VisitorEvent";

const VISITOR_COOKIE = "portfolio_visitor_id";
const SESSION_COOKIE = "portfolio_session_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SESSION_MAX_AGE = 60 * 30; // 30 minutes

function createId() {
  return crypto.randomUUID();
}

function hashValue(value: string) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

function detectDevice(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet/.test(ua)) {
    return "tablet" as const;
  }

  if (
    /mobile|iphone|android|blackberry|phone/.test(ua)
  ) {
    return "mobile" as const;
  }

  if (/windows|macintosh|linux/.test(ua)) {
    return "desktop" as const;
  }

  return "unknown" as const;
}

function detectBrowser(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome")) return "Chrome";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("safari")) return "Safari";

  return "Unknown";
}

function detectOS(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("windows")) return "Windows";
  if (ua.includes("mac os")) return "macOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad")) return "iOS";
  if (ua.includes("linux")) return "Linux";

  return "Unknown";
}

function getReferrerDomain(referrer?: string) {
  if (!referrer) return undefined;

  try {
    return new URL(referrer).hostname;
  } catch {
    return undefined;
  }
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const path =
      typeof body.path === "string"
        ? body.path.trim()
        : "";

    if (!path || !path.startsWith("/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page path",
        },
        { status: 400 }
      );
    }

    await connectDB();

    let visitorId =
      request.cookies.get(VISITOR_COOKIE)?.value;

    let sessionId =
      request.cookies.get(SESSION_COOKIE)?.value;

    const response = NextResponse.json({
      success: true,
    });

    let isNewVisitor = false;
    let isNewSession = false;

    if (!visitorId) {
      visitorId = createId();
      isNewVisitor = true;

      response.cookies.set({
        name: VISITOR_COOKIE,
        value: visitorId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
    }

    if (!sessionId) {
      sessionId = createId();
      isNewSession = true;

      response.cookies.set({
        name: SESSION_COOKIE,
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });
    } else {
      response.cookies.set({
        name: SESSION_COOKIE,
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });
    }

    const userAgent =
      request.headers.get("user-agent") ?? "";

    const referrer =
      typeof body.referrer === "string"
        ? body.referrer.slice(0, 1000)
        : undefined;

    const ip = getClientIp(request);

    await VisitorEvent.create({
      visitorId: hashValue(visitorId),
      sessionId: hashValue(sessionId),

      path,
      pageTitle:
        typeof body.pageTitle === "string"
          ? body.pageTitle.slice(0, 200)
          : undefined,

      referrer,
      referrerDomain: getReferrerDomain(referrer),

      userAgent: userAgent.slice(0, 1000),

      device: detectDevice(userAgent),
      browser: detectBrowser(userAgent),
      os: detectOS(userAgent),

      // Vercel/proxy environments can provide this.
      country:
        request.headers.get("x-vercel-ip-country") ??
        undefined,

      countryCode:
        request.headers.get("x-vercel-ip-country") ??
        undefined,

      ipHash: ip ? hashValue(ip) : undefined,
    });

    response.headers.set(
      "X-New-Visitor",
      String(isNewVisitor)
    );

    response.headers.set(
      "X-New-Session",
      String(isNewSession)
    );

    return response;
  } catch (error) {
    console.error("Visitor analytics error:", error);

    // Analytics should NEVER break the public website.
    return NextResponse.json(
      {
        success: false,
        message: "Analytics unavailable",
      },
      { status: 200 }
    );
  }
}