// "use client";

// import * as React from "react";

// import { motion } from "framer-motion";

// import { Button } from "@/components/ui/button";

// import { Container } from "@/components/common/container";

// import { NAV_ITEMS } from "@/lib/navigation";

// import { useActiveSection } from "../../../hooks/use-active-section";
// import { ResumeButton } from "@/components/common/resume-button";

// import { Logo } from "./logo";
// import { NavLink } from "./nav-link";
// import { ThemeToggle } from "./theme-toggle";
// import { MobileNav } from "./mobile-nav";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";

// export function Navbar() {
//   const active = useActiveSection([
//     "home",
//     "about",
//     "skills",
//     "projects",
//     "services",
//     "experience",
//     "testimonials",
//     "contact",
//   ]);

//   const { data: session } = useSession();
//   const router = useRouter();

//   const [scrolled, setScrolled] =
//     React.useState(false);
//   const [showLogoutModal, setShowLogoutModal] = React.useState(false);

//   React.useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     onScroll();

//     window.addEventListener(
//       "scroll",
//       onScroll
//     );

//     return () =>
//       window.removeEventListener(
//         "scroll",
//         onScroll
//       );
//   }, []);

//   return (
//     <motion.header
//       initial={false}
//       animate={{
//         y: 0,
//       }}
//       transition={{
//         duration: 0.6,
//       }}
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300  ${
//         scrolled
//           ? "border-b border-white/10 bg-background/70 backdrop-blur-2xl shadow-xl"
//           : "bg-transparent"
//       }`}
//     >
//       <Container>
//      <div
//   className={`flex items-center justify-between px-5 md:px-7 ${
//     scrolled ? "h-16" : "h-20"
//   }`}
// >
//   {/* Left */}
//   <Logo />

//   {/* Center */}
//   <nav className="hidden lg:flex items-center gap-8">
//      {NAV_ITEMS.map((item) => (
//               <NavLink
//                 key={item.href}
//                 href={item.href}
//                 label={item.label}
//                 active={
//                   active ===
//                   item.href.replace("#", "")
//                 }
//               />
//             ))}
//   </nav>
//   <ThemeToggle />

//   {/* Right */}
//   <div className="flex items-end justify-end gap-4">
//     {session?.user?.role === "admin" && (
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           render={
//             <button
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition"
//               title="Admin Menu"
//             >
//               {session?.user?.name?.charAt(0)}
//             </button>
//           }
//         />
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
//             Dashboard
//           </DropdownMenuItem>
//           <DropdownMenuItem 
//             onClick={() => setShowLogoutModal(true)}
//             className="text-destructive focus:text-destructive"
//           >
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )}

//     <div className="hidden lg:block">
//       <ResumeButton />
//     </div>

//     <MobileNav activeSection={active} />
//   </div>
// </div>
//       </Container>
      
//       {/* Logout Confirmation Modal */}
//       <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Logout</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to logout?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose render={<Button variant="outline">No</Button>} />
//             <Button
//               variant="destructive"
//               onClick={() => signOut({ callbackUrl: "/" })}
//             >
//               Yes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </motion.header>
//   );
// }





"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { ResumeButton } from "@/components/common/resume-button";

import { NAV_ITEMS } from "@/lib/navigation";
import { useActiveSection } from "../../../hooks/use-active-section";

import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Navbar() {
  const active = useActiveSection([
    "home",
    "about",
    "skills",
    "projects",
    "services",
    "experience",
    "testimonials",
    "contact",
  ]);

  const { data: session, status } = useSession();
  const router = useRouter();

  const [scrolled, setScrolled] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] =
    React.useState(false);

  // ============================================================
  // HANDLE SCROLL
  // ============================================================

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ============================================================
  // DASHBOARD ROUTE
  // ============================================================

  const handleDashboardClick = () => {
    const role = session?.user?.role;

    if (!role) {
      router.push("/auth/login");
      return;
    }

    router.push("/admin/dashboard");
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    setShowLogoutModal(false);

    await signOut({
      callbackUrl: "/",
    });
  };

  // ============================================================
  // USER INITIAL
  // ============================================================

  const userInitial =
    session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ||
    session?.user?.email?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <motion.header
      initial={false}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/70 shadow-xl backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between px-5 md:px-7 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* ================================================== */}
          {/* LEFT - LOGO */}
          {/* ================================================== */}

          <Logo />

          {/* ================================================== */}
          {/* CENTER - DESKTOP NAVIGATION */}
          {/* ================================================== */}

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={
                  active ===
                  item.href.replace("#", "")
                }
              />
            ))}
          </nav>

          {/* ================================================== */}
          {/* RIGHT */}
          {/* ================================================== */}

          <div className="flex items-center justify-end gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* ================================================= */}
            {/* LOGGED-IN USER MENU */}
            {/* ================================================= */}

            {status === "authenticated" && session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Open account menu"
                      title={
                        session.user.name ||
                        session.user.email ||
                        "Account"
                      }
                      className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                    >
                      {userInitial}

                      {/* Online indicator */}
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                    </button>
                  }
                />

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-52"
                >
                  {/* User information */}
                  <div className="px-3 py-3">
                    <p className="truncate text-sm font-semibold">
                      {session.user.name ||
                        "User"}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {session.user.email ||
                        ""}
                    </p>

                    <div className="mt-2">
                      <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-[11px] font-medium capitalize text-primary">
                        {session.user.role}
                      </span>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-border" />

                  {/* Dashboard */}
                  <DropdownMenuItem
                    onClick={handleDashboardClick}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={() =>
                      setShowLogoutModal(true)
                    }
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Resume */}
            <div className="hidden lg:block">
              <ResumeButton />
            </div>

            {/* Mobile Navigation */}
            <MobileNav activeSection={active} />
          </div>
        </div>
      </Container>

      {/* ====================================================== */}
      {/* LOGOUT CONFIRMATION */}
      {/* ====================================================== */}

      <Dialog
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Confirm Logout
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to logout of your
              account?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                >
                  No, Keep Me Signed In
                </Button>
              }
            />

            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
            >
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.header>
  );
}

