import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a class-merging utility

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn("animate-pulse bg-gray-300 rounded-md", className)} />;
};
