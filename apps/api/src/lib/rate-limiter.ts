import { error } from "console";
import { Context } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { HTTPException } from "hono/http-exception";

export const generateLimiterKey = (c: Context) => {
  const ip =
    c.req.header("CF-Connecting-IP") || c.req.header("x-forwarded-for");
  const userAgent = c.req.header("user-agent");
  return `${ip}:${userAgent}`;
};

export const launcherRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: (c) => {
    return generateLimiterKey(c).toString();
  },
  message() {
    throw new HTTPException(401, {
      message: "Too many request. Please try again later.",
    });
  },
});
