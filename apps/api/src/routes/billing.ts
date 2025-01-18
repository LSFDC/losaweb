import { Hono } from "hono";

export const billingRoute = new Hono();

billingRoute.get("/", async (c) => {
  return c.json({ message: "Billing Routes" });
});

export default billingRoute;
