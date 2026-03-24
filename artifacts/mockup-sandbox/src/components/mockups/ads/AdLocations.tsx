const LOCATIONS = [
  {
    city: "Ferizaj",
    label: "Main Office",
    detail: "Kosovo · 70000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    city: "Prishtinë",
    label: "City Center",
    detail: "Kosovo · 10000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    city: "Airport",
    label: "Pristina Intl.",
    detail: "Pickup & Drop-off",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l-1 1 7 3L5 14l-2 1 6 4z"/>
      </svg>
    ),
  },
];

export default function AdLocations() {
  const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";
  const blue = "#0A84FF";
  const bg = "#000000";
  const cardBg = "rgba(255,255,255,0.06)";
  const separator = "rgba(255,255,255,0.1)";

  return (
    <div style={{
      width: 530,
      height: 530,
      background: bg,
      fontFamily: appleFont,
      display: "flex",
      flexDirection: "column",
      padding: "44px 40px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        top: "-120px",
        right: "-80px",
        width: "360px",
        height: "360px",
        background: `radial-gradient(circle, ${blue}18 0%, transparent 70%)`,
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px" }}>
        <div>
          <div style={{
            fontSize: "11px",
            fontWeight: 600,
            color: blue,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            RRON RENT A CAR
          </div>
          <div style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}>
            Find us<br />near you.
          </div>
        </div>

        {/* Pin icon */}
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: `${blue}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: blue,
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={blue}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      </div>

      {/* Location cards */}
      <div style={{
        background: cardBg,
        borderRadius: "18px",
        border: `1px solid ${separator}`,
        overflow: "hidden",
        flex: 1,
      }}>
        {LOCATIONS.map((loc, i) => (
          <div key={i}>
            {i > 0 && (
              <div style={{
                height: "1px",
                background: separator,
                marginLeft: "60px",
              }} />
            )}
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 22px",
              gap: "16px",
            }}>
              {/* Icon */}
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: `${blue}1A`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: blue,
                flexShrink: 0,
              }}>
                {loc.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "-0.2px",
                  marginBottom: "2px",
                }}>
                  {loc.city}
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 400,
                }}>
                  {loc.label} · {loc.detail}
                </div>
              </div>

              {/* Chevron */}
              <div style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "24px",
      }}>
        <div style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}>
          +383 48 188 415
        </div>
        <div style={{
          fontSize: "13px",
          fontWeight: 500,
          color: blue,
          letterSpacing: "0.01em",
        }}>
          rrcar.vercel.app →
        </div>
      </div>
    </div>
  );
}
