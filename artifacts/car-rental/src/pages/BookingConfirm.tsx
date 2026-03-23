import { useParams, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useGetBooking } from "@workspace/api-client-react";
import { CheckCircle2, Calendar, MapPin, Car } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function BookingConfirm() {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading } = useGetBooking(Number(id));

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (!booking) return <div className="min-h-screen bg-background pt-32 text-center text-white">Booking not found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-3xl w-full px-4 sm:px-6">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Booking Requested!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you, {booking.customerName}. Your request has been sent to our team. We will contact you shortly to confirm the reservation.
            </p>

            <div className="bg-background rounded-2xl p-6 text-left border border-white/5 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-4">Booking Summary #RR{booking.id.toString().padStart(4, '0')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3 items-start">
                  <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Vehicle</p>
                    <p className="text-white font-medium">{booking.car?.make} {booking.car?.model}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Dates</p>
                    <p className="text-white font-medium">
                      {format(parseISO(booking.pickupDate), 'MMM dd, yyyy')} - {format(parseISO(booking.dropoffDate), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-xs text-white/50">{booking.totalDays} days</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start md:col-span-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Locations</p>
                    <p className="text-white text-sm"><span className="text-white/60">Pick up:</span> {booking.pickupLocation?.name}</p>
                    <p className="text-white text-sm"><span className="text-white/60">Drop off:</span> {booking.dropoffLocation?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-white/80">Estimated Total</span>
                <span className="text-2xl font-bold text-white">€{booking.totalPrice}</span>
              </div>
            </div>

            <Link href="/" className="inline-flex px-8 py-3 bg-white text-background font-bold rounded-xl hover:bg-white/90 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
