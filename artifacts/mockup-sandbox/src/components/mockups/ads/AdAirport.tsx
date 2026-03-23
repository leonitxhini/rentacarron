export function AdAirport() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      display: "flex", flexDirection: "column", position: "relative",
      background: "#fff",
    }}>
      {/* Top dark hero block — 58% */}
      <div style={{ position: "relative", height: "58%", background: "#0a0c14", overflow: "hidden", flexShrink: 0 }}>
        {/* Blue glow center */}
        <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 65%)", filter: "blur(30px)" }} />

        {/* Runway lines */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "4vw" }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ width: "1.5vw", height: "12vw", background: "rgba(255,255,255,0.06)", borderRadius: "0.5vw" }} />
          ))}
        </div>

        {/* Airplane icon */}
        <div style={{ position: "absolute", top: "8vw", right: "8vw", fontSize: "12vw", opacity: 0.15, transform: "rotate(-15deg)" }}>✈</div>

        {/* RRON logo */}
        <div style={{ position: "absolute", top: "7vw", left: "7vw", display: "flex", alignItems: "center", gap: "2vw" }}>
          <div style={{ width: "7vw", height: "7vw", borderRadius: "2vw", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "3.5vw", height: "2vw", borderRadius: "0.7vw", border: "0.3vw solid #3B82F6", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "-1.2vw", left: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "-1.2vw", right: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "3vw", fontWeight: 800, letterSpacing: "0.3em" }}>RRON</span>
        </div>

        {/* Hero text in dark section */}
        <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 7vw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2vw", marginBottom: "2vw" }}>
            <span style={{ fontSize: "3vw" }}>✈</span>
            <span style={{ color: "#3B82F6", fontSize: "2.5vw", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Airport Pickup · Free</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: "10.5vw", fontWeight: 900, lineHeight: 0.95, margin: 0, letterSpacing: "-0.04em" }}>
            Land.<br />Drive.<br />Explore.
          </h2>
        </div>
      </div>

      {/* Bottom white section — 42% */}
      <div style={{ flex: 1, background: "#fff", padding: "6vw 7vw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#333", fontSize: "3.8vw", fontWeight: 400, lineHeight: 1.5, margin: "0 0 5vw" }}>
            Car waiting at the airport. Zero delays. Pristina, Skopje & Kukes.
          </p>

          {/* Location pills */}
          <div style={{ display: "flex", gap: "2vw", flexWrap: "wrap", marginBottom: "5vw" }}>
            {["🇽🇰 Pristina", "🇲🇰 Skopje", "🇦🇱 Kukes", "🇽🇰 Ferizaj"].map(loc => (
              <div key={loc} style={{ padding: "1.5vw 3.5vw", borderRadius: "10vw", background: "#F5F5F7", color: "#333", fontSize: "2.5vw", fontWeight: 500 }}>
                {loc}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ padding: "3vw 7vw", borderRadius: "2vw", background: "#0a0c14", color: "#fff", fontSize: "3.5vw", fontWeight: 700, letterSpacing: "0.05em" }}>
            Book on WhatsApp
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#111", fontSize: "5vw", fontWeight: 800 }}>€35<span style={{ color: "#999", fontSize: "2.5vw", fontWeight: 400 }}>/day</span></div>
            <div style={{ color: "#3B82F6", fontSize: "2.2vw", fontWeight: 500 }}>Free Airport Pickup</div>
          </div>
        </div>
      </div>
    </div>
  );
}
