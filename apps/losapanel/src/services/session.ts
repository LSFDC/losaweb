import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { env } from "@/env/server";

import { encryptUserID } from "@/lib/encryption";

type SessionData = {
  user: { userid: string };
  expires: string;
};

const key = new TextEncoder().encode(env.SESSION_SECRET);

export class SessionService {
  private static async signToken(payload: SessionData) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7 day from now")
      .sign(key);
  }

  private static async verifyToken(input: string) {
    const verifResult = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    }).catch(() => null);

    return verifResult?.payload as SessionData | null;
  }

  static async createSession(payload: SessionData) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const encryptedSession = await this.signToken(payload);

    (await cookies()).set("session", encryptedSession, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    return encryptedSession;
  }

  static async getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    const payload = await this.verifyToken(session);
    if (!payload) return null;
    if (payload.expires < new Date().toISOString()) return null;

    return payload;
  }

  static async getSessionCookie() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    return session;
  }

  static async deleteSession() {
    (await cookies()).delete("session");
  }
}
