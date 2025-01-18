import "server-only";

export class CloudflareService {
  private readonly secret: string;
  private baseUrl: string;
  constructor(secret: string) {
    if (!secret) {
      throw new Error("Cloudflare secret is required");
    }

    this.baseUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    this.secret = secret;
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
