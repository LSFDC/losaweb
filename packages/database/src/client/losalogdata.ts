import { PrismaClient as LosaLogDataClient } from "@prisma/losalogdata";

const globalForPrisma = globalThis as unknown as {
  LosaLogData: LosaLogDataClient;
};

export const LosaLogDB = globalForPrisma.LosaLogData || new LosaLogDataClient();

if (process.env.NODE_ENV !== "production") {
  console.log("Development mode: setting global Prisma instance");
  globalForPrisma.LosaLogData = LosaLogDB;
}
