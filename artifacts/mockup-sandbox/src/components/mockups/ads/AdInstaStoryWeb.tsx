import { useState, useEffect } from "react";

const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const SLIDES = [
  {
    eyebrow: "REZERVO ONLINE",
    headline: "Çmime\nTransparente.",
    sub: "Shiko flotën, zgjidh veturën, rezervo — pa telefon.",
    accent: "nga €25/ditë",
  },
  {
    eyebrow: "4 AEROPORTE",
    headline: "Marrje\nDirekte.",
    sub: "Prishtinë · Shkup · Kukës · Ferizaj — 24/7 në dispozicion.",
    accent: "Mbarë Ballkani",
  },
  {
    eyebrow: "FLOTA PREMIUM",
    headline: "14+ Vetura\nNë Dispozicion.",
    sub: "Audi A6, A5, A3, Golf 8 dhe shumë të tjera.",
    accent: "Automatik & Manual",
  },
];

export function AdInstaStoryWeb() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => {
        if ((t + 1) % 55 === 0) setActive(a => (a + 1) % SLIDES.length);
        return t + 1;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];
  const progress = (tick % 55) / 55 * 100;

  return (
    <div style={{
      width: 380, height: 675,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: DARK,
      position: "relative", overflow: "hidden",
      borderRadius: 16,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse    { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes gridIn   { from { opacity:0; transform:scale(1.04); } to { opacity:0.06; transform:scale(1); } }
      `}</style>

      {/* Grid / mesh background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "38px 38px",
        animation: "gridIn 1s ease forwards",
        pointerEvents: "none",
      }} />

      {/* Blue radial glow — top right */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, background: `radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 65%)`, pointerEvents: "none" }} />
      {/* Blue radial glow — bottom left */}
      <div style={{ position: "absolute", bottom: 80, left: -40, width: 260, height: 200, background: `radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Dark vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(6,8,15,0.65) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 280, background: "linear-gradient(to top, rgba(6,8,15,1) 0%, rgba(6,8,15,0.85) 60%, transparent 100%)", pointerEvents: "none" }} />

      {/* Big domain watermark */}
      <div style={{
        position: "absolute", top: "34%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em",
        color: "transparent",
        WebkitTextStroke: "1px rgba(59,130,246,0.18)",
        whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
      }}>rentacarron.com</div>

      {/* Car silhouette */}
      <img src={`${BASE}/audi-a6.png`} alt="" style={{
        position: "absolute",
        top: "18%", right: -30,
        width: "85%", height: "auto",
        objectFit: "contain",
        opacity: 0.12,
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 30%)",
        filter: "saturate(0)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "28px 24px 24px" }}>

        {/* Top: logo + slide dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 34, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block" }} />
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontWeight: 500, marginTop: 4 }}>rentacarron.com</div>
          </div>
          {/* Progress dots */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <div key={i} style={{ position: "relative", height: 3, borderRadius: 3, background: "rgba(255,255,255,0.15)", overflow: "hidden", width: i === active ? 24 : 8, transition: "width 0.4s ease" }}>
                {i === active && (
                  <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${progress}%`, background: BLUE, borderRadius: 3 }} />
                )}
                {i < active && <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 3 }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Middle spacer — center badge */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          {/* Browser bar mockup */}
          <div key={`browser-${active}`} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 8,
            width: "100%", boxSizing: "border-box",
            animation: "fadeIn 0.5s ease both",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{ flex: 1, textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>
              rentacarron.com
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE, opacity: 0.7, animation: "pulse 2s infinite" }} />
          </div>
        </div>

        {/* Bottom: slide copy */}
        <div>
          <div key={`ey-${active}`} style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10, animation: "fadeUp 0.4s ease both" }}>
            {slide.eyebrow}
          </div>
          <h2 key={`h-${active}`} style={{
            margin: "0 0 10px", color: "#fff", fontSize: 40, fontWeight: 900,
            letterSpacing: "-0.04em", lineHeight: 1.0,
            whiteSpace: "pre-line",
            animation: "fadeUp 0.4s ease 0.05s both",
          }}>{slide.headline}</h2>
          <p key={`sub-${active}`} style={{
            margin: "0 0 22px", color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500, lineHeight: 1.5,
            animation: "fadeUp 0.4s ease 0.1s both",
          }}>{slide.sub}</p>

          {/* Accent pill */}
          <div key={`acc-${active}`} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 100, padding: "7px 16px", marginBottom: 18,
            animation: "fadeUp 0.4s ease 0.15s both",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, animation: "pulse 1.8s infinite" }} />
            <span style={{ color: BLUE, fontSize: 12, fontWeight: 700 }}>{slide.accent}</span>
          </div>

          {/* CTA card */}
          <div style={{
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 18, padding: "14px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            backdropFilter: "blur(12px)",
          }}>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Rezervo Tani</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>+383 48 188 415</div>
            </div>
            <div style={{
              padding: "10px 18px", borderRadius: 12,
              background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
              color: "#fff", fontSize: 13, fontWeight: 700,
              boxShadow: "0 4px 16px rgba(59,130,246,0.5)",
            }}>rentacarron.com →</div>
          </div>

          <div style={{ textAlign: "center", marginTop: 12, color: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
            ↑ SHIKO MË SHUMË
          </div>
        </div>
      </div>
    </div>
  );
}
