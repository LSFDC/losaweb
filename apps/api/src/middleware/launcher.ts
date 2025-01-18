import { LosaGameDB } from "@losaweb/database/client/losagame";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const launcherMiddleware = createMiddleware(async (c, next) => {
  const Authorization = c.req.header("Authorization");

  if (!Authorization) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const token = Authorization.split(" ")[1];

  const keyFromDB = await LosaGameDB.define_launcher_info.findMany({
    orderBy: {
      regDate: "desc",
    },
  });

  if (keyFromDB.length < 1 || !keyFromDB[0]?.launcherKey) {
    console.error("No launcher key found in database!");
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  if (!token || token !== keyFromDB[0].launcherKey) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  await next();
});

export default launcherMiddleware;
