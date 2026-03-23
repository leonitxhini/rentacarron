export function AdPremium() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      background: "#0a0c14",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      {/* Top dark gradient block */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0d0f1a 0%, #0a0c14 60%, #080a10 100%)" }} />

      {/* Blue accent glow — bottom left */}
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />

      {/* Top right subtle glow */}
      <div style={{ position: "absolute", top: "-5%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />

      {/* Grid lines texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)", backgroundSize: "8vw 8vw", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "7vw" }}>

        {/* Logo top */}
        <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
          <div style={{ width: "7vw", height: "7vw", borderRadius: "2vw", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "3.5vw", height: "2vw", borderRadius: "0.7vw", border: "0.3vw solid #3B82F6", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "-1.2vw", left: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "-1.2vw", right: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "3vw", fontWeight: 800, letterSpacing: "0.3em" }}>RRON</span>
        </div>

        {/* Main headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "4vw" }}>
            <div style={{ width: "5vw", height: "0.2vw", background: "#3B82F6" }} />
            <span style={{ color: "#3B82F6", fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}>Premium Fleet</span>
          </div>

          <h2 style={{ color: "#fff", fontSize: "13vw", fontWeight: 900, lineHeight: 0.92, margin: "0 0 5vw", letterSpacing: "-0.04em" }}>
            Drive<br />
            <span style={{ color: "transparent", WebkitTextStroke: "0.15vw rgba(255,255,255,0.25)" }}>Premium.</span><br />
            Pay Less.
          </h2>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "3.2vw", fontWeight: 300, lineHeight: 1.6, margin: "0 0 7vw", maxWidth: "75%" }}>
            Audi, Volkswagen & more — from €35/day. Free airport pickup across the Balkans.
          </p>

          {/* Specs strip */}
          <div style={{ display: "flex", gap: "3vw", marginBottom: "7vw" }}>
            {[
              { icon: "∞", label: "Unlimited KM" },
              { icon: "✈", label: "Airport Pickup" },
              { icon: "💬", label: "WhatsApp Book" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
                <div style={{ width: "5vw", height: "5vw", borderRadius: "1.5vw", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5vw" }}>{f.icon}</div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "2vw", fontWeight: 500, letterSpacing: "0.1em" }}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ padding: "3vw 7vw", borderRadius: "2vw", background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", fontSize: "3.5vw", fontWeight: 700, letterSpacing: "0.08em", boxShadow: "0 1.5vw 4vw rgba(59,130,246,0.45)" }}>
              Book Now
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "2.5vw" }}>rentacarron.com</div>
          </div>
        </div>

        {/* Bottom price badge */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ padding: "2vw 4vw", borderRadius: "10vw", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "baseline", gap: "1vw" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "2.2vw" }}>from</span>
            <span style={{ color: "#fff", fontSize: "5vw", fontWeight: 800 }}>€35</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "2.2vw" }}>/day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
