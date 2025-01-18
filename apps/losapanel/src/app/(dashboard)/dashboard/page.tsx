import { Card, CardContent } from "@losaweb/ui/components/card";
import { ServerIcon, TimerIcon, WebhookIcon } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Server Status</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-2xl font-semibold text-emerald-500">
                    ONLINE (16ms)
                  </span>
                </div>
              </div>
              <ServerIcon className=" h-5 w-5" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm ">
              <TimerIcon className="h-4 w-4" />
              <span>Last updated 3 mins ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h2 className="text-lg font-medium ">Your Address</h2>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm ">PublicIP:</span>
                    <span className="text-sm ">189.98.0.5</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-sm ">PrivateIP:</span>
                    <span className="text-sm ">192.168.100.2</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-sm ">Country:</span>
                    <span className="text-sm ">United States</span>
                  </div>
                </div>
              </div>
              <WebhookIcon className=" h-5 w-5" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm ">
              <TimerIcon className="h-4 w-4" />
              <span>Last updated 3 mins ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
