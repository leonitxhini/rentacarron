export default function AdWeekend() {
  return (
    <div style={{
      width: 530, height: 530,
      background: "#0a0a0a",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}>
      {/* Diagonal gold stripe background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #0a0a0a 50%, #1a1000 100%)",
      }} />

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 4,
        background: "linear-gradient(90deg, #D4AF37, #F5D060, #D4AF37)",
      }} />

      {/* Big background text */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -60%) rotate(-12deg)",
        fontSize: 180,
        fontWeight: 900,
        color: "rgba(212,175,55,0.05)",
        letterSpacing: "-10px",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}>RRON</div>

      {/* Car silhouette glow */}
      <div style={{
        position: "absolute",
        bottom: 160, left: "50%",
        transform: "translateX(-50%)",
        width: 400, height: 160,
        background: "radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      {/* Badge */}
      <div style={{
        position: "absolute", top: 28, right: 28,
        background: "linear-gradient(135deg, #D4AF37, #F5D060)",
        borderRadius: 6,
        padding: "6px 14px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.15em" }}>WEEKEND</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.15em" }}>DEAL</span>
      </div>

      {/* Logo */}
      <div style={{
        position: "absolute", top: 26, left: 28,
        display: "flex", flexDirection: "column",
      }}>
        <span style={{ color: "#D4AF37", fontSize: 22, fontWeight: 900, letterSpacing: "0.25em" }}>RRON</span>
        <span style={{ color: "rgba(212,175,55,0.5)", fontSize: 9, letterSpacing: "0.2em" }}>RENT A CAR</span>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", padding: "32px 32px 36px" }}>
        {/* Tagline */}
        <div style={{
          color: "#D4AF37",
          fontSize: 11,
          letterSpacing: "0.3em",
          fontWeight: 700,
          marginBottom: 10,
          textTransform: "uppercase",
        }}>Fr – So · Limitiertes Angebot</div>

        {/* Headline */}
        <div style={{
          color: "#fff",
          fontSize: 42,
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: 18,
        }}>
          Weekend<br />
          <span style={{ color: "#D4AF37" }}>Getaway</span>
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 24 }}>
          <div>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "line-through", display: "block" }}>ab €95/Tag</span>
            <span style={{ color: "#D4AF37", fontSize: 52, fontWeight: 900, lineHeight: 1 }}>€65</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>/Tag</span>
          </div>
          <div style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: 8,
            padding: "6px 12px",
            marginBottom: 4,
          }}>
            <span style={{ color: "#D4AF37", fontSize: 12, fontWeight: 700 }}>–31% RABATT</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(212,175,55,0.2)", marginBottom: 20 }} />

        {/* CTA row */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{
            flex: 1,
            background: "linear-gradient(135deg, #D4AF37, #F5D060)",
            borderRadius: 10,
            padding: "14px 0",
            textAlign: "center",
          }}>
            <span style={{ color: "#0a0a0a", fontSize: 14, fontWeight: 800, letterSpacing: "0.05em" }}>Jetzt buchen</span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "14px 18px",
            textAlign: "center",
          }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
