import "server-only";
import { env } from "@/env/server";
import { SessionService } from "./session.service";

export class UserService {
  static async getMe() {
    const session = await SessionService.getSession();

    if (!session) return null;

    const response = await fetch(`${env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${session.value}`,
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error(error);
        return null;
      });

    return response;
  }
}
