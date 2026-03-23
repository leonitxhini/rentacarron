import { useState, useEffect } from "react";
import { X, MapPin, Flag, CalendarDays, Clock, Users, Settings, Fuel, Briefcase } from "lucide-react";
import { Car, useListLocations } from "@workspace/api-client-react";

interface BookingModalProps {
  car: Car;
  onClose: () => void;
}

export function BookingModal({ car, onClose }: BookingModalProps) {
  const { data: locations } = useListLocations();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");

  const locationList = Array.isArray(locations) ? locations : [];

  useEffect(() => {
    if (locationList.length && !pickupLocation) {
      setPickupLocation(String(locationList[0].id));
      setDropoffLocation(String(locationList[0].id));
    }
  }, [locations]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleWhatsApp = () => {
    const pickup = locationList.find(l => String(l.id) === pickupLocation)?.name || pickupLocation;
    const dropoff = locationList.find(l => String(l.id) === dropoffLocation)?.name || dropoffLocation;
    const message = [
      `Hello, I'd like to book a car:`,
      `🚗 ${car.make} ${car.model} (${car.category} · ${car.year} · ${car.color})`,
      `💰 €${car.pricePerDay}/day`,
      `📍 Pick-up: ${pickup}${pickupDate ? ` on ${pickupDate}` : ""}${pickupTime ? ` at ${pickupTime}` : ""}`,
      `🏁 Drop-off: ${dropoff}${returnDate ? ` on ${returnDate}` : ""}${returnTime ? ` at ${returnTime}` : ""}`,
    ].join("\n");
    window.open(`https://wa.me/38348188415?text=${encodeURIComponent(message)}`, "_blank");
  };

  const specs = [
    { icon: Users, label: "Seats", value: `${car.seats}` },
    { icon: Settings, label: "Gearbox", value: car.transmission },
    { icon: Fuel, label: "Fuel", value: car.fuelType },
    { icon: Briefcase, label: "Luggage", value: `${car.bags} bags` },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[460px] bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[95vh] overflow-y-auto">

        {/* ── Header ── */}
        <div className="relative bg-[#0a0c14] overflow-hidden" style={{ minHeight: 230 }}>
          {/* Watermark logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-[52%] object-contain opacity-[0.07]"
            />
          </div>

          {/* Car image */}
          {car.imageUrl && (
            <img
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              className="absolute inset-0 w-full h-full object-contain object-center p-6 z-10"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bottom overlay with car name + price */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-white text-xl font-bold tracking-tight leading-none">
                  {car.make} {car.model}
                </h2>
                <p className="text-white/50 text-xs mt-1 capitalize tracking-wide">
                  {car.category} · {car.year} · {car.color}
                </p>
              </div>
              <div className="text-right">
                <span className="text-white text-2xl font-black tracking-tight">€{car.pricePerDay}</span>
                <span className="text-white/40 text-xs"> / day</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Specs strip ── */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-center py-4 px-2 gap-1.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <spec.icon className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
              </div>
              <p className="text-[9px] uppercase tracking-[0.12em] text-gray-400 font-semibold">{spec.label}</p>
              <p className="text-xs font-semibold text-gray-800 capitalize text-center leading-tight">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <div className="p-6">
          <h3
            className="text-[15px] font-bold text-gray-900 mb-5 tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Quick Booking
          </h3>

          <div className="space-y-4">
            {/* Locations row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  <MapPin className="w-3 h-3 text-blue-500" /> Pick-up
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white transition-all appearance-none cursor-pointer"
                >
                  {locationList.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-2">
                  <Flag className="w-3 h-3 text-blue-500" /> Drop-off
                </label>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white transition-all appearance-none cursor-pointer"
                >
                  {locationList.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pick-up date + time */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Pick-up</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="px-4 pb-3">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-800 outline-none font-medium pt-1"
                  />
                </div>
                <div className="px-4 pb-3 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-300 flex-shrink-0" />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-800 outline-none font-medium pt-1"
                  />
                </div>
              </div>
            </div>

            {/* Return date + time */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Return</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="px-4 pb-3">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-800 outline-none font-medium pt-1"
                  />
                </div>
                <div className="px-4 pb-3 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-300 flex-shrink-0" />
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-800 outline-none font-medium pt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Buttons ── */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 py-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-lg shadow-green-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
