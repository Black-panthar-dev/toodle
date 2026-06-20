import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Login"
      title="Sign in to continue learning or managing your workspace."
      description="Auth.js credentials sign-in now routes users into the correct workspace based on their role."
      helper="Students can register publicly. Teachers and Super Admin accounts will come from the managed workflow."
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
