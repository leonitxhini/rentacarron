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
      
      {/* Hero Section — full background image */}
      <section className="relative overflow-hidden" style={{minHeight: "360px"}}>
        {/* Background image */}
        <img
          src={`${import.meta.env.BASE_URL}images/hero-car.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{objectPosition: "center 30%"}}
        />
        {/* Dark overlay — heavier on left so text is readable, lighter on right to show car */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 pointer-events-none" />
        {/* Bottom fade to merge with search widget */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0c14] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-xl">
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white tracking-tight leading-[1.05] mb-4">
                Premium car<br />rental
              </h1>

              <p className="text-base text-gray-300 mb-6 max-w-md">
                Premium cars. Easy booking. Reliable service across the Balkans.
              </p>

              {/* Feature badges — small inline icon+text */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
                    <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="22" height="13" rx="2"/><path d="M16 17l-1 4H9l-1-4"/><path d="M1 13h22"/></svg>
                    UNLIMITED KM
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
                    <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><path d="M13 16h2l2 2 2-2h2"/></svg>
                    AIRPORT PICKUP
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
                  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  FAST WHATSAPP BOOKING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Widget — floats over the hero/fleet boundary */}
      <div className="relative z-30 -mt-[30px] px-4 sm:px-6 lg:px-8">
        <SearchWidget />
      </div>

      {/* Spacer below widget before fleet */}
      <div className="h-14 bg-white"></div>

      {/* Our Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900">Our Fleet</h2>
              <div className="flex items-center gap-6 text-sm font-medium">
                <Link href="/fleet" className="text-gray-900 hover:text-blue-600 transition-colors">
                  View full fleet →
                </Link>
                <a href="https://wa.me/38370000000" className="text-green-600 hover:text-green-700 transition-colors hidden sm:flex items-center gap-1">
                  Book via WhatsApp <span>💬</span>
                </a>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
             <Link href="/fleet" className="inline-flex text-blue-600 font-bold hover:text-blue-800 transition-colors text-lg">
              View all vehicles & prices →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">How it works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { step: "01", icon: CarIcon, title: "Choose a Vehicle", desc: "Select a car from our premium fleet that fits your needs perfectly." },
              { step: "02", icon: Calendar, title: "Pick Date & Location", desc: "Choose your pickup and drop-off dates and locations." },
              { step: "03", icon: Send, title: "Send a Request", desc: "Fill in your details and send a booking request." },
              { step: "04", icon: Key, title: "Pick Up Your Keys", desc: "Get your keys and start your journey with RRON." }
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-start relative">
                <span className="px-3 py-1 text-xs font-bold bg-gray-200 text-gray-600 rounded-full mb-6">
                  STEP {s.step}
                </span>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-blue-600">
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer / Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 text-blue-600 font-bold text-sm tracking-wider uppercase mb-4">
              <span className="w-8 h-0.5 bg-blue-600"></span>
              WHAT WE OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 max-w-xl leading-tight">
              Everything you need<br />for a perfect drive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: "Airport Transfer", desc: "We provide pickup and drop-off right at the airport terminal." },
              { icon: Clock, title: "24/7 Support", desc: "Our team is available around the clock for any assistance you need." },
              { icon: Shield, title: "Full Insurance", desc: "Drive with peace of mind knowing you are fully covered." },
              { icon: MapPin, title: "Flexible Drop-off", desc: "Return the car at any of our designated locations easily." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <service.icon className="w-10 h-10 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-[#f8f9fa] border-y border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-gray-500 font-bold text-sm tracking-wider uppercase mb-4">
            — VERIFIED ON GOOGLE
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Google Reviews</h2>
          
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                {/* Google G Logo simplified */}
                <span className="text-blue-600 font-bold text-2xl">G</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">5.0</span>
                <div className="flex gap-1 text-yellow-400">
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                  <Star className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-medium">· 21 reviews · Rent A Car – RRON, Ferizaj</p>
            <p className="text-blue-600 mt-4 text-sm font-medium cursor-pointer hover:underline">
              Read the original reviews on Google Maps...
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-300 relative">
            {/* Embedded map placeholder */}
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
      </section>

      {/* Locations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 text-blue-600 font-bold text-sm tracking-wider uppercase mb-4">
              — WHERE TO FIND US
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">Our Locations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location Card 1 */}
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?w=800&q=80" alt="Prishtina Airport" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prishtina International Airport</h3>
                <p className="text-gray-500 text-sm mb-4">Pristina 10000, Kosovo</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">Airport Pickup</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">24/7</span>
                </div>
              </div>
            </div>

            {/* Location Card 2 */}
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" alt="Ferizaj Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ferizaj HQ Office</h3>
                <p className="text-gray-500 text-sm mb-4">Rruga e Gjilanit, Ferizaj 70000, Kosovo</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">Main Office</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">08:00 - 20:00</span>
                </div>
              </div>
            </div>

            {/* Location Card 3 */}
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" alt="Skopje Airport" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Skopje International Airport</h3>
                <p className="text-gray-500 text-sm mb-4">1043 Petrovec, North Macedonia</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">Airport Transfer</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">On Request</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
