import { env } from "@/env/server";
import crypto from "crypto";

function deriveKey(password: string, salt: string): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");
}

function deriveIV(salt: string): Buffer {
  return crypto.createHash("sha256").update(salt).digest().slice(0, 16);
}

export function encryptUserID(text: string): string {
  const key = deriveKey(env.SESSION_KEY, env.SESSION_SECRET);
  const iv = deriveIV(env.SESSION_SECRET);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decryptUserID(encryptedText: string): string {
  const key = deriveKey(env.SESSION_KEY, env.SESSION_SECRET);
  const iv = deriveIV(env.SESSION_SECRET);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
