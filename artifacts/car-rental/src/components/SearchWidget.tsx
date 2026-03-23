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
    <div className="bg-[#0a0c14]/80 backdrop-blur-xl border border-white/10 rounded-xl w-full max-w-5xl mx-auto shadow-2xl p-2">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-2">

        {/* Pick Up Location */}
        <div className="flex-1 relative flex items-center gap-4 px-6 py-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
          <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-medium text-gray-400 tracking-widest mb-1">Pick Up</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-light text-white truncate"
            >
              <option value="" className="bg-[#13151f]">Select location...</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-[#13151f]">{loc.name}</option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 pointer-events-none group-hover:text-white transition-colors" />
        </div>

        {/* Drop Off Location */}
        <div className="flex-1 relative flex items-center gap-4 px-6 py-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
          <Flag className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-medium text-gray-400 tracking-widest mb-1">Drop Off</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-light text-white truncate"
            >
              <option value="" className="bg-[#13151f]">Select location...</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-[#13151f]">{loc.name}</option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 pointer-events-none group-hover:text-white transition-colors" />
        </div>

        {/* Pick Up Date */}
        <div className="flex-1 relative flex items-center gap-4 px-6 py-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
          <CalendarDays className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-medium text-gray-400 tracking-widest mb-1">Pick Up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-light text-white [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        {/* Drop Off Date */}
        <div className="flex-1 relative flex items-center gap-4 px-6 py-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
          <CalendarDays className="w-4 h-4 text-blue-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-medium text-gray-400 tracking-widest mb-1">Drop Off Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-light text-white [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-stretch lg:w-[180px]">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors rounded-lg group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}