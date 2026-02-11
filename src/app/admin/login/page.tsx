"use client";

import { Suspense, useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1e3a5f]/5 blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#d4a017]/5 blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 px-2 sm:px-0"
      >
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-teal-600 to-gold-500 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🔨</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl text-[#1e3a5f] mb-2" style={{ fontFamily: "var(--font-nosifer)" }}>Numix Pro</h1>
          <p className="text-gray-500 text-sm sm:text-base">Business Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm flex items-center"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] text-gray-900 placeholder-gray-400 transition-all duration-200 text-base"
                placeholder="admin@rgvhandyman.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] text-gray-900 placeholder-gray-400 transition-all duration-200 text-base"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 bg-white text-[#1e3a5f] focus:ring-[#1e3a5f]/50" />
                <span className="text-gray-500">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-lg bg-[#1e3a5f] text-white font-bold text-base sm:text-lg hover:bg-[#2a5080] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg min-h-[48px]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-[#1e3a5f] flex items-center justify-center space-x-2 transition-colors min-h-[44px]">
            <FaHome size={16} />
            <span>Back to RGV Handyman</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a5f]"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
