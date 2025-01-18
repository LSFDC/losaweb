import { getEnv } from "@/lib/env";
import { launcherRateLimiter } from "@/lib/rate-limiter";
import launcherMiddleware from "@/middleware/launcher";
import { LauncherSchema } from "@/schema/launcher";
import { zValidator } from "@hono/zod-validator";
import { LosaGameDB } from "@losaweb/database/client/losagame";
import { Hono } from "hono";
import { every } from "hono/combine";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";

const launcherRoute = new Hono();

launcherRoute.use("*", launcherRateLimiter, every(launcherMiddleware));

launcherRoute.get("/", async (c) => {
  return c.json({ message: "Launcher Routes" });
});

launcherRoute.post(
  "/",
  zValidator("json", LauncherSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Invalid Request!",
        },
        401
      );
    }
  }),
  async (c) => {
    const { SERVER_ID } = getEnv(c);
    const { username, password, privateIP, publicIP, HWID } =
      c.req.valid("json");

    const isHWDBlocked = await LosaGameDB.define_hwid_blocklist.findUnique({
      where: {
        hwid: HWID,
      },
    });

    if (isHWDBlocked) {
      return c.json(
        {
          error: "Access Forbidden!",
        },
        403
      );
    }

    //get launcher and server info
    const launcherInfo = await LosaGameDB.define_launcher_info.findMany({
      orderBy: {
        regDate: "desc",
      },
    });

    if (launcherInfo.length < 1 || !launcherInfo[0]?.launcherKey) {
      console.error("No launcher key found in database!");
      throw new HTTPException(500, {
        message: "Failed to get launcher info!",
      });
    }

    if (launcherInfo[0].status !== 1) {
      const isWhitelisted =
        await LosaGameDB.define_launcher_whitelist.findUnique({
          where: {
            username,
          },
        });

      if (!isWhitelisted) {
        return c.json(
          {
            error: "Server currently under maintenance.",
          },
          422
        );
      }
    }

    const serverInfo = await LosaGameDB.define_game_server.findUnique({
      where: {
        serverID: SERVER_ID,
      },
    });

    const serverEncodeKey = await LosaGameDB.define_encode_key.findMany({
      orderBy: {
        regDate: "desc",
      },
    });

    if (!serverInfo || serverEncodeKey.length < 1) {
      console.error("No server info or encode key found in database!");
      throw new HTTPException(500, {
        message: "Failed to get server info!",
      });
    }

    const existUser = await LosaGameDB.userMemberDB.findUnique({
      where: {
        userID: username.toLowerCase(),
      },
      include: {
        logininfo: true,
        gameinfo: true,
        vipinfo: true,
      },
    });

    if (!existUser) {
      return c.json(
        {
          error: "Account not found or not registered!",
        },
        404
      );
    }

    if (existUser.limitType === 100) {
      return c.json(
        {
          error: `Your account has been bannend until ${existUser.limitDate.toLocaleString()}!`,
        },
        422
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, existUser.userPWD);

    if (!isPasswordCorrect) {
      return c.json(
        {
          error: "Invalid password!",
        },
        401
      );
    }

    const updateLogin = await LosaGameDB.userLoginDB.update({
      data: {
        userIP: privateIP,
        connDate: new Date(),
      },
      where: {
        accountIDX: existUser.accountIDX,
      },
    });

    if (!updateLogin) {
      console.error("Failed to update login info!", username);
      throw new HTTPException(500, {
        message: "Failed to update login info!",
      });
    }

    //enable this if you want to skip tutorial step in game
    // if (existUser.gameinfo?.userState !== -1) {
    //   const updateState = await LosaGameDB.userGameDB.update({
    //     where: {
    //       accountIDX: existUser.accountIDX,
    //     },
    //     data: {
    //       userState: -1,
    //     },
    //   });

    //   if (!updateState) {
    //     console.error("Failed to update user state!", username);
    //     throw new HTTPException(500, {
    //       message: "Failed to update user state!",
    //     });
    //   }
    // }

    return c.json({
      message: "success",
      AppName: "autoupgrade.exe", //lostsaga.exe
      userID: existUser?.userID.toString(),
      encodeKey: serverEncodeKey[0]?.encodeKey,
      serverID: serverInfo?.serverID,
      userIP: publicIP.toString(),
    });
  }
);

export default launcherRoute;
