import { createEnv } from "@t3-oss/env-core";
import type { Context } from "hono";
import { env } from "hono/adapter";
import { z } from "zod";

export const getEnv = (c: Context) =>
  createEnv({
    server: {
      //core
      CORS_ORIGIN: z.string().url(),
      API_KEY: z.string(),
      AUTH_API_KEY: z.string(),

      //auth
      AUTH_DOMAIN: z.string(),
      AUTH_SALT: z.string(),
      AUTH_KEY: z.string(),
      AUTH_SECRET: z.string(),

      //cf
      CF_BASE_URL: z.string().url(),
      CF_SECRET_KEY: z.string(),

      //tripay
      TRIPAY_BASE_URL: z.string().url(),
      TRIPAY_API_KEY: z.string(),
      TRIPAY_API_SECRET: z.string(),
    },
    runtimeEnv: env(c),
    emptyStringAsUndefined: true,
  });
