export function MacbookMockup() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: "70%",
        height: "50%",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
        top: "15%",
      }} />

      {/* MacBook body */}
      <div style={{ position: "relative", width: "82vw", maxWidth: 780 }}>

        {/* ── Lid / screen ── */}
        <div style={{
          position: "relative",
          background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 50%, #2a2a2c 100%)",
          borderRadius: "16px 16px 0 0",
          padding: "10px 10px 0 10px",
          boxShadow: `
            0 -4px 0 0 #4a4a4c,
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 -30px 80px rgba(0,0,0,0.5)
          `,
        }}>
          {/* Webcam notch */}
          <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a2a2c", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />
          </div>

          {/* Screen */}
          <div style={{
            background: "#000",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            aspectRatio: "16/10",
            position: "relative",
          }}>
            {/* ─── Website content ─── */}
            <div style={{ width: "100%", height: "100%", background: "#0a0c14", overflowY: "auto", display: "flex", flexDirection: "column" }}>

              {/* Navbar */}
              <div style={{ display: "flex", justifyContent: "center", padding: "14px 20px 0", position: "relative", zIndex: 10 }}>
                <nav style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  maxWidth: 800,
                  background: "rgba(10,12,20,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 40,
                  padding: "8px 16px",
                  backdropFilter: "blur(20px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 11, height: 6, borderRadius: 2, border: "1px solid #3B82F6", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: -2.5, left: 1.5, width: 2, height: 2, borderRadius: "50%", background: "#3B82F6" }} />
                        <div style={{ position: "absolute", bottom: -2.5, right: 1.5, width: 2, height: 2, borderRadius: "50%", background: "#3B82F6" }} />
                      </div>
                    </div>
                    <span style={{ color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: 3 }}>RRON</span>
                  </div>
                  <div style={{ display: "flex", gap: 20 }}>
                    {["HOME", "SERVICES", "FLEET", "FAQ", "CONTACT"].map((l, i) => (
                      <span key={l} style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: 600, letterSpacing: "0.15em", cursor: "pointer", position: "relative" }}>
                        {l}
                        {i === 0 && <span style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 3, height: 3, borderRadius: "50%", background: "#3B82F6" }} />}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "4px 10px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8 }}>Search...</span>
                  </div>
                </nav>
              </div>

              {/* Hero */}
              <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", padding: "20px 40px", overflow: "hidden" }}>
                {/* BG car glow */}
                <div style={{
                  position: "absolute",
                  right: "-5%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "55%",
                  height: "120%",
                  background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 60%)",
                  filter: "blur(20px)",
                }} />

                {/* Car silhouette placeholder */}
                <div style={{
                  position: "absolute",
                  right: "3%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.35,
                }}>
                  <div style={{ fontSize: "6vw", filter: "drop-shadow(0 8px 24px rgba(59,130,246,0.3))" }}>🚗</div>
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 7, fontWeight: 700, letterSpacing: 4, marginTop: 4 }}>RRON RENT A CAR</div>
                </div>

                {/* Text content */}
                <div style={{ maxWidth: "50%", position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 1, background: "#3B82F6" }} />
                    <span style={{ color: "#3B82F6", fontSize: 7, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Kosovo · Balkans · Europe</span>
                  </div>
                  <h1 style={{ color: "#fff", fontSize: "3.8vw", fontWeight: 900, lineHeight: 1.0, margin: "0 0 10px", letterSpacing: "-0.04em", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>
                    Premium<br />car rental
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, fontWeight: 300, lineHeight: 1.7, margin: "0 0 18px", maxWidth: "80%" }}>
                    Premium vehicles. Seamless booking. Uncompromising service across the Balkans.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {[
                        { icon: "⚡", label: "Unlimited KM" },
                        { icon: "✈️", label: "Airport Pickup" },
                      ].map(f => (
                        <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                          <span style={{ fontSize: 9 }}>{f.icon}</span>
                          {f.label}
                        </div>
                      ))}
                    </div>
                    <div style={{ width: 80, height: 1, background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                      <span style={{ fontSize: 9 }}>💬</span> Fast WhatsApp Booking
                    </div>
                  </div>
                </div>
              </div>

              {/* Search bar stripe */}
              <div style={{ padding: "0 24px 12px" }}>
                <div style={{
                  background: "rgba(17,19,24,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "8px 10px",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}>
                  {[
                    { icon: "📍", label: "Pick Up", val: "Select location..." },
                    { icon: "🏁", label: "Drop Off", val: "Select location..." },
                    { icon: "📅", label: "Pick Up Date", val: "Select date" },
                    { icon: "📅", label: "Drop Off Date", val: "Select date" },
                  ].map((f, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(59,130,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>{f.icon}</div>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 6, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700 }}>{f.label}</div>
                        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, fontWeight: 300 }}>{f.val}</div>
                      </div>
                    </div>
                  ))}
                  <button style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", fontSize: 8, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(59,130,246,0.35)", letterSpacing: "0.05em" }}>
                    Search Cars
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Hinge ── */}
        <div style={{
          height: 6,
          background: "linear-gradient(180deg, #2a2a2c 0%, #1a1a1c 100%)",
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)", width: "30%", height: 2, background: "rgba(255,255,255,0.04)", borderRadius: 1 }} />
        </div>

        {/* ── Base ── */}
        <div style={{
          position: "relative",
          height: 20,
          background: "linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 60%, #222 100%)",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 2px 0 #4a4a4c inset",
        }}>
          {/* Trackpad hint */}
          <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: "28%", height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.04)" }} />
          {/* Apple logo subtle */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, opacity: 0.08 }}>
            <svg viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          </div>
        </div>

        {/* Shadow on desk */}
        <div style={{
          height: 6,
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.6) 0%, transparent 70%)",
          borderRadius: "0 0 50% 50%",
          marginTop: 2,
        }} />
      </div>

      {/* Brand watermark */}
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, opacity: 0.35 }}>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.3)" }} />
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" }}>RRON Rent A Car</span>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </div>
  );
}
