"use client";
import { useState } from "react";
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div>
      {/* Show UserButton if logged in, otherwise show Sign In/Sign Up buttons */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Dialog>
          {/* Buttons to Open Modal */}
          {/* @ts-expect-error: 'asChild' is a valid prop in this context (custom component) */}

          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setAuthMode("sign-in")}>
              Sign In
            </Button>
          </DialogTrigger>
          {/* @ts-expect-error: 'asChild' is a valid prop in this context (custom component) */}

          <DialogTrigger asChild>
            <Button variant="ghost" onClick={() => setAuthMode("sign-up")}>
              Sign Up
            </Button>
          </DialogTrigger>

          {/* Authentication Modal */}
          <DialogContent className="bg-white text-black">
            {authMode === "sign-in" ? <SignIn /> : <SignUp />}
          </DialogContent>
        </Dialog>
      </SignedOut>
    </div>
  );
}
