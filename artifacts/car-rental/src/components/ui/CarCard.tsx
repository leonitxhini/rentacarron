import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { Gauge, Fuel, Users, Briefcase } from "lucide-react";
import { BookingModal } from "./BookingModal";

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const isAvailable = car.available;

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full relative">
        {/* Available badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            {isAvailable ? (
              <><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available</>
            ) : (
              <><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Sold Out</>
            )}
          </span>
        </div>

        {/* Image area */}
        <div className="relative aspect-[16/11] bg-[#f7f7f7] p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-3/4 h-auto grayscale"
            />
          </div>
          <img
            src={car.imageUrl || "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-10"
            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="text-[10px] font-medium text-gray-400 mb-3 uppercase tracking-[0.2em]">
            {car.category} · {car.year} · {car.color}
          </div>

          <h3 className="text-[1.75rem] font-bold text-gray-900 mb-8 tracking-tight leading-none">{car.make} {car.model}</h3>

          <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Fuel className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{car.seats} seats</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>{car.bags} bags</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-amber-600">€{car.pricePerDay}</span>
              <span className="text-gray-400 text-sm font-light"> / day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 bg-transparent border border-blue-600 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Book now
              </button>
            ) : (
              <button disabled className="px-6 py-2.5 bg-gray-50 text-gray-400 font-medium text-sm rounded-lg cursor-not-allowed">
                Sold Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}