import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/db/prisma";

function previewOrigins(): string[] {
  // Vercel sets these automatically for each deployment and branch preview.
  const hosts = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].filter(Boolean) as string[];
  return hosts.map((host) => `https://${host}`);
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  // Lets server actions and route handlers set the session cookie.
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "", ...previewOrigins()].filter(Boolean),
  plugins: [nextCookies()],
});
