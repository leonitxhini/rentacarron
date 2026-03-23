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
        width: 320,
        height: 600,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
        filter: "blur(40px)",
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
        {/* Side buttons — volume */}
        <div style={{ position: "absolute", left: -3, top: 110, width: 3, height: 32, background: "#3a3a3c", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.4)" }} />
        <div style={{ position: "absolute", left: -3, top: 155, width: 3, height: 32, background: "#3a3a3c", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.4)" }} />
        {/* Side button — power */}
        <div style={{ position: "absolute", right: -3, top: 140, width: 3, height: 56, background: "#3a3a3c", borderRadius: "0 2px 2px 0", boxShadow: "1px 0 2px rgba(0,0,0,0.4)" }} />

        {/* Screen bezel */}
        <div style={{
          position: "absolute",
          inset: 8,
          background: "#000",
          borderRadius: 43,
          overflow: "hidden",
        }}>
          {/* ─── Screen content ─── */}
          <div style={{ width: "100%", height: "100%", background: "#0a0c14", overflowY: "auto", position: "relative" }}>

            {/* Status bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 8px", position: "relative", zIndex: 10 }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>9:41</span>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="white" opacity="0.4"/><rect x="4" y="2" width="3" height="10" rx="1" fill="white" opacity="0.6"/><rect x="8" y="0" width="3" height="12" rx="1" fill="white" opacity="0.8"/><rect x="12" y="0" width="3" height="12" rx="1" fill="white"/></svg>
                <svg width="16" height="12" viewBox="0 0 24 18"><path d="M12 4C7.58 4 3.61 5.68.56 8.43L2 9.87C4.65 7.5 8.17 6 12 6s7.35 1.5 10 3.87l1.44-1.44C20.39 5.68 16.42 4 12 4z" fill="white" opacity="0.4"/><path d="M12 8c-2.76 0-5.26 1.12-7.08 2.92L6.36 12.36C7.8 10.88 9.79 10 12 10s4.2.88 5.64 2.36l1.44-1.44C17.26 9.12 14.76 8 12 8z" fill="white" opacity="0.7"/><path d="M12 12c-1.38 0-2.63.56-3.54 1.46L12 17l3.54-3.54C14.63 12.56 13.38 12 12 12z" fill="white"/></svg>
                <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0" y="1" width="21" height="10" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.5"/><rect x="1.5" y="2.5" width="16" height="7" rx="2" fill="white"/><path d="M22 4v4c.83-.5 1.5-1.2 1.5-2S22.83 4.5 22 4z" fill="white" opacity="0.5"/></svg>
              </div>
            </div>

            {/* Dynamic island */}
            <div style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 90,
              height: 30,
              background: "#000",
              borderRadius: 20,
              zIndex: 20,
            }} />

            {/* Hero section */}
            <div style={{ position: "relative", padding: "8px 0 24px", background: "#0a0c14", overflow: "hidden" }}>
              {/* Background car silhouette */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%)",
              }} />

              {/* Navbar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 18px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 8, borderRadius: 3, border: "1.5px solid #3B82F6", position: "relative" }}>
                      <div style={{ position: "absolute", bottom: -3, left: 2, width: 3, height: 3, borderRadius: "50%", background: "#3B82F6" }} />
                      <div style={{ position: "absolute", bottom: -3, right: 2, width: 3, height: 3, borderRadius: "50%", background: "#3B82F6" }} />
                    </div>
                  </div>
                  <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>RRON</span>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                    {[14, 10, 14].map((w, i) => (
                      <div key={i} style={{ width: w, height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 1 }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hero text */}
              <div style={{ padding: "0 18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 16, height: 1, background: "#3B82F6" }} />
                  <span style={{ color: "#3B82F6", fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Kosovo · Balkans</span>
                </div>
                <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                  Premium<br />car rental
                </h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 300, lineHeight: 1.6, margin: "0 0 16px" }}>
                  Premium vehicles. Seamless booking across the Balkans.
                </p>

                {/* Feature badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Unlimited KM", "Airport Pickup", "WhatsApp"].map(b => (
                    <div key={b} style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60A5FA", fontSize: 8, fontWeight: 500, letterSpacing: "0.05em" }}>{b}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Search widget */}
            <div style={{ margin: "0 12px", background: "rgba(17,19,24,0.95)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "10px 12px", backdropFilter: "blur(20px)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
              {[
                { label: "Pick Up", val: "Select location...", icon: "📍" },
                { label: "Drop Off", val: "Select location...", icon: "🏁" },
              ].map((f, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "6px 0" }} />}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{f.icon}</div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, marginBottom: 1 }}>{f.label}</div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 300 }}>{f.val}</div>
                    </div>
                  </div>
                </div>
              ))}
              <button style={{ marginTop: 10, width: "100%", padding: "8px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(59,130,246,0.35)", letterSpacing: "0.05em" }}>
                Search Cars
              </button>
            </div>

            {/* Fleet section */}
            <div style={{ padding: "20px 12px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 16, height: 1, background: "#3B82F6" }} />
                    <span style={{ color: "#3B82F6", fontSize: 7, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>Discover</span>
                  </div>
                  <h2 style={{ color: "#111", fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Our Fleet</h2>
                </div>
                <span style={{ color: "#3B82F6", fontSize: 9, fontWeight: 500 }}>View all →</span>
              </div>

              {/* Car cards */}
              {[
                { make: "Audi A5", price: "85", cat: "Premium · 2021 · Dark Blue" },
                { make: "VW Golf 8", price: "58", cat: "Compact · 2021 · Black" },
              ].map((car, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, marginBottom: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 90, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ fontSize: 36 }}>🚗</div>
                    <div style={{ position: "absolute", top: 8, right: 8, padding: "3px 8px", borderRadius: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <span style={{ color: "#3B82F6", fontSize: 8, fontWeight: 600 }}>Available</span>
                    </div>
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 2 }}>{car.make}</div>
                        <div style={{ fontSize: 8, color: "#888", fontWeight: 400 }}>{car.cat}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>€{car.price}</span>
                        <span style={{ fontSize: 9, color: "#888" }}>/day</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {["5 seats", "Auto", "Diesel"].map(s => (
                        <div key={s} style={{ padding: "2px 7px", borderRadius: 6, background: "#F5F5F7", color: "#3B82F6", fontSize: 7, fontWeight: 600, letterSpacing: "0.08em" }}>{s}</div>
                      ))}
                    </div>
                    <button style={{ marginTop: 8, width: "100%", padding: "6px 0", borderRadius: 8, border: "none", background: "#111", color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 100, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
      </div>
    </div>
  );
}
