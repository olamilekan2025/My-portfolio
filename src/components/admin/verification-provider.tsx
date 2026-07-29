"use client";

import { useState } from "react";

import { AdminHotkey } from "./admin-hotkey";
import { VerificationModal } from "./verification-modal";

export function VerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
const [open, setOpen] = useState(false);

const [attempts, setAttempts] =
  useState(0);

const [lockedUntil, setLockedUntil] =
  useState<number | null>(null);

  return (
    <>
      <AdminHotkey
        onOpen={() => setOpen(true)}
      />

     <VerificationModal
  open={open}
  onClose={() => setOpen(false)}
  attempts={attempts}
  setAttempts={setAttempts}
  lockedUntil={lockedUntil}
  setLockedUntil={setLockedUntil}
/>

      {children}
    </>
  );
}