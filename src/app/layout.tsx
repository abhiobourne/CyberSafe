import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybersecurity Awareness",
  description: "Stay safe online with our cybersecurity training platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={cn("relative h-full font-sans antialiased bg-black text-white", inter.className)}>
          <main className="relative flex flex-col min-h-screen">
            {/* Navbar including authentication buttons */}
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
            
            {/* Page Content */}
            <div className="flex grow flex-1">{children}</div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
