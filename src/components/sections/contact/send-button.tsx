"use client";

import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SendButtonProps {
  loading: boolean;
}

export function SendButton({
  loading,
}: SendButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="
        h-12
        w-full
        rounded-2xl
        text-base
      "
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          Send Message
        </>
      )}
    </Button>
  );
}