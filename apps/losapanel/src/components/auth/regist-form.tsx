"use client";

import { Button } from "@losaweb/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@losaweb/ui/components/form";
import { Input } from "@losaweb/ui/components/input";
import { PasswordInput } from "@losaweb/ui/components/password-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@losaweb/ui/components/select";
import Turnstile, { useTurnstile } from "react-turnstile";
import { Checkbox } from "@losaweb/ui/components/checkbox";
import Link from "next/link";

import { toast } from "sonner";

import { CircularProgress } from "@/components/auth/check-mark";
import { motion, useMotionValue } from "motion/react";
import { env } from "@/env/client";

import { LoaderCircleIcon } from "lucide-react";
import { RegisterSchema } from "@/schemas/auth";

import {
  RegisterAction,
  checkEmailAvailable,
  checkNicknameAvailable,
  checkUsernameAvailable,
} from "@/actions/auth";
import { languages } from "@/lib/constant";

export function RegistForm() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<number>(1);

  const tursntile = useTurnstile();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      language: "",
      termsOfService: false,
      captchaToken: "",
      newslatter: false,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const { error, message } = await RegisterAction(values);

      if (error) {
        toast.error(error.toString());
        form.reset();
        tursntile.reset();
        setStep(1);
        return;
      }

      if (message) {
        toast.success(message.toString());
        setStep(0);
        form.reset();
        tursntile.remove();
        return;
      }
    });
  };

  const nextStep = async () => {
    switch (step) {
      case 1: {
        const isStep1Valid = await form.trigger(["username", "email"]);
        if (!isStep1Valid) return;

        const usernameAvailable = await checkUsernameAvailable(
          form.getValues("username")
        );

        if (!usernameAvailable.status) {
          form.setError("username", {
            type: "custom",
            message: usernameAvailable.message!,
          });
          return;
        }

        const emailAvailable = await checkEmailAvailable(
          form.getValues("email")
        );

        if (!emailAvailable.status) {
          form.setError("email", {
            type: "custom",
            message: emailAvailable.message!,
          });
          return;
        }

        setStep((prev) => prev + 1);

        break;
      }
      case 2: {
        const isStep2Valid = await form.trigger(["nickname", "language"]);
        if (!isStep2Valid) return;

        const nicknameAvailable = await checkNicknameAvailable(
          form.getValues("nickname")
        );

        if (!nicknameAvailable.status) {
          form.setError("nickname", {
            type: "custom",
            message: nicknameAvailable.message!,
          });
          return;
        }

        setStep((prev) => prev + 1);

        break;
      }
      case 3: {
        const isStep3Valid = await form.trigger([
          "password",
          "confirmPassword",
        ]);
        if (!isStep3Valid) return;
        setStep((prev) => prev + 1);
        break;
      }
      case 4: {
        const isStep4Valid = await form.trigger([
          "termsOfService",
          "captchaToken",
        ]);

        if (!isStep4Valid) return;

        break;
      }
      default:
        break;
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const progress = useMotionValue(90);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 0 && (
          <div
            className="text-center text-2xl  text-green-900 flex gap-2 items-center"
            suppressHydrationWarning
          >
            <div>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 100 }}
                style={{ x: progress ?? 0 }}
                transition={{ duration: 1 }}
              />
              <CircularProgress progress={progress} />
            </div>
            Registration Successfully!
          </div>
        )}

        {step === 1 && (
          <>
            <h2 className="text-sm  mb-4">
              Step 1: Set username & active email
            </h2>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full"
              size="lg"
              onClick={nextStep}
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-sm  mb-4">
              Step 2: Set your nickname and choose language
            </h2>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                      value={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger onChange={field.onChange}>
                          <SelectValue placeholder="Select your preferred language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => {
                          return (
                            <SelectItem key={lang.label} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                className="w-1/2 mr-2"
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>

              <Button
                type="button"
                className="w-1/2 ml-2"
                size="lg"
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-sm  mb-4">Step 3: Set your password</h2>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="submit"
                className="w-1/2 mr-2"
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>

              <Button
                type="button"
                className="w-1/2 ml-2"
                size="lg"
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-sm  mb-4">Step 4: Verification</h2>

            <FormField
              control={form.control}
              name="termsOfService"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border px-2 py-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                    <FormDescription>
                      By checking this, You agree to our
                      <Link href="/tos" className="mx-1 text-red-700">
                        Terms of Service
                      </Link>
                      and
                      <Link href="/privacy" className="mx-1 text-red-700">
                        Privacy Policy
                      </Link>
                      .
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newslatter"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-start space-x-3 space-y-0 rounded-md border px-2 py-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Give me all information (Optional)</FormLabel>
                    <FormDescription>
                      By checking this, You will receive all news from us to
                      your email.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="captchaToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Turnstile
                      sitekey={env.NEXT_PUBLIC_CF_SITE_KEY}
                      retry="never"
                      onSuccess={(token) => {
                        field.onChange(token);
                      }}
                      onVerify={(token) => {
                        {
                          field.onChange(token);
                        }
                      }}
                      // onLoad={(widgetId, bound) => {
                      //   // before:
                      //   window.turnstile.execute(widgetId);
                      //   // now:
                      //   bound.execute();
                      // }}
                      onExpire={() => {
                        field.onChange(() => {
                          return "";
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                className="w-1/2 mr-2"
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="w-1/2 ml-2"
                size="lg"
              >
                {isPending ? (
                  <>
                    <div className="flex items-center gap-4">
                      <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                      Submitting
                    </div>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
