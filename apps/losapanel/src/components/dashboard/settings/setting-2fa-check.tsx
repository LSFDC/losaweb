"use client";

import { useTransition } from "react";
import { LoaderIcon } from "lucide-react";
import { Checkbox } from "@losaweb/ui/components/checkbox";
import { Label } from "@losaweb/ui/components/label";
import { update2faSetting } from "@/actions/setting";

export function Enable2FACheckbox({ value }: { value: number }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: boolean) => {
    startTransition(async () => {
      await update2faSetting(value);
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
            checked={value === 1 ? true : false}
            onCheckedChange={handleChange}
            className="w-6 h-6 text-gray-600 border-gray-300 rounded-md"
          />
        )}
        <div className="space-y-1 leading-none">
          <Label>2FA by Email</Label>
          <p className="text-sm text-muted-foreground">
            You will receive 2FA code to your email address when you sign in to
            website or game.
          </p>
        </div>
      </div>
    </div>
  );
}
