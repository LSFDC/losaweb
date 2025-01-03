import { Hono } from "hono";
import {
  AuthEmailCheckerSchema,
  AuthLoginSchema,
  AuthNickameCheckerSchema,
  AuthRegSchema,
  AuthUsernameCheckerSchema,
} from "@/schemas/auth.schema";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import authMiddleware from "@/middleware/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { CloudflareService } from "@/services/cloudflare.service";
import { UserModel } from "@losaweb/database/model/user";
import { AuthService } from "@/services/auth.service";
import { generateRandomStringWithSalt } from "@/lib/generator";
import { topLeveldomain } from "@/lib/constant";
import { checkNickname, checkUsername } from "@/lib/checker";

const authRoute = new Hono();

authRoute.use(authMiddleware);

authRoute.post(
  "/register",
  zValidator("json", AuthRegSchema, (result, c) => {
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
    // init Model & Services
    const cloudflare = new CloudflareService(c);

    const {
      username,
      email,
      password,
      nickname,
      captchaToken,
      ipaddress,
      language,
      newslatter,
    } = c.req.valid("json");

    // verify turnstile
    const turnstile = await cloudflare.verifyTurnstile(captchaToken);
    if (turnstile.error || !turnstile.data.success) {
      return c.json(
        {
          error: "Invalid Captcha! Please try again.",
        },
        401
      );
    }

    //check available user

    if (username.toLowerCase() === password.toLowerCase()) {
      return c.json(
        {
          error:
            "For security reasons, Username and password cannot be the same",
        },
        422
      );
    }

    const existUsername = await UserModel.getUserByUsername(username);
    if (existUsername) {
      return c.json(
        {
          error: "Username already exists!",
        },
        422
      );
    }

    const emailTotal = await UserModel.getTotalEmailUsed(email);

    if (emailTotal > 5) {
      return c.json(
        {
          error: `This email already used for ${emailTotal} account`,
        },
        422
      );
    }

    const existNickname = await UserModel.getUserByNickname(nickname);
    if (existNickname) {
      return c.json(
        {
          error: "Nickname already exists!",
        },
        422
      );
    }

    const salt = genSaltSync(13);
    const hashedPassword = hashSync(password, salt);
    const randomString = generateRandomStringWithSalt(username, 15);

    const addUser = await UserModel.addUser({
      username,
      password: hashedPassword,
      email,
      nickname,
      ipaddress,
      language,
      newslatter,
      encodeKey: randomString.toString(),
    });

    if (!addUser) {
      return c.json(
        {
          error: "Failed to register, please try again",
        },
        500
      );
    }

    return c.json({
      error: null,
      message: `Registration successfully. Welcome ${nickname} 😍`,
    });
  }
);

authRoute.post(
  "/login",
  zValidator("json", AuthLoginSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Invalid Request!",
          cause: result.error.issues.flat(),
        },
        401
      );
    }
  }),
  async (c) => {
    const authService = new AuthService(c);
    const cloudflare = new CloudflareService(c);
    const { username, password, captchaToken, ipaddress } = c.req.valid("json");

    // verify turnstile
    const turnstile = await cloudflare.verifyTurnstile(captchaToken);
    if (turnstile.error || !turnstile.data.success) {
      return c.json(
        {
          error: "Invalid Captcha! Please try again.",
        },
        401
      );
    }

    const existUser = await UserModel.getUserByUsername(username, true);

    if (!existUser) {
      throw new HTTPException(404, {
        message: "Account not found or not registered yet!",
      });
    }

    if (existUser.limitType === 100) {
      throw new HTTPException(422, {
        message: `Your account has been suspended due to excessive login attempts. Please contact support for assistance.`,
      });
    }

    const isValidPassword = compareSync(password, existUser.userPWD);

    if (!isValidPassword) {
      throw new HTTPException(422, {
        message: `Invalid Password!`,
      });
    }

    const payload = {
      token: authService.encryptToken(username),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };

    const sessionToken = await authService.createSession(payload);
    await authService.setSession(sessionToken);

    await UserModel.increaseVisitCount(existUser.userID);
    await UserModel.updateWebToken(existUser.userID, sessionToken);

    return c.json({
      error: null,
      token: sessionToken,
    });
  }
);

authRoute.delete("/logout", async (c) => {
  const authSvr = new AuthService(c);

  await authSvr.deleteSession();

  return c.json({
    error: null,
    message: "Logout successfully",
  });
});

//checker

// Checker
authRoute.get(
  "/check/username/:username",
  zValidator("param", AuthUsernameCheckerSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Invalid Request!",
          cause: result.error.issues.flat(),
        },
        401
      );
    }
  }),
  async (c) => {
    const { username } = c.req.valid("param");

    //check prohibited words
    if (!checkUsername(username)) {
      return c.json(
        {
          error: "Username not allowed!",
        },
        422
      );
    }

    const isExistUsername = await UserModel.getUserByUsername(username);

    if (isExistUsername) {
      return c.json(
        {
          error: "Username already exist!",
        },
        422
      );
    }

    return c.json({
      error: null,
    });
  }
);

authRoute.get(
  "/check/email/:email",
  zValidator("param", AuthEmailCheckerSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Invalid Request!",
          cause: result.error.issues.flat(),
        },
        401
      );
    }
  }),
  async (c) => {
    const { email } = c.req.valid("param");

    //filtering by top level domain

    const isAcceptedEmail = topLeveldomain.some((domain) => {
      return email.endsWith(domain);
    });

    if (!isAcceptedEmail) {
      return c.json(
        {
          error: "Email not allowed!",
        },
        422
      );
    }

    const emailTotal = await UserModel.getTotalEmailUsed(email);

    if (emailTotal > 5) {
      return c.json(
        {
          error: `This email already used for ${emailTotal} account`,
        },
        422
      );
    }

    return c.json({
      error: null,
    });
  }
);

authRoute.get(
  "/check/nickname/:nickname",
  zValidator("param", AuthNickameCheckerSchema, (result, c) => {
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
    const { nickname } = c.req.valid("param");

    if (!checkNickname(nickname)) {
      return c.json(
        {
          error: "Nickname not allowed!",
        },
        422
      );
    }

    const isExistnickname = await UserModel.getUserByNickname(nickname);

    if (isExistnickname) {
      return c.json(
        {
          error: "Nickname already exist!",
        },
        422
      );
    }

    return c.json({
      error: null,
    });
  }
);
// End Checker

export default authRoute;
