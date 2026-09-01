import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  Mail,
  Eye,
  Shield,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ImageOff,
  Users,
  Activity,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Message from "@/models/Message";
import VisitorEvent from "@/models/VisitorEvent";
import { auth } from "@/lib/auth";

interface RecentProject {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  status: string;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: Date;
}

interface VisitorTrendEvent {
  visitorId: string;
  createdAt: Date;
}

interface VisitorAnalytics {
  totalVisitors: number;
  todayVisitors: number;
  todayPageViews: number;
  activeSessions: number;
  trend: number[];
}

interface DashboardData {
  projectsCount: number;
  liveCount: number;
  messagesCount: number;
  unreadCount: number;

  recentProjects: RecentProject[];
  recentMessages: RecentMessage[];

  projectTrend: number[];
  messageTrend: number[];

  addedThisWeek: number;

  visitors: VisitorAnalytics;
}

/* =========================================================
   DATE HELPERS
========================================================= */

function startOfDay(date = new Date()) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

function startOfDaysAgo(days: number) {
  const result = startOfDay();

  result.setDate(result.getDate() - days);

  return result;
}

/**
 * Creates seven daily buckets:
 *
 * [6 days ago, 5 days ago, ... yesterday, today]
 */
function buildDailyTrend(
  dates: Date[],
  days = 7
): number[] {
  const today = startOfDay();

  return Array.from({ length: days }, (_, index) => {
    const bucketStart = new Date(today);

    bucketStart.setDate(
      today.getDate() - (days - 1 - index)
    );

    const bucketEnd = new Date(bucketStart);

    bucketEnd.setDate(
      bucketStart.getDate() + 1
    );

    return dates.filter((date) => {
      return (
        date >= bucketStart &&
        date < bucketEnd
      );
    }).length;
  });
}

/**
 * Builds a unique visitor trend for the last 7 days.
 */
function buildUniqueVisitorTrend(
  events: VisitorTrendEvent[],
  days = 7
): number[] {
  const today = startOfDay();

  return Array.from({ length: days }, (_, index) => {
    const bucketStart = new Date(today);

    bucketStart.setDate(
      today.getDate() - (days - 1 - index)
    );

    const bucketEnd = new Date(bucketStart);

    bucketEnd.setDate(
      bucketStart.getDate() + 1
    );

    const visitors = new Set<string>();

    for (const event of events) {
      const createdAt = new Date(event.createdAt);

      if (
        createdAt >= bucketStart &&
        createdAt < bucketEnd
      ) {
        visitors.add(event.visitorId);
      }
    }

    return visitors.size;
  });
}

/* =========================================================
   DASHBOARD DATA
========================================================= */

async function getDashboardData(): Promise<DashboardData> {
  await connectDB();

  const today = startOfDay();

  const sevenDaysAgo = startOfDaysAgo(6);

  const thirtyMinutesAgo = new Date(
    Date.now() - 30 * 60 * 1000
  );

  const [
    projectsCount,
    liveCount,
    messagesCount,
    unreadCount,

    recentProjectsRaw,
    recentMessagesRaw,

    totalVisitors,
    todayVisitors,
    todayPageViews,
    activeSessions,

    visitorTrendEvents,
    projectTrendEvents,
    messageTrendEvents,
  ] = await Promise.all([
    /* -------------------------------------------------------
       PROJECT COUNTS
    ------------------------------------------------------- */

    Project.countDocuments(),

    Project.countDocuments({
      status: "Live",
    }),

    /* -------------------------------------------------------
       MESSAGE COUNTS
    ------------------------------------------------------- */

    Message.countDocuments(),

    Message.countDocuments({
      status: "pending",
    }),

    /* -------------------------------------------------------
       RECENT PROJECTS
    ------------------------------------------------------- */

    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({
        title: 1,
        slug: 1,
        image: 1,
        category: 1,
        status: 1,
      })
      .lean(),

    /* -------------------------------------------------------
       RECENT MESSAGES
    ------------------------------------------------------- */

    Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({
        name: 1,
        email: 1,
        subject: 1,
        status: 1,
        createdAt: 1,
      })
      .lean(),

    /* -------------------------------------------------------
       ALL-TIME UNIQUE VISITORS
    ------------------------------------------------------- */

    VisitorEvent.distinct("visitorId"),

    /* -------------------------------------------------------
       UNIQUE VISITORS TODAY
    ------------------------------------------------------- */

    VisitorEvent.distinct("visitorId", {
      createdAt: {
        $gte: today,
      },
    }),

    /* -------------------------------------------------------
       PAGE VIEWS TODAY
    ------------------------------------------------------- */

    VisitorEvent.countDocuments({
      createdAt: {
        $gte: today,
      },
    }),

    /* -------------------------------------------------------
       ACTIVE SESSIONS
    ------------------------------------------------------- */

    VisitorEvent.distinct("sessionId", {
      createdAt: {
        $gte: thirtyMinutesAgo,
      },
    }),

    /* -------------------------------------------------------
       VISITOR TREND EVENTS
    ------------------------------------------------------- */

    VisitorEvent.find({
      createdAt: {
        $gte: sevenDaysAgo,
      },
    })
      .select({
        visitorId: 1,
        createdAt: 1,
      })
      .lean(),

    /* -------------------------------------------------------
       PROJECT TREND
    ------------------------------------------------------- */

    Project.find({
      createdAt: {
        $gte: sevenDaysAgo,
      },
    })
      .select({
        createdAt: 1,
      })
      .lean(),

    /* -------------------------------------------------------
       MESSAGE TREND
    ------------------------------------------------------- */

    Message.find({
      createdAt: {
        $gte: sevenDaysAgo,
      },
    })
      .select({
        createdAt: 1,
      })
      .lean(),
  ]);

  /* =========================================================
     RECENT PROJECTS
  ========================================================= */

  const recentProjects: RecentProject[] =
    recentProjectsRaw.map((project) => ({
      id: String(project._id),
      title: project.title,
      slug: project.slug,
      image: project.image ?? "",
      category: project.category,
      status: project.status,
    }));

  /* =========================================================
     RECENT MESSAGES
  ========================================================= */

  const recentMessages: RecentMessage[] =
    recentMessagesRaw.map((message) => ({
      id: String(message._id),
      name: message.name,
      email: message.email,
      subject: message.subject,
      status: message.status,
      createdAt: new Date(message.createdAt),
    }));

  /* =========================================================
     PROJECT TREND
  ========================================================= */

  const projectTrend = buildDailyTrend(
    projectTrendEvents.map(
      (project) => new Date(project.createdAt)
    )
  );

  /* =========================================================
     MESSAGE TREND
  ========================================================= */

  const messageTrend = buildDailyTrend(
    messageTrendEvents.map(
      (message) => new Date(message.createdAt)
    )
  );

  /* =========================================================
     PROJECTS ADDED THIS WEEK
  ========================================================= */

  const addedThisWeek = projectTrend.reduce(
    (total, value) => total + value,
    0
  );

  /* =========================================================
     VISITOR TREND
  ========================================================= */

  const visitorTrend =
    buildUniqueVisitorTrend(
      visitorTrendEvents.map((event) => ({
        visitorId: event.visitorId,
        createdAt: new Date(event.createdAt),
      }))
    );

  /* =========================================================
     RETURN
  ========================================================= */

  return {
    projectsCount,
    liveCount,

    messagesCount,
    unreadCount,

    recentProjects,
    recentMessages,

    projectTrend,
    messageTrend,

    addedThisWeek,

    visitors: {
      totalVisitors: totalVisitors.length,
      todayVisitors: todayVisitors.length,
      todayPageViews,
      activeSessions: activeSessions.length,
      trend: visitorTrend,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function AdminDashboardPage() {
  const session = await auth();

  const userName =
    session?.user?.name || "Admin";

  const data = await getDashboardData();

  const {
    projectsCount,
    liveCount,
    messagesCount,
    unreadCount,
    recentProjects,
    recentMessages,
    projectTrend,
    messageTrend,
    addedThisWeek,
    visitors,
  } = data;

  return (
    <div className="space-y-8 pb-10">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Good {getGreeting()}, {userName}
          <span className="ml-2">✨</span>
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Here&apos;s what&apos;s happening with your portfolio
          today.
        </p>
      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={formatNumber(projectsCount)}
          delta={
            projectsCount === 0
              ? "No projects yet"
              : addedThisWeek > 0
                ? `+${addedThisWeek} this week`
                : "No new projects this week"
          }
          icon={
            <FolderKanban className="h-5 w-5" />
          }
          gradient="from-violet-500 to-purple-600"
          trend={projectTrend}
          href="/admin/projects"
          flat={projectsCount === 0}
        />

        <StatCard
          title="Messages"
          value={formatNumber(messagesCount)}
          delta={
            messagesCount === 0
              ? "No messages yet"
              : unreadCount > 0
                ? `${unreadCount} unread`
                : "All read"
          }
          icon={
            <Mail className="h-5 w-5" />
          }
          gradient="from-orange-400 to-pink-500"
          trend={messageTrend}
          href="/admin/messages"
          flat={messagesCount === 0}
        />

        <StatCard
          title="Visitors"
          value={formatNumber(
            visitors.totalVisitors
          )}
          delta={
            visitors.todayVisitors > 0
              ? `${formatNumber(
                  visitors.todayVisitors
                )} today`
              : "No visitors today"
          }
          icon={
            <Eye className="h-5 w-5" />
          }
          gradient="from-emerald-400 to-teal-500"
          trend={visitors.trend}
          href="/admin/analytics"
          flat={
            visitors.totalVisitors === 0
          }
        />

        <StatCard
          title="Status"
          value="Online"
          delta="Database connected"
          icon={
            <Shield className="h-5 w-5" />
          }
          gradient="from-fuchsia-500 to-violet-600"
          trend={[1, 1, 1, 1, 1, 1, 1]}
          flat
        />
      </section>

      {/* =====================================================
          ANALYTICS SNAPSHOT
      ====================================================== */}

      <section className="grid gap-5 md:grid-cols-3">
        <AnalyticsMiniCard
          icon={
            <Users className="h-4 w-4" />
          }
          label="Unique visitors"
          value={formatNumber(
            visitors.totalVisitors
          )}
          description="All-time visitors"
        />

        <AnalyticsMiniCard
          icon={
            <Activity className="h-4 w-4" />
          }
          label="Today"
          value={formatNumber(
            visitors.todayVisitors
          )}
          description={`${formatNumber(
            visitors.todayPageViews
          )} page views`}
        />

        <AnalyticsMiniCard
          icon={
            <Eye className="h-4 w-4" />
          }
          label="Active now"
          value={formatNumber(
            visitors.activeSessions
          )}
          description="Sessions in last 30 minutes"
        />
      </section>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Hero */}

        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-secondary/10 p-7 shadow-sm sm:p-8 xl:col-span-2">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />

                {projectsCount === 0
                  ? "Let's get started"
                  : "Keep it fresh"}
              </span>

              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Showcase your latest work
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                {projectsCount === 0
                  ? "You haven't added any projects yet. Add your first one to bring your portfolio to life."
                  : "Add your newest project to keep your portfolio fresh and ready for the next opportunity."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/admin/projects/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  Add Project

                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/admin/projects"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-xl sm:flex">
              <FolderKanban className="h-12 w-12" />
            </div>
          </div>
        </div>

        {/* Site insights */}

        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />

            <h2 className="text-sm font-semibold">
              Site Insights
            </h2>
          </div>

          <p className="mb-5 text-xs text-muted-foreground">
            Quick signals from your portfolio
          </p>

          <div className="space-y-3">
            <InsightRow
              label={
                projectsCount === 0
                  ? "No projects published"
                  : `${projectsCount} project${
                      projectsCount === 1
                        ? ""
                        : "s"
                    }`
              }
              hint={
                projectsCount === 0
                  ? "Add your first project to populate your portfolio."
                  : `${liveCount} currently marked as Live.`
              }
            />

            <InsightRow
              label={
                messagesCount === 0
                  ? "No messages yet"
                  : `${messagesCount} message${
                      messagesCount === 1
                        ? ""
                        : "s"
                    } received`
              }
              hint={
                messagesCount === 0
                  ? "Contact form submissions will appear here."
                  : unreadCount > 0
                    ? `${unreadCount} unread message${
                        unreadCount === 1
                          ? ""
                          : "s"
                      } waiting for your reply.`
                    : "All messages have been read."
              }
            />

            <InsightRow
              label={
                visitors.totalVisitors === 0
                  ? "Waiting for visitors"
                  : "Analytics connected"
              }
              hint={
                visitors.totalVisitors === 0
                  ? "Visitor tracking is active and ready."
                  : `${formatNumber(
                      visitors.todayVisitors
                    )} unique visitor${
                      visitors.todayVisitors === 1
                        ? ""
                        : "s"
                    } today.`
              }
              success={
                visitors.totalVisitors > 0
              }
            />

            <Link
              href="/admin/analytics"
              className="flex items-center justify-between rounded-2xl bg-primary/5 p-3 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <span>Open Analytics</span>

              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          RECENT PROJECTS + MESSAGES
      ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-2">
        <RecentProjectsPanel
          projects={recentProjects}
        />

        <RecentMessagesPanel
          messages={recentMessages}
        />
      </section>
    </div>
  );
}

/* =========================================================
   GREETING
========================================================= */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "morning";
  }

  if (hour < 18) {
    return "afternoon";
  }

  return "evening";
}

/* =========================================================
   NUMBER FORMATTER
========================================================= */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  delta,
  icon,
  gradient,
  trend,
  flat = false,
  href,
}: {
  title: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  gradient: string;
  trend: number[];
  flat?: boolean;
  href?: string;
}) {
  const content = (
    <div className="group rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-center justify-between">
        <div
          className={`rounded-2xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg`}
        >
          {icon}
        </div>

        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>

      <h3 className="mt-6 text-sm font-medium text-muted-foreground">
        {title}
      </h3>

      <p className="mt-1 text-3xl font-bold tracking-tight">
        {value}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <span
          className={`flex min-w-0 items-center gap-1 text-xs font-medium ${
            flat
              ? "text-muted-foreground"
              : "text-emerald-500"
          }`}
        >
          {!flat && (
            <TrendingUp className="h-3 w-3 shrink-0" />
          )}

          <span className="truncate">
            {delta}
          </span>
        </span>

        <Sparkline data={trend} />
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="block rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {content}
    </Link>
  );
}

/* =========================================================
   ANALYTICS MINI CARD
========================================================= */

function AnalyticsMiniCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-2xl font-bold tracking-tight">
          {value}
        </p>

        <span className="text-right text-[11px] text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SPARKLINE
========================================================= */

function Sparkline({
  data,
}: {
  data: number[];
}) {
  const width = 72;
  const height = 28;

  if (!data.length) {
    return null;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x =
      data.length === 1
        ? width / 2
        : (index / (data.length - 1)) *
          width;

    const y =
      height -
      ((value - min) / range) * height;

    return `${x},${y}`;
  });

  const gradientId = `sparkline-gradient-${Math.random()
    .toString(36)
    .slice(2, 10)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible text-primary"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="currentColor"
            stopOpacity="0.25"
          />

          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <polygon
        points={`0,${height} ${points.join(
          " "
        )} ${width},${height}`}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/* =========================================================
   INSIGHT ROW
========================================================= */

function InsightRow({
  label,
  hint,
  success = false,
}: {
  label: string;
  hint: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 p-3">
      <div className="flex items-center gap-2">
        {success && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        )}

        <p className="text-sm font-medium">
          {label}
        </p>
      </div>

      <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

/* =========================================================
   RECENT PROJECTS
========================================================= */

function RecentProjectsPanel({
  projects,
}: {
  projects: RecentProject[];
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Projects
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest portfolio work
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
          No projects yet — add one to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}/edit`}
              className="flex items-center gap-3 rounded-2xl border border-border/60 p-3 transition hover:bg-muted/40"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <ImageOff className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {project.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {project.category} ·{" "}
                  {project.status}
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   RECENT MESSAGES
========================================================= */

function RecentMessagesPanel({
  messages,
}: {
  messages: RecentMessage[];
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Messages
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Latest contact form submissions
          </p>
        </div>

        <Link
          href="/admin/messages"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {messages.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
          No messages yet — contact form submissions will
          appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Link
              key={message.id}
              href={`/admin/messages/${message.id}`}
              className="flex items-start gap-3 rounded-2xl border border-border/60 p-3 transition hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-semibold text-white">
                {message.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">
                    {message.name}
                  </p>

                  {message.status ===
                    "pending" && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}
                </div>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3 shrink-0 text-muted-foreground" />

                  <p className="truncate text-xs text-muted-foreground">
                    {message.subject}
                  </p>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(message.createdAt)}
                </p>
              </div>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(new Date(date));
}