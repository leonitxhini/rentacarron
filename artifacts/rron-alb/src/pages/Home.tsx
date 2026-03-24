import { useState, useEffect } from "react";

const BASE = import.meta.env.BASE_URL;
const WHATSAPP = "https://wa.me/38348188415";

const FEATURED_CARS = [
  { name: "Audi A6", year: 2021, price: 75, transmission: "Automatik", fuel: "Diesel", seats: 5, img: `${BASE}audi-a6-2021-white.png`, tag: "Premium" },
  { name: "Audi A5", year: 2021, price: 70, transmission: "Automatik", fuel: "Diesel", seats: 5, img: `${BASE}audi-a5-2021-dark-blue.png`, tag: "Sportiv" },
  { name: "Audi A3", year: 2018, price: 40, transmission: "Automatik", fuel: "Benzinë", seats: 5, img: `${BASE}audi-a3-2018-light-grey.png`, tag: "Kompakt" },
  { name: "Citroën C4", year: 2015, price: 25, transmission: "Manual", fuel: "Diesel", seats: 5, img: `${BASE}citroen-c4-2015-grey.png`, tag: "Ekonomik" },
];

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
      </svg>
    ),
    title: "Marrje nga Aeroporti",
    desc: "Të marrim nga aeroporti i Prishtinës, Shkupit dhe Kukësit pa kosto shtesë.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/>
      </svg>
    ),
    title: "Kilometra pa Limit",
    desc: "Udhëtoni lirshëm pa u shqetësuar për kilometra shtesë. Çmimi fikse, pa surpriza.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Rezervim nëpërmjet WhatsApp",
    desc: "Rezervo lehtësisht nëpërmjet WhatsApp. Konfirmim i menjëhershëm, pa pritje.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Sigurim i Plotë",
    desc: "Të gjitha veturët tona janë të siguruara plotësisht. Udhëtoni me siguri dhe qetësi.",
  },
];

const LOCATIONS = [
  { name: "Ferizaj", label: "Zyra Kryesore · Kosovë 70000", img: `${BASE}location-ferizaj.jpg` },
  { name: "Aeroport Prishtina", label: "Prishtina Intl. · Kosovë", img: `${BASE}location-pristina.jpg` },
  { name: "Aeroport Shkup", label: "Shkup Intl. · Maqedoni e Veriut", img: `${BASE}location-skopje.jpg` },
  { name: "Aeroport Kukës", label: "Aeroporti i Kukësit · Shqipëri", img: `${BASE}location-kukes.jpg` },
];

const BLUE = "#3B82F6";
const DARK = "#0a0c14";

function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,12,20,0.97)" : DARK,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition: "all 0.25s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src={`${BASE}rron-logo.png`} alt="RRON" style={{ height: 32, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
        </a>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[["Flota", "#fleet"], ["Shërbimet", "#services"], ["Vendndodhjet", "#locations"]].map(([label, href]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            >{label}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href={WHATSAPP} target="_blank" rel="noopener" style={{
          padding: "9px 20px", borderRadius: 100,
          background: BLUE, color: "#fff",
          fontSize: 14, fontWeight: 600, textDecoration: "none",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >Rezervo Tani →</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      background: DARK,
      position: "relative",
      overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      {/* Background hero image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${BASE}hero-bg.png)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.18,
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${DARK} 0%, rgba(10,12,20,0.7) 60%, rgba(59,130,246,0.08) 100%)`,
      }} />
      {/* Blue bottom glow */}
      <div style={{
        position: "absolute", bottom: -120, left: "50%", transform: "translateX(-50%)",
        width: 700, height: 300,
        background: `radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 28,
            animation: "fadeUp 0.5s 0.1s ease both",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, display: "inline-block" }} />
            <span style={{ color: BLUE, fontSize: 13, fontWeight: 600 }}>RRON Rent A Car · Ferizaj, Kosovë</span>
          </div>

          {/* Headline */}
          <h1 style={{
            color: "#fff", fontSize: "clamp(44px, 7vw, 84px)",
            fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em",
            margin: "0 0 20px",
            animation: "fadeUp 0.6s 0.2s ease both",
          }}>
            Rezervo<br />
            <span style={{ color: BLUE }}>Online.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: 18, lineHeight: 1.65,
            margin: "0 0 40px", maxWidth: 500,
            animation: "fadeUp 0.6s 0.3s ease both",
          }}>
            Vetura premium me qira në Kosovë. Marrje nga aeroporti, kilometra pa limit, rezervim i lehtë nëpërmjet WhatsApp.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 0.6s 0.4s ease both" }}>
            <a href={WHATSAPP} target="_blank" rel="noopener" style={{
              padding: "15px 32px", borderRadius: 14,
              background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
              color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
            <a href="#fleet" style={{
              padding: "15px 32px", borderRadius: 14,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
            }}>
              Shiko Flotën
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { num: "14+", label: "Vetura Premium" },
    { num: "4", label: "Aeroporte" },
    { num: "∞", label: "Km pa Limit" },
    { num: "24/7", label: "Në Dispozicion" },
  ];
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "36px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
            }}>
              <div style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 900, color: DARK, letterSpacing: "-0.03em" }}>{s.num}</div>
              <div style={{ fontSize: 14, color: "#888", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section id="fleet" style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: BLUE, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
            FLOTA JONË
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: DARK, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05 }}>
              Veturët e Disponueshme
            </h2>
            <a href={WHATSAPP} target="_blank" rel="noopener" style={{
              padding: "10px 22px", borderRadius: 10,
              border: `1.5px solid ${BLUE}`, color: BLUE,
              fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
              flexShrink: 0,
            }}>Të gjitha →</a>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {FEATURED_CARS.map((car, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1.5px solid #F0F0F3",
              borderRadius: 20,
              overflow: "hidden",
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {/* Car photo */}
              <div style={{ background: "#F8F9FB", padding: "28px 24px", position: "relative" }}>
                <span style={{
                  position: "absolute", top: 14, left: 14,
                  background: car.tag === "Premium" ? BLUE : car.tag === "Sportiv" ? "#0F172A" : "#F5F5F7",
                  color: (car.tag === "Premium" || car.tag === "Sportiv") ? "#fff" : "#555",
                  fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 9px",
                  letterSpacing: "0.05em",
                }}>{car.tag}</span>
                <img src={car.img} alt={car.name} style={{ width: "100%", height: 160, objectFit: "contain" }} />
              </div>
              {/* Info */}
              <div style={{ padding: "20px 22px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>{car.name}</div>
                    <div style={{ fontSize: 13, color: "#999", fontWeight: 500 }}>{car.year}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: "-0.03em" }}>€{car.price}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>/ ditë</div>
                  </div>
                </div>
                {/* Specs */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  {[car.transmission, car.fuel, `${car.seats} ulëse`].map(spec => (
                    <span key={spec} style={{
                      fontSize: 12, fontWeight: 500, color: "#666",
                      background: "#F5F5F7", borderRadius: 6, padding: "4px 10px",
                    }}>{spec}</span>
                  ))}
                </div>
                <a href={WHATSAPP} target="_blank" rel="noopener" style={{
                  display: "block", textAlign: "center",
                  padding: "11px 0", borderRadius: 10,
                  background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
                  color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none",
                }}>Rezervo Tani</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: "#F8F9FB", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <div style={{ color: BLUE, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
            SHËRBIMET TONA
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: DARK, letterSpacing: "-0.03em", margin: 0 }}>
            Pse të zgjidhni RRON?
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 20,
              border: "1.5px solid #EBEBEF",
              padding: "32px 28px",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "rgba(59,130,246,0.08)",
                color: BLUE,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: BLUE, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
            KU TË NA GJENI
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: DARK, letterSpacing: "-0.03em", margin: 0 }}>
            Vendndodhjet Tona
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} style={{
              borderRadius: 20, overflow: "hidden",
              border: "1.5px solid #EBEBEF",
              transition: "box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
            >
              <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                <img src={loc.img} alt={loc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
                }} />
                <div style={{
                  position: "absolute", bottom: 16, left: 16,
                  color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}>{loc.name}</div>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{loc.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section style={{ background: DARK, padding: "96px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ color: BLUE, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
          REZERVO TANI
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.05 }}>
          Gati për udhëtimin<br />tënd tjetër?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, lineHeight: 1.65, margin: "0 0 40px" }}>
          Na kontaktoni nëpërmjet WhatsApp për rezervim të menjëhershëm. Çmimet fillon nga <strong style={{ color: "#fff" }}>€25 / ditë.</strong>
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WHATSAPP} target="_blank" rel="noopener" style={{
            padding: "16px 36px", borderRadius: 14,
            background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
            color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            💬 +383 48 188 415
          </a>
          <a href="tel:+38348188415" style={{
            padding: "16px 32px", borderRadius: 14,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>📞 Telefono</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#05070e", padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <img src={`${BASE}rron-logo.png`} alt="RRON" style={{ height: 28, filter: "brightness(0) invert(1)", objectFit: "contain", marginBottom: 14 }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 260 }}>
              Shërbim premium marrje me qira veturash në Kosovë. E disponueshme 24/7.
            </p>
          </div>
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Lidhje</div>
              {[["Flota", "#fleet"], ["Shërbimet", "#services"], ["Vendndodhjet", "#locations"]].map(([label, href]) => (
                <div key={href} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}>{label}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Kontakti</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 10 }}>+383 48 188 415</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 10 }}>Ferizaj, Kosovë 70000</div>
              <a href="https://www.instagram.com/rentacarron/" target="_blank" rel="noopener" style={{ color: BLUE, fontSize: 14, textDecoration: "none" }}>Instagram →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>© 2025 RRON Rent A Car. Të gjitha të drejtat e rezervuara.</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>Ferizaj · Prishtinë · Shkup · Kukës</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <Stats />
      <Fleet />
      <Services />
      <Locations />
      <CTABanner />
      <Footer />
    </div>
  );
}
