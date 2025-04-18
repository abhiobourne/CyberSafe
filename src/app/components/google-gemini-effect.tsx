"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";
import React from "react";

const transition = {
  duration: 0.5, // Set duration for transition if you want an animation effect
  ease: "linear",
};

export const GoogleGeminiEffect = ({
  pathLengths = [],
  className,
}: {
  pathLengths: MotionValue[];
  className?: string;
}) => {
  if (pathLengths.length === 0) return null; // Prevent error if pathLengths is empty

  return (
    <div className={cn("absolute inset-0 w-full h-full opacity-80", className)}>
      <svg width="1440" height="890" viewBox="0 0 1440 890" className="absolute w-full opacity-100">
        <motion.path
          d="M0 663C145.5 663 191 666.265 269 647..."
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[0] || 0 }}
          transition={transition}
        />
        <motion.path
          d="M0 587.5C147 587.5 277 587.5..."
          stroke="#FFDDB7"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[1] || 0 }}
          transition={transition}
        />
        <motion.path
          d="M0 514C147.5 514.333 294.5 513.735..."
          stroke="#B1C5FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[2] || 0 }}
          transition={transition}
        />
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
