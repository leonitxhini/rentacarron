const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#06080f";

const SITE_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/";

// Phone inner screen dimensions
const SCREEN_W = 194;
const SCREEN_H = 370;
// Native mobile width we're simulating
const NATIVE_W = 390;
const SCALE = SCREEN_W / NATIVE_W; // ≈ 0.497

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

      {/* Grid mesh */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
        backgroundSize: "38px 38px",
        pointerEvents: "none",
      }} />

      {/* Blue glows */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 280, height: 280, background: "radial-gradient(ellipse, rgba(59,130,246,0.16) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 60, left: -30, width: 220, height: 180, background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Bottom dark fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to top, rgba(6,8,15,1) 0%, transparent 100%)", pointerEvents: "none" }} />
      {/* Top dark fade */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 110, background: "linear-gradient(to bottom, rgba(6,8,15,0.8) 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", padding: "28px 24px 22px" }}>

        {/* Top: logo + live badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 34, filter: "brightness(0) invert(1)", objectFit: "contain", display: "block" }} />
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontWeight: 500, marginTop: 4 }}>rentacarron.com</div>
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

        {/* Phone mockup — centered */}
        <div style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center" }}>
          {/* Phone outer shell */}
          <div style={{
            width: SCREEN_W + 14,
            height: SCREEN_H + 28,
            background: "#1a1a2e",
            borderRadius: 32,
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.12)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "14px 7px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Side button */}
            <div style={{ position: "absolute", right: -3, top: 80, width: 3, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: "0 2px 2px 0" }} />
            {/* Volume buttons */}
            <div style={{ position: "absolute", left: -3, top: 70, width: 3, height: 28, background: "rgba(255,255,255,0.12)", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: -3, top: 106, width: 3, height: 28, background: "rgba(255,255,255,0.12)", borderRadius: "2px 0 0 2px" }} />

            {/* Dynamic Island */}
            <div style={{ width: 72, height: 22, background: "#000", borderRadius: 20, marginBottom: 8, flexShrink: 0 }} />

            {/* Screen */}
            <div style={{
              width: SCREEN_W,
              height: SCREEN_H,
              borderRadius: 12,
              overflow: "hidden",
              background: "#000",
              position: "relative",
              flexShrink: 0,
            }}>
              <iframe
                src={SITE_URL}
                style={{
                  width: NATIVE_W,
                  height: SCREEN_H / SCALE,
                  border: "none",
                  transform: `scale(${SCALE})`,
                  transformOrigin: "0 0",
                  pointerEvents: "none",
                }}
                scrolling="no"
              />
            </div>

            {/* Home bar */}
            <div style={{ width: 80, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 4, marginTop: 8, flexShrink: 0 }} />
          </div>
        </div>

        {/* Bottom copy + CTA */}
        <div style={{ marginTop: 18 }}>
          <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6, animation: "fadeUp 0.5s ease both" }}>
            REZERVO ONLINE
          </div>
          <h2 style={{ margin: "0 0 16px", color: "#fff", fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, animation: "fadeUp 0.5s ease 0.05s both" }}>
            Çmime Transparente.<br />
            <span style={{ color: "rgba(255,255,255,0.38)", fontWeight: 600, fontSize: 18 }}>Nga €25/ditë.</span>
          </h2>

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
    </div>
  );
}
