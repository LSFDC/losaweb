"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@losaweb/ui/components/alert-dialog";
import { LoaderCircleIcon, LogOutIcon } from "lucide-react";
import { Button } from "@losaweb/ui/components/button";
import { useTransition } from "react";
import { LogoutAction } from "@/actions/auth";
// import { LogoutAction } from "@/actions/auth";

export function LogoutSidebarBtn() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await LogoutAction();
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="w-full">
            <LogOutIcon />
            Log out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account. Are you sure you want to
              do this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              {isPending ? (
                <>
                  <div className="flex items-center gap-4">
                    <LoaderCircleIcon className="w-5 h-5 animate-spin" />
                    Logging out...
                  </div>
                </>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
