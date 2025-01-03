import { LosaGameDB } from "@losaweb/database/client/losagame";
import { UserAddFields } from "../types/user.js";

export class UserModel {
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
        walletinfo: {
          include: {
            cash: true,
          },
        },
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
        walletinfo: {
          include: {
            cash: true,
          },
        },
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
        walletinfo: {
          include: {
            cash: true,
          },
        },
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
        walletinfo: {
          include: {
            cash: true,
          },
        },
        _count: true,
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
        walletinfo: true,
        _count: true,
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
            create: {
              cash: {
                create: {
                  amtBonus: 0,
                  amtCash: 0,
                  amtLimit: 999999999,
                  amtSum: 0,
                },
              },
            },
          },
        },
      });

      if (!createUser) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
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

  static async updateWebToken(userId: string, token: string) {
    return await LosaGameDB.userMemberDB.update({
      where: {
        userID: userId,
      },
      data: {
        logininfo: {
          update: {
            web_token: token,
            web_login: new Date(),
          },
        },
      },
    });
  }
}
