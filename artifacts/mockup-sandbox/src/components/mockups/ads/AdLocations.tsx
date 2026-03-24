import { useState, useEffect } from "react";

const BASE = "/__mockup";

const LOCATIONS = [
  {
    city: "Ferizaj",
    label: "Main Office · Kosovo 70000",
    photo: `${BASE}/location-ferizaj.jpg`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    city: "Airport Prishtina",
    label: "Pristina Intl. · Kosovo",
    photo: `${BASE}/location-pristina.jpg`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
      </svg>
    ),
  },
  {
    city: "Airport Skopje",
    label: "Skopje Intl. · North Macedonia",
    photo: `${BASE}/location-skopje.jpg`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
      </svg>
    ),
  },
  {
    city: "Airport Kukes",
    label: "Kukës Airport · Albania",
    photo: `${BASE}/location-kukes.jpg`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
      </svg>
    ),
  },
];

const BLUE = "#0A84FF";
const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

export default function AdLocations() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIndex(p => (p + 1) % LOCATIONS.length), 2800);
    return () => clearInterval(t);
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
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.88); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Crossfading background photos */}
      {LOCATIONS.map((loc, i) => (
        <img
          key={i}
          src={loc.photo}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: bgIndex === i ? 0.2 : 0,
            transition: "opacity 1.4s ease",
            filter: "blur(3px) saturate(0.5)",
            transform: "scale(1.06)",
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.88) 100%)",
      }} />

      {/* Blue accent glow */}
      <div style={{
        position: "absolute", top: -80, right: -50,
        width: 260, height: 260,
        background: `radial-gradient(circle, ${BLUE}20 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "34px 32px 28px",
        display: "flex", flexDirection: "column",
        height: "100%", boxSizing: "border-box",
      }}>

        {/* Logo */}
        <div style={{
          animation: "logoPop 0.6s ease both",
          marginBottom: 22,
        }}>
          <img
            src={`${BASE}/rron-logo.png`}
            alt="RRON"
            style={{ height: 34, filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
        </div>

        {/* Headline */}
        <div style={{
          animation: "fadeUp 0.5s 0.12s ease both",
          marginBottom: 22,
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: BLUE, letterSpacing: "0.14em", marginBottom: 5 }}>
            WHERE TO FIND US
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1.15 }}>
            Find us near you.
          </div>
        </div>

        {/* Location cards */}
        <div style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.09)",
          overflow: "hidden",
          flex: 1,
        }}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} style={{
              animation: `fadeUp 0.45s ${0.25 + i * 0.1}s ease both`,
            }}>
              {i > 0 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginLeft: 62 }} />
              )}
              <div style={{
                display: "flex", alignItems: "center",
                padding: "13px 16px", gap: 12,
              }}>
                {/* Photo thumbnail */}
                <div style={{
                  width: 38, height: 38, borderRadius: 9, overflow: "hidden",
                  background: `${BLUE}18`, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: BLUE,
                }}>
                  <img
                    src={loc.photo}
                    alt={loc.city}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {loc.city}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 1 }}>
                    {loc.label}
                  </div>
                </div>

                {/* Chevron */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 18,
          animation: "fadeUp 0.45s 0.72s ease both",
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>+383 48 188 415</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: BLUE }}>rrcar.vercel.app →</div>
        </div>
      </div>
    </div>
  );
}
