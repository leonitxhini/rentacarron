import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { Gauge, Fuel, Users, Briefcase, Heart } from "lucide-react";
import { BookingModal } from "./BookingModal";

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const isAvailable = car.available;

  return (
    <>
      <div className="group rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col bg-white">

        {/* ── Top: image area ── */}
        <div className="relative bg-[#f0f1f5] overflow-hidden" style={{ minHeight: 210 }}>

          {/* Available badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full ${
              isAvailable
                ? "bg-white text-green-600 shadow-sm"
                : "bg-white text-red-500 shadow-sm"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`}></span>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Favourite button */}
          <button
            onClick={() => setLiked(l => !l)}
            className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
              liked
                ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                : "bg-white text-gray-400 hover:text-blue-500"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>

          {/* RRON watermark — blue/purple tint */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-3/5 object-contain"
              style={{
                opacity: 0.09,
                filter: "hue-rotate(220deg) saturate(3) brightness(0.8)"
              }}
            />
          </div>

          {/* Car image */}
          <div className="flex items-center justify-center px-6 py-8" style={{ minHeight: 210 }}>
            <img
              src={
                car.imageUrl
                  ? car.imageUrl.startsWith("http")
                    ? car.imageUrl
                    : `${import.meta.env.BASE_URL}${car.imageUrl}`
                  : "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"
              }
              alt={`${car.make} ${car.model}`}
              className="w-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
              style={{
                maxHeight: 160,
                filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.13))"
              }}
            />
          </div>
        </div>

        {/* ── Bottom: info area ── */}
        <div className="bg-[#1e2030] px-6 py-5 flex flex-col gap-3 flex-grow">

          {/* Category · Year · Color */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            {car.category} · {car.year} · {car.color}
          </p>

          {/* Car name */}
          <h3 className="text-[1.25rem] font-bold text-white tracking-tight leading-snug">
            {car.make} {car.model}
          </h3>

          {/* Specs row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
              <span className="capitalize">{car.transmission}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
              <span className="capitalize">{car.fuelType}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
              <span>{car.seats} seats</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" strokeWidth={1.5} />
              <span>{car.bags} bags</span>
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mt-1" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-[1.5rem] font-black text-white tracking-tight">€{car.pricePerDay}</span>
              <span className="text-[12px] text-gray-500 font-light"> / day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm"
              >
                Book Now
                <span className="text-base leading-none">→</span>
              </button>
            ) : (
              <span className="text-[12px] text-gray-500 bg-white/5 px-5 py-2.5 rounded-full font-medium">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
