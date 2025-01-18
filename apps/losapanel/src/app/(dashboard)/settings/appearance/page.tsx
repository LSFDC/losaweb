import { SettingAppearanceForm } from "@/components/dashboard/settings/setting-appearance-form";
import { Separator } from "@losaweb/ui/components/separator";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Appearance",
};

export default function SettingAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Update your appearance settings. Choose your preferred theme and font.
        </p>
      </div>
      <Separator />
      <SettingAppearanceForm />
    </div>
  );
}
