"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  CreditCard,
  Wallet,
  RotateCcw,
  CheckIcon,
} from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@losaweb/ui/components/radio-group";

import { toast } from "sonner";
import { cn } from "@losaweb/ui/lib/utils";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Please select an amount to top up.",
  }),
  paymentMethod: z.enum(["credit-card", "paypal"], {
    required_error: "Please select a payment method.",
  }),
  promoCode: z.string().optional(),
});

export function WalletTopUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">(
    "idle"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      paymentMethod: undefined,
      promoCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.success(
      `Your account has been credited with $${values.amount} using ${values.paymentMethod}.${promoStatus === "valid" ? " Promo code applied." : ""}`,
      {
        onAutoClose: () => {
          window.location.reload();
          form.reset();
        },
        onDismiss: () => {
          window.location.reload();
          form.reset();
        },
      }
    );
  }

  async function checkPromoCode(code: string) {
    if (!code) return;

    setIsCheckingPromo(true);
    // Simulate API call to check promo code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsCheckingPromo(false);

    // For demonstration, we'll consider codes starting with "PROMO" as valid
    const isValid = code.toUpperCase().startsWith("PROMO");
    setPromoStatus(isValid ? "valid" : "invalid");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 lg:grid-cols-8 gap-4"
                >
                  {[10, 25, 50, 100].map((amount) => (
                    <FormItem key={amount}>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem
                            value={amount.toString()}
                            className="sr-only"
                          />
                        </FormControl>
                        <div
                          className={cn(
                            "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                            field.value === amount.toString() &&
                              "border-primary bg-accent text-accent-foreground"
                          )}
                        >
                          <span className="text-2xl font-bold">{amount}</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 lg:grid-cols-8 gap-4 items-center"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem
                          value="credit-card"
                          className="sr-only"
                        />
                      </FormControl>
                      <div
                        className={cn(
                          "flex flex-col space-y-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                        )}
                      >
                        <CreditCard className="h-6 w-6" />
                        <span className="text-xs md:text-sm font-medium">
                          Credit Card
                        </span>
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="paypal" className="sr-only" />
                      </FormControl>
                      <div
                        className={cn(
                          "flex flex-col space-y-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                        )}
                      >
                        <Wallet className=" h-6 w-6" />
                        <span className="text-xs md:text-sm font-medium">
                          PayPal
                        </span>
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="promoCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promo Code</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    placeholder="Enter promo code (optional)"
                    {...field}
                    className={
                      promoStatus === "valid"
                        ? "border-green-500"
                        : promoStatus === "invalid"
                          ? "border-red-500"
                          : ""
                    }
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => checkPromoCode(field.value!)}
                  disabled={isCheckingPromo || !field.value}
                >
                  {isCheckingPromo ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : promoStatus === "valid" ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : promoStatus === "invalid" ? (
                    <RotateCcw className="h-4 w-4 text-red-500" />
                  ) : (
                    "Check"
                  )}
                </Button>
              </div>
              <FormDescription>
                {promoStatus === "valid"
                  ? "Promo code has been applied."
                  : `If you have a promo code, enter it here and click Check for
                additional benefits.`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processing..." : "Top Up Now"}
        </Button>
      </form>
    </Form>
  );
}

export function WalletTopUpFormWizard() {
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        {[1, 2, 3].map((number) => (
          <div key={number} className="relative z-10 ">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors text-gray-600",
                step > number
                  ? "bg-primary text-white"
                  : step === number
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
              )}
            >
              {step > number ? <CheckIcon className="w-4 h-4" /> : number}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
