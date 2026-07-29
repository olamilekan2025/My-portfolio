"use client";

import { useEffect } from "react";

interface AdminHotkeyProps {
  onOpen: () => void;
}

export function AdminHotkey({
  onOpen,
}: AdminHotkeyProps) {
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();

        onOpen();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [onOpen]);

  return null;
}