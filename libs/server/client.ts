import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;

// In developement, "npm run dev" clears the Node.js cache at runtime.
// this causes a new PrismaClient initialization each time due to hot reloading,
// So use global.
