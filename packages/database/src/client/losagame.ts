import { PrismaClient as LosaGame } from "../../prisma/client/losagame/index.js";

const globalForPrisma = globalThis as unknown as { LosaGame: LosaGame };

export const LosaGameDB =
  globalForPrisma.LosaGame ||
  new LosaGame({
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.LosaGame = LosaGameDB;
