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
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fc" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 bg-white border-b border-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-indigo-500 mb-5">
            <span className="w-5 h-px bg-indigo-400" />
            Help Center
            <span className="w-5 h-px bg-indigo-400" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.06] mb-5">
            Frequently Asked<br />
            <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Everything you need to know about renting with RRON. Can't find the answer?{" "}
            <a href="https://wa.me/38348188415" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
              Message us on WhatsApp.
            </a>
          </p>
        </div>
      </section>

      {/* Category pills */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-5 flex flex-wrap gap-2 justify-center">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-200 ${
                cat === c
                  ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion */}
      <section className="max-w-3xl mx-auto px-6 py-14 pb-10 w-full">
        <div className="flex flex-col gap-2.5">
          {filtered.map((item) => {
            const isOpen = active === item.q;
            return (
              <div
                key={item.q}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setActive(isOpen ? null : item.q)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="text-[14.5px] font-semibold text-gray-900 leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-gray-700" : ""}`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-[13.5px] text-gray-500 leading-relaxed border-t border-gray-100">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Still have questions */}
      <section className="max-w-3xl mx-auto px-6 pb-28 w-full">
        <div className="bg-white border border-gray-100 rounded-2xl px-8 py-10 text-center shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-5 h-5 text-indigo-600" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-[13.5px] mb-6 max-w-xs mx-auto">Our team is available 24/7 — reach us on WhatsApp for an instant reply.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/38348188415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-7 py-3 rounded-full transition-all text-[13.5px]"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3 rounded-full transition-all text-[13.5px]"
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
