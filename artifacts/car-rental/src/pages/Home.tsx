import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, MapPin, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: cars, isLoading } = useListCars({ available: true });
  const featuredCars = cars?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Premium Hero" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,110,245,0.1)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary font-medium text-sm mb-6 backdrop-blur-sm">
              ✨ The New Standard in Car Rental
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Drive the <span className="text-gradient">Extraordinary.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Premium cars. Easy booking. Reliable service across the Balkans. Experience luxury without the hassle.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <SearchWidget />
          </motion.div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Fleet</h2>
              <p className="text-muted-foreground">Discover our most popular premium vehicles.</p>
            </div>
            <Link href="/fleet" className="hidden md:inline-flex text-primary font-medium hover:text-primary/80 items-center gap-1 group">
              View All Cars 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-96 bg-white/5 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
             <Link href="/fleet" className="inline-block px-8 py-3 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-muted-foreground">Rent your dream car in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "1. Choose Location", desc: "Select where you want to pick up and drop off the car." },
              { icon: Clock, title: "2. Pick Dates", desc: "Select your desired rental period and times." },
              { icon: Star, title: "3. Book Your Car", desc: "Choose from our premium fleet of well-maintained vehicles." },
              { icon: ShieldCheck, title: "4. Hit The Road", desc: "Pick up your keys and enjoy a seamless driving experience." }
            ].map((step, idx) => (
              <div key={idx} className="bg-card p-8 rounded-2xl border border-white/5 text-center hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
