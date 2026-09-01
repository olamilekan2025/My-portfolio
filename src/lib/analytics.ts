import { connectDB } from "@/lib/mongodb";
import VisitorEvent from "@/models/VisitorEvent";

function startOfDay(date: Date) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
}

export async function getAnalytics(days = 7) {
  await connectDB();

  const now = new Date();

  const todayStart = startOfDay(now);

  const periodStart = startOfDay(
    addDays(now, -(days - 1))
  );

  const [
    totalPageViews,
    totalVisitorsResult,
    todayPageViews,
    todayVisitorsResult,
    weekPageViews,
    weekVisitorsResult,
    topPages,
    deviceBreakdown,
    browserBreakdown,
    recentVisitors,
  ] = await Promise.all([
    VisitorEvent.countDocuments(),

    VisitorEvent.distinct("visitorId"),

    VisitorEvent.countDocuments({
      createdAt: {
        $gte: todayStart,
      },
    }),

    VisitorEvent.distinct("visitorId", {
      createdAt: {
        $gte: todayStart,
      },
    }),

    VisitorEvent.countDocuments({
      createdAt: {
        $gte: periodStart,
      },
    }),

    VisitorEvent.distinct("visitorId", {
      createdAt: {
        $gte: periodStart,
      },
    }),

    VisitorEvent.aggregate([
      {
        $match: {
          createdAt: {
            $gte: periodStart,
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
            $addToSet: "$visitorId",
          },
        },
      },
      {
        $project: {
          _id: 0,
          path: "$_id",
          views: 1,
          visitors: {
            $size: "$visitors",
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
            $gte: periodStart,
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
        $project: {
          _id: 0,
          device: "$_id",
          count: 1,
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
            $gte: periodStart,
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
        $project: {
          _id: 0,
          browser: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]),

    VisitorEvent.find()
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .select(
        "path device browser os country referrerDomain createdAt"
      )
      .lean(),
  ]);

  const dailyTrend = [];

  for (let i = days - 1; i >= 0; i--) {
    const start = startOfDay(
      addDays(now, -i)
    );

    const end = addDays(start, 1);

    const [views, visitors] =
      await Promise.all([
        VisitorEvent.countDocuments({
          createdAt: {
            $gte: start,
            $lt: end,
          },
        }),

        VisitorEvent.distinct("visitorId", {
          createdAt: {
            $gte: start,
            $lt: end,
          },
        }),
      ]);

    dailyTrend.push({
      date: start.toISOString(),
      views,
      visitors: visitors.length,
    });
  }

  return {
    totalVisitors: totalVisitorsResult.length,
    totalPageViews,

    todayVisitors: todayVisitorsResult.length,
    todayPageViews,

    weekVisitors: weekVisitorsResult.length,
    weekPageViews,

    dailyTrend,

    topPages: topPages.map((page) => ({
      path: page.path,
      views: page.views,
      visitors: page.visitors,
    })),

    deviceBreakdown,

    browserBreakdown,

    recentVisitors: recentVisitors.map(
      (visitor) => ({
        path: visitor.path,
        device: visitor.device,
        browser: visitor.browser,
        os: visitor.os,
        country: visitor.country,
        referrerDomain:
          visitor.referrerDomain,
        createdAt: visitor.createdAt,
      })
    ),
  };
}