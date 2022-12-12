import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In product, initialize client.
  client = new PrismaClient();
} else {
  // In developement, "npm run dev" clears the Node.js cache at runtime.
  // this causes a new PrismaClient initialization each time due to hot reloading,
  // So use global.
  if (!global.client) {
    global.client = new PrismaClient();
  }
  client = global.client;
}

export default client;
