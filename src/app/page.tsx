"use client";

import MaxWidthWrapper from "../app/components/ui/MaxWidthWrapper";
import { Button, buttonVariants } from "../app/components/ui/button";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { GoogleGeminiEffect } from "./components/google-gemini-effect";
import {  useMotionValue } from "framer-motion";



// Define initial motion values for path animations
const usePathLengths = () => {
  return [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
};

const perks = [
  {
    name: "Stay Secure Online",
    Icon: ShieldCheck,
    description: "Learn best practices to protect your personal and professional data from cyber threats.",
  },
  {
    name: "Phishing Awareness",
    Icon: AlertTriangle,
    description: "Understand how to identify phishing emails and malicious links before clicking.",
  },
  {
    name: "Strong Passwords Matter",
    Icon: Lock,
    description: "Use password managers and create strong, unique passwords to safeguard your accounts.",
  },
];

export default function Home() {
  const pathLengths = usePathLengths(); // Initialize motion values

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Effect (Moved Above Content) */}
      <div className="absolute inset-0">
        <GoogleGeminiEffect pathLengths={pathLengths} className="absolute inset-0 opacity-80" />
      </div>

      {/* Page Content */}
      <div className="relative z-10 py-20 mx-auto text-center flex flex-col items-center w-full">
        <MaxWidthWrapper>
          <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Empower yourself with{" "}
              <span className="text-blue-600">cybersecurity awareness</span>.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-gray-300">
              Our platform provides interactive training to help you recognize cyber threats, protect your data, and improve your online security habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/training" className={buttonVariants()}>
                Start Learning
              </Link>
              <Button variant="ghost">Learn More &rarr;</Button>
            </div>
          </div>
        </MaxWidthWrapper>

        {/* Perks Section */}
        <section className="border-t border-gray-700 bg-black bg-opacity-60 w-full">
          <MaxWidthWrapper className="py-20">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      {<perk.Icon className="w-1/3 h-1/3" />}
                    </div>
                  </div>
                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-white">{perk.name}</h3>
                    <p className="mt-3 text-sm text-gray-300">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      </div>
    </div>
  );
}
