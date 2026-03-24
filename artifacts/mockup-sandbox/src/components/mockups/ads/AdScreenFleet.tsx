const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdScreenFleet() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#0a0c14",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Live website screenshot — top 72% */}
      <div style={{ position: "relative", height: "72%", overflow: "hidden", flexShrink: 0 }}>
        <iframe
          src={`${SITE}/fleet`}
          style={{
            width: "170%",
            height: "170%",
            border: "none",
            transform: "scale(0.588) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom fade overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to bottom, transparent, #0a0c14)",
          pointerEvents: "none",
        }} />
        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "10%",
          background: "linear-gradient(to bottom, #0a0c14, transparent)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bottom ad copy — 28% */}
      <div style={{
        flex: 1,
        background: "#0a0c14",
        padding: "0 7vw 6vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "4vw",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "2vw" }}>
            <div style={{ width: "4vw", height: "0.2vw", background: "#3B82F6" }} />
            <span style={{ color: "#3B82F6", fontSize: "2.5vw", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>RRON Rent A Car</span>
          </div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: "8vw", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
            14 Vetura<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Nga €30/Ditë</span>
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "2.5vw" }}>
            {["✈ Airport", "💬 WhatsApp", "∞ Km"].map(t => (
              <div key={t} style={{
                padding: "1.5vw 3vw", borderRadius: "10vw",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", fontSize: "2vw", fontWeight: 500,
              }}>{t}</div>
            ))}
          </div>
          <div style={{
            padding: "2.5vw 6vw", borderRadius: "2vw",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "#fff", fontSize: "3vw", fontWeight: 700,
            boxShadow: "0 1.5vw 4vw rgba(59,130,246,0.4)",
          }}>Rezervo →</div>
        </div>
      </div>
    </div>
  );
}
