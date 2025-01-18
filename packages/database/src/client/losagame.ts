import { PrismaClient as LosaGameClient } from ".prisma/client/losagame";

const globalForPrisma = globalThis as unknown as { LosaGame: LosaGameClient };

export const LosaGameDB = globalForPrisma.LosaGame || new LosaGameClient();

if (process.env.NODE_ENV !== "production") {
  console.log("Development mode: setting global Prisma instance");
  globalForPrisma.LosaGame = LosaGameDB;
}
