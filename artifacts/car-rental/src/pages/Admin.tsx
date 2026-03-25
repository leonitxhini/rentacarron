import { useState, useRef } from "react";
import { useAdminAuth } from "@/hooks/use-auth";
import {
  useGetAdminStats,
  useListCars,
  useListBookings,
  useUpdateBooking,
  useDeleteCar,
  useCreateCar,
  useUpdateCar,
} from "@workspace/api-client-react";
import type { Car, CreateCarInput } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import {
  LogOut, LayoutDashboard, CarFront, CalendarDays,
  Trash2, Edit, Plus, Upload, X, CheckCircle, XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── helpers ────────────────────────────────────────────────────────────────

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ?? "";

async function uploadCarImage(file: File): Promise<string> {
  const token = sessionStorage.getItem("admin_token") ?? "";
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_BASE}/api/upload/car-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}

const CATEGORIES = ["economy", "compact", "premium", "luxury"];
const TRANSMISSIONS = ["automatic", "manual"];
const FUEL_TYPES = ["diesel", "petrol", "electric", "hybrid"];

const EMPTY_FORM: CreateCarInput = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  category: "economy",
  transmission: "automatic",
  fuelType: "diesel",
  seats: 5,
  bags: 3,
  pricePerDay: 40,
  available: true,
  imageUrl: "",
  description: "",
  features: [],
};

// ─── Root ────────────────────────────────────────────────────────────────────

export default function Admin() {
  const { isAuthenticated, login, logout, isLoading } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0c14] flex items-center justify-center p-4">
        <div className="bg-[#13152a] p-8 rounded-3xl border border-white/5 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-5">
              <CarFront className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">RRON Admin</h2>
            <p className="text-white/40 text-sm mt-1">Enter your password to continue</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!login(password)) alert("Incorrect password"); }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:border-blue-500 outline-none transition-colors"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-[#13152a] border-r border-white/5 md:min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <CarFront className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">RRON Admin</span>
        </div>
        <nav className="flex-grow p-3 space-y-1 flex md:block overflow-x-auto md:overflow-visible">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "cars", icon: CarFront, label: "Fleet" },
            { id: "bookings", icon: CalendarDays, label: "Bookings" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors shrink-0 text-sm ${
                activeTab === tab.id
                  ? "bg-blue-600/15 text-blue-400 font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "cars" && <CarsTab />}
        {activeTab === "bookings" && <BookingsTab />}
      </main>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function DashboardTab() {
  const { data: stats, isLoading } = useGetAdminStats();
  if (isLoading || !stats) return <Spinner />;

  const chartData = [
    { name: "Pending", count: stats.pendingBookings },
    { name: "Confirmed", count: stats.confirmedBookings },
    { name: "Completed", count: stats.completedBookings },
    { name: "Cancelled", count: stats.cancelledBookings },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
        <p className="text-white/40 text-sm">System overview</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: `€${stats.totalRevenue}` },
          { label: "Total Bookings", value: stats.totalBookings },
          { label: "Fleet Size", value: stats.totalCars },
          { label: "Available Cars", value: stats.availableCars },
        ].map(s => (
          <div key={s.label} className="bg-[#13152a] rounded-2xl border border-white/5 p-5">
            <p className="text-white/40 text-xs font-medium mb-2">{s.label}</p>
            <p className="text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#13152a] p-6 rounded-2xl border border-white/5" style={{ height: 280 }}>
        <h3 className="text-sm font-semibold text-white/70 mb-5">Booking Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#ffffff30" tick={{ fill: "#ffffff60", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{ backgroundColor: "#0a0c14", borderColor: "#1a1d2d", borderRadius: 8 }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="count" fill="#3B6EF5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Fleet ───────────────────────────────────────────────────────────────────

function CarsTab() {
  const { data: cars, isLoading } = useListCars();
  const deleteCar = useDeleteCar();
  const updateCar = useUpdateCar();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["/api/cars"] });

  const handleDelete = async (car: Car) => {
    if (!confirm(`Delete ${car.make} ${car.model}? This cannot be undone.`)) return;
    try {
      await deleteCar.mutateAsync({ id: car.id });
      invalidate();
      toast({ title: "Car deleted" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleToggleAvail = async (car: Car) => {
    try {
      await updateCar.mutateAsync({
        id: car.id,
        data: {
          make: car.make,
          model: car.model,
          year: car.year,
          color: car.color,
          category: car.category,
          transmission: car.transmission as CreateCarInput["transmission"],
          fuelType: car.fuelType as CreateCarInput["fuelType"],
          seats: car.seats,
          bags: car.bags,
          pricePerDay: car.pricePerDay,
          available: !car.available,
          imageUrl: car.imageUrl,
          description: car.description,
          features: car.features ?? [],
        },
      });
      invalidate();
      toast({ title: car.available ? "Marked unavailable" : "Marked available" });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (car: Car) => { setEditing(car); setModalOpen(true); };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
          <p className="text-white/40 text-sm mt-0.5">{cars?.length ?? 0} vehicles</p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 text-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Car
        </button>
      </div>

      <div className="bg-[#13152a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/30 font-semibold">
              <tr>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4 hidden md:table-cell">Category</th>
                <th className="px-5 py-4">Price/Day</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cars?.map(car => (
                <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Vehicle */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-11 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        {car.imageUrl ? (
                          <img
                            src={car.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <CarFront className="w-5 h-5 text-white/20" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{car.make} {car.model}</p>
                        <p className="text-white/30 text-xs">{car.year} · {car.color}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs capitalize">{car.category}</span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 text-white font-semibold text-sm">€{car.pricePerDay}</td>

                  {/* Status toggle */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggleAvail(car)}
                      title="Click to toggle"
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        car.available
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      {car.available ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {car.available ? "Available" : "Unavailable"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(car)}
                        className="p-1.5 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(car)}
                        className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cars?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-white/30 text-sm">No cars in fleet yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CarFormModal
          car={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); invalidate(); }}
        />
      )}
    </div>
  );
}

// ─── Car Form Modal ───────────────────────────────────────────────────────────

function CarFormModal({ car, onClose, onSaved }: { car: Car | null; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!car;
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const { toast } = useToast();

  const [form, setForm] = useState<CreateCarInput>(() =>
    car
      ? {
          make: car.make,
          model: car.model,
          year: car.year,
          color: car.color,
          category: car.category,
          transmission: car.transmission as CreateCarInput["transmission"],
          fuelType: car.fuelType as CreateCarInput["fuelType"],
          seats: car.seats,
          bags: car.bags,
          pricePerDay: car.pricePerDay,
          available: car.available,
          imageUrl: car.imageUrl ?? "",
          description: car.description ?? "",
          features: car.features ?? [],
        }
      : EMPTY_FORM
  );

  const [imagePreview, setImagePreview] = useState<string>(
    car?.imageUrl ?? ""
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof CreateCarInput, v: unknown) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCarImage(file);
      set("imageUrl", url);
      setImagePreview(`${import.meta.env.BASE_URL}${url}`);
      toast({ title: "Image uploaded" });
    } catch {
      toast({ title: "Image upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: CreateCarInput = {
        ...form,
        year: Number(form.year),
        seats: Number(form.seats),
        bags: Number(form.bags),
        pricePerDay: Number(form.pricePerDay),
        imageUrl: form.imageUrl || null,
        description: form.description || null,
        features: form.features ?? [],
      };
      if (isEdit && car) {
        await updateCar.mutateAsync({ id: car.id, data: payload });
        toast({ title: "Car updated" });
      } else {
        await createCar.mutateAsync({ data: payload });
        toast({ title: "Car added to fleet" });
      }
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ title: "Save failed", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-[#13152a] rounded-2xl border border-white/8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 sticky top-0 bg-[#13152a] z-10">
          <h3 className="text-lg font-bold text-white">{isEdit ? "Edit Car" : "Add New Car"}</h3>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Car Photo</label>
            <div className="flex gap-4 items-start">
              {/* Preview */}
              <div
                className="w-36 h-24 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer hover:border-blue-500/40 transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/20">
                    <Upload className="w-6 h-6" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? "Uploading…" : "Choose Image"}
                </button>
                <p className="text-white/25 text-xs mt-2">Or paste a URL below</p>
                <input
                  type="text"
                  value={form.imageUrl ?? ""}
                  onChange={e => { set("imageUrl", e.target.value); setImagePreview(e.target.value); }}
                  placeholder="https://... or leave blank"
                  className="mt-2 w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-white/80 text-sm outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Make / Model */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Make" required>
              <input value={form.make} onChange={e => set("make", e.target.value)} required className={inputCls} placeholder="Audi" />
            </Field>
            <Field label="Model" required>
              <input value={form.model} onChange={e => set("model", e.target.value)} required className={inputCls} placeholder="A6" />
            </Field>
          </div>

          {/* Year / Color / Category */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Year" required>
              <input type="number" value={form.year} onChange={e => set("year", e.target.value)} required min={1990} max={2030} className={inputCls} />
            </Field>
            <Field label="Color" required>
              <input value={form.color} onChange={e => set("color", e.target.value)} required className={inputCls} placeholder="White" />
            </Field>
            <Field label="Category" required>
              <select value={form.category} onChange={e => set("category", e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0a0c14]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </Field>
          </div>

          {/* Transmission / Fuel / Seats / Bags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Transmission" required>
              <select value={form.transmission} onChange={e => set("transmission", e.target.value as CreateCarInput["transmission"])} className={inputCls}>
                {TRANSMISSIONS.map(t => <option key={t} value={t} className="bg-[#0a0c14]">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Fuel Type" required>
              <select value={form.fuelType} onChange={e => set("fuelType", e.target.value as CreateCarInput["fuelType"])} className={inputCls}>
                {FUEL_TYPES.map(f => <option key={f} value={f} className="bg-[#0a0c14]">{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Seats" required>
              <input type="number" value={form.seats} onChange={e => set("seats", e.target.value)} min={1} max={9} className={inputCls} />
            </Field>
            <Field label="Bags" required>
              <input type="number" value={form.bags} onChange={e => set("bags", e.target.value)} min={0} max={10} className={inputCls} />
            </Field>
          </div>

          {/* Price */}
          <Field label="Price per Day (€)" required>
            <input type="number" value={form.pricePerDay} onChange={e => set("pricePerDay", e.target.value)} min={1} step="0.01" required className={inputCls} />
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea
              value={form.description ?? ""}
              onChange={e => set("description", e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="Short description of this vehicle…"
            />
          </Field>

          {/* Available */}
          <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-semibold text-white">Available for Booking</p>
              <p className="text-white/30 text-xs mt-0.5">Customers can see and book this car</p>
            </div>
            <button
              type="button"
              onClick={() => set("available", !form.available)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.available ? "bg-blue-600" : "bg-white/10"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.available ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

function BookingsTab() {
  const { data: bookings, isLoading } = useListBookings();
  const updateBooking = useUpdateBooking();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateBooking.mutateAsync({ id, data: { status: newStatus as any } });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: "Status updated" });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Bookings</h2>
        <p className="text-white/40 text-sm mt-0.5">{bookings?.length ?? 0} total</p>
      </div>

      <div className="bg-[#13152a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/30 font-semibold">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4 hidden md:table-cell">Vehicle</th>
                <th className="px-5 py-4 hidden lg:table-cell">Dates</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {bookings?.map(b => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-white/30 text-xs">#{b.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{b.customerName}</p>
                    <p className="text-white/30 text-xs">{b.customerPhone}</p>
                  </td>
                  <td className="px-5 py-4 text-white/60 hidden md:table-cell">{b.car?.make} {b.car?.model}</td>
                  <td className="px-5 py-4 text-white/50 text-xs hidden lg:table-cell">
                    {format(parseISO(b.pickupDate), "MMM dd")} – {format(parseISO(b.dropoffDate), "MMM dd")}
                  </td>
                  <td className="px-5 py-4 text-white font-semibold">€{b.totalPrice}</td>
                  <td className="px-5 py-4">
                    <select
                      value={b.status}
                      onChange={e => handleStatusChange(b.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium bg-transparent border outline-none cursor-pointer transition-colors ${
                        b.status === "confirmed" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" :
                        b.status === "pending"   ? "text-amber-400 border-amber-500/20 bg-amber-500/10" :
                        b.status === "cancelled" ? "text-red-400 border-red-500/20 bg-red-500/10" :
                                                   "text-blue-400 border-blue-500/20 bg-blue-500/10"
                      }`}
                    >
                      {["pending", "confirmed", "completed", "cancelled"].map(s => (
                        <option key={s} value={s} className="bg-[#0a0c14] text-white">
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-white/30 text-sm">No bookings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500/50 transition-colors appearance-none";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
