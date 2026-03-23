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
      <section className="py-24 lg:py-32 bg-white">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-[400px] bg-gray-50 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
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

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">How it works</h2>
            <p className="text-gray-500 font-light max-w-lg mx-auto">A seamless experience designed to get you on the road quickly and elegantly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { step: "01", icon: CarIcon, title: "Choose a Vehicle", desc: "Select a car from our premium fleet that fits your lifestyle." },
              { step: "02", icon: Calendar, title: "Set Date & Location", desc: "Choose your pickup and drop-off preferences." },
              { step: "03", icon: Send, title: "Request Booking", desc: "Fill in your details and send a direct request." },
              { step: "04", icon: Key, title: "Take the Keys", desc: "Start your journey with confidence." }
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <span className="px-4 py-1 text-[10px] font-medium tracking-[0.2em] border border-gray-200 text-gray-400 rounded-full mb-8">
                  STEP {s.step}
                </span>
                <div className="w-20 h-20 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-center justify-center mb-8 text-blue-500">
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
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-gray-200"></span>
              <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-medium">WHAT WE OFFER</span>
              <span className="w-12 h-[1px] bg-gray-200"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight max-w-2xl mx-auto leading-tight">
              Everything you need for a <span className="italic font-light text-gray-500">perfect</span> drive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Plane, title: "Airport Transfer", desc: "Complimentary pickup and drop-off at the terminal." },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated assistance around the clock, wherever you are." },
              { icon: Shield, title: "Full Insurance", desc: "Comprehensive coverage for ultimate peace of mind." },
              { icon: MapPin, title: "Flexible Drop-off", desc: "Return your vehicle at any of our designated locations." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-10 border border-gray-100 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-8 text-blue-600">
                  <service.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 lg:py-32 bg-[#fafafa]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Prishtina Airport",
                desc: "Pristina 10000, Kosovo",
                img: "https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?w=800&q=80",
                tags: ["Airport Pickup", "24/7"]
              },
              {
                title: "Ferizaj HQ",
                desc: "Rruga e Gjilanit, Ferizaj 70000, Kosovo",
                img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
                tags: ["Main Office", "08:00 - 20:00"]
              },
              {
                title: "Skopje Airport",
                desc: "1043 Petrovec, North Macedonia",
                img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
                tags: ["Airport Transfer", "On Request"]
              }
            ].map((loc, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={loc.img} alt={loc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{loc.title}</h3>
                  <p className="text-gray-400 text-sm font-light mb-6">{loc.desc}</p>
                  <div className="flex items-center gap-3">
                    {loc.tags.map((tag, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{tag}</span>
                        {j < loc.tags.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-300" />}
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