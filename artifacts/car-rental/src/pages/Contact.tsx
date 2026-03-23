import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const info = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+383 48 188 415",
    sub: "Available 24/7",
    href: "tel:+38348188415",
    color: "blue",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@rronrentacar.com",
    sub: "We reply within minutes",
    href: "mailto:info@rronrentacar.com",
    color: "indigo",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Emin Duraku, Ferizaj 70000",
    sub: "Kosovo",
    href: "https://maps.google.com/?q=Ferizaj+Kosovo",
    color: "violet",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "24 / 7",
    sub: "Always available",
    href: null,
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600" },
  indigo:  { bg: "bg-indigo-50",  icon: "text-indigo-600" },
  violet:  { bg: "bg-violet-50",  icon: "text-violet-600" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
};

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all duration-200";

const labelCls = "block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fc" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 bg-white border-b border-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase text-violet-500 mb-5">
            <span className="w-5 h-px bg-violet-400" />
            Get In Touch
            <span className="w-5 h-px bg-violet-400" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.06] mb-5">
            We're Here<br />
            <span className="text-violet-600">For You</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Have a question or need a custom quote? Our team responds within minutes — day or night.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-6xl mx-auto px-6 py-16 pb-28 w-full">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: info + map */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {info.map(({ icon: Icon, label, value, sub, href, color }) => {
              const c = colorMap[color];
              const inner = (
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 ${c.icon}`} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
                    <p className="text-[14px] font-semibold text-gray-900 leading-snug">{value}</p>
                    <p className="text-[12px] text-gray-400">{sub}</p>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200 block"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5">
                  {inner}
                </div>
              );
            })}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 200 }}>
              <iframe
                title="RRON Rent A Car Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=21.1450%2C42.0470%2C21.1650%2C42.0640&layer=mapnik&marker=42.0557%2C21.1550"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">Thanks for reaching out. We'll get back to you within minutes.</p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Send a Message</h2>
                  <p className="text-[13px] text-gray-400 mb-7">We'll respond via WhatsApp or email — whichever you prefer.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Arben Krasniqi"
                          value={form.name}
                          onChange={e => set("name", e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Phone</label>
                        <input
                          type="tel"
                          placeholder="+383 4X XXX XXX"
                          value={form.phone}
                          onChange={e => set("phone", e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={e => set("subject", e.target.value)}
                        className={inputCls + " cursor-pointer"}
                      >
                        <option value="">Select a topic…</option>
                        <option value="booking">Booking Enquiry</option>
                        <option value="fleet">Vehicle Information</option>
                        <option value="corporate">Corporate / Long-Term</option>
                        <option value="airport">Airport Transfer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Message *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us what you need…"
                        value={form.message}
                        onChange={e => set("message", e.target.value)}
                        className={inputCls + " resize-none"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 mt-1 text-[14px]"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" strokeWidth={2} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-[12px] text-gray-400">Prefer instant chat?</span>
                    <a
                      href="https://wa.me/38348188415"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12.5px] font-semibold text-green-600 hover:text-green-700 transition-colors"
                    >
                      Open WhatsApp →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
