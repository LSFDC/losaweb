import { CoinsIcon } from "lucide-react";
import { Card, CardContent } from "@losaweb/ui/components/card";
import { UserModel } from "@/model/user";
import { Button } from "@losaweb/ui/components/button";
import Link from "next/link";

export async function WalletInfo() {
  const userdata = await UserModel.getUserSession();

  if (!userdata) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-medium ">Balance</h2>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold">
                  {userdata.cashinfo.amtCash}
                </h2>
                <Button asChild>
                  <Link href="/wallet/topup">Top Up</Link>
                </Button>
              </div>
            </div>
            <CoinsIcon className=" h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-medium ">Daily Limit</h2>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold">
                  {userdata.walletinfo.dailyLimit}
                </h2>
              </div>
            </div>
            <CoinsIcon className=" h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-medium ">Monthly Limit</h2>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold">
                  {userdata.walletinfo.monthlyLimit}
                </h2>
              </div>
            </div>
            <CoinsIcon className=" h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Total Transaction</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Today:</span>
                  <span className="text-sm">50000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Month:</span>
                  <span className="text-sm">50000</span>
                </div>
                <div className="flex justify-between gap-12">
                  <span className="text-sm">Last topup:</span>
                  <span className="text-sm">20/10/2025 5:30</span>
                </div>
              </div>
            </div>
            <CoinsIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
