import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { Gauge, Fuel, Users, Briefcase, Heart, ArrowRight } from "lucide-react";
import { BookingModal } from "./BookingModal";

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const isAvailable = car.available;

  const specs = [
    { icon: Gauge,     label: car.transmission },
    { icon: Fuel,      label: car.fuelType },
    { icon: Users,     label: `${car.seats} seats` },
    { icon: Briefcase, label: `${car.bags} bags` },
  ];

  return (
    <>
      <div className="group rounded-[26px] overflow-hidden bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.11)] hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 flex flex-col">

        {/* ── Image area ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "#F5F5F7", minHeight: 210 }}
        >
          {/* Available badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full ${
              isAvailable
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Favourite button */}
          <button
            onClick={() => setLiked(l => !l)}
            className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
              liked
                ? "bg-red-500 border-red-500 text-white"
                : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>

          {/* RRON watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-2/5 object-contain"
              style={{ opacity: 0.06 }}
            />
          </div>

          {/* Car image */}
          <div className="flex items-center justify-center px-8 py-10" style={{ minHeight: 210 }}>
            <img
              src={
                car.imageUrl
                  ? car.imageUrl.startsWith("http")
                    ? car.imageUrl
                    : `${import.meta.env.BASE_URL}${car.imageUrl}`
                  : "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"
              }
              alt={`${car.make} ${car.model}`}
              className="w-full object-contain group-hover:scale-[1.05] transition-transform duration-500"
              style={{
                maxHeight: 150,
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.13))",
              }}
            />
          </div>
        </div>

        {/* ── Info area ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-grow">

          {/* Category · Year · Color */}
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {car.category} · {car.year} · {car.color}
          </p>

          {/* Car name */}
          <h3 className="text-[1.15rem] font-black text-gray-900 tracking-tight leading-snug -mt-1">
            {car.make} {car.model}
          </h3>

          {/* Apple SF-style spec icons — thin stroke, no backgrounds */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            {specs.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  className="w-[15px] h-[15px] flex-shrink-0 text-blue-500"
                  strokeWidth={1.6}
                />
                <span className="text-[12px] text-gray-600 font-medium capitalize">{label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-0.5" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[1.5rem] font-black text-gray-900 tracking-tight">€{car.pricePerDay}</span>
              <span className="text-[11px] text-gray-400 font-medium"> / day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 text-[12.5px] font-bold px-5 py-2.5 rounded-full text-white transition-all duration-200 active:scale-95 bg-blue-600 hover:bg-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.35)]"
              >
                Book Now
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            ) : (
              <span className="text-[12px] text-gray-400 bg-gray-100 px-5 py-2.5 rounded-full font-medium">
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
