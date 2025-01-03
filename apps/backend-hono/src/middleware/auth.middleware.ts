import { getEnv } from "@/lib/env.js";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const authMiddleware = createMiddleware(async (c, next) => {
  const { AUTH_API_KEY } = getEnv(c);

  const Authorization = c.req.header("Authorization");

  if (!Authorization) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const token = Authorization.split(" ")[1];

  if (!token || token !== AUTH_API_KEY) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  await next();
});

export default authMiddleware;
