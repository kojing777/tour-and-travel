"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup">(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens and lock body scroll
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setShowPassword(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert(`${view === "login" ? "Logged in" : "Signed up"} successfully!`);
    onClose();
  };

  const toggleView = () => {
    setView(view === "login" ? "signup" : "login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row min-h-[550px]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 text-slate-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side - Image & Decor */}
              <div className="hidden md:flex flex-1 relative bg-slate-900 text-white flex-col justify-between p-10 overflow-hidden">
                 <div className="absolute inset-0 z-0">
                    <Image 
                        src="/login-bg.png" 
                        alt="Himalayas" 
                        fill 
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 to-slate-900/90" />
                 </div>
                 
                 <div className="relative z-10">
                     <Image
                        src="/gonepal.png"
                        alt="Go Nepal"
                        width={120}
                        height={40}
                        className="brightness-0 invert mb-6"
                      />
                      <h2 className="text-3xl font-bold leading-tight mb-4">
                        {view === "login" 
                            ? "Welcome Back to the Himalayas" 
                            : "Start Your Adventure Today"}
                      </h2>
                      <p className="text-slate-200/90 leading-relaxed">
                        {view === "login"
                            ? "Sign in to access your saved trips, exclusive offers, and personalized itinerary."
                            : "Create an account to unlock exclusive deals and plan your dream trip to Nepal."}
                      </p>
                 </div>

                 <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                             <ArrowRight className="w-4 h-4" />
                        </div>
                        <span>Best Rate Guarantee</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                             <ArrowRight className="w-4 h-4" />
                        </div>
                        <span>Expert Local Guides</span>
                    </div>
                 </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 p-8 md:p-10 bg-white flex flex-col justify-center">
                <div className="max-w-xs mx-auto w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {view === "login" ? "Sign In" : "Create Account"}
                        </h3>
                        <p className="text-slate-500 mt-2 text-sm">
                            {view === "login" 
                                ? "Enter your details to proceed" 
                                : "Fill in your details to get started"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {view === "signup" && (
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        required 
                                        className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-amber-500 h-11"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                             <label className="text-xs font-semibold text-slate-700 ml-1">Email</label>
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    required 
                                    className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-amber-500 h-11"
                                />
                             </div>
                        </div>

                        <div className="space-y-1">
                             <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-semibold text-slate-700">Password</label>
                                {view === "login" && (
                                    <button type="button" className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                                        Forgot?
                                    </button>
                                )}
                             </div>
                             <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    required 
                                    className="pl-9 pr-9 bg-slate-50 border-slate-200 focus-visible:ring-amber-500 h-11"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                             </div>
                        </div>

                        <Button 
                            className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-base mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                view === "login" ? "Sign In" : "Sign Up"
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                         <button className="flex items-center justify-center h-10 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm font-medium text-slate-600">Google</span>
                         </button>
                         <button className="flex items-center justify-center h-10 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-sm font-medium text-slate-600">Facebook</span>
                         </button>
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        {view === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button 
                            onClick={toggleView}
                            className="text-amber-600 font-bold hover:text-amber-700 hover:underline"
                        >
                            {view === "login" ? "Sign  Up" : "Login"}
                        </button>
                    </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
