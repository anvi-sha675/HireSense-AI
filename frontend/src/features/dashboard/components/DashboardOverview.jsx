import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarClock, Mic, ArrowUpRight, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { StatCard } from "@/components/dashboard/stat-card";
import { HiringReadinessCard } from "@/components/dashboard/hiring-readiness-card";
import { useAuthStore } from "@/store/auth-store";
import {
  useDashboardStats,
  useRecentInterviews,
  useSkillRadar,
  useWeeklyProgress,
} from "@/features/dashboard/hooks/use-dashboard";
import { scoreTone } from "@/utils";

export function DashboardOverview() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: interviews, isLoading: interviewsLoading } =
    useRecentInterviews();
  const { data: radar, isLoading: radarLoading } = useSkillRadar();
  const { data: progress, isLoading: progressLoading } = useWeeklyProgress();

  const firstName = user?.name?.split(" ")[0] ?? "there";

  const secondaryMetrics = stats
    ? [
        {
          label: "ATS Score",
          score: stats.atsScore,
          trend: 6,
          hint: "How cleanly applicant tracking systems can parse your resume.",
        },
        {
          label: "Resume Match",
          score: stats.resumeMatch,
          trend: 3,
          hint: "Overlap between your resume and your target job description.",
        },
        {
          label: "Interview Score",
          score: stats.interviewScore,
          trend: 9,
          hint: "Average score across your recent mock interviews.",
        },
        {
          label: "Communication",
          score: stats.communicationScore,
          trend: 4,
          hint: "Clarity and pacing of your spoken answers.",
        },
      ]
    : [];

  const weakestMetric = secondaryMetrics.length
    ? secondaryMetrics.reduce((lowest, current) =>
        current.score < lowest.score ? current : lowest,
      )
    : null;

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
            Here's where your prep stands this week.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/interview">
            <Button>
              <Mic className="h-4 w-4" /> New mock interview
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <HiringReadinessCard
            score={stats?.hiringProbability}
            loading={statsLoading || !stats}
            weakestMetric={weakestMetric}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-4">
          {statsLoading || !stats
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-21.5" />
              ))
            : secondaryMetrics.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 0.05} />
              ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly progress</CardTitle>
            <CardDescription>
              ATS score vs. interview score, tracked over your last 6 weeks.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {progressLoading || !progress ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progress}
                  margin={{ left: -20, right: 10, top: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="atsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-signal-500)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-signal-500)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="interviewGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-confidence-500)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-confidence-500)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgb(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "rgb(var(--fg-muted))" }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgb(var(--surface))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: 12,
                      fontSize: 13,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="atsScore"
                    name="ATS Score"
                    stroke="var(--color-signal-500)"
                    fill="url(#atsGradient)"
                    strokeWidth={2.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="interviewScore"
                    name="Interview Score"
                    stroke="var(--color-confidence-500)"
                    fill="url(#interviewGradient)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skill analysis</CardTitle>
            <CardDescription>
              From your most recent interview session.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            {radarLoading || !radar ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar} outerRadius="75%">
                  <PolarGrid stroke="rgb(var(--border))" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fontSize: 11, fill: "rgb(var(--fg-muted))" }}
                  />
                  <Radar
                    dataKey="score"
                    stroke="var(--color-signal-500)"
                    fill="var(--color-signal-500)"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent interviews</CardTitle>
            <CardDescription>
              Your latest practice sessions and what's coming up.
            </CardDescription>
          </div>
          <Link to="/dashboard/reports">
            <Button variant="ghost" size="sm">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {interviewsLoading || !interviews ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : interviews.length === 0 ? (
            <EmptyState
              icon={Mic}
              title="No interviews yet"
              description="Run your first mock interview to start building your progress history."
              actionLabel="Start an interview"
            />
          ) : (
            <div className="divide-y divide-[rgb(var(--border))]">
              {interviews.map((interview, i) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col gap-3 rounded-sm px-2.5 py-3.5 -mx-2.5 transition-colors hover:bg-[rgb(var(--surface-2))] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-signal-500/10 text-signal-500">
                      {interview.status === "scheduled" ? (
                        <CalendarClock className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{interview.role}</p>
                      <p className="text-xs text-[rgb(var(--fg-muted))]">
                        {interview.company} ·{" "}
                        {new Date(interview.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    {interview.status === "scheduled" ? (
                      <Badge variant="outline">Scheduled</Badge>
                    ) : (
                      <Badge
                        variant={scoreTone(interview.score)}
                        className="font-stat"
                      >
                        {interview.score} / 100
                      </Badge>
                    )}
                    <span className="text-xs text-[rgb(var(--fg-muted))]">
                      {interview.durationMinutes} min
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold">
              Add a job description to sharpen your next session
            </p>
            <p className="mt-0.5 text-sm text-[rgb(var(--fg-muted))]">
              Interview questions get more specific when we know the target
              role.
            </p>
          </div>
          <Link to="/dashboard/job-description" className="shrink-0">
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4" /> Add job description
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
