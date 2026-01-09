"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Navbar from "../Navbar/navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Here you would handle the actual login logic
    alert("Login functionality would be implemented here!");
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-bg.png"
            alt="Himalayan Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Login Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md px-4"
        >
          <div className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="p-8 md:p-10 space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <Link href="/" className="inline-block mb-4">
                  <Image
                    src="/gonepal.png" // Assuming this exists as used in Navbar
                    alt="Go Nepal"
                    width={120}
                    height={40}
                    className="h-10 w-auto mx-auto brightness-0 invert" // Make logo white for dark theme
                  />
                </Link>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-slate-200 text-sm">
                  Sign in to continue your adventure
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-100 ml-1"
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-400 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus-visible:ring-amber-400 focus-visible:border-amber-400 transition-all rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-100"
                      >
                        Password
                      </label>
                      <Link
                        href="#"
                        className="text-xs text-amber-300 hover:text-amber-200 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-400 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus-visible:ring-amber-400 focus-visible:border-amber-400 transition-all rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-slate-300 backdrop-blur-xl">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl"
                  >
                    <svg
                      className="mr-2 h-5 w-5 text-[#1877F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-300">
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    className="text-amber-400 font-semibold hover:text-amber-300 hover:underline transition-all"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <Link href="/" className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors">
                 <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
             </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
