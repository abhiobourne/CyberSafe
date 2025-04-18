import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Optionally, define paths that should use Clerk
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // Protects all routes except Next.js assets
};
