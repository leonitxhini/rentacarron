const VIDEO_URL = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev/rron-video-ad/";

// Phone inner screen: 290 × 580
const SCREEN_W = 290;
const SCREEN_H = 580;

export function IphoneVideoMockup() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(145deg, #0a0a0f 0%, #0d0d1a 50%, #0a0f1e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      overflow: "hidden",
    }}>
      {/* Ambient glow behind the phone */}
      <div style={{
        position: "absolute",
        width: 380,
        height: 680,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 65%)",
        filter: "blur(60px)",
        borderRadius: "50%",
      }} />

      {/* Label above */}
      <div style={{
        position: "absolute",
        top: "calc(50% - 360px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          RRON Rent A Car · Video Ad
        </div>
        <div style={{
          width: 40,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
          borderRadius: 2,
        }} />
      </div>

      {/* iPhone 15 Pro body */}
      <div style={{
        position: "relative",
        width: SCREEN_W + 18,
        height: SCREEN_H + 34,
        background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 100%)",
        borderRadius: 54,
        boxShadow: `
          0 0 0 1.5px #4a4a4c,
          0 0 0 3px #1a1a1c,
          0 60px 120px rgba(0,0,0,0.8),
          0 30px 60px rgba(0,0,0,0.6),
          inset 0 1px 0 rgba(255,255,255,0.07),
          inset 0 -1px 0 rgba(0,0,0,0.4)
        `,
      }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3.5, top: 118, width: 3.5, height: 34, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3.5, top: 164, width: 3.5, height: 34, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3.5, top: 210, width: 3.5, height: 34, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3.5, top: 148, width: 3.5, height: 62, background: "#3a3a3c", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div style={{
          position: "absolute",
          inset: 9,
          background: "#000",
          borderRadius: 46,
          overflow: "hidden",
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: "absolute",
            top: 11,
            left: "50%",
            transform: "translateX(-50%)",
            width: 96,
            height: 30,
            background: "#000",
            borderRadius: 22,
            zIndex: 20,
          }} />

          {/* Status bar overlay */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 50,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 22px 8px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
            pointerEvents: "none",
          }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {/* Signal */}
              <svg width="16" height="12" viewBox="0 0 16 12">
                <rect x="0" y="3" width="3" height="9" rx="1" fill="white" opacity="0.5"/>
                <rect x="4" y="2" width="3" height="10" rx="1" fill="white" opacity="0.7"/>
                <rect x="8" y="0" width="3" height="12" rx="1" fill="white" opacity="0.9"/>
                <rect x="12" y="0" width="3" height="12" rx="1" fill="white"/>
              </svg>
              {/* Wifi */}
              <svg width="15" height="11" viewBox="0 0 24 18">
                <path d="M12 4C7.58 4 3.61 5.68.56 8.43L2 9.87C4.65 7.5 8.17 6 12 6s7.35 1.5 10 3.87l1.44-1.44C20.39 5.68 16.42 4 12 4z" fill="white" opacity="0.5"/>
                <path d="M12 8c-2.76 0-5.26 1.12-7.08 2.92L6.36 12.36C7.8 10.88 9.79 10 12 10s4.2.88 5.64 2.36l1.44-1.44C17.26 9.12 14.76 8 12 8z" fill="white" opacity="0.8"/>
                <path d="M12 12c-1.38 0-2.63.56-3.54 1.46L12 17l3.54-3.54C14.63 12.56 13.38 12 12 12z" fill="white"/>
              </svg>
              {/* Battery */}
              <svg width="25" height="12" viewBox="0 0 25 12">
                <rect x="0" y="1" width="21" height="10" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.6"/>
                <rect x="1.5" y="2.5" width="17" height="7" rx="2" fill="white"/>
                <path d="M22 4v4c.83-.5 1.5-1.2 1.5-2S22.83 4.5 22 4z" fill="white" opacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Video Ad iframe — fills full screen */}
          <iframe
            src={VIDEO_URL}
            style={{
              width: SCREEN_W,
              height: SCREEN_H,
              border: "none",
              display: "block",
              background: "#000",
            }}
            title="RRON Video Ad"
            allow="autoplay"
          />
        </div>

        {/* Home indicator */}
        <div style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 110,
          height: 5,
          background: "rgba(255,255,255,0.25)",
          borderRadius: 3,
        }} />
      </div>
    </div>
  );
}
