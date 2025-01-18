"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@losaweb/ui/components/form";
import { Input } from "@losaweb/ui/components/input";

import { Button } from "@losaweb/ui/components/button";
import { accountFormSchema, AccountFormValues } from "@/schemas/settings";

import { AvatarUpload } from "@losaweb/ui/components/avatar-upload";
import { User } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@losaweb/ui/components/select";
import { languages } from "@/lib/constant";

import { LoaderCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { UpdateAccountSetting } from "@/actions/setting";
import { toast } from "sonner";

export function SettingAccountForm({ userdata }: { userdata: User }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      nickname: userdata.nickName,
      language: userdata.languageinfo.lang_code,
      imageUrl: userdata.userinfo.userImage,
    },
    mode: "onChange",
  });

  function onSubmit(values: AccountFormValues) {
    startTransition(async () => {
      const { error, message } = await UpdateAccountSetting(values);

      if (error) {
        toast.error(error.toString());
        form.reset();
        return;
      }

      toast.success(message);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder="nickname" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger onChange={field.onChange}>
                      <SelectValue placeholder="Select your preferred language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((lang) => {
                      return (
                        <SelectItem key={lang.label} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <AvatarUpload
                  value={
                    field.value === "default.jpg"
                      ? `/images/profiles/${field.value}`
                      : field.value
                  }
                  onChange={field.onChange}
                  onError={() => {
                    //set to default.jpg
                    field.onChange("default.jpg");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <div className="flex items-center gap-4">
                <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                Saving
              </div>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
}
