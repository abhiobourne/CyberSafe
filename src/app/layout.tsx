import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybersecurity Awareness",
  description: "Stay safe online with our cybersecurity training platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body
          className={cn(
            "flex flex-col min-h-screen font-sans antialiased text-white bg-black",
            inter.className
          )}
        >
          {/* Navbar */}
          {/* @ts-expect-error */}
          <Navbar>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Navbar>

          {/* Page content */}
          <main className="flex-1 w-full">{children}</main>

          {/* Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
