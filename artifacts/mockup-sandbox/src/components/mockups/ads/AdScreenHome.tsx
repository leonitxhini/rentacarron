const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdScreenHome() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      background: "#fff",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* RRON header bar */}
      <div style={{
        background: "#0a0c14",
        padding: "4vw 6vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
          <div style={{
            width: "6vw", height: "6vw", borderRadius: "1.6vw",
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: "3vw", height: "1.7vw", borderRadius: "0.6vw", border: "0.28vw solid #3B82F6", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "-1vw", left: "0.4vw", width: "0.8vw", height: "0.8vw", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "-1vw", right: "0.4vw", width: "0.8vw", height: "0.8vw", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <span style={{ color: "#fff", fontSize: "3vw", fontWeight: 800, letterSpacing: "0.3em" }}>RRON</span>
        </div>
        <div style={{
          padding: "1.5vw 4vw", borderRadius: "1.5vw",
          background: "#3B82F6",
          color: "#fff", fontSize: "2.5vw", fontWeight: 700,
        }}>Shiko Flotën →</div>
      </div>

      {/* Live website — homepage, middle */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <iframe
          src={`${SITE}/`}
          style={{
            width: "180%",
            height: "180%",
            border: "none",
            transform: "scale(0.555) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.97))",
          pointerEvents: "none",
        }} />
      </div>

      {/* Bottom CTA */}
      <div style={{
        background: "#fff",
        padding: "4vw 6vw 6vw",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#111", fontSize: "5vw", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" }}>
              Rezervo Online
            </div>
            <div style={{ color: "#3B82F6", fontSize: "2.5vw", fontWeight: 600, marginTop: "1vw" }}>
              +383 48 188 415 · WhatsApp
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1vw",
          }}>
            <div style={{ color: "#999", fontSize: "2vw" }}>nga</div>
            <div style={{ color: "#111", fontSize: "7vw", fontWeight: 900, lineHeight: 1 }}>€30</div>
            <div style={{ color: "#999", fontSize: "2vw" }}>/ditë</div>
          </div>
        </div>

        <div style={{
          marginTop: "4vw",
          display: "flex", gap: "2.5vw",
        }}>
          {["🇽🇰 Ferizaj", "🇽🇰 Prishtinë", "✈ Airport Pickup"].map(t => (
            <div key={t} style={{
              padding: "1.5vw 3vw", borderRadius: "10vw",
              background: "#F5F5F7",
              color: "#555", fontSize: "2.2vw", fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
