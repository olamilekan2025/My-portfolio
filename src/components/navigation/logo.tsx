import Link from "next/link";
import { GradientText } from "@/components/common/gradient-text";

export function Logo() {
  return (
    <Link
      href="#home"
      aria-label="Go to homepage"
      className="flex items-center gap-3 text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
    >
      <div className="flex absolute  h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 text-white shadow-lg ">
        OA
         
      </div>
      <span className="relative  flex h-3 w-3 md:hidden ml-7 mt-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
          </span>

      <div className="hidden sm:flex flex-col leading-none">
        <div className="flex items-center gap-2">
          {/* <GradientText>Olamilekan</GradientText> */}

          {/* Online Status */}
          <span className="relative flex h-3 w-3 ml-7 mt-10">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
          </span>
        </div>

        <span className="text-xs font-medium text-emerald-500">
          Available for work
        </span>
      </div>
    </Link>
  );
}