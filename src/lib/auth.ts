import { getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from './client'
import { env } from './env.mjs'

import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session, user }) {
      if (session?.user) session.user.id = user.id
      return session
    },
  },
}

export async function getSession() {
  return await getServerSession(authOptions)
}
