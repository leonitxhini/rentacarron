import { useState, useEffect } from "react";

const BASE = "/__mockup";

const CARS = [
  { name: "Audi A6",         year: 2021, price: 75, type: "LUXURY",   img: `${BASE}/audi-a6.png` },
  { name: "Audi A5",         year: 2021, price: 70, type: "PREMIUM",  img: `${BASE}/audi-a5.png` },
  { name: "Volkswagen Golf 8", year: 2021, price: 50, type: "COMFORT", img: `${BASE}/golf8.png`  },
  { name: "Audi A3",         year: 2018, price: 40, type: "SPORT",    img: `${BASE}/audi-a3.png` },
];

const BLUE = "#3B82F6";
const appleFont = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

export default function AdFleet() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(p => (p + 1) % CARS.length);
        setAnimating(false);
      }, 350);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const car = CARS[active];

  return (
    <div style={{
      width: 530, height: 530,
      background: "#070710",
      position: "relative",
      overflow: "hidden",
      fontFamily: appleFont,
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }
        @keyframes carIn {
          from { opacity: 0; transform: translateX(30px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes carOut {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(-30px) scale(0.96); }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
      `}</style>

      {/* Background glow */}
      <div style={{
        position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 300,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Top bar: logo + counter */}
      <div style={{
        position: "relative", zIndex: 3,
        padding: "28px 28px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <img
          src={`${BASE}/rron-logo.png`}
          alt="RRON"
          style={{
            height: 36, objectFit: "contain",
            filter: "brightness(0) invert(1)",
            animation: "logoPop 0.5s ease forwards",
          }}
        />
        <div style={{
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 10,
          padding: "6px 14px",
          textAlign: "center",
        }}>
          <div style={{ color: BLUE, fontSize: 20, fontWeight: 800, lineHeight: 1 }}>14</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.15em", marginTop: 2 }}>VEHICLES</div>
        </div>
      </div>

      {/* Car photo */}
      <div style={{
        position: "relative", zIndex: 2,
        height: 240,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        marginTop: 8,
      }}>
        <img
          key={car.img}
          src={car.img}
          alt={car.name}
          style={{
            height: "90%",
            objectFit: "contain",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
            animation: animating ? "carOut 0.35s ease forwards" : "carIn 0.45s ease forwards",
          }}
        />
        {/* Reflection */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
          background: "linear-gradient(to bottom, transparent, #070710)",
        }} />
      </div>

      {/* Car info */}
      <div style={{
        position: "relative", zIndex: 3,
        padding: "0 28px",
      }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {CARS.map((_, i) => (
            <div key={i} style={{
              width: i === active ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? BLUE : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Name + type */}
        <div
          key={car.name + "info"}
          style={{ animation: animating ? "fadeOutUp 0.3s ease forwards" : "fadeInUp 0.4s ease forwards" }}
        >
          <div style={{
            display: "inline-block",
            background: "rgba(59,130,246,0.12)",
            color: BLUE,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
            padding: "3px 8px", borderRadius: 4, marginBottom: 6,
          }}>
            {car.type} · {car.year}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>
              {car.name}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ color: BLUE, fontSize: 28, fontWeight: 900 }}>€{car.price}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: "relative", zIndex: 3,
        padding: "16px 28px 0",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
          borderRadius: 12,
          padding: "13px 0",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Shimmer */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "40%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            animation: "shimmer 2.5s ease infinite",
          }} />
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>View all 14 cars →</span>
        </div>
        <div style={{
          textAlign: "center", marginTop: 12,
          color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.2em",
        }}>
          FERIZAJ · PRISHTINË · AIRPORT PICKUP
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(600%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
}
