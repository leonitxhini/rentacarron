export function AdStory() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#0b0c10",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Diagonal split background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(155deg, #0b0c10 0%, #0b0c10 52%, #1a1f35 52%, #1a1f35 100%)",
      }} />

      {/* Blue accent stripe */}
      <div style={{
        position: "absolute", left: 0, top: "48%", right: 0,
        height: "0.5vw", background: "linear-gradient(90deg, #3B82F6, transparent)",
        transform: "rotate(-8deg) scaleX(1.3)",
        transformOrigin: "left",
        opacity: 0.6,
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "70vw", height: "70vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)",
        filter: "blur(30px)",
      }} />

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: "-15%", left: "10%",
        width: "60vw", height: "60vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,80,200,0.12) 0%, transparent 65%)",
        filter: "blur(40px)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", padding: "8vw" }}>

        {/* Top — logo + tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5vw" }}>
            <div style={{
              width: "8vw", height: "8vw", borderRadius: "2.2vw",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: "4vw", height: "2.2vw", borderRadius: "0.8vw", border: "0.35vw solid #3B82F6", position: "relative" }}>
                <div style={{ position: "absolute", bottom: "-1.3vw", left: "0.6vw", width: "1vw", height: "1vw", borderRadius: "50%", background: "#3B82F6" }} />
                <div style={{ position: "absolute", bottom: "-1.3vw", right: "0.6vw", width: "1vw", height: "1vw", borderRadius: "50%", background: "#3B82F6" }} />
              </div>
            </div>
            <span style={{ color: "#fff", fontSize: "3.5vw", fontWeight: 800, letterSpacing: "0.28em" }}>RRON</span>
          </div>
          <div style={{
            padding: "1.5vw 3.5vw", borderRadius: "10vw",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#3B82F6", fontSize: "2.2vw", fontWeight: 600, letterSpacing: "0.15em",
          }}>KOSOVË</div>
        </div>

        {/* Middle — big headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4vw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ width: "4vw", height: "0.25vw", background: "#3B82F6" }} />
            <span style={{ color: "#3B82F6", fontSize: "2.5vw", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>Nr. 1 në Ferizaj</span>
          </div>

          <h1 style={{ margin: 0, color: "#fff", fontSize: "17vw", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.05em" }}>
            Rent.<br />
            <span style={{ color: "transparent", WebkitTextStroke: "0.2vw rgba(255,255,255,0.2)" }}>Drive.</span><br />
            Return.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "3.5vw", fontWeight: 300, lineHeight: 1.55, margin: 0, maxWidth: "80%" }}>
            Audi · Volkswagen · Peugeot<br />Automatik & Manual · Kosovo & Ballkan
          </p>

          {/* Price row */}
          <div style={{ display: "flex", gap: "3vw", alignItems: "center" }}>
            <div style={{
              padding: "2.5vw 6vw", borderRadius: "1.8vw",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              color: "#fff", fontSize: "3.8vw", fontWeight: 700,
              boxShadow: "0 2vw 5vw rgba(59,130,246,0.4)",
            }}>
              Rezervo Tani
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "2vw" }}>nga</span>
              <span style={{ color: "#fff", fontSize: "6vw", fontWeight: 900, lineHeight: 1 }}>€30<span style={{ color: "rgba(255,255,255,0.3)", fontSize: "2.5vw", fontWeight: 400 }}>/ditë</span></span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "2.2vw", letterSpacing: "0.1em" }}>+383 48 188 415</div>
          <div style={{
            display: "flex", gap: "2vw",
          }}>
            {["WhatsApp", "Instagram"].map(s => (
              <div key={s} style={{
                padding: "1.2vw 3vw", borderRadius: "10vw",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.3)", fontSize: "2vw",
              }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
