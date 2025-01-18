import { allowedCharsRegex, LangVALUE } from "@/lib/constant";
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
  bio: z.optional(
    z
      .string()
      .max(160, "Bio must be at most 160 characters long")
      .regex(
        /^[\p{L}\p{N}\p{P}\p{S}\p{Z}]*$/u,
        "Only Unicode characters including emojis are allowed"
      )
  ),
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
  language: z.enum(LangVALUE, {
    message: "Please select a language.",
  }),
  imageUrl: z.string().optional(),
});

//types
export type GeneralFormValues = z.infer<typeof generalFormSchema>;
export type AccountFormValues = z.infer<typeof accountFormSchema>;
