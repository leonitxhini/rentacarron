import { Link, useLocation } from "wouter";
import { Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4">
      {/* Floating pill navbar */}
      <nav className="w-full max-w-5xl bg-[#13151f] border border-white/10 rounded-full px-4 py-2 flex items-center justify-between shadow-2xl backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
            alt="RRON RENT A CAR"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links — centered */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-white ${
                location === link.path ? "text-white" : "text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: search + user */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 bg-[#1e2030] text-sm text-white rounded-full border border-white/5 outline-none focus:border-white/20 w-[160px] placeholder:text-gray-500"
            />
          </div>
          <Link
            href="/admin"
            className="p-2 text-gray-400 hover:text-white transition-colors bg-[#1e2030] rounded-full border border-white/5"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[70px] left-4 right-4 bg-[#13151f] border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm px-3 py-2 rounded-xl transition-colors ${
                  location === link.path
                    ? "bg-white/5 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#1e2030] text-white rounded-xl border border-white/5 outline-none text-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
