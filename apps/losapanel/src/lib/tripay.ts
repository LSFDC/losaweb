import { env } from "@/env/server";
import { Tripay } from "@losaweb/tripay-sdk/core/tripay";

export const tripay = new Tripay({
  api_key: env.TRIPAY_API_KEY,
  secret_key: env.TRIPAY_API_SECRET,
  merchant_code: env.TRIPAY_MERCHANT_CODE,
});
