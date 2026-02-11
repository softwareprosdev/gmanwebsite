/**
 * Authentication Middleware
 * Protects admin routes from unauthorized access
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth({
  // Protect all admin routes
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ req, token }) {
      // Get the path from the request
      const path = req.nextUrl.pathname;

      // Check if it's an admin route
      const isAdminRoute = path.startsWith('/admin');

      if (isAdminRoute) {
        // Allow access if user is authenticated
        return token != null;
      }

      return true;
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes (API routes are handled separately)
     */
    '/admin/:path*',
  ],
};
