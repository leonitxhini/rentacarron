import { useState, useEffect } from "react";

const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const CARS = [
  { name: "Audi A6",  mark: "A6",   sub: "2021 · Automatik · Diesel", price: 75, img: `${BASE}/audi-a6.png`,  tag: "PREMIUM"  },
  { name: "Audi A5",  mark: "A5",   sub: "2021 · Automatik · Benzin", price: 70, img: `${BASE}/audi-a5.png`,  tag: "SPORTIV"  },
  { name: "Audi A3",  mark: "A3",   sub: "2018 · Automatik · Benzin", price: 40, img: `${BASE}/audi-a3.png`,  tag: "KOMPAKT"  },
  { name: "Golf 8",   mark: "8",    sub: "2021 · Automatik · Benzin", price: 50, img: `${BASE}/golf8.png`,    tag: "POPULLOR" },
];

const SERVICE_BOXES = [
  { val: "4",    label: "Aeroporte" },
  { val: "∞",    label: "Km Falas"  },
  { val: "24/7", label: "Dispozicion" },
];

export function AdInstaStoryCars() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(a => (a + 1) % CARS.length);
    }, 3800);
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
        @keyframes textIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes markIn  { from { opacity:0; transform:scale(1.06); } to { opacity:1; transform:scale(1); } }
        @keyframes specIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes carSlide { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* Car images */}
      {CARS.map((c, i) => (
        <img key={i} src={c.img} alt={c.name} style={{
          position: "absolute",
          bottom: 158, right: -40,
          width: "108%", height: "auto",
          objectFit: "contain",
          opacity: active === i ? 1 : 0,
          transition: "opacity 0.65s ease",
          filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(59,130,246,0.15))",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 12%)",
          WebkitMaskComposite: "source-in",
          maskImage: "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 12%)",
          maskComposite: "intersect",
          pointerEvents: "none",
        }} />
      ))}

      {/* Left edge fade — lighter so car shows through */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(6,8,15,0.45) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Top + bottom dark — open up the middle so car pops */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,8,15,0.6) 0%, transparent 22%, transparent 55%, rgba(6,8,15,0.9) 72%, rgba(6,8,15,1) 100%)", pointerEvents: "none" }} />

      {/* Blue atmospheric glow — center */}
      <div style={{ position: "absolute", top: "28%", left: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, background: `radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Blue glow under car */}
      <div style={{ position: "absolute", bottom: 130, right: -10, width: 260, height: 140, background: `radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* BIG WATERMARK model name */}
      <div key={`mark-${active}`} style={{
        position: "absolute",
        top: "16%",
        left: "50%", transform: "translateX(-50%)",
        fontSize: 148, fontWeight: 900,
        letterSpacing: "-0.06em",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(59,130,246,0.14)",
        whiteSpace: "nowrap",
        userSelect: "none",
        pointerEvents: "none",
        animation: "markIn 0.6s ease forwards",
        lineHeight: 1,
      }}>{car.mark}</div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "28px 22px 24px" }}>

        {/* Top: logo + tag */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 34, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block" }} />
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 500, marginTop: 4, letterSpacing: "0.02em" }}>rentacarron.com</div>
          </div>
          <div key={`tag-${active}`} style={{
            padding: "5px 12px", borderRadius: 100,
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)",
            color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            animation: "textIn 0.4s ease forwards",
          }}>{car.tag}</div>
        </div>

        {/* Service info boxes */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto", marginBottom: 12 }}>
          {SERVICE_BOXES.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 0", borderRadius: 12,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
              textAlign: "center",
              animation: `specIn 0.4s ease ${0.05 + i * 0.07}s both`,
            }}>
              <div style={{ color: BLUE, fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: "rgba(255,255,255,0.33)", fontSize: 10, fontWeight: 600, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Car name + price */}
        <div>
          <div key={`sub-${active}`} style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500, marginBottom: 4, animation: "textIn 0.4s ease 0.05s both" }}>
            {car.sub}
          </div>
          <h2 key={`name-${active}`} style={{
            margin: 0, color: "#fff", fontSize: 44, fontWeight: 900,
            letterSpacing: "-0.04em", lineHeight: 1,
            animation: "textIn 0.4s ease 0.1s both",
          }}>{car.name}</h2>

          <div key={`price-${active}`} style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 4, animation: "textIn 0.4s ease 0.15s both" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>nga</span>
            <span style={{ color: "#fff", fontSize: 46, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1 }}>€{car.price}</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>/ditë</span>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 18, marginBottom: 14 }}>
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
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
          {["🌍 Mbarë Ballkani", "🔑 Marrje Falas", "💳 Pa Kaution"].map(t => (
            <div key={t} style={{
              padding: "6px 12px", borderRadius: 100,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.11)",
              color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600,
            }}>{t}</div>
          ))}
        </div>

        {/* CTA card */}
        <div style={{
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18, padding: "14px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 18, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block", marginBottom: 3 }} />
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>+383 48 188 415</div>
          </div>
          <div style={{
            padding: "10px 20px", borderRadius: 12,
            background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
            color: "#fff", fontSize: 13, fontWeight: 700,
            boxShadow: "0 4px 16px rgba(59,130,246,0.5)",
          }}>Rezervo →</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 12, color: "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
          ↑ SHIKO MË SHUMË
        </div>
      </div>
    </div>
  );
}
