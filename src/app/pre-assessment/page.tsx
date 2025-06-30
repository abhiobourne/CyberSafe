// app/pre-assessment/page.tsx
import { Suspense } from "react";
import PreAssessmentClient from "./PreAssessmentClient";

export default function PreAssessmentPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading quiz…</p>}>
      <PreAssessmentClient />
    </Suspense>
  );
}
