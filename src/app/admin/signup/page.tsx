import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Create Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminSignupPage() {
  await connectDB();

  const admin = await Admin.findOne().lean();

  if (admin) {
    redirect("/admin/login");
  }

  return <SignupForm />;
}