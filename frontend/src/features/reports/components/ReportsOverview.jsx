import { BarChart3 } from "lucide-react";
import { ModuleStub } from "@/components/common/module-stub";

export function ReportsOverview() {
  return (
    <ModuleStub
      icon={BarChart3}
      title="Reports"
      description="Downloadable reports for every interview, resume scan, and ATS run."
      bullets={[
        "Per-interview performance report",
        "ATS scoring report",
        "Communication clarity report",
        "One-click PDF export",
      ]}
    />
  );
}
