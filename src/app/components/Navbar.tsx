"use client";

import Link from "next/link";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  // Handler for Watch Demo
  const handleWatchDemo = async () => {
    if (user) {
      router.push("/demo-video"); // ✅ Authenticated: go to demo
    } else {
      openSignIn({ redirectUrl: "/demo-video" }); // ❌ Not Auth: open sign-in and then redirect
    }
  };

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-20 shadow-md">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="ml-4 flex items-center space-x-2 font-bold text-xl">
              <Link href="/" className="border border-black px-2 py-1 relative flex items-center">
                <span className="text-[#00CFCF]">CYBER</span>
                <span className="text-black">SAFE</span>
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-400"></div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex gap-6">
              <Link href="/news" className="text-gray-800 hover:text-[#00CFCF] transition-colors">
                News
              </Link>
              <Link href="/community" className="text-gray-800 hover:text-[#00CFCF] transition-colors">
                Community
              </Link>
              <Link href="/chatbot" className="text-gray-800 hover:text-[#00CFCF] transition-colors">
                Chatbot
              </Link>
              <Link href="/about-us" className="text-gray-800 hover:text-[#00CFCF] transition-colors">
                About Us
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 border border-black rounded-full text-black hover:bg-gray-100 cursor-pointer transition">
                    Log In
                  </button>
                </SignInButton>
                <button
                  onClick={handleWatchDemo}
                  className="px-4 py-2 bg-yellow-300 rounded-full text-black font-semibold hover:bg-yellow-400 cursor-pointer transition"
                >
                  Watch Demo
                </button>
              </SignedOut>

              <SignedIn>
                <button
                  onClick={handleWatchDemo}
                  className="px-4 py-2 bg-yellow-300 rounded-full text-black font-semibold hover:bg-yellow-400 cursor-pointer transition"
                >
                  Watch Demo
                </button>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10", // Increase avatar size
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;


