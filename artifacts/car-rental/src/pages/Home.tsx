import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";
import { Car as CarIcon, Calendar, Send, Key, Star, PlaneTakeoff, Headphones, ShieldCheck, MapPinned, Gauge, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: cars, isLoading } = useListCars({ available: true });
  const featuredCars = [...(cars || [])]
    .sort((a, b) => b.pricePerDay - a.pricePerDay)
    .slice(0, 3);

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
                  <Gauge className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.8} />
                  Unlimited KM
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.8} />
                  Airport Pickup
                </div>
              </div>
              <div className="h-[1px] w-48 bg-white/10" />
              <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                <MessageCircle className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.8} />
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
                <a href="https://wa.me/38348188415" className="text-green-600 hover:text-green-700 transition-colors hidden sm:flex items-center gap-2 font-medium">
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
      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        {/* Full background image */}
        <img
          src={`${import.meta.env.BASE_URL}images/ad-banner.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        {/* Dark overlays for text legibility */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-36 flex flex-col md:flex-row items-end md:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-blue-400"></span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-blue-400 font-semibold">Premium Fleet</span>
            </div>
            <h2
              className="text-4xl lg:text-[3.25rem] font-black text-white leading-tight mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              Drive anywhere.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Book in minutes.</span>
            </h2>
            <p className="text-white/55 text-base font-light leading-relaxed max-w-sm">
              Premium vehicles across Kosovo, North Macedonia and Albania. Instant WhatsApp confirmation — no waiting.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 flex-shrink-0">
            <a
              href="https://wa.me/38348188415"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/30"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book via WhatsApp
            </a>
            <Link
              href="/fleet"
              className="text-sm text-white/45 hover:text-white/75 transition-colors font-light"
            >
              Browse the full fleet →
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

          {/* Mobile: swipe carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-6 px-6 scrollbar-hide lg:hidden">
            {[
              { step: "01", icon: CarIcon, title: "Choose a Vehicle", desc: "Select a car from our premium fleet that fits your lifestyle." },
              { step: "02", icon: Calendar, title: "Set Date & Location", desc: "Choose your pickup and drop-off preferences." },
              { step: "03", icon: Send, title: "Request Booking", desc: "Fill in your details and send a direct request." },
              { step: "04", icon: Key, title: "Take the Keys", desc: "Start your journey with confidence." }
            ].map((s) => (
              <div key={s.step} className="snap-start flex-shrink-0 w-[72vw] flex flex-col items-center text-center bg-white/60 rounded-2xl p-6">
                <span className="px-4 py-1 text-[10px] font-medium tracking-[0.2em] border border-gray-300 text-gray-400 rounded-full mb-6">
                  STEP {s.step}
                </span>
                <div className="w-20 h-20 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] flex items-center justify-center mb-6 text-blue-500">
                  <s.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Desktop: steps connected by arrow lines */}
          <div className="hidden lg:flex items-start justify-between">
            {[
              { step: "01", icon: CarIcon, title: "Choose a Vehicle", desc: "Select a car from our premium fleet that fits your lifestyle." },
              { step: "02", icon: Calendar, title: "Set Date & Location", desc: "Choose your pickup and drop-off preferences." },
              { step: "03", icon: Send, title: "Request Booking", desc: "Fill in your details and send a direct request." },
              { step: "04", icon: Key, title: "Take the Keys", desc: "Start your journey with confidence." }
            ].map((s, idx, arr) => (
              <div key={s.step} className="flex items-start flex-1">
                {/* Step column */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <span className="px-4 py-1 text-[10px] font-medium tracking-[0.2em] border border-gray-300 text-gray-400 rounded-full mb-8">
                    STEP {s.step}
                  </span>
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] flex items-center justify-center mb-8 text-blue-500">
                    <s.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{s.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed max-w-[180px]">{s.desc}</p>
                </div>

                {/* Arrow connector — shown between steps, not after the last */}
                {idx < arr.length - 1 && (
                  <div className="flex-shrink-0 flex items-center justify-center w-12" style={{ marginTop: "5.25rem" }}>
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0" y1="12" x2="36" y2="12" stroke="#c8cfe0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"/>
                      <polyline points="28,5 38,12 28,19" stroke="#c8cfe0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider: #e9ecf4 → white */}
      <div className="bg-white overflow-hidden leading-none" style={{ marginTop: -2 }}>
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,0 C320,72 1120,72 1440,0 L1440,0 L0,0 Z" fill="#e9ecf4" />
        </svg>
      </div>

      {/* What We Offer / Services Section */}
      <section className="pb-24 lg:pb-32 bg-white relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute top-0 -left-32 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          {/* Centered heading */}
          <div className="text-center mb-16">
            <p className="text-sm text-blue-500 font-semibold tracking-[0.18em] uppercase mb-4">What We Offer</p>
            <h2
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 max-w-2xl mx-auto leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Why Choose Us
            </h2>
            <p className="text-gray-400 font-light text-base max-w-md mx-auto leading-relaxed">
              From airport arrivals to full insurance — we handle every detail so you don't have to.
            </p>
          </div>

          {/* Cards row — swipe on mobile, 4-col on desktop */}
          <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-6 px-6 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:pb-0 sm:mx-0 sm:px-0 lg:grid-cols-4">
            {[
              {
                Icon: PlaneTakeoff,
                title: "Airport Transfer",
                desc: "Seamless pickup and drop-off at Pristina, Skopje, and Kukës airports — any hour, any flight.",
              },
              {
                Icon: Headphones,
                title: "24/7 Support",
                desc: "Our team is always reachable via WhatsApp for instant help, wherever your journey takes you.",
              },
              {
                Icon: ShieldCheck,
                title: "Full Insurance",
                desc: "Every vehicle comes with comprehensive coverage so you can drive with complete peace of mind.",
              },
              {
                Icon: MapPinned,
                title: "Flexible Drop-off",
                desc: "Pick up in one city, return in another. We accommodate your route, not the other way around.",
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="snap-start flex-shrink-0 w-[72vw] sm:w-auto flex flex-col items-center text-center bg-white rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 p-8"
              >
                {/* Icon circle — inside card, no negative margin */}
                <div className="w-16 h-16 rounded-2xl bg-[#f4f6fb] border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                  <s.Icon className="w-7 h-7 text-gray-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {s.desc}
                </p>
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
          
          {/* Rating badge */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center gap-5 mb-5">
              {/* Google colourful G */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-gray-900" style={{ letterSpacing: "-0.03em" }}>5.0</span>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 font-light text-sm mt-1">
                  21 reviews · <span className="font-medium text-gray-700">Rent A Car – RRON</span> · Ferizaj, Kosovo
                </p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/Rent+A+Car+RRON/@42.3653155,21.1422215,17z/data=!3m1!4b1!4m6!3m5!1s0x13547eb10817c8ad:0xc3cf909d949cf9d7!8m2!3d42.3653155!4d21.1444102!16s%2Fg%2F11h5b2_f8q"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-1.5"
            >
              Read all 21 reviews on Google Maps →
            </a>
          </div>

          {/* Map */}
          <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white relative p-2" style={{ height: 360 }}>
            <div className="w-full h-full rounded-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Rent+A+Car+RRON,+Emin+Duraku,+Ferizaj+70000,+Kosovo&t=m&z=16&output=embed&iwloc=near"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RRON Rent A Car location"
              />
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
                desc: "Emin Duraku, Ferizaj 70000, Kosovo",
                img: `${import.meta.env.BASE_URL}images/location-ferizaj.jpg`,
                tags: ["Main Office", "24/7"],
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