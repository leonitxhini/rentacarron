const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdAlb2() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      background: "#fff",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Top header bar */}
      <div style={{
        background: "#0a0c14",
        padding: "3.5vw 5.5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
          <img
            src="/__mockup/rron-logo.png"
            alt="RRON"
            style={{ height: "5vw", filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
        </div>
        <div style={{
          padding: "1.6vw 4.5vw", borderRadius: "1.8vw",
          background: "#3B82F6",
          color: "#fff", fontSize: "2.6vw", fontWeight: 700,
        }}>Rezervo Tani →</div>
      </div>

      {/* Live website — homepage */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <iframe
          src={`${SITE}/`}
          style={{
            width: "185%", height: "185%",
            border: "none",
            transform: "scale(0.54) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Gradient fade to white */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.98))",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bottom CTA */}
      <div style={{
        background: "#fff",
        padding: "3vw 5.5vw 5.5vw",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3.5vw" }}>
          <div>
            <div style={{ color: "#111", fontSize: "6.5vw", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" }}>
              Rezervo<br />Online
            </div>
            <div style={{ color: "#3B82F6", fontSize: "2.8vw", fontWeight: 600, marginTop: "1.5vw" }}>
              +383 48 188 415 · WhatsApp
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "0.5vw" }}>
            <span style={{ color: "#aaa", fontSize: "2vw", fontWeight: 500 }}>çmimi fillon nga</span>
            <span style={{ color: "#111", fontSize: "9vw", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em" }}>€25</span>
            <span style={{ color: "#aaa", fontSize: "2vw", fontWeight: 500 }}>për ditë</span>
          </div>
        </div>

        {/* Pill tags */}
        <div style={{ display: "flex", gap: "2vw", flexWrap: "wrap" }}>
          {["🇽🇰 Ferizaj", "✈ Aeroport Prishtina", "✈ Aeroport Shkup", "♾ Km pa Limit"].map(t => (
            <div key={t} style={{
              padding: "1.5vw 3vw", borderRadius: "10vw",
              background: "#F5F5F7",
              color: "#444", fontSize: "2vw", fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
