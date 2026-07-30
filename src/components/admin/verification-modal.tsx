"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;

  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;

  lockedUntil: number | null;
  setLockedUntil: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

export function VerificationModal({
  open,
  onClose,
  attempts,
  setAttempts,
  lockedUntil,
  setLockedUntil,
}: VerificationModalProps) {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  if (!open) return null;

  async function verify() {
    // Lock for 5 minutes after 3 failed attempts
    if (lockedUntil && Date.now() < lockedUntil) {
      setError("Verification temporarily unavailable.");
      return;
    }

    if (!pin.trim()) {
      setError("Enter your verification code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        const nextAttempts = attempts + 1;

        setAttempts(nextAttempts);

        setShake(true);
        setTimeout(() => setShake(false), 400);

        if (nextAttempts >= 3) {
          setLockedUntil(Date.now() + 5 * 60 * 1000);

          setError("Verification temporarily unavailable.");
          setPin("");
          return;
        }

        setError("Invalid verification code.");
        setPin("");
        return;
      }

      // Reset counters on success
      setAttempts(0);
      setLockedUntil(null);
      setPin("");

      onClose();

      // Use window.location to ensure cookie is set before navigation
      window.location.href = "/auth/login";
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: shake ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-background/90 p-8 shadow-2xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Lock className="h-7 w-7 text-primary" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold">
          Verification Required
        </h2>

        <p className="mt-3 text-center text-muted-foreground">
          Continue to the next step.
        </p>

        <input
          autoFocus
          type="password"
          value={pin}
          disabled={loading}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              verify();
            }

            if (e.key === "Escape") {
              onClose();
            }
          }}
          className="mt-8 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
          placeholder="Verification code"
        />

        {error && (
          <p className="mt-3 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={verify}
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </motion.div>
    </div>
  );
}