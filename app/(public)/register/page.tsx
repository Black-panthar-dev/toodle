import { AuthCard } from "@/components/auth-card";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Student registration"
      title="Create a student account for subscription-based learning."
      description="Public registration is limited to the student role, exactly as defined in the Toodle MVP scope."
      helper="Teachers are created by Super Admin, and the Super Admin account will come from seed data."
    >
      <RegisterForm />
    </AuthCard>
  );
}
