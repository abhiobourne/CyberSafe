import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold mb-2">WHY CHOOSE US?</p>
          <ul className="text-sm space-y-1">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/about-us#offer">What We Offer</Link></li>
            <li><Link href="/about-us#team">Team</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">UPCOMING</p>
          <ul className="text-sm space-y-1">
            <li><Link href="/">Student Sessions</Link></li>
            <li><Link href="/">Professional Learning</Link></li>
            <li><Link href="/">Parent Sessions</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">INSIGHTS</p>
          <ul className="text-sm space-y-1">
            <li><Link href="/community">Community</Link></li>
            <li><Link href="/art">Resources</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">CONTACT</p>
          <p className="text-sm mb-1">info@cybersafe.com.au</p>
          <p className="text-sm mb-4">1300 114 117</p>
          <div className="flex space-x-4">
            <FaFacebookF className="hover:text-yellow-300" />
            <FaInstagram className="hover:text-yellow-300" />
            <FaLinkedinIn className="hover:text-yellow-300" />
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm font-semibold">
        THE CYBER SAFE PROJECT RESPECTFULLY OPERATES ON KULIN NATION LAND
      </div>
      <p className="text-center text-xs mt-2">COPYRIGHT ©2025 ALL RIGHTS RESERVED, CYBER SAFE PROJECT</p>
    </footer>
  );
}
