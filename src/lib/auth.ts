import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyPassword } from "@/lib/password";

export const config: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          await connectDB();

          const admin = await Admin.findOne({ email });

          if (!admin) {
            return null;
          }

          const isValid = await verifyPassword(password, admin.password);

          if (!isValid) {
            return null;
          }

return {
  id: admin._id.toString(),
  name: admin.name,
  email: admin.email,
  role: admin.role || "admin",
};
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id as string;
      token.role = (user as { role?: string }).role ?? "admin";
      token.email = user.email ?? "";
      token.name = user.name ?? "";
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
    }

    return session;
  },
},

  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

