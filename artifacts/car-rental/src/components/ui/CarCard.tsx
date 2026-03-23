import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { BookingModal } from "./BookingModal";

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const isAvailable = car.available;

  return (
    <>
      <div
        className="group relative bg-[#f5f5f7] rounded-[20px] overflow-hidden cursor-pointer flex flex-col"
        style={{ boxShadow: "none" }}
      >
        {/* Image area */}
        <div className="relative overflow-hidden bg-[#f5f5f7] flex items-center justify-center px-8 pt-10 pb-4"
          style={{ minHeight: 220 }}>
          {/* Availability pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
              isAvailable ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`}></span>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          <img
            src={car.imageUrl || "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"}
            alt={`${car.make} ${car.model}`}
            className="w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            style={{ maxHeight: 170, filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.12))" }}
          />
        </div>

        {/* Content */}
        <div className="px-7 pb-7 pt-5 flex flex-col gap-1 bg-[#f5f5f7]">
          {/* Category line */}
          <p className="text-[11px] font-medium text-gray-500 tracking-widest uppercase">
            {car.category} · {car.year}
          </p>

          {/* Car name */}
          <h3 className="text-[1.35rem] font-bold text-gray-900 tracking-tight leading-snug">
            {car.make} {car.model}
          </h3>

          {/* Specs line */}
          <p className="text-[12px] text-gray-500 mt-0.5">
            {car.transmission} · {car.fuelType} · {car.seats} seats
          </p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-baseline gap-1">
              <span className="text-[1.4rem] font-bold text-gray-900 tracking-tight">€{car.pricePerDay}</span>
              <span className="text-sm text-gray-400 font-light">/ day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="text-[13px] font-semibold text-blue-600 bg-white hover:bg-blue-600 hover:text-white px-5 py-2 rounded-full transition-all duration-200 shadow-sm"
              >
                Book now
              </button>
            ) : (
              <span className="text-[12px] text-gray-400 bg-white px-5 py-2 rounded-full font-medium">
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
