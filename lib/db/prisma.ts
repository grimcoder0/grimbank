import { PrismaClient } from "../../generated/prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and fill it in.",
  );
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// HTTP mode: every query goes over plain HTTPS, so no WebSocket is needed.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaNeonHttp(connectionString, {}) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
