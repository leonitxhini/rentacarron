const SITE_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/";

// Phone screen inner area: ~269px wide × 549px tall
// Website renders at 390px wide → scale = 269/390 ≈ 0.69
const SCREEN_W = 269;
const SCREEN_H = 549;
const SITE_W = 390;
const SITE_H = 844;
const SCALE = SCREEN_W / SITE_W;

export function IphoneMockup() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Glow behind phone */}
      <div style={{
        position: "absolute",
        width: 340,
        height: 640,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, transparent 70%)",
        filter: "blur(50px)",
        borderRadius: "50%",
      }} />

      {/* iPhone 15 Pro body */}
      <div style={{
        position: "relative",
        width: 285,
        height: 580,
        background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2a2a2c 100%)",
        borderRadius: 50,
        boxShadow: `
          0 0 0 1.5px #4a4a4c,
          0 0 0 2.5px #2a2a2c,
          0 40px 80px rgba(0,0,0,0.7),
          0 20px 40px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,255,255,0.08)
        `,
        overflow: "hidden",
      }}>
        {/* Volume buttons */}
        <div style={{ position: "absolute", left: -3, top: 110, width: 3, height: 32, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 155, width: 3, height: 32, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        {/* Power button */}
        <div style={{ position: "absolute", right: -3, top: 140, width: 3, height: 56, background: "#3a3a3c", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div style={{
          position: "absolute",
          inset: 8,
          background: "#000",
          borderRadius: 43,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Status bar — rendered on top of site */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 44,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 20px 6px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
            pointerEvents: "none",
          }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="white" opacity="0.5"/><rect x="4" y="2" width="3" height="10" rx="1" fill="white" opacity="0.7"/><rect x="8" y="0" width="3" height="12" rx="1" fill="white" opacity="0.9"/><rect x="12" y="0" width="3" height="12" rx="1" fill="white"/></svg>
              <svg width="15" height="11" viewBox="0 0 24 18"><path d="M12 4C7.58 4 3.61 5.68.56 8.43L2 9.87C4.65 7.5 8.17 6 12 6s7.35 1.5 10 3.87l1.44-1.44C20.39 5.68 16.42 4 12 4z" fill="white" opacity="0.5"/><path d="M12 8c-2.76 0-5.26 1.12-7.08 2.92L6.36 12.36C7.8 10.88 9.79 10 12 10s4.2.88 5.64 2.36l1.44-1.44C17.26 9.12 14.76 8 12 8z" fill="white" opacity="0.8"/><path d="M12 12c-1.38 0-2.63.56-3.54 1.46L12 17l3.54-3.54C14.63 12.56 13.38 12 12 12z" fill="white"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0" y="1" width="21" height="10" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.6"/><rect x="1.5" y="2.5" width="17" height="7" rx="2" fill="white"/><path d="M22 4v4c.83-.5 1.5-1.2 1.5-2S22.83 4.5 22 4z" fill="white" opacity="0.5"/></svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 28,
            background: "#000",
            borderRadius: 20,
            zIndex: 20,
          }} />

          {/* Live website iframe */}
          <div style={{
            width: SCREEN_W,
            height: SCREEN_H,
            overflow: "hidden",
            borderRadius: 35,
            position: "relative",
            flex: 1,
          }}>
            <iframe
              src={SITE_URL}
              style={{
                width: SITE_W,
                height: SITE_H,
                border: "none",
                transformOrigin: "top left",
                transform: `scale(${SCALE})`,
                display: "block",
                pointerEvents: "none",
              }}
              scrolling="no"
              title="RRON Mobile"
            />
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 100, height: 4, background: "rgba(255,255,255,0.28)", borderRadius: 2 }} />
      </div>
    </div>
  );
}
