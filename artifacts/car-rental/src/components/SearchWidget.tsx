import { useState } from "react";
import { useLocation } from "wouter";
import { useListLocations } from "@workspace/api-client-react";
import { MapPin, CalendarDays, Search } from "lucide-react";

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
    <div className="bg-[#11131c] p-2 md:p-3 rounded-2xl w-full max-w-6xl mx-auto shadow-2xl relative z-20">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2">
        
        <div className="flex-1 w-full flex items-center bg-[#1c1f2e] rounded-xl px-4 py-3">
          <div className="flex-1 min-w-0">
            <label className="block text-xs uppercase font-semibold text-gray-400 mb-1">Pick Up Location</label>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4 text-primary" />
              <select 
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-medium"
              >
                <option value="" className="bg-[#1c1f2e]">Choose your location</option>
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id} className="bg-[#1c1f2e]">{loc.name}, {loc.city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-white/10 mx-1"></div>

        <div className="flex-1 w-full flex items-center bg-[#1c1f2e] rounded-xl px-4 py-3">
          <div className="flex-1 min-w-0">
            <label className="block text-xs uppercase font-semibold text-gray-400 mb-1">Drop Off Location</label>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4 text-primary" />
              <select 
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full bg-transparent outline-none appearance-none cursor-pointer text-sm font-medium"
              >
                <option value="" className="bg-[#1c1f2e]">Same as pick up</option>
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id} className="bg-[#1c1f2e]">{loc.name}, {loc.city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-white/10 mx-1"></div>

        <div className="flex-1 w-full flex items-center bg-[#1c1f2e] rounded-xl px-4 py-3">
          <div className="flex-1 min-w-0">
            <label className="block text-xs uppercase font-semibold text-gray-400 mb-1">Pick Up Date</label>
            <div className="flex items-center gap-2 text-white">
              <CalendarDays className="w-4 h-4 text-primary" />
              <input 
                type="date" 
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-medium [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-white/10 mx-1"></div>

        <div className="flex-1 w-full flex items-center bg-[#1c1f2e] rounded-xl px-4 py-3">
          <div className="flex-1 min-w-0">
            <label className="block text-xs uppercase font-semibold text-gray-400 mb-1">Drop Off Date</label>
            <div className="flex items-center gap-2 text-white">
              <CalendarDays className="w-4 h-4 text-primary" />
              <input 
                type="date" 
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-medium [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full lg:w-auto h-[68px] px-8 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center transition-colors shrink-0"
        >
          Search vehicles
        </button>

      </form>
    </div>
  );
}
