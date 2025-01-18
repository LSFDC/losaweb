import AuthCardWrapper from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthCardWrapper
      title="Login to Lost Saga"
      description="Welcome back, Heroes!"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLabel="Register"
    >
      <LoginForm />
    </AuthCardWrapper>
  );
}
