import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";
import { Car as CarIcon, Calendar, Send, Key, Plane, Clock, Shield, MapPin, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: cars, isLoading } = useListCars({ available: true });
  const featuredCars = cars?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#0a0c14]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-car.png`}
            alt=""
            className="w-full h-full object-cover object-center opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c14] via-[#0a0c14]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black text-white tracking-[-0.03em] leading-[1.05] mb-6">
              Premium car<br />rental
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 font-light mb-12 max-w-md leading-relaxed">
              Premium vehicles. Seamless booking. Uncompromising service across the Balkans.
            </p>

            {/* Feature badges with thin dividers */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Unlimited KM
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Airport Pickup
                </div>
              </div>
              <div className="h-[1px] w-48 bg-white/10" />
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                Fast WhatsApp Booking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Widget */}
      <div className="relative z-30 -mt-16 px-6 lg:px-8">
        <SearchWidget />
      </div>

      {/* Our Fleet Section */}
      <section className="py-24 lg:py-32 bg-[#e9ecf4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-blue-600"></span>
              <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-medium">DISCOVER</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Our Fleet</h2>
              <div className="flex items-center gap-8 text-sm">
                <Link href="/fleet" className="text-gray-500 hover:text-gray-900 transition-colors font-light">
                  View full fleet →
                </Link>
                <a href="https://wa.me/38370000000" className="text-green-600 hover:text-green-700 transition-colors hidden sm:flex items-center gap-2 font-medium">
                  Book via WhatsApp <span className="text-lg">💬</span>
                </a>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 lg:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="snap-start flex-shrink-0 w-[80vw] md:w-auto h-[400px] bg-gray-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 lg:grid-cols-3">
              {featuredCars.map(car => (
                <div key={car.id} className="snap-start flex-shrink-0 w-[80vw] md:w-auto">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-20 text-center">
             <Link href="/fleet" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors rounded-lg">
              Explore All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ad Banner ── */}
      <section className="relative overflow-hidden bg-[#0a0c14]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-car.png`}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%", opacity: 0.18 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c14] via-[#0a0c14]/90 to-[#0a0c14]/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-blue-500"></span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-blue-400 font-semibold">Limited Offer</span>
            </div>

            <h2
              className="text-4xl lg:text-[3.25rem] font-black text-white leading-tight mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              Drive anywhere.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Book in minutes.</span>
            </h2>

            <p className="text-white/50 text-base font-light leading-relaxed max-w-sm">
              Premium vehicles available now across Kosovo, North Macedonia and Albania. Instant WhatsApp confirmation.
            </p>
          </div>

          {/* CTA side */}
          <div className="flex flex-col items-center md:items-end gap-4 flex-shrink-0">
            <a
              href="https://wa.me/38370000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-green-900/30"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book via WhatsApp
            </a>
            <Link
              href="/fleet"
              className="text-sm text-white/40 hover:text-white/70 transition-colors font-light"
            >
              Or browse the full fleet →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-[#e9ecf4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">How it works</h2>
            <p className="text-gray-500 font-light max-w-lg mx-auto">A seamless experience designed to get you on the road quickly and elegantly.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-6 px-6 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:pb-0 sm:mx-0 sm:px-0 lg:grid-cols-4">
            {[
              { step: "01", icon: CarIcon, title: "Choose a Vehicle", desc: "Select a car from our premium fleet that fits your lifestyle." },
              { step: "02", icon: Calendar, title: "Set Date & Location", desc: "Choose your pickup and drop-off preferences." },
              { step: "03", icon: Send, title: "Request Booking", desc: "Fill in your details and send a direct request." },
              { step: "04", icon: Key, title: "Take the Keys", desc: "Start your journey with confidence." }
            ].map((s) => (
              <div key={s.step} className="snap-start flex-shrink-0 w-[72vw] sm:w-auto flex flex-col items-center text-center bg-white/60 sm:bg-transparent rounded-2xl p-6 sm:p-0">
                <span className="px-4 py-1 text-[10px] font-medium tracking-[0.2em] border border-gray-300 text-gray-400 rounded-full mb-8">
                  STEP {s.step}
                </span>
                <div className="w-20 h-20 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] flex items-center justify-center mb-8 text-blue-500">
                  <s.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{s.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer / Services Section */}
      <section className="py-24 lg:py-32 bg-[#0a0c14] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          {/* Top row: heading left, subtitle right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-6 h-px bg-blue-500"></span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-blue-400 font-semibold">What We Offer</span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-black text-white leading-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                Everything for a<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">perfect drive.</span>
              </h2>
            </div>
            <p className="text-white/40 text-base font-light max-w-xs leading-relaxed lg:text-right">
              From airport arrivals to full insurance — we handle every detail so you don't have to.
            </p>
          </div>

          {/* 2×2 bento grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:pb-0 sm:mx-0 sm:px-0">
            {[
              {
                icon: Plane,
                num: "01",
                title: "Airport Transfer",
                desc: "Seamless pickup and drop-off at Pristina, Skopje, and Kukës airports — any hour, any flight.",
                accent: "from-blue-500/20 to-blue-500/5"
              },
              {
                icon: Clock,
                num: "02",
                title: "24/7 Support",
                desc: "Our team is always reachable via WhatsApp for instant assistance, wherever your journey takes you.",
                accent: "from-purple-500/20 to-purple-500/5"
              },
              {
                icon: Shield,
                num: "03",
                title: "Full Insurance",
                desc: "Every vehicle comes with comprehensive coverage so you can drive with complete peace of mind.",
                accent: "from-indigo-500/20 to-indigo-500/5"
              },
              {
                icon: MapPin,
                num: "04",
                title: "Flexible Drop-off",
                desc: "Pick up in one city, return in another. We accommodate your route, not the other way around.",
                accent: "from-violet-500/20 to-violet-500/5"
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className={`snap-start flex-shrink-0 w-[80vw] sm:w-auto relative group rounded-2xl border border-white/8 p-8 bg-gradient-to-br ${s.accent} hover:border-white/15 transition-all duration-300 overflow-hidden`}
              >
                {/* Large faded number */}
                <span
                  className="absolute top-4 right-6 text-[5rem] font-black text-white/4 leading-none select-none pointer-events-none"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {s.num}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mb-6 text-blue-300 group-hover:border-blue-500/40 transition-colors duration-300">
                    <s.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 lg:py-32 bg-[#e9ecf4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-gray-200"></span>
            <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-medium">VERIFIED ON GOOGLE</span>
            <span className="w-12 h-[1px] bg-gray-200"></span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-12">Client Experiences</h2>
          
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <span className="text-blue-600 font-bold text-2xl">G</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-gray-900">5.0</span>
                  <div className="flex gap-1 text-amber-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <p className="text-gray-500 font-light text-sm mt-1">Based on 21 reviews · Rent A Car RRON</p>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-2">
              Read all reviews on Google Maps →
            </a>
          </div>

          <div className="w-full max-w-4xl mx-auto aspect-video md:aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white relative p-2">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.5293214457885!2d21.1444102!3d42.3653155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13547eb10817c8ad%3A0xc3cf909d949cf9d7!2sRent%20a%20car%20RRON!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-blue-600"></span>
              <span className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-medium">WHERE TO FIND US</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Our Locations</h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 lg:grid-cols-4">
            {[
              {
                title: "Ferizaj HQ",
                desc: "Rruga e Gjilanit, Ferizaj 70000, Kosovo",
                img: `${import.meta.env.BASE_URL}images/location-ferizaj.jpg`,
                tags: ["Main Office", "08:00–20:00"],
                country: "Kosovo"
              },
              {
                title: "Pristina Airport",
                desc: "Adem Jashari International Airport, Kosovo",
                img: `${import.meta.env.BASE_URL}images/location-pristina.jpg`,
                tags: ["Airport Pickup", "24/7"],
                country: "Kosovo"
              },
              {
                title: "Skopje Airport",
                desc: "Skopje International Airport, North Macedonia",
                img: `${import.meta.env.BASE_URL}images/location-skopje.jpg`,
                tags: ["Airport Transfer", "On Request"],
                country: "N. Macedonia"
              },
              {
                title: "Kukës Airport",
                desc: "Zayed International Airport, Kukës, Albania",
                img: `${import.meta.env.BASE_URL}images/location-kukes.jpg`,
                tags: ["Airport Transfer", "On Request"],
                country: "Albania"
              }
            ].map((loc, i) => (
              <div key={i} className="snap-start flex-shrink-0 w-[75vw] md:w-auto group rounded-2xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] transition-shadow duration-300">
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <img
                    src={loc.img}
                    alt={loc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Country badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] uppercase tracking-widest font-semibold bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                      {loc.country}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-[1rem] font-bold text-gray-900 mb-1 tracking-tight leading-snug">{loc.title}</h3>
                  <p className="text-gray-400 text-xs font-light mb-4 leading-relaxed">{loc.desc}</p>
                  <div className="mt-auto flex items-center gap-2">
                    {loc.tags.map((tag, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{tag}</span>
                        {j < loc.tags.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-200" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}