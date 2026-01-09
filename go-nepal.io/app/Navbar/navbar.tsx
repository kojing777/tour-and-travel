"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Mountain } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Tours", path: "/tours" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50  ${
        isScrolled
          ? "bg-amber-50 text-slate-900 shadow-lg backdrop-blur-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between  py-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-5">
          <div className="rounded-full py-2 ">
            <Image
              src="/gonepal.png"
              alt="Go Nepal logo"
              width={110}
              height={32}
              priority
              sizes="110px"
              className="h-10 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`group flex flex-col items-center gap-1 text-lg font-medium ${
                isScrolled ? "text-slate-800" : "text-black"
              }`}
            >
              {link.name}
              <span
                className={`${
                  isScrolled ? "bg-slate-800" : "bg-white"
                } h-0.5 w-0 group-hover:w-full  rounded-full`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={`flex items-center gap-2 rounded-full border border-gray-400 px-4 py-2 text-sm font-medium transition-colors ${
              isScrolled ? "bg-white text-slate-900" : "bg-amber-50 text-black"
            }`}
          >
            <Search className="h-4 w-4" />
            Explore
          </button>

          <button
            onClick={() => {
              setAuthMode("login");
              setIsAuthOpen(true);
            }}
            className={`rounded-full px-5 py-2 text-sm font-medium border border-gray-400 cursor-pointer transition-colors ${
              isScrolled ? "bg-slate-900 text-white" : "bg-amber-50 text-slate-900"
            }`}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 transition hover:bg-white/10"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X
              className={`h-6 w-6 ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                isScrolled ? "text-slate-900" : "text-black"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 flex w-5/6 max-w-sm flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 shadow-sm bg-linear-to-r from-white via-amber-50 to-orange-50">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/gonepal.png"
              alt="Go Nepal"
              width={110}
              height={32}
              className="h-8 w-auto"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 space-y-5 px-6 py-8">
          <div className="rounded-2xl bg-linear-to-r from-orange-100 via-amber-50 to-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              Plan your trip
            </p>
            <p className="text-base font-semibold text-slate-900 mt-1">
              Find epic Himalayan escapes tailored for you.
            </p>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-semibold text-slate-900"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 px-6 pb-8">
          <button className="inline-flex items-center justify-between gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform">
            <span className="inline-flex items-center gap-2">
              <Mountain className="h-4 w-4" /> Explore trips
            </span>
            <span className="text-xs text-slate-500">New</span>
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setAuthMode("login");
              setIsAuthOpen(true);
            }}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors text-center cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialView={authMode} />
    </nav>
  );
}
