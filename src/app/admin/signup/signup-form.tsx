"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function createAdmin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/admin/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email
              .trim()
              .toLowerCase(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(
          data.message ??
            "Unable to create admin."
        );
        return;
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 p-4">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Header */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
            <Lock className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold">
            Create Admin
          </h1>

          <p className="mt-2 text-muted-foreground">
            This setup can only be completed once.
          </p>

        </div>

        {/* Card */}

        <div className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-xl">

          <form
            onSubmit={createAdmin}
            className="space-y-5"
          >
            {/* Name */}

            <div>

              <label className="mb-1.5 block text-sm font-medium">
                Full Name
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-input bg-background/50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-1.5 block text-sm font-medium">
                Email
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-input bg-background/50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-1.5 block text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-background/50 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Button */}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Administrator"
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}