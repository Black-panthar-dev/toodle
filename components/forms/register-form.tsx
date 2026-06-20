"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const initialState: RegisterState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<RegisterState>(initialState);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const payload = (await response.json()) as {
      success: boolean;
      error?: { message?: string };
      data?: { message?: string };
    };

    setIsSubmitting(false);

    if (!response.ok || !payload.success) {
      setError(payload.error?.message ?? "Registration failed.");
      return;
    }

    setMessage(payload.data?.message ?? "Account created.");
    setFormState(initialState);
    router.push("/login");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-form__field">
        <span>Full name</span>
        <input
          type="text"
          placeholder="Areeba Khan"
          value={formState.fullName}
          onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
          autoComplete="name"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>Email address</span>
        <input
          type="email"
          placeholder="student@example.com"
          value={formState.email}
          onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
          autoComplete="email"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>Phone number</span>
        <input
          type="tel"
          placeholder="+92 300 1234567"
          value={formState.phone}
          onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
          autoComplete="tel"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>Password</span>
        <input
          type="password"
          placeholder="Create a password"
          value={formState.password}
          onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
          autoComplete="new-password"
          required
        />
      </label>
      <label className="auth-form__field">
        <span>Confirm password</span>
        <input
          type="password"
          placeholder="Confirm your password"
          value={formState.confirmPassword}
          onChange={(event) =>
            setFormState((current) => ({ ...current, confirmPassword: event.target.value }))
          }
          autoComplete="new-password"
          required
        />
      </label>
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}
      {message ? <p className="form-feedback form-feedback--success">{message}</p> : null}
      <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
      <div className="auth-form__links">
        <Link href="/login">Already have an account?</Link>
      </div>
    </form>
  );
}
