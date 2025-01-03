import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_URL: z.string().url(),
    API_AUTH_KEY: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
