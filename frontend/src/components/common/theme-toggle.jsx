import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/utils";

const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-0.5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          aria-pressed={theme === value}
          className={cn(
            "relative flex h-7 w-7 items-center justify-center rounded-full transition-colors",
            theme === value
              ? "bg-[rgb(var(--surface))] text-signal-500 shadow-sm"
              : "text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
