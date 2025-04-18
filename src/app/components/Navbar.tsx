import Link from "next/link";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="bg-black sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-black">
        <MaxWidthWrapper>
          <div className="border-b border-gray-700">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="text-white text-xl font-bold hover:text-gray-300">
                  CyberSafe
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex gap-6">
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
                <Link href="/news" className="text-white hover:text-gray-300">
                  News
                </Link>
                <Link href="/community" className="text-white hover:text-gray-300">
                  Community
                </Link>
                <Link href="/chatbot" className="text-white hover:text-gray-300">
                  Chatbot
                </Link>
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal" />
                  <SignUpButton mode="modal" />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
