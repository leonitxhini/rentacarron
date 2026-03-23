import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useGetCar, useListLocations, useCreateBooking } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInDays, parseISO } from "date-fns";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(5, "Phone is required"),
  pickupLocationId: z.coerce.number().min(1, "Pickup location is required"),
  dropoffLocationId: z.coerce.number().min(1, "Dropoff location is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  dropoffDate: z.string().min(1, "Dropoff date is required"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Booking() {
  const { carId } = useParams<{ carId: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { data: car, isLoading: carLoading } = useGetCar(Number(carId));
  const { data: locations } = useListLocations();
  const createBookingMutation = useCreateBooking();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const pickupDate = watch("pickupDate");
  const dropoffDate = watch("dropoffDate");

  const totalDays = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 0;
    const days = differenceInDays(parseISO(dropoffDate), parseISO(pickupDate));
    return Math.max(1, days); // Minimum 1 day
  }, [pickupDate, dropoffDate]);

  const totalPrice = useMemo(() => {
    if (!car) return 0;
    return totalDays * car.pricePerDay;
  }, [car, totalDays]);

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const response = await createBookingMutation.mutateAsync({
        data: {
          ...data,
          carId: Number(carId),
        }
      });
      toast({
        title: "Booking Submitted",
        description: "Your request has been received successfully.",
      });
      setLocation(`/booking/confirm/${response.id}`);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (carLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (!car) return <div className="min-h-screen bg-background pt-32 text-center text-white">Car not found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-bold text-white mb-2">Complete Your Booking</h1>
              <p className="text-muted-foreground mb-8">Please fill in your details to request this vehicle.</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Details */}
                <div className="bg-card p-6 md:p-8 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
                    Personal Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                      <input 
                        {...register("customerName")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="John Doe"
                      />
                      {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                      <input 
                        {...register("customerPhone")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="+1 234 567 890"
                      />
                      {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                      <input 
                        type="email"
                        {...register("customerEmail")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="john@example.com"
                      />
                      {errors.customerEmail && <p className="text-red-400 text-xs mt-1">{errors.customerEmail.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div className="bg-card p-6 md:p-8 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                    Rental Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Pick Up Location</label>
                      <select 
                        {...register("pickupLocationId")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                      >
                        <option value="">Select Location</option>
                        {locations?.map(loc => <option key={loc.id} value={loc.id}>{loc.name}, {loc.city}</option>)}
                      </select>
                      {errors.pickupLocationId && <p className="text-red-400 text-xs mt-1">{errors.pickupLocationId.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Drop Off Location</label>
                      <select 
                        {...register("dropoffLocationId")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                      >
                        <option value="">Select Location</option>
                        {locations?.map(loc => <option key={loc.id} value={loc.id}>{loc.name}, {loc.city}</option>)}
                      </select>
                      {errors.dropoffLocationId && <p className="text-red-400 text-xs mt-1">{errors.dropoffLocationId.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Pick Up Date</label>
                      <input 
                        type="date"
                        {...register("pickupDate")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all [color-scheme:dark]" 
                      />
                      {errors.pickupDate && <p className="text-red-400 text-xs mt-1">{errors.pickupDate.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Drop Off Date</label>
                      <input 
                        type="date"
                        {...register("dropoffDate")}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all [color-scheme:dark]" 
                      />
                      {errors.dropoffDate && <p className="text-red-400 text-xs mt-1">{errors.dropoffDate.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/80 mb-2">Additional Notes (Optional)</label>
                      <textarea 
                        {...register("notes")}
                        rows={3}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="Flight number, special requests..."
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !car.available}
                  className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(59,110,245,0.3)]"
                >
                  {isSubmitting ? "Processing..." : car.available ? "Request Booking" : "Car Unavailable"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-card rounded-2xl border border-white/5 sticky top-28 overflow-hidden">
                <div className="aspect-video bg-secondary/50 p-4 relative">
                  <img src={car.imageUrl || "https://images.unsplash.com/photo-1503376713203-b0970081e8c9?w=800&q=80"} alt={car.make} className="w-full h-full object-contain drop-shadow-xl" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-1 uppercase tracking-wide">{car.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-6">{car.make} {car.model}</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="text-white font-medium">€{car.pricePerDay} / day</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-white font-medium">{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className="h-px bg-white/10 w-full my-2"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-white/80 font-medium">Total Price</span>
                      <span className="text-3xl font-bold text-white">€{totalPrice}</span>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-4 flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p>Free cancellation up to 48 hours before pickup.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
