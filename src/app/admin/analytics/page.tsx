import {
  Activity,
  BarChart3,
  Eye,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  Users,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import VisitorEvent from "@/models/VisitorEvent";

interface TopPage {
  path: string;
  views: number;
  visitors: number;
}

interface BreakdownItem {
  name: string;
  count: number;
}

interface DailyTraffic {
  date: string;
  views: number;
  visitors: number;
}

interface AnalyticsData {
  range: string;

  overview: {
    views: number;
    visitors: number;
    sessions: number;
    todayViews: number;
    todayVisitors: number;
    activeSessions: number;
  };

  topPages: TopPage[];

  devices: BreakdownItem[];
  browsers: BreakdownItem[];
  operatingSystems: BreakdownItem[];
  countries: BreakdownItem[];
  referrers: BreakdownItem[];

  dailyTraffic: DailyTraffic[];
}

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

/* =========================================================
   ANALYTICS
========================================================= */

async function getAnalytics(
  days = 7
): Promise<AnalyticsData> {
  await connectDB();

  const startDate =
    startOfDay();

  startDate.setDate(
    startDate.getDate() -
      (days - 1)
  );

  const today =
    startOfDay();

  const activeSince =
    new Date(
      Date.now() -
        30 * 60 * 1000
    );

  const [
    views,
    visitors,
    sessions,
    todayViews,
    todayVisitors,
    activeSessions,
    topPages,
    devices,
    browsers,
    operatingSystems,
    countries,
    referrers,
    dailyTraffic,
  ] = await Promise.all([
    VisitorEvent.countDocuments({
      createdAt: {
        $gte: startDate,
      },
    }),

    VisitorEvent.distinct(
      "visitorId",
      {
        createdAt: {
          $gte: startDate,
        },
      }
    ),

    VisitorEvent.distinct(
      "sessionId",
      {
        createdAt: {
          $gte: startDate,
        },
      }
    ),

    VisitorEvent.countDocuments({
      createdAt: {
        $gte: today,
      },
    }),

    VisitorEvent.distinct(
      "visitorId",
      {
        createdAt: {
          $gte: today,
        },
      }
    ),

    VisitorEvent.distinct(
      "sessionId",
      {
        createdAt: {
          $gte: activeSince,
        },
      }
    ),

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

  return {
    range: `${days}d`,

    overview: {
      views,

      visitors:
        visitors.length,

      sessions:
        sessions.length,

      todayViews,

      todayVisitors:
        todayVisitors.length,

      activeSessions:
        activeSessions.length,
    },

    topPages:
      topPages.map(
        (item) => ({
          path: item.path,

          views: item.views,

          visitors:
            item.visitors,
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
            new Date(
              item.date
            ).toISOString(),

          views:
            item.views,

          visitors:
            item.visitors,
        })
      ),
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function AdminAnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const analytics =
    await getAnalytics(7);

  const maxViews = Math.max(
    ...analytics.dailyTraffic.map(
      (item) => item.views
    ),
    1
  );

  return (
    <div className="space-y-8 pb-10">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Analytics
            </h1>

            <p className="mt-1 text-muted-foreground">
              Understand how visitors interact with your portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          icon={
            <Users className="h-5 w-5" />
          }
          label="Unique Visitors"
          value={
            analytics.overview
              .visitors
          }
          description="Last 7 days"
        />

        <AnalyticsCard
          icon={
            <Eye className="h-5 w-5" />
          }
          label="Page Views"
          value={
            analytics.overview
              .views
          }
          description="Last 7 days"
        />

        <AnalyticsCard
          icon={
            <Activity className="h-5 w-5" />
          }
          label="Active Sessions"
          value={
            analytics.overview
              .activeSessions
          }
          description="Last 30 minutes"
        />

        <AnalyticsCard
          icon={
            <Globe2 className="h-5 w-5" />
          }
          label="Today"
          value={
            analytics.overview
              .todayVisitors
          }
          description={`${analytics.overview.todayViews.toLocaleString()} page views`}
        />
      </section>

      {/* =====================================================
          TRAFFIC
      ====================================================== */}

      <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-7">
          <h2 className="text-xl font-semibold">
            Visitor Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Visitors and page views over the last 7 days.
          </p>
        </div>

        {analytics.dailyTraffic.length ===
        0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            No visitor activity yet.
          </div>
        ) : (
          <div className="space-y-5">
            {analytics.dailyTraffic.map(
              (day) => {
                const width =
                  (day.views /
                    maxViews) *
                  100;

                return (
                  <div
                    key={
                      day.date
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {new Date(
                          day.date
                        ).toLocaleDateString(
                          undefined,
                          {
                            weekday:
                              "short",
                            month:
                              "short",
                            day: "numeric",
                          }
                        )}
                      </span>

                      <span className="font-medium">
                        {day.views.toLocaleString()}{" "}
                        views ·{" "}
                        {day.visitors.toLocaleString()}{" "}
                        visitors
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          TOP PAGES + DEVICES
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-2">
        <AnalyticsList
          title="Top Pages"
          items={analytics.topPages.map(
            (page) => ({
              label:
                page.path,

              value:
                `${page.views.toLocaleString()} views`,

              hint:
                `${page.visitors.toLocaleString()} unique visitors`,
            })
          )}
        />

        <AnalyticsList
          title="Devices"
          items={analytics.devices.map(
            (device) => ({
              label:
                device.name,

              value:
                device.count.toLocaleString(),

              hint:
                "page views",
            })
          )}
        />
      </section>

      {/* =====================================================
          COUNTRIES + REFERRERS
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-2">
        <AnalyticsList
          title="Countries"
          items={analytics.countries.map(
            (country) => ({
              label:
                getCountryName(
                  country.name
                ),

              value:
                country.count.toLocaleString(),

              hint:
                country.name,
            })
          )}
        />

        <AnalyticsList
          title="Traffic Sources"
          items={analytics.referrers.map(
            (referrer) => ({
              label:
                referrer.name,

              value:
                referrer.count.toLocaleString(),

              hint:
                "page views",
            })
          )}
        />
      </section>

      {/* =====================================================
          BROWSERS + OPERATING SYSTEMS
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-2">
        <AnalyticsList
          title="Browsers"
          items={analytics.browsers.map(
            (browser) => ({
              label:
                browser.name,

              value:
                browser.count.toLocaleString(),

              hint:
                "page views",
            })
          )}
        />

        <AnalyticsList
          title="Operating Systems"
          items={analytics.operatingSystems.map(
            (os) => ({
              label:
                os.name,

              value:
                os.count.toLocaleString(),

              hint:
                "page views",
            })
          )}
        />
      </section>
    </div>
  );
}

/* =========================================================
   ANALYTICS CARD
========================================================= */

function AnalyticsCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight">
        {value.toLocaleString()}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   ANALYTICS LIST
========================================================= */

function AnalyticsList({
  title,
  items,
}: {
  title: string;

  items: {
    label: string;
    value: string;
    hint: string;
  }[];
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <div className="mt-6 space-y-3">
        {items.length ===
        0 ? (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            No data yet.
          </div>
        ) : (
          items.map(
            (item) => (
              <div
                key={
                  item.label
                }
                className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.hint}
                  </p>
                </div>

                <span className="shrink-0 font-semibold">
                  {item.value}
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   COUNTRY NAMES
========================================================= */

function getCountryName(
  code: string
) {
  if (
    !code ||
    code === "Unknown"
  ) {
    return "Unknown";
  }

  try {
    const displayNames =
      new Intl.DisplayNames(
        ["en"],
        {
          type: "region",
        }
      );

    return (
      displayNames.of(
        code
      ) ?? code
    );
  } catch {
    return code;
  }
}