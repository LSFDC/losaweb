import { allowedCharsRegex, LangVALUE } from "@/lib/constant";
import { z } from "zod";

export const RegisterSchema = z
  .object({
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
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: "Username must contain at least one letter",
      }),
    nickname: z
      .string()
      .min(4, {
        message: "Nickname must be at least 4 characters long",
      })
      .max(16)
      .trim()
      .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
        message: "Nickname can only contain alphanumeric characters",
      })
      .refine((value) => (value.match(/[a-zA-Z]/g) || []).length >= 4, {
        message: "Nickname must contain at least four letters",
      }),
    email: z.string().email({
      message: "Please enter a valid & active email",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: "Password must contain at least one letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[@$!%*#?&]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    language: z.enum(LangVALUE, {
      message: "Please select a language.",
    }),
    captchaToken: z.string().min(4, {
      message: "Captcha is required.",
    }),
    termsOfService: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must accept the terms of service.",
      }),
    newslatter: z.boolean().optional().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
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
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  captchaToken: z.string().min(4, {
    message: "Captcha is required.",
  }),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
