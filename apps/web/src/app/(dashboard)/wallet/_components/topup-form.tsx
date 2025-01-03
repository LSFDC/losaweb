"use client";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@losaweb/ui/components/alert-dialog";
import { Button } from "@losaweb/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@losaweb/ui/components/card";
import { Input } from "@losaweb/ui/components/input";
import { Label } from "@losaweb/ui/components/label";
import { LoaderIcon } from "lucide-react";
import { useState, useTransition } from "react";

export function TopupForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    startTransition(async () => {
      e.preventDefault();

      setFormData({ name: "", email: "", message: "" });
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Top Up Form</CardTitle>
          <CardDescription>Choose amount and payment method.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="w-full">
                  Submit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit this form? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    {isPending ? (
                      <div className="flex gap-4">
                        <LoaderIcon />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
