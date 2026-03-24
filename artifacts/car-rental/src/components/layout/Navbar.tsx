import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "FLEET", path: "/fleet" },
    { name: "FAQ", path: "/faq" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-6">
      {/* Floating pill navbar */}
      <nav className={`w-full max-w-5xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0c14]/80 backdrop-blur-xl shadow-2xl"
          : "bg-transparent backdrop-blur-sm"
      }`}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
            alt="RRON RENT A CAR"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links — centered */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className="relative text-xs font-light tracking-[0.15em] transition-colors hover:text-white text-gray-300 flex flex-col items-center"
              >
                {link.name}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -bottom-2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: search */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/5 text-xs text-white rounded-full border border-white/10 outline-none focus:border-white/30 focus:bg-white/10 transition-all w-[180px] placeholder:text-gray-500 font-light tracking-wide"
            />
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
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
            className="absolute top-[80px] left-6 right-6 bg-[#0a0c14]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-5 flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs tracking-[0.15em] font-light px-4 py-3 rounded-xl transition-colors flex items-center ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                </Link>
              );
            })}
            <div className="relative mt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-xl border border-white/10 outline-none text-xs font-light tracking-wide focus:border-white/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}