import { z } from "zod";

const allowedCharsRegex = /^[a-zA-Z0-9]+$/;

export const languages = [
  { label: "English", value: "en" },
  { label: "Thailand", value: "th" },
  { label: "Indonesia", value: "id" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

type Language = (typeof languages)[number]["value"];

const LangVALUE: [Language, ...Language[]] = [
  languages[0]!.value,

  ...languages.slice(1).map((p) => p.value),
];

export const AuthRegSchema = z.object({
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
    .max(12)
    .trim()
    .refine((value) => allowedCharsRegex.test(value), {
      message: "Nickname can only contain alphanumeric characters",
    })
    .refine((value) => (value.match(/[a-zA-Z]/g) || []).length >= 4, {
      message: "Nickname must contain at least four letters",
    }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        "Minimum eight characters, at least one letter, one number and one special character",
    }),
  ipaddress: z.string().ip({
    version: "v4",
    message: "IP is not allowed",
  }),
  captchaToken: z.string(),
  language: z.enum(LangVALUE),
  newslatter: z.boolean().optional().default(false),
});

export const AuthLoginSchema = z.object({
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
  ipaddress: z.string().ip({
    version: "v4",
    message: "IP is not allowed",
  }),
  captchaToken: z.string().min(1),
});

export const DiscordVerifySchema = z.object({
  oauthcode: z.string(),
  userid: z.string(),
});

export const EmailVerifySchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  otpcode: z
    .string()
    .max(7, {
      message: "OTP Code must be at most 7 characters long",
    })
    .trim()
    .refine((value) => allowedCharsRegex.test(value), {
      message: "OTP code can only contain alphanumeric characters",
    }),
  ipaddress: z.string().ip({
    version: "v4",
    message: "IP is not allowed",
  }),
  captchaToken: z.string(),
});

export const AuthUsernameCheckerSchema = z.object({
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
});

export const AuthEmailCheckerSchema = z.object({
  email: z.string().email(),
});

export const AuthNickameCheckerSchema = z.object({
  nickname: z
    .string()
    .min(4, {
      message: "Nickname must be at least 4 characters long",
    })
    .max(12, {
      message: "Nickname must be at most 12 characters long",
    })
    .trim()
    .refine((value) => allowedCharsRegex.test(value), {
      message: "Nickname can only contain alphanumeric characters",
    }),
});
