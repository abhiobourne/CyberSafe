"use client";

import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import { useMotionValue } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const usePathLengths = () => [
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
  useMotionValue(0),
];

export default function AboutUsPage() {
  const imageUrl =
    "https://cybersafetyproject.com/wp-content/uploads/2024/08/Online-Safety-for-Families.png";

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Hero + Two Columns Intro */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-teal-400 via-blue-600 to-indigo-800">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">About Us</h1>
            </div>
            <div className="overflow-hidden flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Online Safety For Families"
                className="object-contain max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Section 1 – Grey BG */}
      <section className="bg-gray-100 py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2023, CyberSafe was created after witnessing the growing cyber risks to children and families online. We believe everyone deserves to feel secure on the internet.
          </p>
          <p className="mb-6 text-gray-700">
            At CyberSafe, we&apos;re driven by a mission to empower families, educators, and individuals to stay safe online. Through engaging resources, expert guidance, and community-powered learning, we&apos;re building trust in the digital world.
          </p>
        </MaxWidthWrapper>
      </section>

      {/* Section 2 – White BG */}
      <section className="bg-white py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
            <li>Engaging lessons and quizzes on online safety</li>
            <li>Parent & educator guides with real-world examples</li>
            <li>Community events and webinars</li>
          </ul>
        </MaxWidthWrapper>
      </section>

      {/* Section 3 – Grey BG */}
      <section className="bg-gray-100 py-16">
        <MaxWidthWrapper>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-700">
            We bring together cybersecurity experts, educators, and passionate volunteers who believe in the power of safe, positive digital experiences.
          </p>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
