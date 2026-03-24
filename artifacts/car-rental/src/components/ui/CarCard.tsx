import { useState } from "react";
import { Car } from "@workspace/api-client-react";
import { Gauge, Fuel, Users, Briefcase, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingModal } from "./BookingModal";

function resolveImg(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `${import.meta.env.BASE_URL}${url}`;
}

function CarImageCarousel({ car }: { car: Car }) {
  const allImages = (car.images && car.images.length > 0)
    ? car.images
    : car.imageUrl
      ? [car.imageUrl]
      : [];

  const fallback = "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80";
  const imgs = allImages.length > 0 ? allImages : [fallback];

  const [idx, setIdx] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx(i => (i - 1 + imgs.length) % imgs.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx(i => (i + 1) % imgs.length);
  };

  return (
    <div className="relative w-full h-full">

      {/* Current photo */}
      <div className="relative z-1 w-full" style={{ height: 240 }}>
        <img
          key={idx}
          src={resolveImg(imgs[idx]) || fallback}
          onError={e => { (e.target as HTMLImageElement).src = fallback; }}
          alt={`${car.make} ${car.model} — photo ${idx + 1}`}
          className="w-full h-full object-cover transition-all duration-400 group-hover:scale-[1.04]"
        />
      </div>

      {/* Nav arrows — only shown when multiple images */}
      {imgs.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-150 opacity-0 group-hover:opacity-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-150 opacity-0 group-hover:opacity-100"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setIdx(i); }}
                className={`rounded-full transition-all duration-200 ${
                  i === idx
                    ? "w-4 h-1.5 bg-blue-500"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CarCard({ car }: { car: Car }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const isAvailable = car.available;

  return (
    <>
      <div className="group rounded-[26px] overflow-hidden bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.11)] hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 flex flex-col">

        {/* ── Image area ── */}
        <div className="relative overflow-hidden">
          {/* Available badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-wide ${
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

          <CarImageCarousel car={car} />
        </div>

        {/* ── Info area ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-grow">

          {/* Category · Year · Color */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            {car.category} · {car.year} · {car.color}
          </p>

          {/* Car name */}
          <h3 className="text-[1.15rem] font-black text-gray-900 tracking-tight leading-snug -mt-1">
            {car.make} {car.model}
          </h3>

          {/* Specs */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-[0.13em] font-light">
                <Gauge className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" strokeWidth={1.8} />
                {car.transmission}
              </div>
              <div className="w-[1px] h-3.5 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-[0.13em] font-light">
                <Fuel className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" strokeWidth={1.8} />
                {car.fuelType}
              </div>
            </div>
            <div className="h-px w-32 bg-gray-150" style={{ backgroundColor: "#e8e8ed" }} />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-[0.13em] font-light">
                <Users className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" strokeWidth={1.8} />
                {car.seats} Seats
              </div>
              <div className="w-[1px] h-3.5 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-[0.13em] font-light">
                <Briefcase className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" strokeWidth={1.8} />
                {car.bags} Bags
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-0.5" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[1.5rem] font-black text-gray-900 tracking-tight">€{car.pricePerDay}</span>
              <span className="text-[11px] text-gray-400 font-light"> / day</span>
            </div>

            {isAvailable ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 text-[12px] font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-200 active:scale-95 bg-blue-600 hover:bg-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.35)]"
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
