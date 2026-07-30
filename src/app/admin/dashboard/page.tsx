

// import {
//   FolderKanban,
//   Mail,
//   Eye,
//   Shield,
//   ArrowUpRight,
//   Sparkles,
//   TrendingUp,
// } from "lucide-react";

// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-8">
//       {/* Greeting */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Good {getGreeting()}, Olamilekan
//           <span className="ml-2">✨</span>
//         </h1>
//         <p className="mt-1 text-muted-foreground">
//           Here&apos;s what&apos;s happening with your portfolio today.
//         </p>
//       </div>

//       {/* Stat cards with sparklines */}
//       <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Projects"
//           value="0"
//           delta="+0% this month"
//           icon={<FolderKanban className="h-5 w-5" />}
//           gradient="from-violet-500 to-purple-600"
//           trend={[4, 6, 5, 8, 7, 9, 12]}
//         />

//         <StatCard
//           title="Messages"
//           value="0"
//           delta="0 unread"
//           icon={<Mail className="h-5 w-5" />}
//           gradient="from-orange-400 to-pink-500"
//           trend={[2, 3, 2, 4, 3, 5, 4]}
//         />

//         <StatCard
//           title="Visitors"
//           value="0"
//           delta="Today"
//           icon={<Eye className="h-5 w-5" />}
//           gradient="from-emerald-400 to-teal-500"
//           trend={[10, 14, 9, 16, 20, 18, 24]}
//         />

//         <StatCard
//           title="Status"
//           value="Online"
//           delta="System healthy"
//           icon={<Shield className="h-5 w-5" />}
//           gradient="from-fuchsia-500 to-violet-600"
//           trend={[1, 1, 1, 1, 1, 1, 1]}
//           flat
//         />
//       </section>

//       {/* Main grid */}
//       <section className="grid gap-6 xl:grid-cols-3">
//         {/* Hero / welcome panel */}
//         <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-secondary/10 p-8 shadow-sm xl:col-span-2">
//           <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

//           <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
//             <div>
//               <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
//                 <Sparkles className="h-3.5 w-3.5" />
//                 New Project Ready
//               </span>

//               <h2 className="mt-4 text-3xl font-bold tracking-tight">
//                 Showcase your latest work
//               </h2>

//               <p className="mt-3 max-w-md text-muted-foreground">
//                 Add your newest project to keep your portfolio fresh and
//                 ready for the next opportunity.
//               </p>

//               <div className="mt-6 flex items-center gap-4">
//                 <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-90">
//                   Add Project
//                 </button>

//                 <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
//                   View All Projects
//                 </button>
//               </div>
//             </div>

//             <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
//               <Shield className="h-14 w-14" />
//             </div>
//           </div>
//         </div>

//         {/* Site insights panel */}
//         <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
//           <div className="mb-1 flex items-center gap-2">
//             <Sparkles className="h-4 w-4 text-primary" />
//             <h2 className="text-sm font-semibold">Site Insights</h2>
//           </div>

//           <p className="mb-5 text-xs text-muted-foreground">
//             Quick signals from your portfolio
//           </p>

//           <div className="space-y-3">
//             <InsightRow
//               label="No messages yet"
//               hint="They'll show up here once visitors reach out."
//             />
//             <InsightRow
//               label="No projects published"
//               hint="Add your first project to populate this dashboard."
//             />
//             <InsightRow
//               label="Analytics not connected"
//               hint="Hook up visitor tracking to see live traffic."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Recent Projects + Recent Messages */}
//       <section className="grid gap-6 xl:grid-cols-2">
//         <ListPanel
//           title="Recent Projects"
//           emptyLabel="No projects yet — add one to get started."
//         />

//         <ListPanel
//           title="Recent Messages"
//           emptyLabel="No messages yet — contact form submissions will appear here."
//         />
//       </section>
//     </div>
//   );
// }

// function getGreeting() {
//   const hour = new Date().getHours();
//   if (hour < 12) return "morning";
//   if (hour < 18) return "afternoon";
//   return "evening";
// }

// function StatCard({
//   title,
//   value,
//   delta,
//   icon,
//   gradient,
//   trend,
//   flat = false,
// }: {
//   title: string;
//   value: string;
//   delta: string;
//   icon: React.ReactNode;
//   gradient: string;
//   trend: number[];
//   flat?: boolean;
// }) {
//   return (
//     <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-center justify-between">
//         <div
//           className={`rounded-2xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg`}
//         >
//           {icon}
//         </div>

//         <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
//       </div>

//       <h3 className="mt-6 text-sm font-medium text-muted-foreground">
//         {title}
//       </h3>

//       <p className="mt-1 text-3xl font-bold">{value}</p>

//       <div className="mt-3 flex items-center justify-between">
//         <span
//           className={`flex items-center gap-1 text-xs font-medium ${
//             flat ? "text-muted-foreground" : "text-emerald-500"
//           }`}
//         >
//           {!flat && <TrendingUp className="h-3 w-3" />}
//           {delta}
//         </span>

//         <Sparkline data={trend} gradient={gradient} />
//       </div>
//     </div>
//   );
// }

// function Sparkline({
//   data,
//   gradient,
// }: {
//   data: number[];
//   gradient: string;
// }) {
//   const width = 72;
//   const height = 28;
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min || 1;

//   const points = data.map((d, i) => {
//     const x = (i / (data.length - 1)) * width;
//     const y = height - ((d - min) / range) * height;
//     return `${x},${y}`;
//   });

//   const gradientId = `spark-${gradient.replace(/[^a-z0-9]/gi, "")}`;

//   return (
//     <svg width={width} height={height} className="overflow-visible">
//       <defs>
//         <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
//           <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
//         </linearGradient>
//       </defs>

//       <polyline
//         points={points.join(" ")}
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="text-primary"
//       />

//       <polygon
//         points={`0,${height} ${points.join(" ")} ${width},${height}`}
//         fill={`url(#${gradientId})`}
//         className="text-primary"
//       />
//     </svg>
//   );
// }

// function InsightRow({
//   label,
//   hint,
// }: {
//   label: string;
//   hint: string;
// }) {
//   return (
//     <div className="rounded-2xl border border-dashed border-border/60 p-3">
//       <p className="text-sm font-medium">{label}</p>
//       <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
//     </div>
//   );
// }

// function ListPanel({
//   title,
//   emptyLabel,
// }: {
//   title: string;
//   emptyLabel: string;
// }) {
//   return (
//     <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <button className="text-sm font-medium text-primary hover:underline">
//           View All
//         </button>
//       </div>

//       <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
//         {emptyLabel}
//       </div>
//     </div>
//   );
// }



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
} from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Message from "@/models/Message";
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

async function getDashboardData() {
  await connectDB();

  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();

  const projectsCount = projects.length;
  const liveCount = projects.filter((p) => p.status === "Live").length;
  const messagesCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === "pending").length;

  const recentProjects: RecentProject[] = projects.slice(0, 5).map((p) => ({
    id: String(p._id),
    title: p.title,
    slug: p.slug,
    image: p.image,
    category: p.category,
    status: p.status,
  }));

  const recentMessages: RecentMessage[] = messages.slice(0, 5).map((m) => ({
    id: String(m._id),
    name: m.name,
    email: m.email,
    subject: m.subject,
    status: m.status,
    createdAt: m.createdAt,
  }));

  const trend = buildWeeklyTrend(projects.map((p) => new Date(p.createdAt)));
  const addedThisWeek = trend[trend.length - 1] - trend[trend.length - 2];

  return { 
    projectsCount, 
    liveCount, 
    messagesCount, 
    unreadCount,
    recentProjects, 
    recentMessages,
    trend, 
    addedThisWeek 
  };
}

function buildWeeklyTrend(dates: Date[]) {
  const weeks = 7;
  const now = new Date();
  const buckets: number[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - i * 7);
    buckets.push(dates.filter((d) => d <= cutoff).length);
  }

  return buckets;
}

export default async function AdminDashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || "Admin";
  
  const { 
    projectsCount, 
    liveCount, 
    messagesCount, 
    unreadCount,
    recentProjects, 
    recentMessages,
    trend, 
    addedThisWeek 
  } = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good {getGreeting()}, {userName}
          <span className="ml-2">✨</span>
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stat cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={String(projectsCount)}
          delta={
            projectsCount === 0
              ? "No projects yet"
              : addedThisWeek > 0
              ? `+${addedThisWeek} this week`
              : "No new projects this week"
          }
          icon={<FolderKanban className="h-5 w-5" />}
          gradient="from-violet-500 to-purple-600"
          trend={trend}
          flat={projectsCount === 0}
        />

        <StatCard
          title="Messages"
          value={String(messagesCount)}
          delta={
            messagesCount === 0
              ? "No messages yet"
              : unreadCount > 0
              ? `${unreadCount} unread`
              : "All read"
          }
          icon={<Mail className="h-5 w-5" />}
          gradient="from-orange-400 to-pink-500"
          trend={buildWeeklyTrend(recentMessages.map((m) => new Date(m.createdAt)))}
          flat={messagesCount === 0}
        />

        <StatCard
          title="Visitors"
          value="0"
          delta="Not connected yet"
          icon={<Eye className="h-5 w-5" />}
          gradient="from-emerald-400 to-teal-500"
          trend={[0, 0, 0, 0, 0, 0, 0]}
          flat
        />

        <StatCard
          title="Status"
          value="Online"
          delta="Database connected"
          icon={<Shield className="h-5 w-5" />}
          gradient="from-fuchsia-500 to-violet-600"
          trend={[1, 1, 1, 1, 1, 1, 1]}
          flat
        />
      </section>

      {/* Main grid */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Hero / welcome panel */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-secondary/10 p-8 shadow-sm xl:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {projectsCount === 0 ? "Let's get started" : "Keep it fresh"}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                Showcase your latest work
              </h2>

              <p className="mt-3 max-w-md text-muted-foreground">
                {projectsCount === 0
                  ? "You haven't added any projects yet. Add your first one to bring your portfolio to life."
                  : "Add your newest project to keep your portfolio fresh and ready for the next opportunity."}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/admin/projects/new"
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-90"
                >
                  Add Project
                </Link>

                <Link
                  href="/admin/projects"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
              <Shield className="h-14 w-14" />
            </div>
          </div>
        </div>

        {/* Site insights panel */}
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Site Insights</h2>
          </div>

          <p className="mb-5 text-xs text-muted-foreground">
            Quick signals from your portfolio
          </p>

          <div className="space-y-3">
            {projectsCount === 0 ? (
              <InsightRow
                label="No projects published"
                hint="Add your first project to populate this dashboard."
              />
            ) : (
              <InsightRow
                label={`${projectsCount} project${projectsCount === 1 ? "" : "s"} published`}
                hint={`${liveCount} currently marked as Live.`}
              />
            )}

            <InsightRow
              label={
                messagesCount === 0
                  ? "No messages yet"
                  : `${messagesCount} message${messagesCount === 1 ? "" : "s"} received`
              }
              hint={
                messagesCount === 0
                  ? "They'll show up here once visitors reach out."
                  : unreadCount > 0
                  ? `${unreadCount} unread message${unreadCount === 1 ? "" : "s"} waiting for your reply.`
                  : "All messages have been read."
              }
            />

            <InsightRow
              label="Analytics not connected"
              hint="Hook up visitor tracking to see live traffic."
            />
          </div>
        </div>
      </section>

      {/* Recent Projects + Recent Messages */}
      <section className="grid gap-6 xl:grid-cols-2">
        <RecentProjectsPanel projects={recentProjects} />

        <RecentMessagesPanel messages={recentMessages} />
      </section>
    </div>
  );
}

function getGreeting() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const nigeriaTime = new Date(utc + (3600000 * 1)); // UTC+1 (Nigeria)
  const hour = nigeriaTime.getHours();
  
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

function StatCard({
  title,
  value,
  delta,
  icon,
  gradient,
  trend,
  flat = false,
}: {
  title: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  gradient: string;
  trend: number[];
  flat?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div
          className={`rounded-2xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg`}
        >
          {icon}
        </div>

        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-sm font-medium text-muted-foreground">
        {title}
      </h3>

      <p className="mt-1 text-3xl font-bold">{value}</p>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            flat ? "text-muted-foreground" : "text-emerald-500"
          }`}
        >
          {!flat && <TrendingUp className="h-3 w-3" />}
          {delta}
        </span>

        <Sparkline data={trend} gradient={gradient} />
      </div>
    </div>
  );
}

function Sparkline({
  data,
  gradient,
}: {
  data: number[];
  gradient: string;
}) {
  const width = 72;
  const height = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  });

  const gradientId = `spark-${gradient.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />

      <polygon
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        fill={`url(#${gradientId})`}
        className="text-primary"
      />
    </svg>
  );
}

function InsightRow({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 p-3">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function RecentProjectsPanel({ projects }: { projects: RecentProject[] }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <Link
          href="/admin/projects"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
          No projects yet — add one to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}/edit`}
              className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-muted/40"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
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
                <p className="truncate font-medium">{project.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {project.category} · {project.status}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentMessagesPanel({ messages }: { messages: RecentMessage[] }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Messages</h2>
        <Link
          href="/admin/messages"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {messages.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
          No messages yet — contact form submissions will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Link
              key={message.id}
              href={`/admin/messages/${message.id}`}
              className="flex items-start gap-3 rounded-xl border border-border/60 p-3 transition hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white font-semibold">
                {message.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{message.name}</p>
                  {message.status === "pending" && (
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {message.subject}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ListPanel({
  title,
  emptyLabel,
}: {
  title: string;
  emptyLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    </div>
  );
}
