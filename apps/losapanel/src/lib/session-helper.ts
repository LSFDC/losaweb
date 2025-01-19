import "server-only";
import { UserModel } from "@/model/user";
import { SessionService } from "@/services/session";

export async function validateSession() {
  const session = await SessionService.getSession();
  const sessionCookie = await SessionService.getSessionCookie();
  const sessionUser = await UserModel.getUserSession();

  if (!session || !sessionCookie || !sessionUser) {
    return { error: "Invalid session. Please log in again.", user: null };
  }

  const existUser = await UserModel.getUserByUsername(sessionUser.userID);

  if (!existUser) {
    return { error: "Invalid session. Please log in again.", user: null };
  }

  const isValidSession = existUser.logininfo?.webToken === sessionCookie;

  if (!isValidSession) {
    return { error: "Invalid session. Please log in again.", user: null };
  }

  return { error: null, user: existUser };
}
