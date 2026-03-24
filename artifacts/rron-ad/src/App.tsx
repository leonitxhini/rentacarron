import { useState, useEffect } from "react";

const API = "https://rentacarron.replit.app";
const WA = "https://wa.me/38348188415";
const FLEET = "https://rroncar.pages.dev/fleet";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  category: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  imageUrl: string | null;
  images: string[];
  available: boolean;
}

function resolveImg(car: Car): string {
  const imgs = car.images?.length ? car.images : car.imageUrl ? [car.imageUrl] : [];
  return imgs[0] || "";
}

function CarSlide({ car, active }: { car: Car; active: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      transition: "opacity 0.7s ease, transform 0.7s ease",
      opacity: active ? 1 : 0,
      transform: active ? "scale(1)" : "scale(1.04)",
      pointerEvents: active ? "auto" : "none",
    }}>
      {resolveImg(car) && (
        <img
          src={resolveImg(car)}
          alt={`${car.make} ${car.model}`}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
          }}
        />
      )}
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,12,20,0.3) 0%, transparent 30%, transparent 40%, rgba(10,12,20,0.75) 65%, rgba(10,12,20,0.97) 100%)",
      }} />
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/cars?available=true`)
      .then(r => r.json())
      .then((data: Car[]) => {
        // Sort by price desc, take top cars with images
        const sorted = data
          .filter(c => c.imageUrl || c.images?.length)
          .sort((a, b) => b.pricePerDay - a.pricePerDay);
        setCars(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (cars.length < 2) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % cars.length), 4000);
    return () => clearInterval(t);
  }, [cars.length]);

  const car = cars[current];

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#0a0c14",
      position: "relative",
      display: "flex", flexDirection: "column",
    }}>

      {/* ── Slideshow background ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {cars.map((c, i) => (
          <CarSlide key={c.id} car={c} active={i === current} />
        ))}
        {loading && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(145deg, #0d0f1a, #0a0c14)",
          }} />
        )}
      </div>

      {/* ── Top bar ── */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "clamp(16px, 5vw, 40px) clamp(20px, 6vw, 48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 16px)" }}>
          <div style={{
            width: "clamp(36px, 8vw, 56px)", height: "clamp(36px, 8vw, 56px)",
            borderRadius: "clamp(8px, 2vw, 14px)",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <div style={{
              width: "clamp(16px, 3.5vw, 26px)", height: "clamp(9px, 2vw, 15px)",
              borderRadius: "clamp(3px, 0.7vw, 6px)",
              border: "clamp(1.5px, 0.3vw, 2.5px) solid #3B82F6",
              position: "relative",
            }}>
              <div style={{ position: "absolute", bottom: "clamp(-5px,-1.2vw,-4px)", left: "clamp(2px,0.5vw,4px)", width: "clamp(4px,1vw,7px)", height: "clamp(4px,1vw,7px)", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "clamp(-5px,-1.2vw,-4px)", right: "clamp(2px,0.5vw,4px)", width: "clamp(4px,1vw,7px)", height: "clamp(4px,1vw,7px)", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: "clamp(14px, 3vw, 22px)", fontWeight: 800, letterSpacing: "0.25em", lineHeight: 1 }}>RRON</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(8px, 1.6vw, 12px)", letterSpacing: "0.15em" }}>RENT A CAR</div>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "clamp(4px, 1vw, 8px)", alignItems: "center" }}>
          {cars.slice(0, 8).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "clamp(20px, 4vw, 28px)" : "clamp(6px, 1.5vw, 10px)",
                height: "clamp(5px, 1.2vw, 8px)",
                borderRadius: "10px",
                background: i === current ? "#3B82F6" : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Bottom card ── */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "clamp(16px, 4vw, 32px) clamp(20px, 6vw, 48px) clamp(24px, 6vw, 48px)",
        display: "flex", flexDirection: "column", gap: "clamp(12px, 3vw, 24px)",
      }}>

        {/* Car info */}
        {car ? (
          <>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1.5vw, 12px)", marginBottom: "clamp(4px, 1vw, 8px)" }}>
                <div style={{ width: "clamp(16px, 3.5vw, 24px)", height: "1.5px", background: "#3B82F6" }} />
                <span style={{ color: "#3B82F6", fontSize: "clamp(9px, 2vw, 13px)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {car.category} · {car.year} · {car.color}
                </span>
              </div>
              <h1 style={{
                margin: 0, color: "#fff",
                fontSize: "clamp(28px, 8vw, 64px)",
                fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95,
              }}>
                {car.make} {car.model}
              </h1>
            </div>

            {/* Specs + Price row */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", gap: "clamp(8px, 2vw, 16px)", flexWrap: "wrap" }}>
                {[
                  { icon: "⚙️", label: car.transmission },
                  { icon: "👥", label: `${car.seats} Seats` },
                  { icon: "✈", label: "Airport" },
                ].map(f => (
                  <div key={f.label} style={{
                    display: "flex", alignItems: "center", gap: "clamp(4px, 1vw, 8px)",
                    padding: "clamp(6px, 1.5vw, 10px) clamp(10px, 2.5vw, 18px)",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}>
                    <span style={{ fontSize: "clamp(10px, 2.2vw, 14px)" }}>{f.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(9px, 2vw, 12px)", fontWeight: 500, letterSpacing: "0.05em" }}>{f.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(8px, 1.8vw, 12px)" }}>from</div>
                <div style={{ color: "#fff", fontSize: "clamp(28px, 7vw, 52px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em" }}>
                  €{car.pricePerDay}
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(8px, 1.8vw, 12px)" }}>/day</div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: "clamp(60px, 15vw, 120px)", display: "flex", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "clamp(12px, 2.5vw, 16px)" }}>Loading fleet...</div>
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "clamp(8px, 2vw, 14px)" }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: "clamp(14px, 3.5vw, 22px) clamp(20px, 5vw, 36px)",
              borderRadius: "clamp(10px, 2.5vw, 18px)",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              color: "#fff",
              fontSize: "clamp(13px, 3vw, 18px)",
              fontWeight: 700,
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              boxShadow: "0 8px 32px rgba(59,130,246,0.45)",
              letterSpacing: "0.02em",
            }}
          >
            💬 Book on WhatsApp
          </a>
          <a
            href={FLEET}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "clamp(14px, 3.5vw, 22px) clamp(16px, 4vw, 28px)",
              borderRadius: "clamp(10px, 2.5vw, 18px)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "clamp(12px, 2.5vw, 16px)",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            Full Fleet →
          </a>
        </div>

        {/* Bottom info */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "clamp(12px, 3vw, 24px)",
          paddingTop: "clamp(4px, 1vw, 8px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          {["🇽🇰 Ferizaj", "🇽🇰 Prishtinë", "✈ Airport Pickup", `${cars.length || 14} Cars`].map(t => (
            <span key={t} style={{ color: "rgba(255,255,255,0.25)", fontSize: "clamp(9px, 1.8vw, 12px)", fontWeight: 400 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
