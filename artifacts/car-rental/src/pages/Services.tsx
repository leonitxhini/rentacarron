import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  PlaneTakeoff, Building2, Clock, ShieldCheck, Car, Gem, ChevronRight,
  Star, Users, MapPin
} from "lucide-react";

const services = [
  {
    icon: PlaneTakeoff,
    title: "Airport Transfers",
    description:
      "Stress-free pickup and drop-off at Pristina International Airport. We track your flight and adjust for delays — no waiting, no extra charges.",
    highlights: ["Flight tracking", "Meet & greet", "All hours"],
    accent: "blue",
  },
  {
    icon: Building2,
    title: "Corporate Rental",
    description:
      "Dedicated fleet solutions for businesses. Monthly invoicing, priority support, and executive-class vehicles for your team and clients.",
    highlights: ["Monthly billing", "Priority fleet", "Account manager"],
    accent: "indigo",
  },
  {
    icon: Clock,
    title: "Long-Term Rental",
    description:
      "Need a car for weeks or months? Get the best rates on extended rentals with full maintenance included and zero hidden fees.",
    highlights: ["Best daily rates", "Maintenance included", "Flexible terms"],
    accent: "violet",
  },
  {
    icon: Gem,
    title: "Luxury & Premium",
    description:
      "Arrive in style. Choose from our curated lineup of luxury sedans and premium SUVs — perfect for special occasions and VIP clients.",
    highlights: ["Audi, BMW & more", "Chauffeur option", "24/7 concierge"],
    accent: "amber",
  },
  {
    icon: Car,
    title: "Self-Drive Rental",
    description:
      "Explore Kosovo and the region on your own terms. All vehicles are fully insured, GPS-equipped, and ready for the road.",
    highlights: ["Full insurance", "GPS included", "Cross-border allowed"],
    accent: "emerald",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Roadside Support",
    description:
      "Drive with complete confidence. Our team is available around the clock to assist with any issue — wherever you are.",
    highlights: ["Always available", "Emergency response", "Free replacement"],
    accent: "sky",
  },
];

const accentMap: Record<string, { bg: string; icon: string; border: string; badge: string }> = {
  blue:    { bg: "bg-blue-500/10",   icon: "text-blue-400",   border: "border-blue-500/20",   badge: "bg-blue-500/15 text-blue-300" },
  indigo:  { bg: "bg-indigo-500/10", icon: "text-indigo-400", border: "border-indigo-500/20", badge: "bg-indigo-500/15 text-indigo-300" },
  violet:  { bg: "bg-violet-500/10", icon: "text-violet-400", border: "border-violet-500/20", badge: "bg-violet-500/15 text-violet-300" },
  amber:   { bg: "bg-amber-500/10",  icon: "text-amber-400",  border: "border-amber-500/20",  badge: "bg-amber-500/15 text-amber-300" },
  emerald: { bg: "bg-emerald-500/10",icon: "text-emerald-400",border: "border-emerald-500/20",badge: "bg-emerald-500/15 text-emerald-300" },
  sky:     { bg: "bg-sky-500/10",    icon: "text-sky-400",    border: "border-sky-500/20",    badge: "bg-sky-500/15 text-sky-300" },
};

const stats = [
  { value: "5.0", label: "Google Rating", icon: Star },
  { value: "21+", label: "Happy Reviews", icon: Users },
  { value: "15+", label: "Vehicles", icon: Car },
  { value: "2", label: "Locations", icon: MapPin },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400 mb-6">
            <span className="w-6 h-px bg-blue-500" />
            What We Offer
            <span className="w-6 h-px bg-blue-500" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Premium Services,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Every Journey
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From airport transfers to long-term corporate solutions, RRON Rent A Car delivers reliability and comfort across Kosovo and beyond.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-5 flex flex-col items-center gap-1 text-center"
            >
              <Icon className="w-4 h-4 text-blue-400 mb-1" strokeWidth={1.5} />
              <span className="text-2xl font-black text-white">{value}</span>
              <span className="text-[11px] text-gray-500 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const a = accentMap[svc.accent];
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group relative bg-[#141624] border border-white/[0.07] rounded-[24px] p-7 flex flex-col gap-5 hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-[24px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className={`w-12 h-12 rounded-2xl ${a.bg} border ${a.border} flex items-center justify-center`}>
                  <Icon className={`w-5.5 h-5.5 ${a.icon}`} strokeWidth={1.5} />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{svc.title}</h3>
                  <p className="text-[13.5px] text-gray-400 leading-relaxed">{svc.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {svc.highlights.map((h) => (
                    <span key={h} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${a.badge}`}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-28 w-full">
        <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/20 rounded-[28px] px-10 py-14 text-center overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
          />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative">Ready to hit the road?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative">Browse our full fleet and book instantly — or reach out and we'll arrange everything for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.4)]"
            >
              Browse Fleet <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/38348188415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
