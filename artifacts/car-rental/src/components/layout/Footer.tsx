import { Link } from "wouter";
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07090f] mt-auto border-t border-white/5">

      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center">
              <img src={`${import.meta.env.BASE_URL}images/rron-logo.png`} alt="RRON Rent A Car" className="h-7 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-[260px]">
              Premium car rental across the Balkans. Elegance, comfort, and reliability — every journey.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.instagram.com/rentacarron/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/rentrroni"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="md:col-span-2 md:col-start-6 flex flex-col gap-4">
            <p className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-1">Navigation</p>
            {[
              { label: "Home", href: "/" },
              { label: "Fleet", href: "/fleet" },
              { label: "Services", href: "/services" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-gray-500 text-sm font-light hover:text-white transition-colors duration-150">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact column */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-1">Get In Touch</p>
            <a
              href="mailto:rentacarron@hotmail.com"
              className="group flex items-start gap-3 text-gray-500 hover:text-white transition-colors duration-150"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wider font-light mb-0.5">Email</span>
                <span className="text-sm font-light">rentacarron@hotmail.com</span>
              </span>
            </a>
            <a
              href="tel:+38348188415"
              className="group flex items-start gap-3 text-gray-500 hover:text-white transition-colors duration-150"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wider font-light mb-0.5">Phone / WhatsApp</span>
                <span className="text-sm font-light">+383 48 188 415</span>
              </span>
            </a>
            <div className="flex items-start gap-3 text-gray-500">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase tracking-wider font-light mb-0.5">Location</span>
                <span className="text-sm font-light">Ferizaj, Kosovo 70000</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs tracking-wider font-light">
            © {new Date().getFullYear()} <span className="text-gray-500">RRON Rent A Car</span>. All rights reserved.
          </p>
          <a
            href="https://lxclouds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-gray-600 text-xs tracking-wider font-light hover:text-gray-300 transition-colors duration-200"
          >
            <span>by</span>
            <span className="text-gray-500 group-hover:text-white transition-colors font-normal">lxclouds.com</span>
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
          </a>
        </div>
      </div>

    </footer>
  );
}
