import "server-only";

import { User, UserAddFields } from "@/types/user";
import { LosaGameDB } from "@losaweb/database/client/losagame";
import bcrypt from "bcrypt";
import { SessionService } from "@/services/session";
import { decryptUserID } from "@/lib/encryption";
import { cookies } from "next/headers";

export class UserModel {
  static async getUserSession() {
    const session = await SessionService.getSession();
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!session || !sessionCookie) return null;

    const decryptedUserID = decryptUserID(session.user.userid);

    const existUser = await this.getUserByUsername(decryptedUserID);

    if (
      !existUser ||
      !existUser.logininfo ||
      existUser.logininfo.webToken !== sessionCookie
    ) {
      SessionService.deleteSession();
      await this.updateWebToken(decryptedUserID, null);
      return null;
    }

    return existUser as User;
  }

  static async deleteSession() {
    const existUser = await this.getUserSession();

    if (!existUser) {
      return null;
    }

    this.updateWebToken(existUser.userID, null);
  }

  static async getAllUsers(showpassword: boolean = false) {
    return await LosaGameDB.userMemberDB.findMany({
      omit: {
        userPWD: !showpassword,
      },
      include: {
        userinfo: true,
        battlerecord: true,
        gameinfo: true,
        logininfo: true,
        languageinfo: true,
        discordinfo: true,
        vipinfo: true,
      },
    });
  }

  static async getUserByIdx(id: number, showpassword: boolean = false) {
    return await LosaGameDB.userMemberDB.findUnique({
      omit: {
        userPWD: !showpassword,
      },
      where: {
        accountIDX: id,
      },
      include: {
        userinfo: true,
        battlerecord: true,
        gameinfo: true,
        logininfo: true,
        languageinfo: true,
        discordinfo: true,
        vipinfo: true,
      },
    });
  }

  static async getUserByUsername(
    username: string,
    showpassword: boolean = false
  ) {
    return await LosaGameDB.userMemberDB.findUnique({
      omit: {
        userPWD: !showpassword,
      },
      where: {
        userID: username.toLowerCase(),
      },
      include: {
        userinfo: true,
        battlerecord: true,
        gameinfo: true,
        logininfo: true,
        languageinfo: true,
        discordinfo: true,
        vipinfo: true,
        cashinfo: true,
        walletinfo: true,
      },
    });
  }

  static async getUserByEmail(email: string, showpassword: boolean = false) {
    return await LosaGameDB.userMemberDB.findFirst({
      omit: {
        userPWD: !showpassword,
      },
      where: {
        email: email,
      },
      include: {
        userinfo: true,
        battlerecord: true,
        gameinfo: true,
        logininfo: true,
        languageinfo: true,
        discordinfo: true,
        vipinfo: true,
      },
    });
  }

  static async getUserByNickname(
    nickname: string,
    showpassword: boolean = false
  ) {
    return await LosaGameDB.userMemberDB.findUnique({
      omit: {
        userPWD: !showpassword,
      },
      where: {
        nickName: nickname,
      },
      include: {
        userinfo: true,
        battlerecord: true,
        gameinfo: true,
        logininfo: true,
        languageinfo: true,
        discordinfo: true,
        vipinfo: true,
      },
    });
  }

  static async getTotalEmailUsed(email: string) {
    return await LosaGameDB.userMemberDB.count({ where: { email: email } });
  }

  // add section
  static async addUser({
    username,
    password,
    email,
    nickname,
    ipaddress,
    language,
    newslatter,
    encodeKey,
  }: UserAddFields): Promise<boolean> {
    try {
      const createUser = await LosaGameDB.userMemberDB.create({
        data: {
          userID: username.toLowerCase(),
          userPWD: password,
          email: email,
          nickName: nickname,
          userType: 100,
          joinType: 10,
          mailling: newslatter === true ? 1 : 0,
          userinfo: {
            create: {
              userIP: ipaddress,
            },
          },
          battlerecord: {
            create: {},
          },
          cashinfo: {
            create: {
              amtBonus: 0,
              amtCash: 0,
              amtLimit: 999999999,
              amtSum: 0,
            },
          },
          gameinfo: {
            create: {
              gameMoney: 0,
            },
          },
          logininfo: {
            create: {
              encodeKey: encodeKey,
            },
          },
          languageinfo: {
            create: {
              lang_code: language,
            },
          },
          discordinfo: {
            create: {},
          },
          walletinfo: {
            create: {},
          },
        },
      });

      if (!createUser) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error; // Throw instead of returning false to see the full error
    }
  }

  //update sections

  static async increaseVisitCount(userId: string) {
    return await LosaGameDB.userMemberDB.update({
      where: {
        userID: userId,
      },
      data: {
        userinfo: {
          update: {
            visit_count: {
              increment: 1,
            },
          },
        },
      },
    });
  }

  static async updateWebToken(userId: string, token: string | null) {
    return await LosaGameDB.userMemberDB.update({
      where: {
        userID: userId,
      },
      data: {
        logininfo: {
          update: {
            webToken: token,
          },
        },
      },
    });
  }

  static async updateGeneralInfo(
    userid: string,
    email: string,
    bio: string | null
  ) {
    return await LosaGameDB.userMemberDB.update({
      omit: {
        userPWD: true,
      },
      where: {
        userID: userid,
        email,
      },
      data: {
        userinfo: {
          update: {
            bio,
          },
        },
      },
    });
  }

  static async updateAccountInfo(
    userid: string,
    language: string,
    nickname: string,
    imageUrl: string
  ) {
    return await LosaGameDB.userMemberDB.update({
      omit: {
        userPWD: true,
      },
      where: {
        userID: userid,
      },
      data: {
        languageinfo: {
          update: {
            lang_code: language,
          },
        },
        nickName: nickname || undefined,
        userinfo: {
          update: {
            userImage: imageUrl,
          },
        },
      },
    });
  }

  static async updateNotificationInfo(userid: string, value: number) {
    return await LosaGameDB.userMemberDB.update({
      omit: {
        userPWD: true,
      },
      where: {
        userID: userid,
      },
      data: {
        mailling: value,
      },
    });
  }

  static async update2faInfo(userid: string, value: number) {
    return await LosaGameDB.userMemberDB.update({
      omit: {
        userPWD: true,
      },
      where: {
        userID: userid,
      },
      data: {
        twofa_email: value,
      },
    });
  }

  // END CRUD

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
