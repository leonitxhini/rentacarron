import React from "react";

const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdAlb3() {
  return (
    <div style={{
      width: "530px",
      height: "530px",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      background: "#07080e",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
    }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}
      </style>

      {/* Subtle radial glow centered behind the phone */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Top headline block */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "18px" }}>
        <div style={{
          color: "#3B82F6",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "6px"
        }}>
          RRON RENT A CAR
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 1.0,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: "8px"
        }}>
          <span style={{ color: "#fff", fontSize: "60px", letterSpacing: "1px" }}>
            Merr Veturë
          </span>
          <span style={{ color: "#a1a1aa", fontSize: "45px", letterSpacing: "0.5px" }}>
            me Qira Online
          </span>
        </div>
      </div>

      {/* Phone mockup frame */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: "22px" }}>
        {/* Buttons SVG on the left/right */}
        <svg
          width="216"
          height="280"
          viewBox="0 0 216 280"
          style={{ position: "absolute", top: 0, left: "-8px", pointerEvents: "none" }}
        >
          {/* Left buttons (Volume up, Volume down, Action) */}
          <rect x="0" y="60" width="8" height="14" rx="3" fill="#333" />
          <rect x="0" y="85" width="8" height="24" rx="3" fill="#333" />
          <rect x="0" y="115" width="8" height="24" rx="3" fill="#333" />
          {/* Right button (Power) */}
          <rect x="208" y="95" width="8" height="35" rx="3" fill="#333" />
        </svg>

        <div style={{
          position: "relative",
          width: "200px",
          height: "280px",
          borderRadius: "28px",
          background: "#000",
          border: "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 50px rgba(59,130,246,0.18), 0 20px 40px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}>
          {/* Side reflection (glass effect) */}
          <div style={{
            position: "absolute",
            top: "10%",
            bottom: "10%",
            right: 0,
            width: "1.5px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
            zIndex: 10,
          }} />

          {/* Dynamic Island */}
          <div style={{
            position: "absolute",
            top: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "48px",
            height: "7px",
            borderRadius: "10px",
            background: "#000",
            zIndex: 10,
            boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)"
          }} />

          {/* Iframe */}
          <div style={{ width: "200px", height: "280px", overflow: "hidden", borderRadius: "26px" }}>
            <iframe
              src={`${SITE}/`}
              style={{
                width: "400px",
                height: "560px",
                border: "none",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
                background: "#111827",
              }}
              scrolling="no"
              title="RRON Rent A Car"
            />
          </div>

          {/* Bottom fade gradient */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70px",
            background: "linear-gradient(to bottom, transparent, rgba(7,8,14,0.95))",
            pointerEvents: "none",
            zIndex: 5,
          }} />
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", boxSizing: "border-box" }}>
        {/* Pills */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["14 Vetura", "Nga €25/ditë", "Km pa Limit"].map((text) => (
            <div key={text} style={{
              padding: "5px 12px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.9)",
              fontSize: "12px",
              fontWeight: 500,
              backdropFilter: "blur(8px)",
            }}>
              {text}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "14px", width: "100%", maxWidth: "360px" }}>
          <div style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "100px",
            background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(59,130,246,0.3)",
          }}>
            💬 WhatsApp
          </div>
          <div style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}>
            Shiko Flotën
          </div>
        </div>
      </div>
    </div>
  );
}
