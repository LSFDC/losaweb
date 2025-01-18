import AuthCardWrapper from "@/components/auth/card-wrapper";
import { RegistForm } from "@/components/auth/regist-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthCardWrapper
      title="Join Lost Saga"
      description="Create an account to start playing!"
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
    >
      <RegistForm />
    </AuthCardWrapper>
  );
}
