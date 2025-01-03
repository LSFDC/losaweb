/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { env } from "@/env/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SessionService } from "@/services/session.service";

export async function RegisterAction(value: z.infer<typeof RegisterSchema>) {
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

  const request = await fetch(`${env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.API_AUTH_KEY}`,
    },
    body: JSON.stringify({
      username,
      email,
      nickname,
      password,
      language,
      captchaToken,
      newslatter,
      ipaddress: "127.0.0.1",
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      return {
        error: "Something went wrong",
      };
    });

  if (request.error) {
    return {
      error: request.error || "Something went wrong",
    };
  }

  revalidatePath("/register");

  return {
    error: null,
    message: `Registration successfully. Welcome ${nickname} 😍`,
  };
}

export async function LoginAction(values: z.infer<typeof LoginSchema>) {
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

  const request = await fetch(`${env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.API_AUTH_KEY}`,
    },
    body: JSON.stringify({
      username,
      password,
      captchaToken,
      ipaddress: "127.0.0.1",
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      return {
        error: "Something went wrong",
      };
    });

  if (request.error) {
    return {
      error: request.error || "Something went wrong",
    };
  }

  await SessionService.createSession(request.token);

  redirect("/dashboard");

  return {
    error: null,
    message: "Login successfully",
  };
}

export async function LogoutAction() {
  noStore();

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
    const request = await fetch(
      `${env.API_URL}/auth/check/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${env.API_AUTH_KEY}`,
        },
      }
    );

    if (!request.ok) {
      const response = await request.json();

      return {
        status: false,
        message: response.error || "Error checking username availability",
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
    const request = await fetch(`${env.API_URL}/auth/check/email/${email}`, {
      headers: {
        Authorization: `Bearer ${env.API_AUTH_KEY}`,
      },
    });

    if (!request.ok) {
      const response = await request.json();

      return {
        status: false,
        message: response.error || "Error checking email availability",
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
    const request = await fetch(
      `${env.API_URL}/auth/check/nickname/${nickname}`,
      {
        headers: {
          Authorization: `Bearer ${env.API_AUTH_KEY}`,
        },
      }
    );

    if (!request.ok) {
      const response = await request.json();
      return {
        status: false,
        message: response.error || "Error checking nickname availability",
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
