
// /app/article/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function ArticlePage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Cybersecurity Fundamentals</h1>
      <p className="mb-4">
        Cybersecurity involves protecting digital systems, networks, and data from unauthorized access and attacks. By practicing strong password hygiene, avoiding phishing links, and keeping software updated, users can significantly reduce their risk of being targeted.
      </p>
      <p className="mb-4">
        Recognizing common cyber threats, such as phishing, malware, and social engineering, is essential. Using multi-factor authentication, regularly backing up data, and being cautious online are core habits every digital citizen should adopt.
      </p>
      <button
        onClick={() => router.push("/post-assessment")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-6"
      >
        Proceed to Post-Assessment
      </button>
    </div>
  );
}
