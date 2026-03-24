import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CarCard } from "@/components/ui/CarCard";
import { useListCars } from "@workspace/api-client-react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

type SortKey = "price-desc" | "price-asc" | "newest" | "name-az";

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("price-desc");
  const [sortOpen, setSortOpen] = useState(false);
  const { t } = useLang();

  const CATEGORIES = [
    { key: "All", label: t.fleet.allCategories },
    { key: "Economy", label: t.fleet.economy },
    { key: "Compact", label: t.fleet.compact },
    { key: "Premium", label: t.fleet.premium },
    { key: "Luxury", label: t.fleet.luxury },
  ];

  const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: "price-desc", label: t.fleet.sort.highLow },
    { value: "price-asc",  label: t.fleet.sort.lowHigh },
    { value: "newest",     label: t.fleet.sort.newest },
    { value: "name-az",    label: "Name: A–Z" },
  ];

  const { data: cars, isLoading } = useListCars({});

  const filtered = useMemo(() => {
    let list = [...(cars || [])];

    if (activeCategory !== "All") {
      list = list.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());
    }

    switch (sortBy) {
      case "price-desc": list.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case "price-asc":  list.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case "newest":     list.sort((a, b) => b.year - a.year); break;
      case "name-az":    list.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)); break;
    }

    return list;
  }, [cars, activeCategory, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Sort";
  const activeCategoryLabel = CATEGORIES.find(c => c.key === activeCategory)?.label ?? activeCategory;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#0a0c14] pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-blue-500"></span>
            <span className="text-xs tracking-[0.2em] uppercase text-blue-400 font-medium">{t.fleet.label}</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t.fleet.title}
          </h1>
          <p className="text-white/50 text-lg font-light max-w-xl leading-relaxed">
            {t.fleet.subtitle}
          </p>
        </div>
      </section>

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">

          {/* Filter + Sort bar */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {/* Category pills */}
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-[#0a0c14] text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
                style={{ letterSpacing: "0.02em" }}
              >
                {cat.label}
              </button>
            ))}

            {/* Right side: count + sort */}
            <div className="ml-auto flex items-center gap-4">
              <span className="text-sm text-gray-400 font-light hidden sm:block">
                {!isLoading ? `${filtered.length} ${t.fleet.vehicles}` : ""}
              </span>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(o => !o)}
                  onBlur={() => setTimeout(() => setSortOpen(false), 150)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-600 font-medium hover:border-gray-300 hover:text-gray-900 transition-all duration-200"
                  style={{ letterSpacing: "0.01em" }}
                >
                  <span>{activeSortLabel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-black/8 overflow-hidden z-20">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                          sortBy === opt.value
                            ? "bg-gray-50 text-gray-900 font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {opt.value === sortBy && (
                          <span className="mr-2 text-blue-500">✓</span>
                        )}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(car => (
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
