import { useState, useEffect } from "react";

const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const LOCATIONS = [
  { name: "Aeroport\nPrishtina", img: `${BASE}/location-pristina.jpg`, flag: "🇽🇰" },
  { name: "Aeroport\nShkup",     img: `${BASE}/location-skopje.jpg`,   flag: "🇲🇰" },
  { name: "Aeroport\nKukës",     img: `${BASE}/location-kukes.jpg`,    flag: "🇦🇱" },
  { name: "Ferizaj\nZyra Qendrore", img: `${BASE}/location-ferizaj.jpg`, flag: "🏢" },
];

function IosStatusBar() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px 0", position: "relative", zIndex: 10 }}>
      {/* Time */}
      <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>{time}</span>

      {/* Right side: signal + wifi + battery */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Cellular signal — 4 bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0"  y="8"  width="3" height="4"  rx="0.8" fill="white"/>
          <rect x="4"  y="5"  width="3" height="7"  rx="0.8" fill="white"/>
          <rect x="8"  y="2.5" width="3" height="9.5" rx="0.8" fill="white"/>
          <rect x="12" y="0"  width="3" height="12" rx="0.8" fill="white"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" fill="white"/>
          <path d="M4.5 7.5C5.5 6.4 6.7 5.7 8 5.7s2.5.7 3.5 1.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1.5 4.5C3.2 2.7 5.5 1.5 8 1.5s4.8 1.2 6.5 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
          <div style={{ width: 25, height: 12, border: "1.5px solid rgba(255,255,255,0.8)", borderRadius: 3.5, padding: 1.5, display: "flex", alignItems: "center" }}>
            <div style={{ width: "82%", height: "100%", background: "#fff", borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 2, height: 5, background: "rgba(255,255,255,0.6)", borderRadius: "0 1px 1px 0" }} />
        </div>
      </div>
    </div>
  );
}

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

      {/* Background location photos */}
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

      {/* Blue glow bottom */}
      <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: `radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

      {/* iOS Status Bar */}
      <IosStatusBar />

      {/* Content below status bar */}
      <div style={{ position: "relative", zIndex: 2, height: "calc(100% - 34px)", display: "flex", flexDirection: "column", padding: "18px 22px 24px" }}>

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

          {/* Logo + CTA card */}
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

          {/* Swipe up */}
          <div style={{ textAlign: "center", marginTop: 14, color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
            ↑ SHIKO MË SHUMË
          </div>
        </div>

      </div>
    </div>
  );
}
