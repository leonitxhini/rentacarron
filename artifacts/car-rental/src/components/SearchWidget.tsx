import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useListLocations } from "@workspace/api-client-react";
import type { Location as RentalLocation } from "@workspace/api-client-react";
import { MapPin, Flag, CalendarDays, Search, ChevronDown, ChevronUp, Building2, PlaneTakeoff } from "lucide-react";

/* ── iOS-style icon badge ─────────────────────────── */
function FieldIcon({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
      style={{
        background: active
          ? "linear-gradient(135deg,#3B82F6,#2563EB)"
          : "rgba(255,255,255,0.08)",
        boxShadow: active ? "0 4px 12px rgba(59,130,246,0.35)" : "none",
      }}
    >
      {children}
    </span>
  );
}

/* ── Location row icon ───────────────────────────── */
function LocationIcon({ isAirport }: { isAirport: boolean }) {
  return (
    <span className="w-9 h-9 rounded-[10px] bg-gray-100 flex items-center justify-center flex-shrink-0">
      {isAirport
        ? <PlaneTakeoff className="w-4 h-4 text-gray-500" strokeWidth={1.6} />
        : <Building2 className="w-4 h-4 text-gray-500" strokeWidth={1.6} />
      }
    </span>
  );
}

/* ── Custom location dropdown ────────────────────── */
function LocationPicker({
  label,
  icon,
  value,
  onChange,
  locations,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (id: string) => void;
  locations: RentalLocation[] | undefined;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locationList = Array.isArray(locations) ? locations : [];
  const selected = locationList.find(l => String(l.id) === value);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="flex-1 relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
      >
        <FieldIcon active={open}>
          {icon}
        </FieldIcon>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] uppercase font-semibold tracking-[0.18em] text-gray-500 mb-0.5">{label}</p>
          <p className="text-sm font-light text-white truncate">
            {selected ? selected.name : <span className="text-gray-500">Select location...</span>}
          </p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        }
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] z-50 overflow-hidden">
          <div className="px-5 pt-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Choose {label} Location
            </p>
          </div>
          <ul className="py-1">
            {locationList.map(loc => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => { onChange(String(loc.id)); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <LocationIcon isAirport={loc.isAirport} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900 leading-tight">{loc.name}</p>
                    <p className="text-[11px] text-gray-400 font-light mt-0.5 truncate">{loc.address}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="h-2" />
        </div>
      )}
    </div>
  );
}

/* ── Date field ──────────────────────────────────── */
function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
      <FieldIcon active={false}>
        <CalendarDays className="w-4 h-4 text-gray-400" strokeWidth={1.8} />
      </FieldIcon>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] uppercase font-semibold tracking-[0.18em] text-gray-500 mb-0.5">{label}</p>
        <input
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-light text-white [color-scheme:dark] cursor-pointer"
        />
      </div>
    </div>
  );
}

/* ── Main SearchWidget ───────────────────────────── */
export function SearchWidget() {
  const [, setLocation] = useLocation();
  const { data: locations } = useListLocations();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupLocation) params.append("pickup", pickupLocation);
    if (dropoffLocation) params.append("dropoff", dropoffLocation);
    if (pickupDate) params.append("start", pickupDate);
    if (dropoffDate) params.append("end", dropoffDate);
    setLocation(`/fleet?${params.toString()}`);
  };

  return (
    <div className="bg-[#111318]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl w-full max-w-5xl mx-auto shadow-[0_24px_64px_rgba(0,0,0,0.4)] p-2">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-1">

        <LocationPicker
          label="Pick Up"
          icon={<MapPin className="w-4 h-4 text-white" strokeWidth={2} />}
          value={pickupLocation}
          onChange={setPickupLocation}
          locations={locations}
        />

        {/* Vertical divider */}
        <div className="hidden lg:block w-px self-stretch bg-white/[0.06] my-2" />

        <LocationPicker
          label="Drop Off"
          icon={<Flag className="w-4 h-4 text-white" strokeWidth={2} />}
          value={dropoffLocation}
          onChange={setDropoffLocation}
          locations={locations}
        />

        <div className="hidden lg:block w-px self-stretch bg-white/[0.06] my-2" />

        <DateField label="Pick Up Date" value={pickupDate} onChange={setPickupDate} />

        <div className="hidden lg:block w-px self-stretch bg-white/[0.06] my-2" />

        <DateField label="Drop Off Date" value={dropoffDate} onChange={setDropoffDate} />

        {/* Search Button */}
        <div className="flex items-stretch lg:w-[160px] ml-1">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold text-sm transition-all duration-200 rounded-xl active:scale-95 group"
            style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", boxShadow: "0 4px 16px rgba(59,130,246,0.4)" }}
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
