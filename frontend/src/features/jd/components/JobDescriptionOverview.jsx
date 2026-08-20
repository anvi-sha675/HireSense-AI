import { ClipboardList } from "lucide-react";
import { ModuleStub } from "@/components/common/module-stub";

export function JobDescriptionOverview() {
  return (
    <ModuleStub
      icon={ClipboardList}
      title="Job Description Matching"
      description="Paste a job posting to see exactly how your resume stacks up."
      bullets={[
        "Paste or upload a job description",
        "Resume-to-JD match percentage",
        "Missing keyword & skill gap list",
        "Tailored resume suggestions per role",
      ]}
    />
  );
}
