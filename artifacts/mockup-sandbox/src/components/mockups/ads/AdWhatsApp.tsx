export function AdWhatsApp() {
  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      display: "flex", flexDirection: "column", position: "relative",
      background: "#0a0c14",
    }}>
      {/* Subtle blue gradient */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />

      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", padding: "7vw" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "2vw" }}>
          <div style={{ width: "7vw", height: "7vw", borderRadius: "2vw", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "3.5vw", height: "2vw", borderRadius: "0.7vw", border: "0.3vw solid #3B82F6", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "-1.2vw", left: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
              <div style={{ position: "absolute", bottom: "-1.2vw", right: "0.5vw", width: "0.9vw", height: "0.9vw", borderRadius: "50%", background: "#3B82F6" }} />
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "3vw", fontWeight: 800, letterSpacing: "0.3em" }}>RRON</span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

          {/* WhatsApp bubble mock */}
          <div style={{ marginBottom: "6vw" }}>
            {/* Received bubble */}
            <div style={{ maxWidth: "70%", marginBottom: "2.5vw" }}>
              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "0 3vw 3vw 3vw", padding: "3vw 4vw" }}>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "3vw", margin: 0, lineHeight: 1.5 }}>Hi! I'd like to rent an Audi A5 for 3 days. Airport pickup? 🚗</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "2vw", margin: "1.5vw 0 0", textAlign: "right" }}>09:42 ✓✓</p>
              </div>
            </div>

            {/* Sent bubbles */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2vw" }}>
              <div style={{ maxWidth: "80%", background: "linear-gradient(135deg,#3B82F6,#2563EB)", borderRadius: "3vw 0 3vw 3vw", padding: "3vw 4vw", boxShadow: "0 1.5vw 4vw rgba(59,130,246,0.3)" }}>
                <p style={{ color: "#fff", fontSize: "3vw", margin: 0, lineHeight: 1.5 }}>Of course! Audi A5 available ✅<br />€85/day · Free airport pickup 🛬<br />When do you land?</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "2vw", margin: "1.5vw 0 0", textAlign: "right" }}>09:43 ✓✓</p>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h2 style={{ color: "#fff", fontSize: "10vw", fontWeight: 900, lineHeight: 0.95, margin: "0 0 4vw", letterSpacing: "-0.04em" }}>
            Book in<br />60 seconds.
          </h2>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "3.5vw", fontWeight: 300, lineHeight: 1.6, margin: "0 0 6vw", maxWidth: "75%" }}>
            Message us on WhatsApp — car confirmed instantly. No forms, no waiting.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "2vw", padding: "3vw 6vw", borderRadius: "2vw", background: "#25D366", color: "#fff", fontSize: "3.5vw", fontWeight: 700, boxShadow: "0 1.5vw 4vw rgba(37,211,102,0.35)" }}>
              <svg width="5vw" height="5vw" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "2.5vw" }}>+383 48 188 415</div>
          </div>
        </div>

        {/* Bottom tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "2.2vw", letterSpacing: "0.1em" }}>rentacarron.com</span>
          <div style={{ display: "flex", gap: "1.5vw" }}>
            {["Ferizaj", "Pristina", "Skopje"].map(c => (
              <span key={c} style={{ color: "rgba(255,255,255,0.2)", fontSize: "2vw" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
