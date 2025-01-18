import { serve } from "@hono/node-server";
import hono from "@/application/app";

serve({
  fetch: hono.fetch,
  port: 5000,
}).on("listening", () => {
  console.log("API Server is listening on port 5000");
});
