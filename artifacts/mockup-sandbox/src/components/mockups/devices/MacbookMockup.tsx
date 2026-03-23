const SITE_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/";

// The laptop screen area fills most of the iframe (1000px canvas iframe width)
// Screen width inside laptop: ~740px at the vw scale. We embed at 1280px and scale.
// Using percentages — the outer iframe is ~1000px wide, laptop is 82% = 820px.
// Horizontal padding 10px each side → screen = 800px. Scale = 800/1280 = 0.625.
// We can compute this via CSS calc, but it's simpler to use a fixed ratio.
const SITE_W = 1280;
const SITE_H = 800;

export function MacbookMockup() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        overflow: "hidden",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "70%", height: "50%",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
        filter: "blur(70px)",
        top: "10%", pointerEvents: "none",
      }} />

      {/* MacBook container */}
      <div style={{ position: "relative", width: "100%", maxWidth: 860 }}>

        {/* ── Lid ── */}
        <div style={{
          position: "relative",
          background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 50%, #2a2a2c 100%)",
          borderRadius: "16px 16px 0 0",
          padding: "10px 10px 0 10px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 -30px 80px rgba(0,0,0,0.4)",
        }}>
          {/* Webcam */}
          <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#2a2a2c", border: "1px solid rgba(255,255,255,0.05)" }} />

          {/* Screen */}
          <div style={{
            background: "#000",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            aspectRatio: "16/10",
            position: "relative",
          }}>
            {/* iframe wrapper — uses CSS to scale 1280px site to fit */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <iframe
                src={SITE_URL}
                style={{
                  width: SITE_W,
                  height: SITE_H,
                  border: "none",
                  transformOrigin: "top left",
                  // Scale to fill container width dynamically using a CSS variable trick:
                  // We set a fixed px iframe and scale it with a CSS calc. 
                  // The container width = 100%, and 1280px site → scale = containerW/1280.
                  // We approximate using a fixed scale for the expected iframe render size.
                  // At maxWidth=860, padding=10px each side → lid inner = 840px.
                  // 840/1280 ≈ 0.656
                  transform: "scale(0.656)",
                  display: "block",
                  pointerEvents: "none",
                }}
                scrolling="no"
                title="RRON Desktop"
              />
            </div>
          </div>
        </div>

        {/* ── Hinge ── */}
        <div style={{
          height: 6,
          background: "linear-gradient(180deg, #2a2a2c 0%, #1a1a1c 100%)",
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
          position: "relative", zIndex: 2,
        }}>
          <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)", width: "30%", height: 2, background: "rgba(255,255,255,0.03)", borderRadius: 1 }} />
        </div>

        {/* ── Base ── */}
        <div style={{
          height: 20,
          background: "linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 60%, #222 100%)",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 2px 0 #4a4a4c",
          position: "relative",
        }}>
          <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: "28%", height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.04)" }} />
        </div>

        {/* Desk shadow */}
        <div style={{
          height: 6,
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 70%)",
          borderRadius: "0 0 50% 50%",
          marginTop: 2,
        }} />
      </div>

      {/* Watermark */}
      <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 10, opacity: 0.3 }}>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.4)" }} />
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}>RRON Rent A Car</span>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.4)" }} />
      </div>
    </div>
  );
}
