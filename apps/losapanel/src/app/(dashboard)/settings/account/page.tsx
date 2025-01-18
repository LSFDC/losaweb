import { SettingAccountForm } from "@/components/dashboard/settings/setting-account-form";
import { UserModel } from "@/model/user";
import { Separator } from "@losaweb/ui/components/separator";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountSettingPage() {
  const userdata = await UserModel.getUserSession();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <SettingAccountForm userdata={userdata!} />
    </div>
  );
}
