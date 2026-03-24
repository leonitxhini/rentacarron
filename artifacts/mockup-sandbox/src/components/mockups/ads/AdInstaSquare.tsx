const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#080a12";

export function AdInstaSquare() {
  return (
    <div style={{
      width: 530, height: 530,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: DARK,
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @keyframes igIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Hero car — full bleed with dark overlay */}
      <img
        src={`${BASE}/audi-a6.png`}
        alt="Audi A6"
        style={{
          position: "absolute",
          bottom: 80, right: -20,
          width: "78%", height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
        }}
      />

      {/* Blue accent gradient — bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 220,
        background: `linear-gradient(to top, rgba(59,130,246,0.18) 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />

      {/* Left dark column */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 220,
        background: `linear-gradient(to right, ${DARK} 55%, transparent 100%)`,
        pointerEvents: "none",
      }} />

      {/* Noise texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "150px",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: 32, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

        {/* Top: Logo + badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 26, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <div style={{
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)",
            borderRadius: 100, padding: "5px 12px",
            color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          }}>PREMIUM</div>
        </div>

        {/* Bottom: copy */}
        <div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>
            Rent A Car · Kosovë
          </div>
          <h2 style={{ margin: "0 0 4px", color: "#fff", fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            Audi A6
          </h2>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
            2021 · Automatik · Diesel
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            {/* Price */}
            <div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>nga </span>
              <span style={{ color: "#fff", fontSize: 40, fontWeight: 900, letterSpacing: "-0.04em" }}>€75</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}> /ditë</span>
            </div>
            {/* CTA */}
            <div style={{
              padding: "12px 22px", borderRadius: 12,
              background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
              color: "#fff", fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
              whiteSpace: "nowrap",
            }}>Rezervo →</div>
          </div>

          {/* Specs row */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {["✈ Airport", "♾ Km Falas", "💬 WhatsApp"].map(t => (
              <div key={t} style={{
                padding: "5px 10px", borderRadius: 7,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 500,
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
