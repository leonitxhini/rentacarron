import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  PlaneTakeoff, Building2, Clock, ShieldCheck, Car, Gem, ArrowRight,
  Star, Users, MapPin
} from "lucide-react";

const services = [
  {
    icon: PlaneTakeoff,
    title: "Airport Transfers",
    description:
      "Stress-free pickup and drop-off at Pristina International Airport. We track your flight and adjust for delays — no waiting, no extra charges.",
    highlights: ["Flight tracking", "Meet & greet", "All hours"],
    color: "blue",
  },
  {
    icon: Building2,
    title: "Corporate Rental",
    description:
      "Dedicated fleet solutions for businesses. Monthly invoicing, priority support, and executive-class vehicles for your team and clients.",
    highlights: ["Monthly billing", "Priority fleet", "Account manager"],
    color: "indigo",
  },
  {
    icon: Clock,
    title: "Long-Term Rental",
    description:
      "Need a car for weeks or months? Get the best rates on extended rentals with full maintenance included and zero hidden fees.",
    highlights: ["Best daily rates", "Maintenance included", "Flexible terms"],
    color: "violet",
  },
  {
    icon: Gem,
    title: "Luxury & Premium",
    description:
      "Arrive in style. Choose from our curated lineup of luxury sedans and premium SUVs — perfect for special occasions and VIP clients.",
    highlights: ["Audi, BMW & more", "Chauffeur option", "24/7 concierge"],
    color: "amber",
  },
  {
    icon: Car,
    title: "Self-Drive Rental",
    description:
      "Explore Kosovo and the region on your own terms. All vehicles are fully insured, GPS-equipped, and ready for the road.",
    highlights: ["Full insurance", "GPS included", "Cross-border allowed"],
    color: "emerald",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Roadside Support",
    description:
      "Drive with complete confidence. Our team is available around the clock to assist with any issue — wherever you are.",
    highlights: ["Always available", "Emergency response", "Free replacement"],
    color: "sky",
  },
];

const colorMap: Record<string, { iconBg: string; icon: string; tag: string }> = {
  blue:    { iconBg: "bg-blue-50",    icon: "text-blue-600",    tag: "bg-blue-50 text-blue-600" },
  indigo:  { iconBg: "bg-indigo-50",  icon: "text-indigo-600",  tag: "bg-indigo-50 text-indigo-600" },
  violet:  { iconBg: "bg-violet-50",  icon: "text-violet-600",  tag: "bg-violet-50 text-violet-600" },
  amber:   { iconBg: "bg-amber-50",   icon: "text-amber-600",   tag: "bg-amber-50 text-amber-600" },
  emerald: { iconBg: "bg-emerald-50", icon: "text-emerald-600", tag: "bg-emerald-50 text-emerald-600" },
  sky:     { iconBg: "bg-sky-50",     icon: "text-sky-600",     tag: "bg-sky-50 text-sky-600" },
};

const stats = [
  { value: "5.0", label: "Google Rating", icon: Star },
  { value: "21+", label: "Happy Reviews", icon: Users },
  { value: "15+", label: "Vehicles", icon: Car },
  { value: "2",   label: "Locations",     icon: MapPin },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fc" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden bg-white border-b border-gray-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-blue-500 mb-5">
            <span className="w-5 h-px bg-blue-400" />
            What We Offer
            <span className="w-5 h-px bg-blue-400" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.06] mb-5">
            Premium Services,<br />
            <span className="text-blue-600">Every Journey</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From airport transfers to long-term corporate solutions, RRON Rent A Car delivers reliability and comfort across Kosovo and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center px-4">
              <Icon className="w-4 h-4 text-blue-400 mb-1" strokeWidth={1.5} />
              <span className="text-3xl font-black text-gray-900 tracking-tight">{value}</span>
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const c = colorMap[svc.color];
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group bg-white border border-gray-100 rounded-[20px] p-7 flex flex-col gap-5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} strokeWidth={1.75} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-[13.5px] text-gray-500 leading-relaxed">{svc.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {svc.highlights.map((h) => (
                    <span key={h} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${c.tag}`}>
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
        <div className="bg-blue-600 rounded-[24px] px-10 py-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)" }}
          />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 relative">Ready to hit the road?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto relative text-[15px]">
            Browse our full fleet and book instantly — or reach out and we'll arrange everything for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <Link
              href="/fleet"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all duration-200 text-[14px]"
            >
              Browse Fleet <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/38348188415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 text-[14px]"
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
