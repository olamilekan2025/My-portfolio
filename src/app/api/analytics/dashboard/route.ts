import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import VisitorEvent from "@/models/VisitorEvent";
import { auth } from "@/lib/auth";

/* =========================================================
   DATE HELPERS
========================================================= */

function startOfDay(date = new Date()) {
  const result = new Date(date);

  result.setHours(
    0,
    0,
    0,
    0
  );

  return result;
}

function getDaysFromRange(
  range: string | null
) {
  switch (range) {
    case "30d":
      return 30;

    case "90d":
      return 90;

    case "7d":
    default:
      return 7;
  }
}

/* =========================================================
   GET
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    /* -------------------------------------------------------
       AUTHENTICATION
    ------------------------------------------------------- */

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * If your auth session exposes role,
     * make sure only admin can access analytics.
     */
    if (
      session.user.role &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    /* -------------------------------------------------------
       RANGE
    ------------------------------------------------------- */

    const { searchParams } =
      new URL(request.url);

    const range =
      searchParams.get(
        "range"
      ) ?? "7d";

    const days =
      getDaysFromRange(range);

    const now = new Date();

    const startDate =
      startOfDay(now);

    startDate.setDate(
      startDate.getDate() -
        (days - 1)
    );

    const todayStart =
      startOfDay(now);

    const activeSince =
      new Date(
        Date.now() -
          30 * 60 * 1000
      );

    /* -------------------------------------------------------
       QUERIES
    ------------------------------------------------------- */

    const [
      totalEvents,
      uniqueVisitors,
      uniqueSessions,
      todayEvents,
      todayVisitors,
      topPages,
      devices,
      browsers,
      operatingSystems,
      countries,
      referrers,
      dailyTraffic,
    ] = await Promise.all([
      /*
       * Total page views in selected range.
       */
      VisitorEvent.countDocuments({
        createdAt: {
          $gte: startDate,
        },
      }),

      /*
       * Unique visitors in selected range.
       */
      VisitorEvent.distinct(
        "visitorId",
        {
          createdAt: {
            $gte: startDate,
          },
        }
      ),

      /*
       * Unique sessions in selected range.
       */
      VisitorEvent.distinct(
        "sessionId",
        {
          createdAt: {
            $gte: startDate,
          },
        }
      ),

      /*
       * Today's page views.
       */
      VisitorEvent.countDocuments({
        createdAt: {
          $gte: todayStart,
        },
      }),

      /*
       * Today's unique visitors.
       */
      VisitorEvent.distinct(
        "visitorId",
        {
          createdAt: {
            $gte: todayStart,
          },
        }
      ),

      /*
       * Top pages.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },
          },
        },

        {
          $group: {
            _id: "$path",

            views: {
              $sum: 1,
            },

            visitors: {
              $addToSet:
                "$visitorId",
            },
          },
        },

        {
          $project: {
            _id: 0,

            path: "$_id",

            views: 1,

            visitors: {
              $size:
                "$visitors",
            },
          },
        },

        {
          $sort: {
            views: -1,
          },
        },

        {
          $limit: 10,
        },
      ]),

      /*
       * Devices.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },
          },
        },

        {
          $group: {
            _id: "$device",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },
      ]),

      /*
       * Browsers.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },
          },
        },

        {
          $group: {
            _id: "$browser",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },
      ]),

      /*
       * Operating systems.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },
          },
        },

        {
          $group: {
            _id: "$os",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },
      ]),

      /*
       * Countries.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },

            countryCode: {
              $exists: true,

              $ne: "",
            },
          },
        },

        {
          $group: {
            _id: "$countryCode",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 10,
        },
      ]),

      /*
       * Referrers.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },

            referrerDomain: {
              $exists: true,

              $ne: "",
            },
          },
        },

        {
          $group: {
            _id: "$referrerDomain",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 10,
        },
      ]),

      /*
       * Daily traffic.
       */
      VisitorEvent.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
            },
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year:
                  "$createdAt",
              },

              month: {
                $month:
                  "$createdAt",
              },

              day: {
                $dayOfMonth:
                  "$createdAt",
              },
            },

            views: {
              $sum: 1,
            },

            visitors: {
              $addToSet:
                "$visitorId",
            },
          },
        },

        {
          $project: {
            _id: 0,

            date: {
              $dateFromParts: {
                year: "$_id.year",

                month: "$_id.month",

                day: "$_id.day",
              },
            },

            views: 1,

            visitors: {
              $size:
                "$visitors",
            },
          },
        },

        {
          $sort: {
            date: 1,
          },
        },
      ]),
    ]);

    /* -------------------------------------------------------
       ACTIVE SESSIONS
    ------------------------------------------------------- */

    const activeSessions =
      await VisitorEvent.distinct(
        "sessionId",
        {
          createdAt: {
            $gte: activeSince,
          },
        }
      );

    /* -------------------------------------------------------
       FORMAT RESPONSE
    ------------------------------------------------------- */

    return NextResponse.json({
      success: true,

      data: {
        range: `${days}d`,

        overview: {
          views: totalEvents,

          visitors:
            uniqueVisitors.length,

          sessions:
            uniqueSessions.length,

          todayViews:
            todayEvents,

          todayVisitors:
            todayVisitors.length,

          activeSessions:
            activeSessions.length,
        },

        topPages:
          topPages.map(
            (page) => ({
              path: page.path,

              views: page.views,

              visitors:
                page.visitors,
            })
          ),

        devices:
          devices.map(
            (item) => ({
              name:
                item._id ||
                "Unknown",

              count:
                item.count,
            })
          ),

        browsers:
          browsers.map(
            (item) => ({
              name:
                item._id ||
                "Unknown",

              count:
                item.count,
            })
          ),

        operatingSystems:
          operatingSystems.map(
            (item) => ({
              name:
                item._id ||
                "Unknown",

              count:
                item.count,
            })
          ),

        countries:
          countries.map(
            (item) => ({
              name:
                item._id ||
                "Unknown",

              count:
                item.count,
            })
          ),

        referrers:
          referrers.map(
            (item) => ({
              name:
                item._id ||
                "Direct",

              count:
                item.count,
            })
          ),

        dailyTraffic:
          dailyTraffic.map(
            (item) => ({
              date:
                item.date,

              views:
                item.views,

              visitors:
                item.visitors,
            })
          ),
      },
    });
  } catch (error) {
    console.error(
      "Analytics dashboard error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load analytics",
      },
      {
        status: 500,
      }
    );
  }
}