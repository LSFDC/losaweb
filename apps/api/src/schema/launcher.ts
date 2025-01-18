import { z } from "zod";

export const LauncherSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(12)
    .trim()
    .regex(/^[a-zA-Z0-9]+$/),
  password: z.string().trim().min(8),
  privateIP: z.string().ip({
    version: "v4",
    message: "Please enter a valid private IP address.",
  }),
  publicIP: z.string().ip({
    version: "v4",
    message: "Please enter a valid public IP address.",
  }),
  HWID: z.string().min(1),
});

export type LauncherSchema = z.infer<typeof LauncherSchema>;
