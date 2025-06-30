// app/articles/medium/page.tsx
"use client";

import MaxWidthWrapper from "@/app/components/ui/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function MediumArticlePage() {
  return (
    <div className="w-full bg-gray-100 min-h-screen py-16">
      <MaxWidthWrapper>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto text-gray-800">
          <h1 className="text-3xl font-bold mb-6">Types of Cybersecurity Threats</h1>

          <p className="mb-4">
            Cybersecurity threats are malicious attacks aimed at accessing, altering, or destroying sensitive data. These include:
          </p>

          <ul className="list-disc list-inside mb-4 space-y-2">
            <li><strong>Malware:</strong> Malicious software like viruses, worms, and ransomware.</li>
            <li><strong>Phishing:</strong> Fraudulent messages pretending to be reputable sources.</li>
            <li><strong>Insider threats:</strong> Employees or contractors misusing access.</li>
            <li><strong>Man-in-the-middle:</strong> Attacks intercepting communication.</li>
            <li><strong>DDoS:</strong> Distributed attacks flooding systems with traffic.</li>
          </ul>

          <p className="text-sm text-blue-600 mt-6">
            Source: <a href="https://www.ibm.com/topics/cybersecurity-threats" target="_blank" className="underline">IBM - Cybersecurity Threats</a>
          </p>

          <div className="mt-10 text-center">
            <Link href={`/post-assessment?level=medium`}> 
  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
    Retake Quiz
  </Button>
</Link>

          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
