"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
        confirmPassword,
      }),
    });

    const payload = (await response.json()) as {
      success: boolean;
      data?: { message?: string };
      error?: { message?: string };
    };

    setIsSubmitting(false);

    if (!response.ok || !payload.success) {
      setError(payload.error?.message ?? "Unable to reset password.");
      return;
    }

    setMessage(payload.data?.message ?? "Password updated.");
    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 600);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-form__field">
        <span>Reset token</span>
        <input
          type="text"
          placeholder="Paste or open with your secure token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>New password</span>
        <input
          type="password"
          placeholder="Enter a new password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>Confirm password</span>
        <input
          type="password"
          placeholder="Re-enter your new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
      </label>
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}
      {message ? <p className="form-feedback form-feedback--success">{message}</p> : null}
      <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update password"}
      </button>
      <div className="auth-form__links">
        <Link href="/login">Back to login</Link>
      </div>
    </form>
  );
}
