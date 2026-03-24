import { useState, useEffect } from "react";

const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const LOCATIONS = [
  { name: "Aeroport\nPrishtina", img: `${BASE}/location-pristina.jpg`, flag: "🇽🇰" },
  { name: "Aeroport\nShkup",     img: `${BASE}/location-skopje.jpg`,   flag: "🇲🇰" },
  { name: "Aeroport\nKukës",     img: `${BASE}/location-kukes.jpg`,     flag: "🇦🇱" },
  { name: "Ferizaj\nZyra Qendrore", img: `${BASE}/location-ferizaj.jpg`, flag: "🏢" },
];

export function AdInstaStory() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActive(a => (a + 1) % LOCATIONS.length);
          return 0;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const loc = LOCATIONS[active];

  return (
    <div style={{
      width: 380, height: 675,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: DARK,
      position: "relative", overflow: "hidden",
      borderRadius: 16,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Background location photo */}
      {LOCATIONS.map((l, i) => (
        <img key={i} src={l.img} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: active === i ? 0.35 : 0,
          transition: "opacity 0.8s ease",
          filter: "saturate(0.6)",
        }} />
      ))}

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,8,15,0.75) 0%, rgba(6,8,15,0.3) 40%, rgba(6,8,15,0.85) 100%)", pointerEvents: "none" }} />

      {/* Blue glow */}
      <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: `radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "24px 22px" }}>

        {/* Story progress bars */}
        <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
          {LOCATIONS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3, background: "#fff",
                width: i < active ? "100%" : i === active ? `${progress}%` : "0%",
                transition: i === active ? "none" : "width 0.3s",
              }} />
            </div>
          ))}
        </div>

        {/* Instagram-style top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "auto" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${BLUE}, #2563EB)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ width: 20, height: 20, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>rentacarron</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, marginTop: 2 }}>Pronuar · Tani</div>
          </div>
        </div>

        {/* Center: Location name */}
        <div style={{ textAlign: "center", margin: "auto 0" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{loc.flag}</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>MARRJE NGA</div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, whiteSpace: "pre-line", textAlign: "center" }}>
            {loc.name}
          </h2>
          <div style={{ marginTop: 16, color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 500 }}>Disponueshëm 24/7</div>
        </div>

        {/* Bottom CTA block */}
        <div>
          {/* Feature pills */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {["✈ 4 Aeroporte", "♾ Km Falas", "💬 WhatsApp"].map(t => (
              <div key={t} style={{
                padding: "6px 12px", borderRadius: 100,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600,
              }}>{t}</div>
            ))}
          </div>

          {/* Logo + price */}
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

          {/* Swipe up hint */}
          <div style={{ textAlign: "center", marginTop: 14, color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
            ↑ SHIKO MË SHUMË
          </div>
        </div>

      </div>
    </div>
  );
}
