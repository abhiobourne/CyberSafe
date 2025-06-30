// app/articles/hard/page.tsx
"use client";

import MaxWidthWrapper from "@/app/components/ui/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function HardArticlePage() {
  return (
    <div className="w-full bg-gray-100 min-h-screen py-16">
      <MaxWidthWrapper>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto text-gray-800">
          <h1 className="text-3xl font-bold mb-6">Zero-Day Vulnerabilities Explained</h1>

          <p className="mb-4">
            A zero-day vulnerability is a software flaw that is unknown to the vendor and has no patch or fix available. Cybercriminals exploit these before developers have a chance to resolve them.
          </p>

          <p className="mb-4">
            Zero-day attacks can be highly destructive and are used in state-sponsored cyber warfare, espionage, or high-profile data breaches.
          </p>

          <p className="mb-4">
            Protecting against zero-day threats involves:
            <ul className="list-disc list-inside mt-2">
              <li>Using behavior-based detection systems.</li>
              <li>Applying security patches promptly.</li>
              <li>Monitoring unusual network activity.</li>
              <li>Limiting user privileges to reduce attack surfaces.</li>
            </ul>
          </p>

          <p className="text-sm text-blue-600 mt-6">
            Source: <a href="https://www.wired.com/story/zero-day-vulnerabilities-guide/" target="_blank" className="underline">WIRED - Guide to Zero-Day Vulnerabilities</a>
          </p>

          <div className="mt-10 text-center">
            <Link href="/pre-assessment">
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
