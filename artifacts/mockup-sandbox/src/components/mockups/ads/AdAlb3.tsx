const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdAlb3() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      background: "#08090f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative",
      padding: "5vw",
      boxSizing: "border-box",
      gap: "4vw",
    }}>
      {/* Subtle blue glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Top: logo + tagline */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ color: "#3B82F6", fontSize: "2.4vw", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5vw" }}>
          RRON Rent A Car
        </div>
        <h2 style={{ margin: 0, color: "#fff", fontSize: "7.5vw", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
          Merr Veturë<br />
          <span style={{ color: "rgba(255,255,255,0.3)" }}>me Qira Online</span>
        </h2>
      </div>

      {/* Phone frame with live website */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "42vw", height: "58vw",
        borderRadius: "5.5vw",
        background: "#111827",
        border: "0.7vw solid rgba(255,255,255,0.13)",
        overflow: "hidden",
        boxShadow: "0 5vw 25vw rgba(0,0,0,0.7), 0 0 0 0.2vw rgba(255,255,255,0.05), 0 0 40px rgba(59,130,246,0.2)",
        flexShrink: 0,
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: "2vw", left: "50%", transform: "translateX(-50%)",
          width: "11vw", height: "1.5vw", borderRadius: "10vw",
          background: "#000", zIndex: 10,
        }} />
        {/* Live homepage */}
        <iframe
          src={`${SITE}/`}
          style={{
            width: "265%", height: "265%",
            border: "none",
            transform: "scale(0.377) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
          background: "linear-gradient(to bottom, transparent, rgba(8,9,15,0.96))",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bottom */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5vw" }}>
        <div style={{ display: "flex", gap: "2.5vw" }}>
          {["14 Vetura", "Nga €25/ditë", "♾ Km Falas"].map(t => (
            <div key={t} style={{
              padding: "1.5vw 3vw", borderRadius: "10vw",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.5)", fontSize: "2vw", fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
        <div style={{
          display: "flex", gap: "3vw", width: "100%", maxWidth: "72vw",
        }}>
          <div style={{
            flex: 1, padding: "2.5vw 0", borderRadius: "2.2vw",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "#fff", fontSize: "2.8vw", fontWeight: 800, textAlign: "center",
            boxShadow: "0 2vw 6vw rgba(59,130,246,0.5)",
          }}>💬 WhatsApp</div>
          <div style={{
            flex: 1, padding: "2.5vw 0", borderRadius: "2.2vw",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "2.8vw", fontWeight: 700, textAlign: "center",
          }}>Shiko Flotën</div>
        </div>
      </div>
    </div>
  );
}
