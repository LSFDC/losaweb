import type { Context } from "hono";
import crypto from "crypto";

import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { decode, sign, verify } from "hono/jwt";
import { getEnv } from "@/lib/env.js";

export class AuthService {
  private readonly domain: string;
  private readonly secret: string;
  private readonly HonoContext: Context;
  private readonly cookieName = "losaweb_session";
  private readonly authKey: string;
  private readonly authSalt: string;

  constructor(c: Context) {
    const { AUTH_SECRET, AUTH_DOMAIN, AUTH_KEY, AUTH_SALT } = getEnv(c);
    // cookies
    this.domain = AUTH_DOMAIN;
    this.secret = AUTH_SECRET;
    this.HonoContext = c;

    // crypto modules
    this.authKey = AUTH_KEY;
    this.authSalt = AUTH_SALT;
  }

  private deriveKey(password: string, salt: string): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
  }

  private deriveIV(salt: string): Buffer {
    return crypto.createHash("sha256").update(salt).digest().slice(0, 16);
  }

  encryptToken(text: string): string {
    const key = this.deriveKey(this.authKey, this.authSalt);
    const iv = this.deriveIV(this.authSalt);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  }

  decryptToken(encryptedText: string): string {
    const key = this.deriveKey(this.authKey, this.authSalt);
    const iv = this.deriveIV(this.authSalt);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  async createSession(payload: { token: string; exp: number }) {
    const token = sign(payload, this.secret);
    return token;
  }

  async deleteSession() {
    deleteCookie(this.HonoContext, "losaweb_session");
  }

  async verifySession(token: string) {
    return await verify(token, this.secret);
  }

  async getSession() {
    return await getSignedCookie(
      this.HonoContext,
      this.secret,
      this.cookieName
    );
  }

  async getPayload() {
    const session = await this.getSession();

    if (session) {
      return decode(session);
    }
    return null;
  }

  async setSession(token: string) {
    return await setSignedCookie(
      this.HonoContext,
      this.cookieName,
      token,
      this.secret,
      {
        path: "/",
        secure: true,
        domain: "." + this.domain,
        httpOnly: true,
        maxAge: 1000,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "Strict",
      }
    );
  }
}
