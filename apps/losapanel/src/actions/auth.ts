"use server";

import { env } from "@/env/server";
import { checkNickname, checkUsername } from "@/lib/checker";
import { topLeveldomain } from "@/lib/constant";
import { encryptUserID } from "@/lib/encryption";
import { generateRandomStringWithSalt } from "@/lib/generator";
import { UserModel } from "@/model/user";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { CloudflareService } from "@/services/cloudflare";
import { SessionService } from "@/services/session";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function RegisterAction(value: RegisterSchema) {
  noStore();
  const { success, data } = RegisterSchema.safeParse(value);

  if (!success) {
    return {
      error: "Invalid Request!",
    };
  }

  const headersList = await headers();
  const ip =
    headersList.get("CF-Connecting-IP") ||
    headersList.get("X-REAL-IP") ||
    headersList.get("X-FORWARDED-FOR") ||
    "127.0.0.1";

  const {
    username,
    email,
    nickname,
    password,
    language,
    captchaToken,
    newslatter,
  } = data;

  //verif Captcha
  const cloudflare = new CloudflareService(env.CF_TURNSTILE_SECRET_KEY);

  const turnstile = await cloudflare.verifyTurnstile(captchaToken);

  if (turnstile.error || !turnstile.data.success) {
    return {
      error: turnstile.error || "Invalid Captcha",
    };
  }

  if (username.toLowerCase() === password.toLowerCase()) {
    return {
      error: "Username and password cannot be the same",
    };
  }

  const emailTotal = await UserModel.getTotalEmailUsed(email);

  if (emailTotal > 5) {
    return {
      error: "Email has been used more than 5 times",
    };
  }

  const existNickname = await UserModel.getUserByNickname(nickname);

  if (existNickname) {
    return {
      error: "Nickname has been taken",
    };
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const createUser = await UserModel.addUser({
    username,
    password: hashedPassword,
    email,
    nickname,
    ipaddress: "0.0.0.0",
    language,
    newslatter,
    encodeKey: generateRandomStringWithSalt(username),
  });

  if (!createUser) {
    return {
      error: "Registration failed.",
    };
  }

  revalidatePath("/register");

  return {
    error: null,
    message: `Registration successfully. Welcome ${nickname} 😍`,
  };
}

export async function LoginAction(values: LoginSchema) {
  noStore();
  const { success, data } = LoginSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid Request",
    };
  }

  const { username, password, captchaToken } = data;

  const headersList = await headers();
  const ip =
    headersList.get("CF-Connecting-IP") ||
    headersList.get("X-REAL-IP") ||
    headersList.get("X-FORWARDED-FOR") ||
    "127.0.0.1";

  //verif Captcha
  const cloudflare = new CloudflareService(env.CF_TURNSTILE_SECRET_KEY);

  const turnstile = await cloudflare.verifyTurnstile(captchaToken);

  if (turnstile.error || !turnstile.data.success) {
    return {
      error: turnstile.error || "Invalid Captcha",
    };
  }

  const existUser = await UserModel.getUserByUsername(username, true);

  if (!existUser) {
    return {
      error: "Account not found or not registered!",
    };
  }

  if (existUser.limitType === 100) {
    return {
      error: "Your account has been suspended",
    };
  }

  const isValidPassword = await UserModel.comparePassword(
    password,
    existUser.userPWD
  );

  if (!isValidPassword) {
    return {
      error: "Invalid password!",
    };
  }

  const payload = {
    user: { userid: encryptUserID(existUser.userID.toLowerCase()) },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const sessionToken = await SessionService.createSession(payload);

  await UserModel.increaseVisitCount(existUser.userID);
  await UserModel.updateWebToken(existUser.userID, sessionToken);

  redirect("/dashboard");

  return {
    error: null,
    message: "Login successfully",
  };
}

export async function LogoutAction() {
  noStore();

  await UserModel.deleteSession();
  await SessionService.deleteSession();

  redirect("/login");
}

// checker
interface AuthCheckerResponse {
  status: boolean;
  message: string;
}

export const checkUsernameAvailable = async (
  username: string
): Promise<AuthCheckerResponse> => {
  try {
    if (
      username.toLocaleLowerCase() === "username" ||
      !checkUsername(username)
    ) {
      return {
        status: false,
        message: "Username contains forbidden words",
      };
    }

    const existUsername = await UserModel.getUserByUsername(username).catch(
      (e) => {
        throw new Error(e);
      }
    );

    if (existUsername) {
      return {
        status: false,
        message: "Username already taken",
      };
    }

    return {
      status: true,
      message: "Username available",
    };
  } catch (error) {
    console.error(error);

    return {
      status: false,
      message: "Error checking username availability",
    };
  }
};

export const checkEmailAvailable = async (
  email: string
): Promise<AuthCheckerResponse> => {
  try {
    const isAcceptedEmail = topLeveldomain.some((domain) => {
      return email.endsWith(domain);
    });

    if (!isAcceptedEmail) {
      return {
        status: false,
        message: `The email address you provided uses a domain that is not allowed. Please use one of the top level domains: ${topLeveldomain.join(", ")}.`,
      };
    }

    return {
      status: true,
      message: "Email available",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error checking email availability",
    };
  }
};

export const checkNicknameAvailable = async (
  nickname: string
): Promise<AuthCheckerResponse> => {
  try {
    if (nickname === "nickname" || !checkNickname(nickname)) {
      return {
        status: false,
        message: "Nickname contains forbidden words",
      };
    }

    const existNickname = await UserModel.getUserByNickname(nickname);

    if (existNickname) {
      return {
        status: false,
        message: "Nickname already taken",
      };
    }

    return {
      status: true,
      message: "Nickname available",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error checking nickname availability",
    };
  }
};
