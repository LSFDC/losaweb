import TopUpFormWizard from "@/components/dashboard/wallet/wallet-topup-form-wizard";
import { tripay } from "@/lib/tripay";
import { UserModel } from "@/model/user";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";

import { Separator } from "@losaweb/ui/components/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Up",
};

export default async function TopUpPage() {
  const paymentChannel = await tripay.getPaymentMethod();
  const userdata = await UserModel.getUserSession();

  return (
    <div className="flex flex-col gap-4 my-5">
      <Separator />
      <Card className="">
        <CardHeader>
          <CardTitle>Top Up Form</CardTitle>
          <CardDescription>
            Enter the amount you want to top up your wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <TopUpFormWizard
            userdata={userdata!}
            paymentchannel={paymentChannel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
