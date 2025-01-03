import { type Metadata } from "next";
import Link from "next/link";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { Card } from "@losaweb/ui/components/card";
import { RegistForm } from "@/components/auth/regist-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <>
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo}
            width={500}
            height={500}
            alt="Losa Logo"
            className="w-32 h-2w-32 text-primary mb-5 rounded-md"
          />

          <h1 className="text-3xl font-bold">Join Lost Saga</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start playing
          </p>
        </div>

        <RegistForm />

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </>
  );
}
