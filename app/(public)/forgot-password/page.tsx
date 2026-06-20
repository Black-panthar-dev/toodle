import { AuthCard } from "@/components/auth-card";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Forgot password"
      title="Request a secure reset link."
      description="This flow stores a hashed token, sends a Resend email, and keeps the reset link valid for 30 minutes."
      helper="In development, the reset link is logged if Resend is not configured yet."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
