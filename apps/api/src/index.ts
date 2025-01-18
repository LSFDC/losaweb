import { serve } from "@hono/node-server";
import hono from "@/application/hono";

serve(
  {
    fetch: hono.fetch,
    port: 5000,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  }
);
