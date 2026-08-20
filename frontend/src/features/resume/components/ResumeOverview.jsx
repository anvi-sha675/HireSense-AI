import { FileText } from "lucide-react";
import { ModuleStub } from "@/components/common/module-stub";

export function ResumeOverview() {
  return (
    <ModuleStub
      icon={FileText}
      title="Resume Intelligence"
      description="Upload, score, and iterate on your resume against real ATS parsing logic."
      bullets={[
        "Upload & parse resume (PDF/DOCX)",
        "ATS score breakdown by section",
        "Line-level improvement suggestions",
        "Version history across edits",
      ]}
    />
  );
}
