import "server-only";
import { cookies } from "next/headers";
import { env } from "@/env/server";

export class SessionService {
  static async createSession(token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
  }

  static async getSession() {
    const session = (await cookies()).get("session");

    if (!session) {
      return null;
    }

    const isvalidSession = await fetch(`${env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${session.value}`,
      },
      cache: "no-store",
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!isvalidSession || !isvalidSession.data) {
      await this.deleteSession();
      return null;
    }

    return session;
  }

  static async deleteSession() {
    await fetch(`${env.API_URL}/auth/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.API_AUTH_KEY}`,
      },
    });
    (await cookies()).delete("session");
  }
}
