import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

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

/* =========================================================
   DEVICE DETECTION
========================================================= */

function detectDevice(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (
    /ipad|tablet|kindle|silk/.test(ua)
  ) {
    return "tablet" as const;
  }

  if (
    /mobile|iphone|android|blackberry|phone/.test(
      ua
    )
  ) {
    return "mobile" as const;
  }

  if (
    /windows|macintosh|linux|cros/.test(ua)
  ) {
    return "desktop" as const;
  }

  return "unknown" as const;
}

/* =========================================================
   BROWSER DETECTION
========================================================= */

function detectBrowser(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/")) {
    return "Edge";
  }

  if (
    ua.includes("opr/") ||
    ua.includes("opera")
  ) {
    return "Opera";
  }

  if (ua.includes("firefox")) {
    return "Firefox";
  }

  if (
    ua.includes("chrome") &&
    !ua.includes("edg/")
  ) {
    return "Chrome";
  }

  if (
    ua.includes("safari") &&
    !ua.includes("chrome")
  ) {
    return "Safari";
  }

  return "Unknown";
}

/* =========================================================
   OPERATING SYSTEM DETECTION
========================================================= */

function detectOS(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (ua.includes("windows")) {
    return "Windows";
  }

  if (
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    ua.includes("ipod")
  ) {
    return "iOS";
  }

  if (ua.includes("android")) {
    return "Android";
  }

  if (
    ua.includes("mac os") ||
    ua.includes("macintosh")
  ) {
    return "macOS";
  }

  if (ua.includes("linux")) {
    return "Linux";
  }

  if (ua.includes("cros")) {
    return "ChromeOS";
  }

  return "Unknown";
}

/* =========================================================
   REFERRER
========================================================= */

function getReferrerDomain(
  referrer?: string
) {
  if (!referrer) {
    return undefined;
  }

  try {
    return new URL(referrer).hostname;
  } catch {
    return undefined;
  }
}

/* =========================================================
   CLIENT IP
========================================================= */

function getClientIp(
  request: NextRequest
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {
    return forwardedFor
      .split(",")[0]
      .trim();
  }

  return (
    request.headers.get(
      "x-real-ip"
    ) ?? undefined
  );
}

/* =========================================================
   COUNTRY
========================================================= */

function getCountryCode(
  request: NextRequest
) {
  const country =
    request.headers.get(
      "x-vercel-ip-country"
    );

  if (!country) {
    return undefined;
  }

  return country.trim().toUpperCase();
}

/*
 * We currently use the country code as the country value.
 *
 * Example:
 * NG -> NG
 * US -> US
 * GB -> GB
 *
 * The analytics UI can later convert the ISO code
 * into a human-readable country name.
 */

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const path =
      typeof body.path === "string"
        ? body.path.trim()
        : "";

    if (
      !path ||
      !path.startsWith("/")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid page path",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    /* -------------------------------------------------------
       Visitor
    ------------------------------------------------------- */

    let visitorId =
      request.cookies.get(
        VISITOR_COOKIE
      )?.value;

    let isNewVisitor = false;

    if (!visitorId) {
      visitorId = createId();
      isNewVisitor = true;
    }

    /* -------------------------------------------------------
       Session
    ------------------------------------------------------- */

    let sessionId =
      request.cookies.get(
        SESSION_COOKIE
      )?.value;

    let isNewSession = false;

    if (!sessionId) {
      sessionId = createId();
      isNewSession = true;
    }

    /* -------------------------------------------------------
       Request data
    ------------------------------------------------------- */

    const userAgent =
      request.headers.get(
        "user-agent"
      ) ?? "";

    const referrer =
      typeof body.referrer ===
      "string"
        ? body.referrer.slice(
            0,
            1000
          )
        : undefined;

    const pageTitle =
      typeof body.pageTitle ===
      "string"
        ? body.pageTitle.slice(
            0,
            200
          )
        : undefined;

    const ip =
      getClientIp(request);

    const countryCode =
      getCountryCode(request);

    /* -------------------------------------------------------
       Save visitor event
    ------------------------------------------------------- */

    await VisitorEvent.create({
      visitorId: hashValue(
        visitorId
      ),

      sessionId: hashValue(
        sessionId
      ),

      path,

      pageTitle,

      referrer,

      referrerDomain:
        getReferrerDomain(
          referrer
        ),

      userAgent:
        userAgent.slice(
          0,
          1000
        ),

      device:
        detectDevice(
          userAgent
        ),

      browser:
        detectBrowser(
          userAgent
        ),

      os:
        detectOS(
          userAgent
        ),

      /*
       * Vercel provides the ISO country
       * code through this header.
       */
      country: countryCode,

      countryCode,

      /*
       * Never store the raw IP.
       */
      ipHash: ip
        ? hashValue(ip)
        : undefined,
    });

    /* -------------------------------------------------------
       Response
    ------------------------------------------------------- */

    const response =
      NextResponse.json({
        success: true,
      });

    /*
     * Visitor cookie
     */
    response.cookies.set({
      name: VISITOR_COOKIE,
      value: visitorId,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    /*
     * Session cookie
     *
     * Resetting maxAge on every page visit
     * keeps the session alive for another 30 minutes.
     */
    response.cookies.set({
      name: SESSION_COOKIE,
      value: sessionId,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
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
    console.error(
      "Visitor analytics error:",
      error
    );

    /*
     * Analytics must NEVER break
     * the public portfolio.
     */
    return NextResponse.json(
      {
        success: false,
        message:
          "Analytics unavailable",
      },
      {
        status: 200,
      }
    );
  }
}