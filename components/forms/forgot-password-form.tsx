"use client";

import { FormEvent, useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const payload = (await response.json()) as {
      success: boolean;
      data?: { message?: string };
      error?: { message?: string };
    };

    setIsSubmitting(false);

    if (!response.ok || !payload.success) {
      setError(payload.error?.message ?? "Unable to send reset link.");
      return;
    }

    setMessage(payload.data?.message ?? "If the account exists, a reset email has been sent.");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-form__field">
        <span>Email address</span>
        <input
          type="email"
          placeholder="student@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </label>
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}
      {message ? <p className="form-feedback form-feedback--success">{message}</p> : null}
      <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
