import { CoinsIcon } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";
import { UserService } from "@/services/user.service";
import { Card, CardContent } from "@losaweb/ui/components/card";

export async function WalletInfo() {
  const { data } = await UserService.getMe();

  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-medium ">Balance</h2>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold">
                  {currencyFormatter(
                    data.walletinfo.cash.amtCash,
                    data.walletinfo.currency
                  )}
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
              <h2 className="text-lg font-medium ">Daily Limit</h2>
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold">
                  {currencyFormatter(
                    data.walletinfo.dailyLimit,
                    data.walletinfo.currency
                  )}
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
                  {currencyFormatter(
                    data.walletinfo.monthlyLimit,
                    data.walletinfo.currency
                  )}
                </h2>
              </div>
            </div>
            <CoinsIcon className=" h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
