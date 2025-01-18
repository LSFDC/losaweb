import { Hono } from "hono";

const launcherRoute = new Hono();

launcherRoute.get("/", async (c) => {
  return c.json({ message: "Launcher Routes" });
});

export default launcherRoute;
