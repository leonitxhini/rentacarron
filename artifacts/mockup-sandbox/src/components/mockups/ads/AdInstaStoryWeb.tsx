const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const SITE_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/";

const NATIVE_W = 390;
const STRIP_H = 390;
const SCALE = 380 / NATIVE_W; // fill full width

export function AdInstaStoryWeb() {
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
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      `}</style>

      {/* ── WEBSITE STRIP — top, edge-to-edge ── */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 380,
        height: STRIP_H,
        overflow: "hidden",
      }}>
        <iframe
          src={SITE_URL}
          style={{
            width: NATIVE_W,
            height: STRIP_H / SCALE,
            border: "none",
            transform: `scale(${SCALE})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
            display: "block",
          }}
          scrolling="no"
        />
        {/* Fade website into dark at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: `linear-gradient(to top, ${DARK} 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── CONTENT below the website strip ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 24px 22px",
        zIndex: 2,
      }}>

        {/* Logo + live badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 30, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block" }} />
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontWeight: 500, marginTop: 3 }}>rentacarron.com</div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 100, padding: "6px 12px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, animation: "pulse 1.6s infinite" }} />
            <span style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
          REZERVO ONLINE
        </div>
        <h2 style={{ margin: "0 0 6px", color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Çmime Transparente.
        </h2>
        <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,0.38)", fontSize: 13, fontWeight: 500 }}>
          Nga €25/ditë · Mbarë Ballkani
        </p>

        {/* CTA card */}
        <div style={{
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>+383 48 188 415</div>
          <div style={{
            padding: "9px 16px", borderRadius: 10,
            background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
            color: "#fff", fontSize: 12, fontWeight: 700,
            boxShadow: "0 4px 14px rgba(59,130,246,0.5)",
          }}>rentacarron.com →</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 10, color: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
          ↑ SHIKO MË SHUMË
        </div>
      </div>
    </div>
  );
}
