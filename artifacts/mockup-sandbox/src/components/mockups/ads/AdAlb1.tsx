const SITE = "https://9118c3f6-0cb8-47e6-aef7-5d5447b4f0ab-00-1nbkuu2o727rc.riker.replit.dev";

export function AdAlb1() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
      background: "#080a12",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Live website — fleet page */}
      <div style={{ position: "relative", height: "68%", overflow: "hidden", flexShrink: 0 }}>
        <iframe
          src={`${SITE}/fleet`}
          style={{
            width: "175%", height: "175%",
            border: "none",
            transform: "scale(0.572) translateZ(0)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
          scrolling="no"
        />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
          background: "linear-gradient(to bottom, transparent, #080a12)",
          pointerEvents: "none",
        }} />
        {/* Top badge */}
        <div style={{
          position: "absolute", top: "4vw", left: "5vw",
          background: "rgba(59,130,246,0.18)",
          border: "1px solid rgba(59,130,246,0.45)",
          borderRadius: "10vw",
          padding: "1.2vw 3vw",
          color: "#3B82F6", fontSize: "2.4vw", fontWeight: 700,
          backdropFilter: "blur(8px)",
        }}>✈ Marrje nga Aeroporti</div>
      </div>

      {/* Bottom ad copy */}
      <div style={{
        flex: 1,
        padding: "0 6vw 5vw",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        gap: "3.5vw",
      }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "2.3vw", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.5vw" }}>
            RRON Rent A Car · Ferizaj, Kosovë
          </div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: "9.5vw", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            Veturët<br />
            <span style={{ color: "#3B82F6" }}>Tona.</span>
          </h2>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "2.8vw", fontWeight: 500, marginTop: "2vw" }}>
            14 vetura premium · Km pa limit · Çmime të arsyeshme
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
          <div style={{
            flex: 1, padding: "2.8vw 0", borderRadius: "2.2vw",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "#fff", fontSize: "3.2vw", fontWeight: 800, textAlign: "center",
            boxShadow: "0 2vw 6vw rgba(59,130,246,0.45)",
          }}>Shiko Flotën →</div>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "2.2vw",
            padding: "1.5vw 4vw",
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.8vw" }}>nga</span>
            <span style={{ color: "#fff", fontSize: "5.5vw", fontWeight: 900, lineHeight: 1 }}>€25</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.8vw" }}>/ditë</span>
          </div>
        </div>
      </div>
    </div>
  );
}
