import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      eyebrow="Reset password"
      title="Choose a new password and complete the reset."
      description="The token can come directly from the reset email link, and it is invalidated after a successful password change."
      helper="Successful reset will invalidate the token and return the user to the sign-in flow."
    >
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
