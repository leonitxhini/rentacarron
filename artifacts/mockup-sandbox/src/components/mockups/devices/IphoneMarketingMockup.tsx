const SITE_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/";
const BASE = "/__mockup";

const BLUE = "#3B82F6";
const DARK = "#05070e";

// Phone screen sizes
const SCREEN_W_LG = 270;
const SCREEN_H_LG = 584;
const SITE_W      = 390;
const SCALE_LG    = SCREEN_W_LG / SITE_W;

const SCREEN_W_SM = 195;
const SCREEN_H_SM = 421;
const SCALE_SM    = SCREEN_W_SM / SITE_W;

function Phone({
  screenW, screenH, scale, scrollY = 0, rotate = 0,
  shadow = true, glow = false, src = SITE_URL,
}: {
  screenW: number; screenH: number; scale: number; scrollY?: number;
  rotate?: number; shadow?: boolean; glow?: boolean; src?: string;
}) {
  const PW = screenW + 32;
  const PH = screenH + 40;
  const BR = Math.round(50 * scale * 1.5);

  return (
    <div style={{
      position: "relative",
      width: PW, height: PH,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      flexShrink: 0,
    }}>
      {glow && (
        <div style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 65%)`,
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {/* Phone body */}
      <div style={{
        position: "relative",
        width: PW, height: PH,
        background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2d2d30 100%)",
        borderRadius: BR + 6,
        boxShadow: shadow ? `
          0 0 0 1.5px rgba(255,255,255,0.12),
          0 0 0 3px #1a1a1c,
          0 ${shadow ? 50 : 20}px ${shadow ? 100 : 40}px rgba(0,0,0,0.8),
          inset 0 1px 0 rgba(255,255,255,0.08)
        ` : "none",
        overflow: "hidden",
        zIndex: 1,
      }}>
        {/* Volume buttons */}
        <div style={{ position: "absolute", left: -2, top: Math.round(PH * 0.2), width: 2, height: Math.round(PH * 0.07), background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2, top: Math.round(PH * 0.3), width: 2, height: Math.round(PH * 0.07), background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        {/* Power */}
        <div style={{ position: "absolute", right: -2, top: Math.round(PH * 0.26), width: 2, height: Math.round(PH * 0.12), background: "#3a3a3c", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div style={{
          position: "absolute",
          inset: 8,
          background: "#000",
          borderRadius: BR,
          overflow: "hidden",
        }}>
          {/* Status bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 44,
            zIndex: 10, display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", padding: "0 18px 6px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
            pointerEvents: "none",
          }}>
            <span style={{ color: "#fff", fontSize: Math.round(12 * scale * 1.4), fontWeight: 600 }}>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <svg width={Math.round(16 * scale * 1.4)} height={Math.round(12 * scale * 1.4)} viewBox="0 0 16 12">
                <rect x="0" y="3" width="3" height="9" rx="1" fill="white" opacity="0.5"/>
                <rect x="4" y="2" width="3" height="10" rx="1" fill="white" opacity="0.7"/>
                <rect x="8" y="0" width="3" height="12" rx="1" fill="white" opacity="0.9"/>
                <rect x="12" y="0" width="3" height="12" rx="1" fill="white"/>
              </svg>
              <svg width={Math.round(25 * scale * 1.4)} height={Math.round(12 * scale * 1.4)} viewBox="0 0 25 12">
                <rect x="0" y="1" width="21" height="10" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.6"/>
                <rect x="1.5" y="2.5" width="17" height="7" rx="2" fill="white"/>
                <path d="M22 4v4c.83-.5 1.5-1.2 1.5-2S22.83 4.5 22 4z" fill="white" opacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div style={{
            position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
            width: Math.round(90 * scale * 1.4), height: Math.round(28 * scale * 1.4),
            background: "#000", borderRadius: 20, zIndex: 20,
          }} />

          {/* Website iframe */}
          <div style={{ width: screenW, height: screenH, overflow: "hidden", position: "relative" }}>
            <iframe
              src={src}
              style={{
                width: SITE_W, height: Math.round(screenH / scale),
                border: "none", transformOrigin: "top left",
                transform: `scale(${scale}) translateY(-${scrollY}px)`,
                display: "block", pointerEvents: "none",
              }}
              scrolling="no"
              title="RRON"
            />
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: Math.round(100 * scale * 1.4), height: 3, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

function Badge({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      backdropFilter: "blur(12px)",
      borderRadius: 14,
      padding: "12px 16px",
      ...style,
    }}>
      {children}
    </div>
  );
}

export function IphoneMarketingMockup() {
  return (
    <div style={{
      width: 1200, height: 720,
      background: DARK,
      position: "relative", overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; }`}</style>

      {/* Background glows */}
      <div style={{ position: "absolute", top: "15%", left: "25%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", top: "30%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "40%", width: 500, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />

      {/* Grid dots background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* ── LEFT PHONE (tilted back) ── */}
      <div style={{ position: "absolute", left: 48, top: "50%", transform: "translateY(-50%) rotate(-8deg)", opacity: 0.85, filter: "brightness(0.8)" }}>
        <Phone screenW={SCREEN_W_SM} screenH={SCREEN_H_SM} scale={SCALE_SM} scrollY={200} shadow={false} />
      </div>

      {/* ── RIGHT PHONE (tilted back) ── */}
      <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%) rotate(8deg)", opacity: 0.85, filter: "brightness(0.8)" }}>
        <Phone screenW={SCREEN_W_SM} screenH={SCREEN_H_SM} scale={SCALE_SM} scrollY={120} shadow={false} />
      </div>

      {/* ── CENTER PHONE (hero) ── */}
      <div style={{ position: "relative", zIndex: 10, filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.9))" }}>
        <Phone screenW={SCREEN_W_LG} screenH={SCREEN_H_LG} scale={SCALE_LG} glow shadow />
      </div>

      {/* ── BADGES ── */}

      {/* Top-left: Logo badge */}
      <div style={{ position: "absolute", top: 32, left: 32, display: "flex", alignItems: "center", gap: 10 }}>
        <img src={`${BASE}/rron-logo.png`} alt="RRON" style={{ height: 28, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 500 }}>rentacarron.com</div>
      </div>

      {/* Top-right: Device label */}
      <Badge style={{ position: "absolute", top: 28, right: 32, display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M18 1H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM9.5 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM12 21a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>iPhone 16 Pro</span>
      </Badge>

      {/* Bottom-left: Rating badge */}
      <Badge style={{ position: "absolute", bottom: 36, left: 32 }}>
        <div style={{ color: "#FFD60A", fontSize: 16 }}>★★★★★</div>
        <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, marginTop: 2 }}>5.0 Rating</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 1 }}>400+ klientë</div>
      </Badge>

      {/* Bottom-center-left: Service pill */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-260px)",
        background: `linear-gradient(135deg, ${BLUE}, #2563EB)`,
        borderRadius: 100, padding: "8px 16px",
        display: "flex", alignItems: "center", gap: 8,
        boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>∞ Km Falas</span>
      </div>

      {/* Bottom-center-right: WhatsApp pill */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(100px)",
        background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)",
        borderRadius: 100, padding: "8px 16px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 14 }}>💬</span>
        <span style={{ color: "#25D366", fontSize: 12, fontWeight: 700 }}>WhatsApp</span>
      </div>

      {/* Bottom-right: Airport badge */}
      <Badge style={{ position: "absolute", bottom: 36, right: 32 }}>
        <div style={{ color: BLUE, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>4</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>Aeroportet</div>
        <div style={{ color: "#fff", fontSize: 11, fontWeight: 600, marginTop: 2 }}>Prishtina · Shkup</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Kukës · Ferizaj</div>
      </Badge>

      {/* Top-center: LIVE indicator */}
      <div style={{
        position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
        borderRadius: 100, padding: "6px 14px",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, boxShadow: "0 0 6px rgba(59,130,246,0.8)" }} />
        <span style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>LIVE PREVIEW</span>
      </div>

      {/* Mid-left floating card */}
      <Badge style={{ position: "absolute", top: "38%", left: 40, maxWidth: 130 }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>€25</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>nga / ditë</div>
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, marginTop: 6 }}>→ Rezervo tani</div>
      </Badge>

      {/* Mid-right floating card */}
      <Badge style={{ position: "absolute", top: "42%", right: 36, maxWidth: 140 }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>FLOTA JONË</div>
        {[["Audi A6","€75"],["Audi A5","€70"],["Golf 8","€50"]].map(([car, price]) => (
          <div key={car} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 500 }}>{car}</span>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{price}</span>
          </div>
        ))}
      </Badge>
    </div>
  );
}
