import { Hono } from "hono";

import { jwt } from "hono/jwt";
import { getEnv } from "@/lib/env.js";
import { UserModel } from "@losaweb/database/model/user";
import { AuthService } from "@/services/auth.service";

const userRoute = new Hono();

userRoute.use("*", (c, next) => {
  const { AUTH_SECRET } = getEnv(c);
  const jwtMiddleware = jwt({
    secret: AUTH_SECRET,
    cookie: "losaweb_session",
  });
  return jwtMiddleware(c, next);
});

userRoute.get("/", async (c) => {
  const authModel = new AuthService(c);
  const payload = c.get("jwtPayload");

  //get token from header
  const token = c.req.header("Authorization")?.split(" ")[1];

  //check expired
  if (payload.exp < Date.now() / 1000) {
    return c.json(
      {
        error: "Token expired",
        data: null,
      },
      401
    );
  }

  const decoded = authModel.decryptToken(payload.token as string);

  const data = await UserModel.getUserByUsername(decoded);

  if (!data || !data.logininfo) {
    return c.json(
      {
        error: "Token invalid",
        data: null,
      },
      401
    );
  }

  if (data.logininfo.web_token !== token) {
    return c.json(
      {
        error: "Token invalid",
        data: null,
      },
      401
    );
  }

  return c.json({
    data,
  });
});

export default userRoute;
