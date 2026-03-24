const cars = [
  { name: "Audi A6", year: 2021, cat: "LUXURY", price: 70, color: "#111" },
  { name: "Audi A5", year: 2021, cat: "PREMIUM", price: 85, color: "#1a2a4a" },
  { name: "Golf 8", year: 2021, cat: "COMPACT", price: 45, color: "#1a1a1a" },
  { name: "Audi A3", year: 2018, cat: "PREMIUM", price: 62, color: "#2a2a2a" },
];

export function AdGrid() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#F5F5F7",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{
        background: "#0a0c14",
        padding: "5vw 6vw 4vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5vw" }}>
          <div style={{
            width: "7vw", height: "7vw", borderRadius: "1.8vw",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: "3.5vw", height: "2vw", borderRadius: "0.7vw", border: "0.3vw solid #3B82F6", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "-1.2vw", left: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "-1.2vw", right: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: "3.5vw", fontWeight: 800, letterSpacing: "0.25em", lineHeight: 1 }}>RRON</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "1.8vw", letterSpacing: "0.12em" }}>RENT A CAR</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "2vw", letterSpacing: "0.1em" }}>FLEET 2025</div>
          <div style={{ color: "#3B82F6", fontSize: "3vw", fontWeight: 700 }}>14 Vehicles</div>
        </div>
      </div>

      {/* 2x2 Car Grid */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "0.5vw",
        padding: "0.5vw",
      }}>
        {cars.map((car, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: "3vw",
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            position: "relative",
          }}>
            {/* Dark image area */}
            <div style={{
              flex: 1,
              background: `linear-gradient(145deg, ${car.color} 0%, #0d0d18 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              {/* Glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.15) 0%, transparent 65%)",
              }} />

              {/* Car emoji/placeholder */}
              <div style={{
                fontSize: "10vw", opacity: 0.8,
                filter: "drop-shadow(0 1vw 3vw rgba(0,0,0,0.5))",
              }}>🚗</div>

              {/* Category badge */}
              <div style={{
                position: "absolute", top: "3vw", left: "3vw",
                padding: "0.8vw 2vw", borderRadius: "10vw",
                background: "rgba(59,130,246,0.2)",
                border: "1px solid rgba(59,130,246,0.35)",
                color: "#3B82F6", fontSize: "1.8vw", fontWeight: 700, letterSpacing: "0.15em",
              }}>{car.cat}</div>
            </div>

            {/* Info strip */}
            <div style={{ padding: "3vw 3.5vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "#111", fontSize: "3vw", fontWeight: 800, lineHeight: 1.1 }}>{car.name}</div>
                <div style={{ color: "#999", fontSize: "2vw", fontWeight: 400 }}>{car.year}</div>
              </div>
              <div style={{
                padding: "1.5vw 3vw", borderRadius: "1.5vw",
                background: "#0a0c14",
                color: "#fff", fontSize: "2.5vw", fontWeight: 700,
              }}>€{car.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        background: "#0a0c14",
        padding: "3vw 6vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "2.2vw" }}>+383 48 188 415</div>
        <div style={{
          padding: "2vw 5vw", borderRadius: "1.5vw",
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          color: "#fff", fontSize: "2.5vw", fontWeight: 700,
          letterSpacing: "0.05em",
        }}>Book Now →</div>
        <div style={{ color: "#3B82F6", fontSize: "2.2vw", fontWeight: 500 }}>@rentacarron</div>
      </div>
    </div>
  );
}
