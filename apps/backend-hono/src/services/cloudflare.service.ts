import { getEnv } from "@/lib/env.js";
import type { Context } from "hono";

export class CloudflareService {
  private readonly secret: string;
  private baseUrl: string;
  constructor(c: Context) {
    const { CF_SECRET_KEY, CF_BASE_URL } = getEnv(c);

    this.baseUrl = CF_BASE_URL;
    this.secret = CF_SECRET_KEY;
  }

  async verifyTurnstile(token: string) {
    try {
      const request = await fetch(this.baseUrl, {
        method: "POST",
        body: `secret=${encodeURIComponent(
          this.secret
        )}&response=${encodeURIComponent(token)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      if (!request.ok) {
        return {
          data: null,
          error: "Invalid response from Cloudflare Turnstile API",
        };
      }

      const response = await request.json();

      return {
        data: response,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: "Something went wrong!",
      };
    }
  }
}
