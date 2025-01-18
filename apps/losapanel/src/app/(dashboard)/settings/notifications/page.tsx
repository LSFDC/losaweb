import { SettingNotificationForm } from "@/components/dashboard/settings/setting-notification-form";
import { UserModel } from "@/model/user";
import { Separator } from "@losaweb/ui/components/separator";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

export default async function SettingNotificationPage() {
  const userdata = await UserModel.getUserSession();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Update your notification preferences. Choose which notifications you
          want to receive.
        </p>
      </div>
      <Separator />
      <SettingNotificationForm userdata={userdata!} />
    </div>
  );
}
