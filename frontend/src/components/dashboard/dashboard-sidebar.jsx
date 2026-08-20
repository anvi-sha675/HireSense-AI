import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Mic,
  BarChart3,
  LineChart,
  Settings,
  UserCircle,
  Radar,
  X,
} from "lucide-react";
import { cn } from "@/utils";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/resume", label: "Resume", icon: FileText },
  { to: "/dashboard/job-description", label: "Job Match", icon: ClipboardList },
  { to: "/dashboard/interview", label: "Interview", icon: Mic },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { to: "/dashboard/analytics", label: "Analytics", icon: LineChart },
];

const bottomItems = [
  { to: "/dashboard/profile", label: "Profile", icon: UserCircle },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavList({ onNavigate, items = navItems }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "group relative flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "text-signal-500"
                : "text-[rgb(var(--fg-muted))] hover:bg-[rgb(var(--surface-2))] hover:text-[rgb(var(--fg))]",
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-sm bg-signal-500/10"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <item.icon className="relative z-10 h-4.5 w-4.5" />
              <span className="relative z-10">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export function DashboardSidebar({ mobileOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[rgb(var(--border))] bg-[rgb(var(--surface))] lg:flex">
        <SidebarHeader />
        <div className="flex flex-1 flex-col py-4">
          <NavList />
          <div className="mt-auto px-3 pb-2">
            <div className="my-3 h-px bg-[rgb(var(--border))]" />
            <NavList items={bottomItems} />
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative flex h-full w-72 flex-col bg-[rgb(var(--surface))]"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <SidebarHeader compact />
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-[rgb(var(--surface-2))]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col py-2">
              <NavList onNavigate={onClose} />
              <div className="mt-auto px-3 pb-4">
                <div className="my-3 h-px bg-[rgb(var(--border))]" />
                {bottomItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? "text-signal-500"
                          : "text-[rgb(var(--fg-muted))]",
                      )
                    }
                  >
                    <item.icon className="h-4.5 w-4.5" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </>
  );
}

function SidebarHeader({ compact }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-5 font-display text-lg font-bold",
        compact ? "" : "py-5",
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-500 text-white">
        <Radar className="h-4 w-4" />
      </span>
      HireSense<span className="text-signal-500">.ai</span>
    </div>
  );
}
