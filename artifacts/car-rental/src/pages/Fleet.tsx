import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";

const CATEGORIES = ["All", "SUV", "Sedan", "Luxury", "Economy", "Sport"];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");

  const queryParams: any = {};
  if (activeCategory !== "All") {
    queryParams.category = activeCategory;
  }

  const { data: cars, isLoading } = useListCars(queryParams);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#0a0c14] pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-blue-500"></span>
            <span className="text-xs tracking-[0.2em] uppercase text-blue-400 font-medium">Our Vehicles</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            The Fleet
          </h1>
          <p className="text-white/50 text-lg font-light max-w-xl leading-relaxed">
            Handpicked vehicles maintained to the highest standard. Every journey, every time.
          </p>
        </div>
      </section>

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#0a0c14] text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
                style={{ letterSpacing: "0.02em" }}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-400 font-light">
              {!isLoading && cars ? `${cars.length} vehicle${cars.length !== 1 ? "s" : ""}` : ""}
            </span>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="h-52 bg-gray-100 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-100 animate-pulse rounded w-1/3" />
                    <div className="h-6 bg-gray-100 animate-pulse rounded w-2/3" />
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : cars && cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="py-28 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 6h3l3 4v4h-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ letterSpacing: "-0.02em" }}>
                No vehicles found
              </h3>
              <p className="text-gray-400 font-light mb-8">
                Try selecting a different category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-6 py-2.5 border border-gray-900 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200"
              >
                View all vehicles
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
