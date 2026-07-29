"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  const [canSignup, setCanSignup] =
    useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch(
          "/api/admin/has-admin",
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        console.log(data);

        setCanSignup(!data.hasAdmin);
      } catch (err) {
        console.error(err);
      }
    }

    checkAdmin();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        }
      );

      if (result?.error) {
        setError(
          "Invalid email or password."
        );
        return;
      }

      if (result?.ok) {
        router.replace("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError(
        "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
            <Lock className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold">
            Admin Login
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sign in to access the admin
            dashboard
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-input bg-background/50 py-2.5 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-background/50 py-2.5 pl-10 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Create Admin */}
            {canSignup && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No administrator
                  account has been
                  created yet.
                </p>

                <Link
                  href="/admin/signup"
                  className="mt-3 inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:opacity-90"
                >
                  Create Admin Account
                </Link>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-2.5 font-semibold text-white disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}