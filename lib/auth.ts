import { User } from "@prisma/client";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/email"


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const userWithPassword = await prisma.user.findUnique({
          where: { username: credentials.username },
          include: {
            password: true,
          },
        });



        if (!userWithPassword || !userWithPassword.password || !userWithPassword.active) {
          return null;
        }

        const isValid = await compare(
          credentials.password,
          userWithPassword.password.hash
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: userWithPassword.id,
          name: userWithPassword.name,
          username: userWithPassword.username,
          role: userWithPassword.role,
          active: userWithPassword.active,
        } as User;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          role: u.role,
          name: u.name,
          username: u.username,
          active: u.active,
        };
      }
      return token;
    },
    session: ({ session, token }) => {

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          randomKey: token.randomKey,
          role: token.role,
          username: token.username,
          active: token.active,
        },
      }
    },

  },
};

