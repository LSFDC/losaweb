import * as crypto from "crypto";

export function generateRandomStringWithSalt(
  salt: string,
  length: number = 15
): string {
  // Generate a random string of bytes
  const randomData = crypto.randomBytes(32).toString("hex");

  // Combine random data with the salt
  const saltedData = randomData + salt;

  // Create a SHA-256 hash of the salted data
  const hash = crypto.createHash("sha256").update(saltedData).digest("base64");

  // Filter out non-alphanumeric characters
  const alphanumericHash = hash.replace(/[^a-zA-Z0-9]/g, "");

  // Take the first `length` alphanumeric characters
  return alphanumericHash.substring(0, length);
}
