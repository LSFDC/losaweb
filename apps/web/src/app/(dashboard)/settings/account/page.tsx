import { Separator } from "@losaweb/ui/components/separator";
import { AccountForm } from "../_components/account-form";
import { UserService } from "@/services/user.service";

export default async function AccountSettingPage() {
  const userdata = await UserService.getMe();

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
      <AccountForm userdata={userdata.data} />
    </div>
  );
}
