import { type Metadata } from "next";
import Link from "next/link";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@losaweb/ui/components/card";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
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

          <h1 className="text-3xl font-bold">Login to Lost Saga</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Heroes!</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{" "}
          </span>
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </Card>
    </>
  );
}
