"use client";

import MaxWidthWrapper from "../app/components/ui/MaxWidthWrapper";
import { Button, buttonVariants } from "../app/components/ui/button";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { GoogleGeminiEffect } from "./components/google-gemini-effect";
import { useMotionValue } from "framer-motion";

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
  const pathLengths = usePathLengths();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GoogleGeminiEffect pathLengths={pathLengths} className="absolute inset-0 opacity-80" />
      </div>

      <div className="relative z-10 py-20 mx-auto text-center flex flex-col items-center w-full bg-gradient-to-b from-teal-400 via-blue-600 to-indigo-800">
        <MaxWidthWrapper>
          <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Empower yourself with <span className="text-yellow-300">cybersecurity awareness</span>.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-gray-200">
              Our platform provides interactive training to help you recognize cyber threats, protect your data, and improve your online security habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/pre-assessment">
                <Button className="bg-white text-black hover:bg-gray-200">Start Learning</Button>
              </Link>
              <Link href="updates">
              <Button variant="outline" className="bg-white text-black hover:bg-gray-200">Learn More &rarr;</Button>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <section className="w-full bg-gray-100">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-800">{perk.name}</h3>
                  <p className="mt-3 text-sm text-gray-600">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="w-full bg-white py-20">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-bold text-gray-900 text-center">Whole Community Support</h2>
          <p className="mt-4 text-center text-gray-600 max-w-xl mx-auto">
            Engage schools, families, and the broader community with practical strategies for digital wellbeing.
          </p>
        </MaxWidthWrapper>
      </section>

      <section className="w-full bg-black relative aspect-video">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-contain"
  >
    <source
      src="https://customer-dw39qtoqfalq4969.cloudflarestream.com/8bfdcce5cca8047e2186dafe9bc83939/downloads/default.mp4"
      type="video/mp4"
    />
  </video>
</section>


      <section className="bg-gray-100 w-full py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Educator Hub for Cyber Awareness
            </h2>
            <p className="text-gray-700 text-base mb-6">
              Empower teachers and educators with the latest tools and training for teaching online safety. Access interactive modules, downloadable lesson plans, and real-world case studies to help you create a cyber-smart generation.
            </p>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-2">
              <li>Download ready-to-use lesson plans</li>
              <li>Get certified with our training modules</li>
              <li>Join a growing educator community</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cybersafetyproject.com/wp-content/uploads/2024/08/Online-Safety-Educator-Hub.svg"
              alt="Online Safety Educator Hub"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
