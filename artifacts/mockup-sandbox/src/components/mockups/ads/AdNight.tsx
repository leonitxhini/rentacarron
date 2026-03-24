export function AdNight() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#060710",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Deep purple-blue gradient background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(99,60,180,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.2) 0%, transparent 55%)",
      }} />

      {/* Horizontal speed lines */}
      {[15, 30, 45, 55, 68, 78, 88].map((top, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${top}%`, left: 0, right: 0,
          height: i % 2 === 0 ? "0.08vw" : "0.04vw",
          background: `linear-gradient(90deg, transparent 0%, rgba(99,60,180,${0.08 + i * 0.02}) 30%, rgba(59,130,246,${0.12 + i * 0.02}) 70%, transparent 100%)`,
        }} />
      ))}

      {/* Vertical accent bar */}
      <div style={{
        position: "absolute", left: "6vw", top: "15%", bottom: "15%",
        width: "0.4vw",
        background: "linear-gradient(180deg, transparent, #3B82F6 30%, #7c3aed 70%, transparent)",
        borderRadius: "1vw",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", padding: "8vw 8vw 8vw 12vw" }}>

        {/* Top */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "3.2vw", fontWeight: 800, letterSpacing: "0.35em" }}>RRON</span>
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5vw",
            padding: "1.5vw 3.5vw", borderRadius: "10vw",
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
          }}>
            <div style={{ width: "1.5vw", height: "1.5vw", borderRadius: "50%", background: "#7c3aed" }} />
            <span style={{ color: "#a78bfa", fontSize: "2vw", fontWeight: 600, letterSpacing: "0.1em" }}>PREMIUM FLEET</span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "3vw" }}>
            <div style={{ color: "rgba(167,139,250,0.7)", fontSize: "2.8vw", fontWeight: 500, letterSpacing: "0.2em", marginBottom: "2vw", textTransform: "uppercase" }}>
              Tonight's Ride
            </div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "15vw", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em" }}>
              Own The
            </h1>
            <h1 style={{ margin: 0, fontSize: "15vw", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #7c3aed, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Night.
            </h1>
          </div>

          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "3.2vw", fontWeight: 300, lineHeight: 1.6, margin: "0 0 6vw", maxWidth: "80%" }}>
            Drive something extraordinary. Audi, Volkswagen & more — available now across Kosovo.
          </p>

          {/* Feature row */}
          <div style={{ display: "flex", gap: "4vw", marginBottom: "7vw" }}>
            {[
              { label: "Free Delivery", icon: "🚀" },
              { label: "24/7 Support", icon: "💬" },
              { label: "From €30/day", icon: "✦" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
                <span style={{ fontSize: "4vw" }}>{f.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "2vw", fontWeight: 500, letterSpacing: "0.08em" }}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{
              padding: "3.5vw 8vw", borderRadius: "2vw",
              background: "linear-gradient(135deg, #7c3aed, #3B82F6)",
              color: "#fff", fontSize: "3.8vw", fontWeight: 700,
              boxShadow: "0 2vw 6vw rgba(124,58,237,0.45)",
              letterSpacing: "0.05em",
            }}>
              Book Now
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5vw" }}>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "2vw" }}>WhatsApp</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "2.5vw", fontWeight: 600 }}>+383 48 188 415</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "2vw", letterSpacing: "0.12em" }}>@rentacarron</span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "2vw", letterSpacing: "0.08em" }}>Ferizaj · Kosovo</span>
        </div>
      </div>
    </div>
  );
}
