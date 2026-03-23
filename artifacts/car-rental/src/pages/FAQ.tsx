import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ChevronDown, MessageCircle } from "lucide-react";

const categories = ["All", "Booking", "Vehicles", "Payment", "Policies"];

const faqs = [
  {
    category: "Booking",
    q: "How do I make a reservation?",
    a: "You can book directly through our website — browse the Fleet page, choose your vehicle, and complete the booking form in under 2 minutes. You can also reach us via WhatsApp (+383 48 188 415) for assisted booking.",
  },
  {
    category: "Booking",
    q: "Can I modify or cancel my booking?",
    a: "Yes. You can modify or cancel your reservation free of charge up to 24 hours before your pick-up time. Contact us via WhatsApp or call our number and we'll handle everything immediately.",
  },
  {
    category: "Booking",
    q: "How far in advance should I book?",
    a: "We recommend booking at least 24–48 hours in advance, especially during peak season (June–September). For specific vehicles or corporate requests, booking 3–5 days ahead is ideal.",
  },
  {
    category: "Booking",
    q: "Do you offer airport pickup?",
    a: "Absolutely. We offer meet-and-greet airport transfers at Pristina International Airport (PRN). We track your flight and adjust for any delays — you won't pay for waiting.",
  },
  {
    category: "Vehicles",
    q: "What types of vehicles do you offer?",
    a: "Our fleet covers four categories: Economy (budget-friendly city cars), Compact (versatile mid-size), Premium (performance sedans and SUVs), and Luxury (Audi, BMW executive class). All vehicles are regularly serviced and maintained.",
  },
  {
    category: "Vehicles",
    q: "Are the cars insured?",
    a: "Yes, all vehicles come with comprehensive insurance coverage. We also offer additional Collision Damage Waiver (CDW) options for complete peace of mind.",
  },
  {
    category: "Vehicles",
    q: "Can I take the car to another country?",
    a: "Cross-border travel is permitted for most destinations in the region (North Macedonia, Albania, Serbia, Montenegro). Please inform us at the time of booking so we can provide the appropriate documentation.",
  },
  {
    category: "Vehicles",
    q: "What happens if the car breaks down?",
    a: "We provide 24/7 roadside assistance. If you experience any issue with the vehicle, call us immediately and we will dispatch help or a replacement car — at no additional cost to you.",
  },
  {
    category: "Payment",
    q: "What payment methods do you accept?",
    a: "We accept cash (EUR), bank transfers, and all major credit/debit cards. For corporate clients, monthly invoicing is available upon request.",
  },
  {
    category: "Payment",
    q: "Is a deposit required?",
    a: "A refundable security deposit is required at the time of vehicle collection. The amount varies by vehicle category (typically €100–€300) and is fully refunded upon return of the vehicle in original condition.",
  },
  {
    category: "Payment",
    q: "Are there any hidden fees?",
    a: "No hidden fees — ever. The price you see includes VAT, insurance, and unlimited kilometres within Kosovo. Any optional extras (GPS, child seat, cross-border permit) are clearly priced upfront.",
  },
  {
    category: "Policies",
    q: "What is the minimum age to rent a car?",
    a: "Drivers must be at least 21 years old and hold a valid driving licence for a minimum of 1 year. For premium and luxury vehicles the minimum age is 25.",
  },
  {
    category: "Policies",
    q: "What documents do I need?",
    a: "You will need a valid driving licence (national or international), a passport or national ID, and a payment card in the driver's name. Foreign licences are accepted.",
  },
  {
    category: "Policies",
    q: "Is smoking allowed in the vehicles?",
    a: "No. All of our vehicles are strictly non-smoking. A cleaning fee of €100 applies if the no-smoking policy is violated.",
  },
  {
    category: "Policies",
    q: "Do you allow pets in the vehicles?",
    a: "Small pets in carriers are permitted in some vehicles — please inform us at the time of booking. A pet-friendly vehicle will be assigned and a small cleaning fee may apply.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<string | null>(null);
  const [cat, setCat] = useState("All");

  const filtered = cat === "All" ? faqs : faqs.filter(f => f.category === cat);

  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-6">
            <span className="w-6 h-px bg-indigo-500" />
            Help Center
            <span className="w-6 h-px bg-indigo-500" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Frequently Asked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
              Questions
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Everything you need to know about renting with RRON. Can't find the answer? Just message us on WhatsApp.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="max-w-3xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-[12.5px] font-semibold tracking-wide border transition-all duration-200 ${
                cat === c
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_16px_rgba(59,130,246,0.4)]"
                  : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.15]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-6 pb-28 w-full">
        <div className="flex flex-col gap-3">
          {filtered.map((item) => {
            const key = item.q;
            const isOpen = active === key;
            return (
              <div
                key={key}
                className={`bg-[#141624] border rounded-[20px] overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500/30 shadow-[0_4px_32px_rgba(59,130,246,0.1)]"
                    : "border-white/[0.07] hover:border-white/[0.13]"
                }`}
              >
                <button
                  onClick={() => setActive(isOpen ? null : key)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-[14.5px] font-semibold text-white leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-[13.5px] text-gray-400 leading-relaxed border-t border-white/[0.05] pt-4">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-16 relative bg-white/[0.03] border border-white/[0.07] rounded-[24px] px-8 py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 text-sm mb-6">Our team is available 24/7 — reach us on WhatsApp for an instant reply.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/38348188415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 text-sm"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
