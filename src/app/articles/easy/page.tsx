// app/articles/easy/page.tsx
"use client";

import MaxWidthWrapper from "@/app/components/ui/MaxWidthWrapper";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function EasyArticlePage() {
  return (
    <div className="w-full bg-gray-100 min-h-screen py-16">
      <MaxWidthWrapper>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto text-gray-800">
          <h1 className="text-3xl font-bold mb-6">Understanding Phishing Attacks</h1>

          <p className="mb-4">
            Phishing is a type of cyber attack where attackers try to trick you into giving up personal information such as passwords, credit card numbers, or other sensitive data.
          </p>

          <p className="mb-4">
            Common phishing methods include fake emails, malicious links, and fraudulent websites that impersonate legitimate services.
          </p>

          <p className="mb-4">
            To protect yourself from phishing:
            <ul className="list-disc list-inside mt-2">
              <li>Always verify email senders.</li>
              <li>Hover over links before clicking.</li>
              <li>Use multi-factor authentication.</li>
              <li>Update your software regularly.</li>
            </ul>
          </p>

          <p className="text-sm text-blue-600 mt-6">
            Source: <a href="https://www.cisa.gov/news-events/news/avoid-phishing-attacks-tips-and-resources" target="_blank" className="underline">CISA.gov - Avoid Phishing Attacks</a>
          </p>

          <div className="mt-10 text-center">
            <Link href={`/post-assessment?level=hard`}>
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
