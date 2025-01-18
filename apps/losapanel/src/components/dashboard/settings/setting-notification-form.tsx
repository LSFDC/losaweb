"use client";

import { updateNotificationSetting } from "@/actions/setting";
import { User } from "@/types/user";
import { Checkbox } from "@losaweb/ui/components/checkbox";
import { Label } from "@losaweb/ui/components/label";
import { useTransition } from "react";
import { LoaderIcon } from "lucide-react";

export function SettingNotificationForm({ userdata }: { userdata: User }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: boolean) => {
    startTransition(async () => {
      await updateNotificationSetting(value);
    });
  };

  return (
    <div>
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        {isPending ? (
          <div className="flex flex-col items-center">
            <LoaderIcon className="animate-spin h-5 w-5 " />
            <small>Updating...</small>
          </div>
        ) : (
          <Checkbox
            checked={userdata.mailling === 1 ? true : false}
            onCheckedChange={handleChange}
            className="w-6 h-6 text-gray-600 border-gray-300 rounded-md"
          />
        )}
        <div className="space-y-1 leading-none">
          <Label>Receive all notifications to my email</Label>
          <p className="text-sm text-muted-foreground">
            You will receive notifications to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}
