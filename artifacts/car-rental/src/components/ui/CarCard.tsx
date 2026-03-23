import { Car } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Users, Briefcase, Fuel, Settings2 } from "lucide-react";

export function CarCard({ car }: { car: Car }) {
  const isAvailable = car.available;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(59,110,245,0.15)] flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-[16/10] bg-secondary/50 p-6 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isAvailable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <img 
          src={car.imageUrl || "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">{car.category}</div>
        <h3 className="text-xl font-bold text-white mb-4">{car.make} {car.model} <span className="text-white/50 font-normal text-lg">{car.year}</span></h3>
        
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings2 className="w-4 h-4 text-white/40" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4 text-white/40" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-white/40" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4 text-white/40" />
            <span>{car.bags} Bags</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">€{car.pricePerDay}</span>
            <span className="text-muted-foreground text-sm"> / day</span>
          </div>
          
          {isAvailable ? (
            <Link 
              href={`/booking/${car.id}`}
              className="px-6 py-2.5 bg-white text-background font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              Book Now
            </Link>
          ) : (
            <button disabled className="px-6 py-2.5 bg-secondary text-muted-foreground font-semibold rounded-xl cursor-not-allowed">
              Sold Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
