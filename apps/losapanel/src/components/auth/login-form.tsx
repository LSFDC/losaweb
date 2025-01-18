"use client";

import { Button } from "@losaweb/ui/components/button";
import {
  Form,
  FormControl,
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

import Turnstile, { useTurnstile } from "react-turnstile";

import { toast } from "sonner";

import { env } from "@/env/client";

import { LoaderCircleIcon } from "lucide-react";

import { LoginAction } from "@/actions/auth";
import { LoginSchema } from "@/schemas/auth";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<number>(1);

  const tursntile = useTurnstile();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
      captchaToken: "",
    },
  });

  const onSubmit = (values: LoginSchema) => {
    startTransition(async () => {
      const { error, message } = await LoginAction(values);

      if (error) {
        toast.error(error.toString());
        form.reset();
        tursntile.reset();
        setStep(1);
        return;
      }

      if (message) {
        toast.success(message.toString());
        form.reset();
        tursntile.remove();
        return;
      }

      // form.reset();
      // tursntile.remove();
    });
  };

  const nextStep = async () => {
    switch (step) {
      case 1: {
        const isStep1Valid = await form.trigger(["username", "password"]);
        if (!isStep1Valid) return;

        setStep((prev) => prev + 1);
        break;
      }
      case 2: {
        const isStep2Valid = await form.trigger(["captchaToken"]);
        if (!isStep2Valid) return;
        setStep((prev) => prev + 1);
        break;
      }
      default:
        break;
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
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
