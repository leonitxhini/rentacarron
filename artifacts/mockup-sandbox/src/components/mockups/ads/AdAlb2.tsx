import React from "react";

const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

const PlaneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.2.5.1 1.1.6 1.3l6.5 2.8-3.2 3.2-3.1-.8c-.4-.1-.9.1-1.1.5l-1.3 2.1c-.2.3 0 .7.3.9l4.5 1.8 1.8 4.5c.2.3.6.5.9.3l2.1-1.3c.4-.2.6-.7.5-1.1l-.8-3.1 3.2-3.2 2.8 6.5c.2.5.8.8 1.3.6l3.6-1.2c.5-.2.8-.6.7-1.1z"/>
  </svg>
);

const InfinityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/>
  </svg>
);

export function AdAlb2() {
  return (
    <div style={{
      width: "530px", 
      height: "530px", 
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#fff",
      display: "flex", 
      flexDirection: "column",
      position: "relative",
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        `}
      </style>

      {/* Top header bar */}
      <div style={{
        background: "#0a0c14",
        padding: "16px 22px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        flexShrink: 0,
        height: "60px",
        boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/__mockup/rron-logo.png"
            alt="RRON"
            style={{ height: "28px", filter: "brightness(0) invert(1)", objectFit: "contain" }}
          />
        </div>
        <div style={{
          padding: "8px 16px", 
          borderRadius: "20px",
          background: "#3B82F6",
          color: "#fff", 
          fontSize: "14px", 
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          Rezervo Tani <span>→</span>
        </div>
      </div>

      {/* Live website — homepage */}
      <div style={{ position: "relative", height: "42%", overflow: "hidden", flexShrink: 0, background: "#f8f9fa" }}>
        <iframe
          src={`${SITE}/`}
          style={{
            width: "1000px", 
            height: "800px",
            border: "none",
            transform: "scale(0.53) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
          title="RRON Rent A Car Preview"
        />
        {/* Gradient fade to white */}
        <div style={{
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: "80px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bottom CTA Section */}
      <div style={{
        background: "#fff",
        padding: "24px 28px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        {/* Headline & Price */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "4px" }}>
            <h1 style={{ 
              color: "#111", 
              fontSize: "44px", 
              fontWeight: 900, 
              lineHeight: 1.05, 
              letterSpacing: "-0.04em",
              margin: 0
            }}>
              Rezervo<br />Online
            </h1>
            <div style={{ color: "#3B82F6", fontSize: "16px", fontWeight: 600, letterSpacing: "-0.01em" }}>
              +383 48 188 415
            </div>
          </div>
          
          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
            <span style={{ color: "#888", fontSize: "12px", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase" }}>çmimi fillon nga</span>
            <div style={{ color: "#111", fontSize: "64px", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", margin: "-4px 0" }}>€25</div>
            <span style={{ color: "#888", fontSize: "14px", fontWeight: 500 }}>për ditë</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#eee", width: "100%", margin: "20px 0" }} />

        {/* Pill tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <div style={{
            padding: "6px 12px", borderRadius: "100px",
            background: "#F5F5F7",
            color: "#444", fontSize: "13px", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "6px"
          }}>
            <span>🇽🇰</span> Ferizaj
          </div>
          <div style={{
            padding: "6px 12px", borderRadius: "100px",
            background: "#F5F5F7",
            color: "#444", fontSize: "13px", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "6px"
          }}>
            <PlaneIcon /> Aeroport Prishtina
          </div>
          <div style={{
            padding: "6px 12px", borderRadius: "100px",
            background: "#F5F5F7",
            color: "#444", fontSize: "13px", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "6px"
          }}>
            <PlaneIcon /> Aeroport Shkup
          </div>
          <div style={{
            padding: "6px 12px", borderRadius: "100px",
            background: "#F5F5F7",
            color: "#444", fontSize: "13px", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "6px"
          }}>
            <InfinityIcon /> Km pa Limit
          </div>
        </div>
      </div>
    </div>
  );
}
