import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Mic,
  BarChart3,
  LineChart,
  UserCircle,
  Settings,
  Sun,
  Moon,
  Monitor,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTheme } from "@/lib/theme-provider";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const commands = useMemo(() => {
    const nav = (label, path, icon) => ({
      id: path,
      label,
      group: "Navigate",
      icon,
      action: () => navigate(path),
    });
    const theme = (label, value, icon) => ({
      id: `theme-${value}`,
      label,
      group: "Appearance",
      icon,
      action: () => setTheme(value),
    });

    const items = [
      ...(isAuthenticated
        ? [
            nav("Go to Dashboard", "/dashboard", LayoutDashboard),
            nav("Resume Intelligence", "/dashboard/resume", FileText),
            nav(
              "Job Description Matching",
              "/dashboard/job-description",
              ClipboardList,
            ),
            nav("Mock Interview", "/dashboard/interview", Mic),
            nav("Reports", "/dashboard/reports", BarChart3),
            nav("Analytics", "/dashboard/analytics", LineChart),
            nav("Profile", "/dashboard/profile", UserCircle),
            nav("Settings", "/dashboard/settings", Settings),
          ]
        : [
            nav("Sign in", "/login", UserCircle),
            nav("Create account", "/register", UserCircle),
          ]),
      nav("Home", "/", ArrowRight),
      theme("Switch to light theme", "light", Sun),
      theme("Switch to dark theme", "dark", Moon),
      theme("Use system theme", "system", Monitor),
    ];
    return items;
  }, [isAuthenticated, navigate, setTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const runCommand = (cmd) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  };

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((item, i) => {
      groups[item.group] = groups[item.group] || [];
      groups[item.group].push({ ...item, index: i });
    });
    return groups;
  }, [filtered]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showClose={false}
        className="max-w-xl overflow-hidden p-0 gap-0"
      >
        <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] px-4">
          <Search className="h-4 w-4 shrink-0 text-[rgb(var(--fg-muted))]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, actions, settings…"
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-[rgb(var(--fg-muted))]"
          />
          <kbd className="hidden shrink-0 rounded border border-[rgb(var(--border))] px-1.5 py-0.5 text-[10px] font-medium text-[rgb(var(--fg-muted))] sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[rgb(var(--fg-muted))]">
              No results for "{query}"
            </p>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--fg-muted))]">
                  {group}
                </p>
                {items.map((item) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(item.index)}
                    onClick={() => runCommand(item)}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors",
                      activeIndex === item.index
                        ? "bg-signal-500/10 text-signal-600"
                        : "text-[rgb(var(--fg))]",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {activeIndex === item.index && (
                      <CornerDownLeft className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CommandPaletteHint({ className }) {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true }),
        )
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-3 py-1.5 text-xs text-[rgb(var(--fg-muted))] transition-colors hover:text-[rgb(var(--fg))]",
        className,
      )}
    >
      <Search className="h-3.5 w-3.5" />
      Search
      <kbd className="rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-1.5 py-0.5 font-mono text-[10px]">
        ⌘K
      </kbd>
    </button>
  );
}
