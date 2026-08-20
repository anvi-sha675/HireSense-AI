import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ModuleStub({ icon: Icon, title, description, bullets }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardContent className="p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-signal-500/10 text-signal-500">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-tight">
                  {title}
                </h1>
                <Badge variant="amber">Building next</Badge>
              </div>
              <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
                {description}
              </p>
            </div>
          </div>
          <p className="mt-6 text-eyebrow">On the roadmap</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-sm border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] px-3.5 py-2.5 text-sm text-[rgb(var(--fg-muted))]"
              >
                <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500/60" />
                {b}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
