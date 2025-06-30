import { Suspense } from "react";
import PostAssessmentClient from "./PostAssessmentClient";

export default function PostAssessmentPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading quiz…</p>}>
      <PostAssessmentClient />
    </Suspense>
  );
}
