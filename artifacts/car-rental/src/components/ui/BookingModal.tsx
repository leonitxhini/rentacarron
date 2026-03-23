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

  // Set default location once loaded
  useEffect(() => {
    if (locations?.length && !pickupLocation) {
      setPickupLocation(String(locations[0].id));
      setDropoffLocation(String(locations[0].id));
    }
  }, [locations]);

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleWhatsApp = () => {
    const pickup = locations?.find(l => String(l.id) === pickupLocation)?.name || pickupLocation;
    const dropoff = locations?.find(l => String(l.id) === dropoffLocation)?.name || dropoffLocation;
    const message = [
      `Hello, I'd like to book a car:`,
      `🚗 ${car.make} ${car.model} (${car.category} · ${car.year} · ${car.color})`,
      `💰 €${car.pricePerDay}/day`,
      `📍 Pick-up: ${pickup}${pickupDate ? ` on ${pickupDate}` : ""}${pickupTime ? ` at ${pickupTime}` : ""}`,
      `🏁 Drop-off: ${dropoff}${returnDate ? ` on ${returnDate}` : ""}${returnTime ? ` at ${returnTime}` : ""}`,
    ].join("\n");
    window.open(`https://wa.me/38370000000?text=${encodeURIComponent(message)}`, "_blank");
  };

  const specs = [
    { icon: Users, label: "SEATS", value: `${car.seats} seats` },
    { icon: Settings, label: "TRANSMISSION", value: car.transmission },
    { icon: Fuel, label: "FUEL", value: car.fuelType },
    { icon: Briefcase, label: "LUGGAGE", value: `${car.bags} bags` },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[95vh] overflow-y-auto">

        {/* Header — dark with car image */}
        <div className="relative h-[220px] bg-[#0a0c14] overflow-hidden">
          {/* RRON logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <img
              src={`${import.meta.env.BASE_URL}images/rron-logo.png`}
              alt=""
              className="w-[55%] object-contain"
            />
          </div>
          {/* Car image */}
          {car.imageUrl && (
            <img
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              className="absolute inset-0 w-full h-full object-contain object-center p-4 z-10"
            />
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Car info overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent z-20">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-white text-xl font-bold leading-tight">{car.make} {car.model}</h2>
                <p className="text-white/60 text-xs mt-0.5 capitalize">{car.category} · {car.year} · {car.color}</p>
              </div>
              <div className="text-right">
                <span className="text-white text-2xl font-extrabold">€{car.pricePerDay}</span>
                <span className="text-white/60 text-xs"> / day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spec boxes */}
        <div className="grid grid-cols-4 border-b border-gray-100">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-start p-4 border-r border-gray-100 last:border-r-0">
              <spec.icon className="w-4 h-4 text-blue-600 mb-2" />
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{spec.label}</p>
              <p className="text-sm font-bold text-gray-900 capitalize">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Booking</h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Pick-up Location */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <MapPin className="w-3 h-3 text-blue-600" /> Pick-up Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Drop-off Location */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <Flag className="w-3 h-3 text-blue-600" /> Drop-off Location
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Pick-up Date */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <CalendarDays className="w-3 h-3 text-blue-600" /> Pick-up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            {/* Pick-up Time */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <Clock className="w-3 h-3 text-blue-600" /> Pick-up Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <CalendarDays className="w-3 h-3 text-blue-600" /> Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              />
            </div>

            {/* Return Time */}
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                <Clock className="w-3 h-3 text-blue-600" /> Return Time
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Close
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-[2] py-3 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] hover:from-[#6d28d9] hover:to-[#4338ca] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-lg shadow-purple-500/30"
            >
              {/* WhatsApp icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
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
