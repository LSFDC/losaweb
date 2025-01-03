import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import authRoute from "@/routes/auth.route";
import userRoute from "@/routes/user.route";
import { serveStatic } from "@hono/node-server/serve-static";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";

const hono = new Hono();

hono.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
hono.use(logger());
hono.use(prettyJSON());
hono.notFound((c) => c.json({ error: "Page Not Found" }, 404));

hono.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    allowHeaders: ["*"],
  })
);

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
  });
});

hono.route("/auth", authRoute);
hono.route("/user", userRoute);

export default hono;
