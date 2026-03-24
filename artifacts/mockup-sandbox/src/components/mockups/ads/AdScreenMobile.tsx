const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdScreenMobile() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#0b0c12",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center",
      position: "relative",
      gap: "5vw",
      padding: "6vw",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)",
      }} />

      {/* Top label */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ color: "#3B82F6", fontSize: "2.5vw", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1vw" }}>RRON Rent A Car</div>
        <h2 style={{ margin: 0, color: "#fff", fontSize: "7vw", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Rezervo nga<br />telefoni
        </h2>
      </div>

      {/* Phone mockup with live site */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "45vw",
        height: "60vw",
        borderRadius: "5vw",
        background: "#1a1a2e",
        border: "0.6vw solid rgba(255,255,255,0.15)",
        overflow: "hidden",
        boxShadow: "0 4vw 20vw rgba(0,0,0,0.6), 0 0 0 0.15vw rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: "1.5vw", left: "50%", transform: "translateX(-50%)",
          width: "12vw", height: "1.2vw", borderRadius: "10vw",
          background: "#000", zIndex: 10,
        }} />
        {/* Live fleet page */}
        <iframe
          src={`${SITE}/fleet`}
          style={{
            width: "260%",
            height: "260%",
            border: "none",
            transform: "scale(0.385) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
          background: "linear-gradient(to bottom, transparent, rgba(10,12,20,0.95))",
        }} />
      </div>

      {/* Bottom CTA */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3vw" }}>
        <div style={{ display: "flex", gap: "3vw" }}>
          {["14 Vetura", "nga €30/ditë", "✈ Airport"].map(t => (
            <div key={t} style={{
              padding: "1.5vw 3vw", borderRadius: "10vw",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)", fontSize: "2vw", fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
        <div style={{
          padding: "2.5vw 10vw", borderRadius: "2vw",
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          color: "#fff", fontSize: "3vw", fontWeight: 700,
          boxShadow: "0 1.5vw 5vw rgba(59,130,246,0.45)",
          letterSpacing: "0.05em",
        }}>
          💬  +383 48 188 415
        </div>
      </div>
    </div>
  );
}
