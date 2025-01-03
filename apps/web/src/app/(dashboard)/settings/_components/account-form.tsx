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
import { User } from "@losaweb/database/types/user";
import { accountFormSchema, AccountFormValues } from "@/schemas/settings";

import { AvatarUpload } from "@losaweb/ui/components/avatar-upload";
// import { ChangeEvent, useState } from "react";

export function AccountForm({ userdata }: { userdata: User }) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      nickname: userdata.nickName,
      imageUrl: userdata.userinfo.userImage,
    },
    mode: "onChange",
  });

  function onSubmit() {
    // toast({
    //   //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
