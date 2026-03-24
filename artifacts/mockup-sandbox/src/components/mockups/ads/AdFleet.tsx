const cars = [
  { name: "Audi A5", price: "€85", type: "Premium", emoji: "🏎️" },
  { name: "VW Golf", price: "€45", type: "Compact", emoji: "🚗" },
  { name: "BMW 3", price: "€95", type: "Sport", emoji: "🚘" },
  { name: "Mercedes C", price: "€105", type: "Luxury", emoji: "🛻" },
];

export default function AdFleet() {
  return (
    <div style={{
      width: 530, height: 530,
      background: "#070710",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Background grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
        width: 400, height: 200,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div style={{
        position: "relative",
        padding: "28px 28px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.3em", fontWeight: 700, marginBottom: 4 }}>RRON RENT A CAR</div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>Unsere<br /><span style={{ color: "#3B82F6" }}>Flotte</span></div>
        </div>
        <div style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 12,
          padding: "8px 16px",
          textAlign: "center",
        }}>
          <div style={{ color: "#3B82F6", fontSize: 22, fontWeight: 900 }}>14</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.15em" }}>FAHRZEUGE</div>
        </div>
      </div>

      {/* Car grid */}
      <div style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        padding: "0 20px",
      }}>
        {cars.map((car, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "18px 16px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Hover glow */}
            <div style={{
              position: "absolute", top: -20, right: -20,
              width: 80, height: 80,
              background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }} />

            <div style={{ fontSize: 28, marginBottom: 10 }}>{car.emoji}</div>
            <div style={{
              display: "inline-block",
              background: "rgba(59,130,246,0.1)",
              color: "#3B82F6",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.15em",
              padding: "2px 7px",
              borderRadius: 4,
              marginBottom: 6,
            }}>{car.type.toUpperCase()}</div>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{car.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ color: "#3B82F6", fontSize: 20, fontWeight: 900 }}>{car.price}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>/Tag</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: "relative",
        padding: "16px 20px 0",
        display: "flex", gap: 10,
      }}>
        <div style={{
          flex: 1,
          background: "linear-gradient(135deg, #2563EB, #3B82F6)",
          borderRadius: 12,
          padding: "14px 0",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
        }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>Alle 14 Autos ansehen →</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "relative",
        textAlign: "center",
        padding: "12px 0 4px",
        color: "rgba(255,255,255,0.2)",
        fontSize: 10,
        letterSpacing: "0.2em",
      }}>FERIZAJ · PRISHTINË · AIRPORT PICKUP</div>
    </div>
  );
}
