import { env } from "@/env/server";
import ky from "ky";

const AuthAPI = ky.create({
  prefixUrl: env.API_URL + "/auth/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // use a hook to add the authorization header before each request
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", "Bearer token");
      },
    ],
  },
});

export default AuthAPI;
