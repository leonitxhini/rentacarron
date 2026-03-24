const BASE = "/__mockup";
const BLUE = "#3B82F6";
const DARK = "#080a12";

const CARS = [
  { name: "Audi A6",   year: 2021, price: 75,  img: `${BASE}/audi-a6.png`,  tag: "Premium" },
  { name: "Audi A5",   year: 2021, price: 70,  img: `${BASE}/audi-a5.png`,  tag: "Sportiv" },
  { name: "Audi A3",   year: 2018, price: 40,  img: `${BASE}/audi-a3.png`,  tag: "Kompakt" },
];

export function AdInstaPortrait() {
  return (
    <div style={{
      width: 530, height: 663,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "#fff",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Dark header */}
      <div style={{ background: DARK, padding: "18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 24, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
        <div style={{
          padding: "6px 14px", borderRadius: 100,
          background: BLUE, color: "#fff", fontSize: 12, fontWeight: 700,
        }}>Rezervo Tani →</div>
      </div>

      {/* Headline */}
      <div style={{ padding: "22px 26px 16px", background: "#fff" }}>
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>FLOTA JONË</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#0a0c14", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Veturët<br />më të Mira.
          </h2>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#aaa", fontSize: 11 }}>nga</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#0a0c14", letterSpacing: "-0.04em", lineHeight: 1 }}>€40</div>
            <div style={{ color: "#aaa", fontSize: 11 }}>/ditë</div>
          </div>
        </div>
      </div>

      {/* Car list */}
      <div style={{ flex: 1, padding: "0 26px", display: "flex", flexDirection: "column", gap: 10 }}>
        {CARS.map((car, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center",
            background: i === 0 ? DARK : "#F8F9FB",
            borderRadius: 16, padding: "14px 18px",
            gap: 14,
          }}>
            <img src={car.img} alt={car.name} style={{ width: 110, height: 62, objectFit: "contain", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: i === 0 ? "#fff" : "#0a0c14", letterSpacing: "-0.02em" }}>{car.name}</div>
              <div style={{ fontSize: 12, color: i === 0 ? "rgba(255,255,255,0.4)" : "#aaa" }}>{car.year} · Automatik</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: i === 0 ? BLUE : "#0a0c14",
              }}>€{car.price}<span style={{ fontSize: 11, fontWeight: 500, color: i === 0 ? "rgba(255,255,255,0.3)" : "#aaa" }}>/ditë</span></div>
              <div style={{
                marginTop: 4, fontSize: 10, fontWeight: 600,
                color: i === 0 ? BLUE : "#999",
                background: i === 0 ? "rgba(59,130,246,0.15)" : "#EBEBF0",
                borderRadius: 5, padding: "2px 7px", display: "inline-block",
              }}>{car.tag}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 26px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "#aaa" }}>+383 48 188 415 · WhatsApp</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>rrcar.vercel.app →</div>
      </div>
    </div>
  );
}
