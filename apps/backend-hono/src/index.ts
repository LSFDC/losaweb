import "@losaweb/database/lib/bigint-solver";

import { serve } from "@hono/node-server";
import hono from "@/application/hono";

serve({
  fetch: hono.fetch,
  port: 5000,
}).on("listening", () => {
  console.log("API Server is listening on port 5000");
});
