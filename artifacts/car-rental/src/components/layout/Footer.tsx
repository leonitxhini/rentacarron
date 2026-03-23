import { Link } from "wouter";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0c14] pt-24 pb-8 border-t border-white/5 mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
          
          {/* Logo - Left */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center">
              <img src={`${import.meta.env.BASE_URL}images/rron-logo.png`} alt="Logo" className="h-6 w-auto" />
            </Link>
            <p className="text-gray-400 text-xs font-light max-w-xs leading-relaxed">
              Premium car rental services across the Balkans. Elegance, comfort, and reliability.
            </p>
          </div>

          {/* Nav Links - Center */}
          <div className="flex flex-wrap gap-8 md:gap-12 text-xs uppercase tracking-[0.15em] font-light text-gray-400">
             <Link href="/" className="hover:text-white transition-colors">Home</Link>
             <Link href="/fleet" className="hover:text-white transition-colors">Fleet</Link>
             <Link href="/services" className="hover:text-white transition-colors">Services</Link>
             <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Contact Info - Right */}
          <div className="flex flex-col items-start md:items-end gap-3 text-sm text-gray-400 font-light">
             <a href="mailto:booking@rronrental.com" className="hover:text-white transition-colors flex items-center gap-2">
               <Mail className="w-4 h-4 text-blue-500" /> booking@rronrental.com
             </a>
             <a href="tel:+38348188415" className="hover:text-white transition-colors flex items-center gap-2">
               <Phone className="w-4 h-4 text-blue-500" /> +383 48 188 415
             </a>
             <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/rentacarron/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/5 flex justify-center">
          <p className="text-[#666666] text-[10px] tracking-wider uppercase font-light">
            © {new Date().getFullYear()} RRON Rent A Car. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}