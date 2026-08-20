import { Radar } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--bg))]">
      <div className="flex flex-col items-center gap-3">
        <span className="flex h-10 w-10 animate-pulse items-center justify-center rounded-lg bg-signal-500 text-white">
          <Radar className="h-5 w-5" />
        </span>
        <span className="text-xs font-medium text-[rgb(var(--fg-muted))]">
          Loading…
        </span>
      </div>
    </div>
  );
}
