import { Mic } from "lucide-react";
import { ModuleStub } from "@/components/common/module-stub";

export function InterviewOverview() {
  return (
    <ModuleStub
      icon={Mic}
      title="Mock Interview"
      description="Voice or text mock interviews with adaptive follow-up questions."
      bullets={[
        "Role-specific question sets",
        "Live voice recording & transcript",
        "Countdown timer per question",
        "Instant scored feedback on completion",
      ]}
    />
  );
}
