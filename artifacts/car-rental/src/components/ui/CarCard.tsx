import { Car } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Gauge, Fuel, Users, Briefcase } from "lucide-react";

export function CarCard({ car }: { car: Car }) {
  const isAvailable = car.available;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      {/* Top Left Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isAvailable ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-red-50 text-red-600'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Image Area with Logo Watermark */}
      <div className="relative aspect-[16/10] bg-[#f8f9fa] p-6 flex items-center justify-center overflow-hidden">
        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none mix-blend-multiply">
          <img 
            src={`${import.meta.env.BASE_URL}images/rron-logo.png`} 
            alt="" 
            className="w-2/3 h-auto grayscale invert" 
          />
        </div>
        
        <img 
          src={car.imageUrl || "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md z-10"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
          {car.category} · {car.year} · {car.color}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{car.make} {car.model}</h3>
        
        {/* Specs Grid */}
        <div className="flex flex-wrap gap-x-4 gap-y-3 mb-8">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
            <Fuel className="w-4 h-4 text-blue-500" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span>{car.bags} bags</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">€{car.pricePerDay}</span>
            <span className="text-gray-500 text-sm font-medium"> / day</span>
          </div>
          
          {isAvailable ? (
            <Link 
              href={`/booking/${car.id}`}
              className="px-6 py-2.5 bg-[#3b82f6] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book
            </Link>
          ) : (
            <button disabled className="px-6 py-2.5 bg-gray-100 text-gray-400 font-semibold rounded-lg cursor-not-allowed">
              Sold Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
