import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { Gauge, Fuel, Users, Briefcase, Heart, ArrowRight } from "lucide-react";
import { BookingModal } from "./BookingModal";

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const isAvailable = car.available;

  return (
    <>
      <div className="group rounded-[28px] overflow-hidden border border-white/[0.07] bg-[#141624] hover:border-white/[0.14] hover:shadow-[0_24px_56px_rgba(0,0,0,0.5)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-400 flex flex-col">

        {/* ── Image area ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, #1e2240 0%, #111320 100%)",
            minHeight: 220,
          }}
        >
          {/* Subtle top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Available badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border ${
              isAvailable
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-red-400"}`} />
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Favourite button */}
          <button
            onClick={() => setLiked(l => !l)}
            className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 backdrop-blur-md ${
              liked
                ? "bg-blue-500/20 border-blue-400/30 text-blue-400"
                : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>

          {/* RRON watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-1/2 object-contain"
              style={{ opacity: 0.04, filter: "brightness(10)" }}
            />
          </div>

          {/* Car image */}
          <div className="flex items-center justify-center px-8 py-10" style={{ minHeight: 220 }}>
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
                maxHeight: 155,
                filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.6))",
              }}
            />
          </div>

          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#141624] to-transparent" />
        </div>

        {/* ── Info area ── */}
        <div className="px-6 pt-4 pb-6 flex flex-col gap-3 flex-grow">

          {/* Category · Year · Color */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {car.category} · {car.year} · {car.color}
          </p>

          {/* Car name */}
          <h3 className="text-[1.2rem] font-bold text-white tracking-tight leading-snug -mt-1">
            {car.make} {car.model}
          </h3>

          {/* Specs */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-400/80" strokeWidth={1.5} />
              <span className="capitalize">{car.transmission}</span>
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
            <span className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-blue-400/80" strokeWidth={1.5} />
              <span className="capitalize">{car.fuelType}</span>
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400/80" strokeWidth={1.5} />
              <span>{car.seats} seats</span>
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-400/80" strokeWidth={1.5} />
              <span>{car.bags} bags</span>
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] my-1" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[1.55rem] font-black text-white tracking-tight">€{car.pricePerDay}</span>
              <span className="text-[12px] text-gray-500 font-light"> / day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[12.5px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
              >
                Book Now
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            ) : (
              <span className="text-[12px] text-gray-500 bg-white/[0.04] border border-white/[0.06] px-5 py-2.5 rounded-full font-medium">
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
