/**
 * NextAuth.js Configuration
 * Secure authentication with argon2 password hashing
 */

import { verify } from 'argon2';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

// Custom credential validator with argon2 password verification
const CredentialsProviderWithargon2 = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    try {
      const user = await prisma.adminUser.findUnique({
        where: { email: credentials.email },
      });

      // User not found
      if (!user) {
        return null;
      }

      // Check if account is locked
      if (user.isLocked) {
        throw new Error('Account is locked due to multiple failed login attempts');
      }

      // Verify password with argon2
      const isValidPassword = await verify(user.password, credentials.password);

      if (!isValidPassword) {
        // Increment failed login attempts
        await prisma.adminUser.update({
          where: { email: credentials.email },
          data: {
            loginAttempts: { increment: 1 },
          },
        });

        // Lock account after 5 failed attempts
        const updatedUser = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });

        if (updatedUser && updatedUser.loginAttempts >= 5) {
          await prisma.adminUser.update({
            where: { email: credentials.email },
            data: { isLocked: true, lastLogin: new Date() },
          });
        }

        return null;
      }

      // Reset login attempts on successful login
      await prisma.adminUser.update({
        where: { email: credentials.email },
        data: {
          loginAttempts: 0,
          lastLogin: new Date(),
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch (error) {
      console.error('Auth error:', error);
      return null;
    }
  },
});

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProviderWithargon2],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
    updateAge: 60, // Refresh if older than 1 minute
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
};
