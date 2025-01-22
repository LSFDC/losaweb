"use client";

import { useState } from "react";
import { Button } from "@losaweb/ui/components/button";
import { Input } from "@losaweb/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@losaweb/ui/components/radio-group";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckIcon,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@losaweb/ui/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@losaweb/ui/components/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@losaweb/ui/components/progress";

import { toast } from "sonner";
import { amountList } from "@/lib/constant";
import { PaymentMethodList } from "@losaweb/tripay-sdk/types/tripay";
import { User } from "@/types/user";
import { currencyFormatter, getPriceByCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  amount: z.string().min(3, {
    message: "Please select an amount to top up.",
  }),
  paymentMethod: z.string(),
  promoCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function TopUpFormWizard({
  userdata,
  paymentchannel,
}: {
  userdata: User;
  paymentchannel: PaymentMethodList[] | null;
}) {
  const [step, setStep] = useState(1);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">(
    "idle"
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      amount: "",
      promoCode: "",
    },
  });

  const nextStep = async () => {
    switch (step) {
      case 1: {
        const isStep1Valid = await form.trigger(["amount"]);
        if (!isStep1Valid) return;
        setStep((prev) => prev + 1);
        break;
      }
      case 2: {
        const isStep2Valid = await form.trigger(["paymentMethod"]);
        if (!isStep2Valid) return;

        // Validate promo code if exist
        const promoCode = form.getValues("promoCode");
        if (promoCode) {
          const isPromoValid = await checkPromoCode(promoCode);
          if (!isPromoValid) {
            toast.error("Invalid promo code");
            return;
          }
        }

        setStep((prev) => prev + 1);
        break;
      }
      case 3: {
        form.handleSubmit(onSubmit)(); // Invoke the form submission handler
        break;
      }
      default:
        break;
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  async function onSubmit(data: FormValues) {
    toast.success("Top-up successful!");
    console.log("Form submitted with data:", data);
    setStep((prev) => prev + 1);
  }

  async function checkPromoCode(code: string | undefined): Promise<boolean> {
    if (code) {
      setIsCheckingPromo(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsCheckingPromo(false);

      const isValid = code.toUpperCase().startsWith("PROMO");
      setPromoStatus(isValid ? "valid" : "invalid");
      return isValid;
    }

    return false;
  }

  return (
    <>
      <div className="flex justify-between relative">
        <Progress
          className="absolute transition-all duration-300"
          value={((step - 1) / 3) * 100}
        />
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className="relative z-10 -top-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step > number
                  ? "bg-primary text-white"
                  : step === number
                    ? "bg-primary text-white dark:text-gray-600"
                    : "bg-primary text-white dark:text-gray-600"
              )}
            >
              {step > number || step === 4 ? (
                <CheckIcon className="w-4 h-4 text-primary-foreground" />
              ) : (
                number
              )}
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Select Amount</h2>
                <p className="text-muted-foreground">
                  Choose your top-up amount
                </p>
              </div>
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
                        {amountList.map((amount) => (
                          <FormItem key={amount.id}>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem
                                  value={amount.value.toString()}
                                  className="sr-only"
                                />
                              </FormControl>
                              <div
                                className={cn(
                                  "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                  field.value === amount.value.toString() &&
                                    "border-primary bg-accent text-accent-foreground"
                                )}
                              >
                                <span className="text-2xl font-bold">
                                  {amount.label}
                                </span>
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
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Payment Method</h2>
                <p className="text-muted-foreground">
                  Select your preferred payment method
                </p>
              </div>

              {/* <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className=""
                      >
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-accent">
                            <FormControl>
                              <RadioGroupItem
                                value="credit-card"
                                className="sr-only"
                              />
                            </FormControl>
                            <div
                              className={cn(
                                "flex space-y-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-6 w-6" />
                                <span className="text-xs md:text-sm font-medium">
                                  Credit Card
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Visa, Mastercard</span>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-accent">
                            <FormControl>
                              <RadioGroupItem
                                value="paypal"
                                className="sr-only"
                              />
                            </FormControl>
                            <div
                              className={cn(
                                "flex space-y-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-6 w-6" />
                                <span className="text-xs md:text-sm font-medium">
                                  Paypal
                                </span>
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
                        className="grid md:grid-cols-2 gap-4"
                      >
                        {paymentchannel &&
                          paymentchannel
                            .filter((p) => {
                              return (
                                getPriceByCurrency(
                                  Number(form.getValues("amount")),
                                  userdata.walletinfo.currency,
                                  0
                                ) >= p.minimum_amount &&
                                getPriceByCurrency(
                                  Number(form.getValues("amount")),
                                  userdata.walletinfo.currency,
                                  0
                                ) <= p.maximum_amount
                              );
                            })
                            .map((payment) => (
                              <FormItem key={payment.code}>
                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-accent">
                                  <FormControl>
                                    <RadioGroupItem
                                      value={payment.code}
                                      className="sr-only"
                                    />
                                  </FormControl>
                                  <div
                                    className={cn(
                                      "flex space-y-2 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                                    )}
                                  >
                                    <div className="flex flex-col items-center gap-3">
                                      {/* <img
                                        src={payment.icon_url}
                                        width={150}
                                        alt=""
                                      /> */}
                                      <Image
                                        src={payment.icon_url}
                                        alt={payment.name}
                                        width={150}
                                        height={150}
                                      />
                                      <span className="text-xs md:text-sm font-medium">
                                        {payment.code === "QRISC"
                                          ? "QRIS"
                                          : payment.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <span>
                                        {currencyFormatter(
                                          getPriceByCurrency(
                                            Number(form.getValues("amount")),
                                            userdata.walletinfo.currency,
                                            payment.total_fee.flat
                                          ),
                                          userdata.walletinfo.currency
                                        )}
                                      </span>
                                    </div>
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
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Review & Confirm</h2>
              <ul className="space-y-2">
                <li>
                  <span>Amount :</span> {form.getValues("amount")}
                </li>
                <li>
                  <span>Payment Method :</span>{" "}
                  {
                    paymentchannel?.find(
                      (p) => p.code === form.getValues("paymentMethod")
                    )?.name
                  }
                </li>
                <li>
                  <span>Price :</span>{" "}
                  {currencyFormatter(
                    getPriceByCurrency(
                      Number(form.getValues("amount")),
                      userdata.walletinfo.currency,
                      0
                    ),
                    userdata.walletinfo.currency
                  )}
                </li>
                <li>
                  <span>Fee/Tax :</span>{" "}
                  {currencyFormatter(
                    paymentchannel?.find(
                      (p) => p.code === form.getValues("paymentMethod")
                    )?.total_fee.flat as number,
                    userdata.walletinfo.currency
                  )}
                </li>

                <li>
                  <span>Promo Code :</span>{" "}
                  {(promoStatus === "valid" && form.getValues("promoCode")) ||
                    "None"}
                </li>
              </ul>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Transaction Created</h3>
              <p className="text-muted-foreground">
                Thank you for topping up your account! Your payment details are
                provided below.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Amount:</strong> {form.getValues("amount")}
                </div>
                <div className="text-sm">
                  <strong>Payment Method:</strong>{" "}
                  {
                    paymentchannel?.find(
                      (p) => p.code === form.getValues("paymentMethod")
                    )?.name
                  }
                </div>

                {form.getValues("promoCode") && promoStatus === "valid" && (
                  <div className="text-sm">
                    <strong>Promo Code:</strong> {form.getValues("promoCode")}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button className="space-x-2" asChild>
                  <Link href="/wallet" passHref>
                    <RotateCcw className="w-4 h-4" />
                    <span>Start New Transaction</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>

      <div className="flex justify-between pt-6">
        {step < 4 && (
          <>
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            <Button onClick={nextStep} className="space-x-2">
              <span>{step === 3 ? "Confirm Payment" : "Next"}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </>
  );
}
