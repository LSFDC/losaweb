import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CF_TURNSTILE_SECRET_KEY: z.string().min(1),
    SESSION_SECRET: z.string().min(8),
    SESSION_KEY: z.string().min(8),
    TRIPAY_API_KEY: z.string().min(1),
    TRIPAY_API_SECRET: z.string().min(1),
    TRIPAY_MERCHANT_CODE: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
