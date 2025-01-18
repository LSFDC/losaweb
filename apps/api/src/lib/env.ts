import { createEnv } from "@t3-oss/env-core";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { z } from "zod";

export const getEnv = (c: Context) =>
  createEnv({
    server: {
      //launcher
      SERVER_ID: z.number(),

      //billing
      BILLING_KEY: z.string().min(6),
      BILLING_SECRET: z.string().min(6),
    },
    runtimeEnv: env(c),
    emptyStringAsUndefined: true,
  });
