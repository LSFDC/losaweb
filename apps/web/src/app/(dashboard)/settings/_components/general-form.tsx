"use client";

import Link from "next/link";
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
import { Textarea } from "@losaweb/ui/components/textarea";
import { User } from "@losaweb/database/types/user";
import { generalFormSchema, GeneralFormValues } from "@/schemas/settings";

export function GeneralForm({ userdata }: { userdata: User }) {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      username: userdata.userID,
      email: userdata.email,
      bio: userdata.userinfo.bio || "",
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  className="blur-sm hover:blur-none"
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your unique identity. You can&apos;t change it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  className="blur-sm hover:blur-none"
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is a short bio that will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
