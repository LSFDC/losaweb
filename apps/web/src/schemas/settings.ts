import { allowedCharsRegex } from "@/lib/constant/string-helper";
import { z } from "zod";

export const generalFormSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters long",
    })
    .max(12, {
      message: "Username must be at most 12 characters long",
    })
    .trim()
    .refine((value) => allowedCharsRegex.test(value), {
      message: "Username can only contain alphanumeric characters",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
});

export const accountFormSchema = z.object({
  nickname: z
    .string()
    .min(4, {
      message: "Nickname must be at least 4 characters long",
    })
    .max(12)
    .trim()
    .refine((value) => allowedCharsRegex.test(value), {
      message: "Nickname can only contain alphanumeric characters",
    })
    .refine((value) => (value.match(/[a-zA-Z]/g) || []).length >= 4, {
      message: "Nickname must contain at least four letters",
    }),
  imageUrl: z.string().optional(),
});

//types
export type GeneralFormValues = z.infer<typeof generalFormSchema>;
export type AccountFormValues = z.infer<typeof accountFormSchema>;
