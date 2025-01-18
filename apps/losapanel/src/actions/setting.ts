"use server";

import { UserModel } from "@/model/user";
import {
  accountFormSchema,
  AccountFormValues,
  generalFormSchema,
  GeneralFormValues,
} from "@/schemas/settings";
import { SessionService } from "@/services/session";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { checkNickname } from "@/lib/checker";

async function validateSession() {
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

export async function UpdateGeneralSetting(value: GeneralFormValues) {
  noStore();
  const { success, data } = generalFormSchema.safeParse(value);

  if (!success) {
    return {
      error: "Invalid Request",
    };
  }

  const { username, bio } = data;

  const { error, user: existUser } = await validateSession();

  if (error || !existUser) {
    return { error };
  }

  if (existUser.userID !== username) {
    return {
      error: "Invalid session. Please log in again.",
    };
  }

  const updateProcess = await UserModel.updateGeneralInfo(
    existUser.userID,
    existUser.email,
    bio ?? ""
  );

  if (!updateProcess) {
    return {
      error: "Update Failed",
    };
  }

  revalidatePath("/settings");

  return {
    error: null,
    message: "Update Success!",
  };
}

export async function UpdateAccountSetting(value: AccountFormValues) {
  noStore();
  const { success, data } = accountFormSchema.safeParse(value);

  if (!success) {
    return {
      error: "Invalid Request: Incorrect data format.",
    };
  }

  const { language, nickname, imageUrl } = data;

  const { error, user: existUser } = await validateSession();

  if (error || !existUser) {
    return { error };
  }

  const isNicknameUpdated = nickname && nickname !== existUser.nickName;

  if (isNicknameUpdated) {
    if (!checkNickname(nickname)) {
      return {
        error: "Nickname contains forbidden words.",
      };
    }

    const existingNicknameUser = await UserModel.getUserByNickname(nickname);
    if (existingNicknameUser) {
      return {
        error: "Nickname already exists. Please choose another one.",
      };
    }
  }

  const updatedData = {
    language: language || existUser.languageinfo?.lang_code,
    nickname: isNicknameUpdated ? nickname : existUser.nickName,
    imageUrl: imageUrl || existUser.userinfo?.userImage || "default.jpg",
  };

  const updateProcess = await UserModel.updateAccountInfo(
    existUser.userID,
    updatedData.language ?? "en",
    updatedData.nickname,
    updatedData.imageUrl
  );

  if (!updateProcess) {
    return {
      error: "Failed to update account information. Please try again.",
    };
  }

  revalidatePath("/settings/account");

  return {
    error: null,
    message: "Update successfully!",
  };
}

export async function updateNotificationSetting(value: boolean) {
  noStore();

  const { error, user: existUser } = await validateSession();

  if (error || !existUser) {
    return { error };
  }

  const updateProcess = await UserModel.updateNotificationInfo(
    existUser.userID,
    value ? 1 : 0
  );

  if (!updateProcess) {
    return {
      error: "Failed to update notification information. Please try again.",
    };
  }

  revalidatePath("/settings/notifications");

  return {
    error: null,
    message: "Update successfully!",
  };
}

export async function update2faSetting(value: boolean) {
  noStore();

  const { error, user: existUser } = await validateSession();

  if (error || !existUser) {
    return { error };
  }

  const updateProcess = await UserModel.update2faInfo(
    existUser.userID,
    value ? 1 : 0
  );

  if (!updateProcess) {
    return {
      error: "Failed to update 2FA settings. Please try again.",
    };
  }

  revalidatePath("/settings/notifications");

  return {
    error: null,
    message: "Update successfully!",
  };
}
