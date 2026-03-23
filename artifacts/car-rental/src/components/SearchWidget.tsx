import { useState } from "react";
import { useLocation } from "wouter";
import { useListLocations } from "@workspace/api-client-react";
import { MapPin, Flag, CalendarDays, Search, ChevronDown } from "lucide-react";

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
    <div className="bg-[#13151f] border border-white/10 rounded-2xl w-full max-w-5xl mx-auto shadow-2xl overflow-hidden">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch">

        {/* Pick Up Location */}
        <div className="flex-1 relative flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-white/10 group">
          <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Pick Up</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-medium text-white truncate"
            >
              <option value="" className="bg-[#13151f]">Select location...</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-[#13151f]">{loc.name}</option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 pointer-events-none" />
        </div>

        {/* Drop Off Location */}
        <div className="flex-1 relative flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-white/10 group">
          <Flag className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Drop Off</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-medium text-white truncate"
            >
              <option value="" className="bg-[#13151f]">Select location...</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-[#13151f]">{loc.name}</option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 pointer-events-none" />
        </div>

        {/* Pick Up Date */}
        <div className="flex-1 relative flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r border-white/10 group">
          <CalendarDays className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Pick Up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-medium text-white [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        {/* Drop Off Date */}
        <div className="flex-1 relative flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 border-white/10 group">
          <CalendarDays className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Drop Off Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-medium text-white [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-[#3b82f6] hover:bg-blue-500 text-white font-semibold text-sm transition-colors shrink-0 lg:rounded-none lg:rounded-r-2xl"
        >
          <Search className="w-4 h-4" />
          Search vehicles
        </button>
      </form>
    </div>
  );
}
