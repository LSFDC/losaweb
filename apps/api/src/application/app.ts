import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import launcherRoute from "../routes/launcher.js";
import { HTTPException } from "hono/http-exception";

const hono = new Hono();

hono.use(prettyJSON());
hono.notFound((c) => c.json({ message: "Not Found" }, 404));

hono.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        error: err.message,
      },
      err.status
    );
  }

  return c.json(
    {
      error: err.message || "Internal Server Error",
    },
    500
  );
});

hono.get("/", (c) => {
  return c.json({
    message: "Losaweb API",
    version: "1.0.0",
    publisher: "LSFD",
    github: "https://github.com/LSFDC",
    license: "MIT",
  });
});

hono.route("/launcher", launcherRoute);
hono.route("/billing", launcherRoute);

export default hono;
