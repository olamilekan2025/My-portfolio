import { Loader2, Send } from "lucide-react";

interface SendButtonProps {
  loading: boolean;
}

export function SendButton({ loading }: SendButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        group
        relative
        isolate
        flex
        h-12
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        bg-primary
        px-6
        text-base
        font-semibold
        text-primary-foreground
        transition-all
        duration-300
      "
    >
      {/* Animated background */}
      <span
        className="
          absolute
          inset-0
          z-0
          origin-left
          scale-x-0
          bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
          transition-transform
          duration-500
          ease-out
          group-hover:scale-x-100
        "
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center">
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
      </span>
    </button>
  );
}