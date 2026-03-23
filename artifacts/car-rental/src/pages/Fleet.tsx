import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";
import { useLocation } from "wouter";

const CATEGORIES = ["All", "SUV", "Sedan", "Luxury", "Economy", "Sport"];

export default function Fleet() {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Extract params to possibly filter on client side if API doesn't support complex queries natively
  // The API supports ?category=x and ?available=true
  
  const queryParams: any = {};
  if (activeCategory !== "All") {
    queryParams.category = activeCategory;
  }

  const { data: cars, isLoading } = useListCars(queryParams);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-4">Our Premium Fleet</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Browse our diverse selection of meticulously maintained vehicles ready for your next journey.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-white/5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-white text-background shadow-md" 
                    : "bg-secondary text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-[450px] bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : cars && cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-card rounded-3xl border border-white/5">
              <div className="text-6xl mb-4">🚙</div>
              <h3 className="text-2xl font-bold text-white mb-2">No cars found</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-xl font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
