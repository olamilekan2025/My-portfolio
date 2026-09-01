import {
  BarChart3,
  Eye,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  Users,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getAnalytics } from "@/lib/analytics";

export default async function AdminAnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const analytics = await getAnalytics(7);

  return (
    <div className="space-y-8">
      <div>
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

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          icon={<Users className="h-5 w-5" />}
          label="Unique Visitors"
          value={analytics.totalVisitors}
          description={`${analytics.weekVisitors} this week`}
        />

        <AnalyticsCard
          icon={<Eye className="h-5 w-5" />}
          label="Page Views"
          value={analytics.totalPageViews}
          description={`${analytics.weekPageViews} this week`}
        />

        <AnalyticsCard
          icon={<Users className="h-5 w-5" />}
          label="Visitors Today"
          value={analytics.todayVisitors}
          description={`${analytics.todayPageViews} page views`}
        />

        <AnalyticsCard
          icon={<Globe2 className="h-5 w-5" />}
          label="Today's Views"
          value={analytics.todayPageViews}
          description="Across the portfolio"
        />
      </section>

      <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Visitor Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Visitors and page views over the last 7 days.
          </p>
        </div>

        <div className="space-y-4">
          {analytics.dailyTrend.map((day) => {
            const max = Math.max(
              ...analytics.dailyTrend.map(
                (item) => item.views
              ),
              1
            );

            const width =
              (day.views / max) * 100;

            return (
              <div
                key={day.date}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(
                      day.date
                    ).toLocaleDateString(
                      undefined,
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>

                  <span className="font-medium">
                    {day.views} views ·{" "}
                    {day.visitors} visitors
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
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AnalyticsList
          title="Top Pages"
          items={analytics.topPages.map(
            (page) => ({
              label: page.path,
              value: `${page.views} views`,
              hint: `${page.visitors} unique visitors`,
            })
          )}
        />

        <AnalyticsList
          title="Devices"
          items={analytics.deviceBreakdown.map(
            (device) => ({
              label: device.device,
              value: String(device.count),
              hint: "page views",
            })
          )}
        />
      </section>

      <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Recent Visitor Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest page visits recorded by the portfolio.
          </p>
        </div>

        {analytics.recentVisitors.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            No visitor activity yet.
          </div>
        ) : (
          <div className="space-y-3">
            {analytics.recentVisitors.map(
              (visitor, index) => (
                <div
                  key={`${visitor.createdAt}-${index}`}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {visitor.device ===
                    "mobile" ? (
                      <Smartphone className="h-4 w-4" />
                    ) : visitor.device ===
                      "tablet" ? (
                      <Tablet className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {visitor.path}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {visitor.browser} ·{" "}
                      {visitor.os}
                      {visitor.country
                        ? ` · ${visitor.country}`
                        : ""}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(
                      visitor.createdAt
                    ).toLocaleString()}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

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

      <p className="mt-1 text-3xl font-bold">
        {value.toLocaleString()}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

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
        {items.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            No data yet.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-border/60 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.hint}
                </p>
              </div>

              <span className="font-semibold">
                {item.value}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}