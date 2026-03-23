import { useState } from "react";
import { useAdminAuth } from "@/hooks/use-auth";
import { 
  useGetAdminStats, 
  useListCars, 
  useListBookings,
  useUpdateBooking,
  useDeleteCar,
  BookingStatus
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { LogOut, LayoutDashboard, CarFront, CalendarDays, MapPin as MapPinIcon, Trash2, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Admin() {
  const { isAuthenticated, login, logout, isLoading } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card p-8 rounded-3xl border border-white/5 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-muted-foreground text-sm">Enter password to manage system</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!login(password)) alert("Incorrect password");
          }}>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password (admin123)"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-white/5 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-white">RRON Admin</span>
        </div>
        <nav className="flex-grow p-4 space-y-2 flex md:block overflow-x-auto md:overflow-visible">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'cars', icon: CarFront, label: 'Fleet' },
            { id: 'bookings', icon: CalendarDays, label: 'Bookings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors shrink-0 ${
                activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'cars' && <CarsTab />}
        {activeTab === 'bookings' && <BookingsTab />}
      </main>
    </div>
  );
}

function DashboardTab() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading || !stats) return <div className="text-white">Loading stats...</div>;

  const chartData = [
    { name: 'Pending', count: stats.pendingBookings },
    { name: 'Confirmed', count: stats.confirmedBookings },
    { name: 'Completed', count: stats.completedBookings },
    { name: 'Cancelled', count: stats.cancelledBookings },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
        <p className="text-muted-foreground">System metrics at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`€${stats.totalRevenue}`} />
        <StatCard title="Total Bookings" value={stats.totalBookings.toString()} />
        <StatCard title="Fleet Size" value={stats.totalCars.toString()} />
        <StatCard title="Available Cars" value={stats.availableCars.toString()} />
      </div>

      <div className="bg-card p-6 rounded-2xl border border-white/5 h-80">
        <h3 className="text-lg font-semibold text-white mb-6">Booking Status Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#8892B0" />
            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0A0C14', borderColor: '#1A1D2D'}} />
            <Bar dataKey="count" fill="#3B6EF5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-white/5">
      <h4 className="text-muted-foreground text-sm font-medium mb-2">{title}</h4>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function CarsTab() {
  const { data: cars, isLoading } = useListCars();
  const deleteCar = useDeleteCar();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this car?")) {
      await deleteCar.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: ["/api/cars"] });
      toast({ title: "Car deleted" });
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-xl font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Car
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5 text-xs uppercase text-muted-foreground font-bold">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price/Day</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {cars?.map(car => (
                <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={car.imageUrl || ""} alt="" className="w-12 h-8 object-cover rounded bg-white/10" />
                    <div>
                      <p className="font-semibold text-white">{car.make} {car.model}</p>
                      <p className="text-muted-foreground text-xs">{car.year}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/80">{car.category}</td>
                  <td className="px-6 py-4 text-white font-medium">€{car.pricePerDay}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${car.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {car.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(car.id)} className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  const { data: bookings, isLoading } = useListBookings();
  const updateBooking = useUpdateBooking();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Cast newStatus to the expected exact literal type required by API
      await updateBooking.mutateAsync({ 
        id, 
        data: { status: newStatus as any } 
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "Status updated" });
    } catch (e) {
      toast({ title: "Error updating", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Bookings</h2>
      </div>

      <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5 text-xs uppercase text-muted-foreground font-bold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {bookings?.map(booking => (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-white/50">#{booking.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{booking.customerName}</p>
                    <p className="text-muted-foreground text-xs">{booking.customerPhone}</p>
                  </td>
                  <td className="px-6 py-4 text-white/80">{booking.car?.make} {booking.car?.model}</td>
                  <td className="px-6 py-4 text-white/80">
                    <p>{format(parseISO(booking.pickupDate), 'MMM dd')} - {format(parseISO(booking.dropoffDate), 'MMM dd')}</p>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">€{booking.totalPrice}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`px-3 py-1 rounded-md text-xs font-medium bg-background border outline-none cursor-pointer ${
                        booking.status === 'confirmed' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                        booking.status === 'pending' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                        booking.status === 'cancelled' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                        'text-blue-400 border-blue-500/20 bg-blue-500/10'
                      }`}
                    >
                      <option value="pending" className="bg-card text-white">Pending</option>
                      <option value="confirmed" className="bg-card text-white">Confirmed</option>
                      <option value="completed" className="bg-card text-white">Completed</option>
                      <option value="cancelled" className="bg-card text-white">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
