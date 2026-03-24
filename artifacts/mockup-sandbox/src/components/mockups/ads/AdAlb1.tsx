const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdAlb1() {
  return (
    <div style={{
      width: "530px",
      height: "530px",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', sans-serif",
      background: "#06080f",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxSizing: "border-box",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-entrance {
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-fill-mode: both;
          }
        `}
      </style>

      {/* Background texture / scanline */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0px, rgba(59, 130, 246, 0.03) 1px, transparent 1px, transparent 4px)",
        pointerEvents: "none", zIndex: 1
      }} />

      {/* Live website — fleet page (~60% height) */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", overflow: "hidden", zIndex: 0 }}>
        <iframe
          src={`${SITE}/fleet`}
          style={{
            width: "100%", height: "100%",
            border: "none",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom fade into background */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to bottom, rgba(6,8,15,0) 0%, rgba(6,8,15,0.8) 50%, #06080f 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Content Grid */}
      <div style={{
        position: "relative", zIndex: 2,
        flex: 1,
        display: "flex", flexDirection: "column",
        padding: "28px",
        height: "100%",
        boxSizing: "border-box",
      }}>
        
        {/* Top Zone: Badge & Brand */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          {/* Badge */}
          <div className="animate-entrance" style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "999px",
            padding: "6px 12px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            animationDelay: "0.1s"
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 3 4 4 3 1-1-1-3 4-4 5 6l1.2-.7c.4-.2.7-.6.6-1.1z"/>
            </svg>
            <span style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.02em" }}>
              Marrje nga Aeroporti
            </span>
          </div>

          {/* Brand */}
          <div className="animate-entrance" style={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            animationDelay: "0.2s"
          }}>
            RRON
          </div>
        </div>

        {/* Middle Zone: Headline block */}
        <div style={{ marginTop: "auto", marginBottom: "24px" }}>
          <h2 className="animate-entrance" style={{ 
            margin: 0, 
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#ffffff", 
            fontSize: "92px", 
            lineHeight: 0.85,
            letterSpacing: "0.02em",
            animationDelay: "0.3s"
          }}>
            VETURËT<br />
            <span style={{ color: "#3B82F6" }}>TONA.</span>
          </h2>
          <div className="animate-entrance" style={{ 
            color: "#94a3b8", 
            fontSize: "14px", 
            fontWeight: 500, 
            marginTop: "12px",
            letterSpacing: "-0.01em",
            animationDelay: "0.4s"
          }}>
            14 vetura premium · Km pa limit · Çmime të arsyeshme
          </div>
        </div>

        {/* Bottom Zone: CTA Row */}
        <div className="animate-entrance" style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          gap: "16px",
          animationDelay: "0.5s"
        }}>
          {/* CTA Button */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: "linear-gradient(135deg, #3B82F6 0%, #1d4ed8 100%)",
            borderRadius: "999px",
            padding: "16px 28px",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 700,
            boxShadow: "0 8px 24px -8px rgba(59, 130, 246, 0.6)",
            cursor: "pointer",
            flex: 1
          }}>
            Shiko Flotën
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          {/* Price Badge */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "10px 20px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}>
            <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "-2px" }}>nga</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>€25</span>
              <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", fontWeight: 600 }}>/ditë</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
