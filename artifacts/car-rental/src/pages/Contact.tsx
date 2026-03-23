import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const info = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+383 48 188 415",
    href: "tel:+38348188415",
    accent: "blue",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@rronrentacar.com",
    href: "mailto:info@rronrentacar.com",
    accent: "indigo",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Emin Duraku, Ferizaj 70000, Kosovo",
    href: "https://maps.google.com/?q=Emin+Duraku+Ferizaj+Kosovo",
    accent: "violet",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24 / 7 — Always Available",
    href: null,
    accent: "emerald",
  },
];

const accentMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue:    { bg: "bg-blue-500/10",    icon: "text-blue-400",    border: "border-blue-500/20" },
  indigo:  { bg: "bg-indigo-500/10",  icon: "text-indigo-400",  border: "border-indigo-500/20" },
  violet:  { bg: "bg-violet-500/10",  icon: "text-violet-400",  border: "border-violet-500/20" },
  emerald: { bg: "bg-emerald-500/10", icon: "text-emerald-400", border: "border-emerald-500/20" },
};

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-200";

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
    <div className="min-h-screen bg-[#0a0c14] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-violet-400 mb-6">
            <span className="w-6 h-px bg-violet-500" />
            Get In Touch
            <span className="w-6 h-px bg-violet-500" />
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            We're Here
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">
              For You
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Have a question or need a custom quote? Our team responds within minutes — day or night.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 pb-28 w-full">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: info cards + map */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {info.map(({ icon: Icon, label, value, href, accent }) => {
              const a = accentMap[accent];
              const inner = (
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 ${a.icon}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-0.5">{label}</p>
                    <p className="text-[14px] text-white font-medium leading-snug">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-[#141624] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] hover:bg-[#181b2a] transition-all duration-200 block"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="bg-[#141624] border border-white/[0.07] rounded-2xl p-5">
                  {inner}
                </div>
              );
            })}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.07] mt-1" style={{ height: 200 }}>
              <iframe
                title="RRON Rent A Car Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=21.1450%2C42.0470%2C21.1650%2C42.0640&layer=mapnik&marker=42.0557%2C21.1550"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(88%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: contact form */}
          <div className="lg:col-span-3">
            <div className="bg-[#141624] border border-white/[0.07] rounded-[24px] p-8 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-sm">Thanks for reaching out. We'll get back to you within minutes.</p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white mb-1">Send a Message</h2>
                  <p className="text-[13px] text-gray-500 mb-7">We'll respond via WhatsApp or email — whichever you prefer.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
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
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Phone</label>
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
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Email *</label>
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
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                      <select
                        value={form.subject}
                        onChange={e => set("subject", e.target.value)}
                        className={inputCls + " cursor-pointer"}
                      >
                        <option value="" className="bg-[#141624]">Select a topic…</option>
                        <option value="booking" className="bg-[#141624]">Booking Enquiry</option>
                        <option value="fleet" className="bg-[#141624]">Vehicle Information</option>
                        <option value="corporate" className="bg-[#141624]">Corporate / Long-Term</option>
                        <option value="airport" className="bg-[#141624]">Airport Transfer</option>
                        <option value="other" className="bg-[#141624]">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Message *</label>
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
                      className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.35)] mt-1"
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

                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-4">
                    <span className="text-[12px] text-gray-500">Prefer instant chat?</span>
                    <a
                      href="https://wa.me/38348188415"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-semibold text-green-400 hover:text-green-300 transition-colors"
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
