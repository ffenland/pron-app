import { PrismaClient } from "@prisma/client";

// set global client type
declare global {
  var client: PrismaClient | undefined;
}

// global client가 있으면 그걸 그대로 쓰고 없으면 새로 생성
const client = global.client || new PrismaClient();

// 개발모드면 어쩌라고 global client를 지정해준다.
if (process.env.NODE_ENV === "development") global.client = client;
export default client;
