import { type Metadata } from "next";
import { Separator } from "@losaweb/ui/components/separator";
import { UserModel } from "@/model/user";
import { GeneralForm } from "@/components/dashboard/settings/setting-general-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const userdata = await UserModel.getUserSession();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <Separator />
      <GeneralForm userdata={userdata!} />
    </div>
  );
}
