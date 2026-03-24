import { useState, useEffect } from "react";

const BASE = "/__mockup";

const LOCATIONS = [
  {
    city: "Ferizaj",
    label: "Main Office · Kosovo 70000",
    photo: `${BASE}/location-ferizaj.jpg`,
  },
  {
    city: "Prishtinë",
    label: "City Center · Kosovo 10000",
    photo: `${BASE}/location-pristina.jpg`,
  },
  {
    city: "Airport",
    label: "Pristina Intl. · Pickup & Drop-off",
    photo: null,
  },
];

const BLUE = "#0A84FF";
const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

export default function AdLocations() {
  const [visible, setVisible] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setInterval(() => setBgIndex(p => (p + 1) % 2), 3500);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  return (
    <div style={{
      width: 530, height: 530,
      background: "#000",
      fontFamily: appleFont,
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgFade {
          from { opacity: 0; }
          to   { opacity: 0.18; }
        }
        @keyframes bgFadeOut {
          from { opacity: 0.18; }
          to   { opacity: 0; }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.88); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(400%) skewX(-15deg); }
        }
      `}</style>

      {/* Background location photo — crossfade */}
      {[0, 1].map(i => (
        <img
          key={i}
          src={LOCATIONS[i].photo!}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: bgIndex === i ? 0.18 : 0,
            transition: "opacity 1.5s ease",
            filter: "blur(2px) saturate(0.6)",
            transform: "scale(1.05)",
          }}
        />
      ))}
      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)",
      }} />

      {/* Blue accent glow */}
      <div style={{
        position: "absolute", top: -100, right: -60,
        width: 300, height: 300,
        background: `radial-gradient(circle, ${BLUE}22 0%, transparent 70%)`,
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "40px 36px",
        display: "flex", flexDirection: "column",
        height: "100%", boxSizing: "border-box",
      }}>

        {/* Logo */}
        <div style={{
          animation: visible ? "logoPop 0.6s ease forwards" : "none",
          opacity: 0,
          marginBottom: 28,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <img
            src={`${BASE}/rron-logo.png`}
            alt="RRON"
            style={{ height: 38, filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
        </div>

        {/* Headline */}
        <div style={{
          animation: visible ? "fadeUp 0.5s 0.15s ease forwards" : "none",
          opacity: 0,
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: "0.12em", marginBottom: 6 }}>
            WHERE TO FIND US
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
            Find us<br />near you.
          </div>
        </div>

        {/* Location cards */}
        <div style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          flex: 1,
        }}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} style={{
              animation: visible ? `fadeUp 0.5s ${0.3 + i * 0.12}s ease forwards` : "none",
              opacity: 0,
            }}>
              {i > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginLeft: 68 }} />}
              <div style={{
                display: "flex", alignItems: "center",
                padding: "16px 18px", gap: 14,
              }}>
                {/* Photo thumbnail or icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 10, overflow: "hidden",
                  background: `${BLUE}1A`, flexShrink: 0,
                  position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {loc.photo ? (
                    <img
                      src={loc.photo}
                      alt={loc.city}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
                    </svg>
                  )}
                </div>
                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.2px" }}>
                    {loc.city}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                    {loc.label}
                  </div>
                </div>
                {/* Chevron */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 20,
          animation: visible ? "fadeUp 0.5s 0.7s ease forwards" : "none",
          opacity: 0,
        }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>+383 48 188 415</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: BLUE }}>rrcar.vercel.app →</div>
        </div>
      </div>
    </div>
  );
}
