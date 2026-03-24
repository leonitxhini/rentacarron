import { useState, useEffect } from "react";

const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const CARS = [
  { name: "Audi A6",  sub: "2021 · Automatik · Diesel", price: 75, img: `${BASE}/audi-a6.png`,  tag: "PREMIUM" },
  { name: "Audi A5",  sub: "2021 · Automatik · Benzin", price: 70, img: `${BASE}/audi-a5.png`,  tag: "SPORTIV" },
  { name: "Audi A3",  sub: "2018 · Automatik · Benzin", price: 40, img: `${BASE}/audi-a3.png`,  tag: "KOMPAKT" },
  { name: "Golf 8",   sub: "2021 · Automatik · Benzin", price: 50, img: `${BASE}/golf8.png`,    tag: "POPULLOR" },
];

export function AdInstaStoryCars() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActive(a => (a + 1) % CARS.length);
          return 0;
        }
        return p + 1.6;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const car = CARS[active];

  return (
    <div style={{
      width: 380, height: 675,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: DARK,
      position: "relative", overflow: "hidden",
      borderRadius: 16,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @keyframes carIn { from { opacity:0; transform:translateX(30px) scale(0.97); } to { opacity:1; transform:translateX(0) scale(1); } }
        @keyframes textIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Car image — full bleed hero */}
      {CARS.map((c, i) => (
        <img key={i} src={c.img} alt={c.name} style={{
          position: "absolute",
          bottom: 120, right: -30,
          width: "90%", height: "auto",
          objectFit: "contain",
          opacity: active === i ? 1 : 0,
          transition: "opacity 0.7s ease",
          filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.9))",
          pointerEvents: "none",
        }} />
      ))}

      {/* Dark left fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,8,15,0.6) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* Dark top fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,8,15,0.55) 0%, transparent 35%, rgba(6,8,15,0.92) 75%, rgba(6,8,15,1) 100%)", pointerEvents: "none" }} />

      {/* Blue glow behind car */}
      <div style={{ position: "absolute", bottom: 60, right: -20, width: 280, height: 180, background: `radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "28px 22px 24px" }}>

        {/* Top: logo + tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 22, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <div key={active} style={{
            padding: "5px 12px", borderRadius: 100,
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)",
            color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            animation: "textIn 0.4s ease forwards",
          }}>{car.tag}</div>
        </div>

        {/* Middle: car name + price */}
        <div style={{ marginTop: "auto", marginBottom: 0 }}>
          <div key={`sub-${active}`} style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, fontWeight: 500, marginBottom: 6, animation: "textIn 0.4s ease 0.05s both" }}>
            {car.sub}
          </div>
          <h2 key={`name-${active}`} style={{
            margin: "0 0 0", color: "#fff", fontSize: 44, fontWeight: 900,
            letterSpacing: "-0.04em", lineHeight: 1,
            animation: "textIn 0.4s ease 0.1s both",
          }}>{car.name}</h2>

          <div key={`price-${active}`} style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 4, animation: "textIn 0.4s ease 0.15s both" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>nga</span>
            <span style={{ color: "#fff", fontSize: 46, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1 }}>€{car.price}</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>/ditë</span>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 22, marginBottom: 18 }}>
          {CARS.map((_, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 3,
              background: i === active ? "#fff" : "rgba(255,255,255,0.2)",
              width: i === active ? 24 : 8,
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
          {["✈ Airport", "♾ Km Falas", "💬 WhatsApp"].map(t => (
            <div key={t} style={{
              padding: "6px 12px", borderRadius: 100,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600,
            }}>{t}</div>
          ))}
        </div>

        {/* CTA card */}
        <div style={{
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18, padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 20, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block", marginBottom: 4 }} />
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>+383 48 188 415</div>
          </div>
          <div style={{
            padding: "10px 20px", borderRadius: 12,
            background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
            color: "#fff", fontSize: 13, fontWeight: 700,
            boxShadow: "0 4px 16px rgba(59,130,246,0.5)",
          }}>Rezervo →</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 14, color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
          ↑ SHIKO MË SHUMË
        </div>
      </div>
    </div>
  );
}
