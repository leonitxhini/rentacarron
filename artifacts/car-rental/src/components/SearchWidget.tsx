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
    <div className="glass-panel p-2 md:p-4 rounded-2xl w-full max-w-5xl mx-auto relative z-20">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
        
        <div className="flex-1 w-full flex items-center bg-secondary/50 rounded-xl px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-colors">
          <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Pick Up</label>
            <select 
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent text-white outline-none appearance-none cursor-pointer text-sm font-medium"
            >
              <option value="" className="bg-card">Select Location</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-card">{loc.name}, {loc.city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center bg-secondary/50 rounded-xl px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-colors">
          <MapPin className="w-5 h-5 text-white/40 mr-3 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Drop Off</label>
            <select 
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full bg-transparent text-white outline-none appearance-none cursor-pointer text-sm font-medium"
            >
              <option value="" className="bg-card">Same as Pick Up</option>
              {locations?.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-card">{loc.name}, {loc.city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center bg-secondary/50 rounded-xl px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-colors">
          <CalendarDays className="w-5 h-5 text-primary mr-3 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">Start Date</label>
            <input 
              type="date" 
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent text-white outline-none text-sm font-medium [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="flex-1 w-full flex items-center bg-secondary/50 rounded-xl px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-colors">
          <CalendarDays className="w-5 h-5 text-white/40 mr-3 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">End Date</label>
            <input 
              type="date" 
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent text-white outline-none text-sm font-medium [color-scheme:dark]"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full md:w-auto h-full min-h-[64px] px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(59,110,245,0.4)]"
        >
          <Search className="w-5 h-5" />
          <span className="md:hidden lg:inline">Find Car</span>
        </button>

      </form>
    </div>
  );
}
