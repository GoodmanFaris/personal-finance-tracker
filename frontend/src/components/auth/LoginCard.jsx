"use client";

import { useState } from "react";
import useAuthData from "../../hooks/useAuthData";

export default function LoginCard({
  title = "Welcome back",
  subtitle = "Sign in to continue",
  onSuccessRedirect = "/dashboard",
}) {
  const { login, error } = useAuthData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);

    if (ok) {
      window.location.href = onSuccessRedirect;
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/85 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-black/70">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35 focus:border-black/20 focus:bg-white transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-black/70">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35 focus:border-black/20 focus:bg-white transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="relative w-full overflow-hidden rounded-2xl px-4 py-3 text-sm font-extrabold text-green shadow-md transition disabled:opacity-80"
          style={{
            background:
              "rgba(var(--color-secondary))",
            boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
          }}
        >
          <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-white/20 opacity-20 transition group-hover:opacity-100 group-hover:translate-x-[180%]" />
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-xs text-black/45">OR</span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      <button
        type="button"
        onClick={() => alert("Google login not wired yet. Coming soon.")}
        className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-extrabold text-gray-900 hover:bg-white transition"
      >
        Sign in with Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-700">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-semibold underline">
          Create one
        </a>
      </p>
    </div>
  );
}
