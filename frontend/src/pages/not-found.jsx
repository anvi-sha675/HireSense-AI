import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-6xl font-bold">404</h1>
      <p className="mt-2 text-[rgb(var(--fg-muted))]">
        This page wandered off. Let's get you back on track.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
