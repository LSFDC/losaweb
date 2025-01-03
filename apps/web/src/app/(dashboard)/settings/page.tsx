import { type Metadata } from "next";
import { GeneralForm } from "./_components/general-form";
import { UserService } from "@/services/user.service";
import { Separator } from "@losaweb/ui/components/separator";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const userdata = await UserService.getMe();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <Separator />
      <GeneralForm userdata={userdata.data} />
    </div>
  );
}
