import { LineChart } from "lucide-react";
import { ModuleStub } from "@/components/common/module-stub";

export function AnalyticsOverview() {
  return (
    <ModuleStub
      icon={LineChart}
      title="Analytics"
      description="Trends across every session — radar, line, area, bar, and pie views."
      bullets={[
        "Score trends over time",
        "Skill radar across sessions",
        "Interview volume & completion rate",
        "Exportable data views",
      ]}
    />
  );
}
