import { Resend } from "resend";

type PasswordResetEmailInput = {
  name: string | null;
  resetUrl: string;
  to: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function sendPasswordResetEmail({
  name,
  resetUrl,
  to,
}: PasswordResetEmailInput) {
  const resend = getResendClient();

  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Password reset email preview", { to, resetUrl });
      return;
    }

    throw new Error("RESEND_API_KEY is not configured.");
  }

  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  await resend.emails.send({
    from,
    to,
    subject: "Reset your Toodle password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172019;">
        <h1 style="font-size: 22px;">Reset your password</h1>
        <p>Hello ${name ?? "there"},</p>
        <p>Use the link below to reset your Toodle password. This link will expire in 30 minutes and can only be used once.</p>
        <p><a href="${resetUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 999px; background: #1f4f46; color: #ffffff; text-decoration: none;">Reset password</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
