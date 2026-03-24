const reviews = [
  { name: "Arben M.", city: "Prishtinë", text: "Unglaublicher Service! Das Auto war makellos sauber und der Fahrer pünktlich. Absolut empfehlenswert!", stars: 5 },
  { name: "Florim K.", city: "Ferizaj", text: "Beste Mietwagenerfahrung meines Lebens. Günstig, zuverlässig, top Fahrzeuge. Nächstes Mal wieder RRON!", stars: 5 },
  { name: "Sara D.", city: "Pristina", text: "Airport Pickup war perfekt organisiert. Genau das, was man braucht nach langer Reise. 5 Sterne!", stars: 5 },
];

const StarRow = ({ n }: { n: number }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} style={{ color: "#F5C518", fontSize: 14 }}>★</span>
    ))}
  </div>
);

export default function AdReview() {
  const r = reviews[1];
  return (
    <div style={{
      width: 530, height: 530,
      background: "#0b0b0f",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0 0 32px",
    }}>
      {/* Top gradient */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 260,
        background: "linear-gradient(180deg, rgba(59,130,246,0.08) 0%, transparent 100%)",
      }} />

      {/* Top bar */}
      <div style={{
        position: "relative",
        padding: "28px 32px 0",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={{ color: "#3B82F6", fontSize: 11, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 4 }}>KUNDENSTIMMEN</div>
          <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>Was unsere<br />Kunden sagen</div>
        </div>
        <div style={{
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: "50%",
          width: 52, height: 52,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>💬</div>
      </div>

      {/* Quote card */}
      <div style={{
        position: "relative",
        margin: "24px 28px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "24px 26px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Big quote mark */}
        <div style={{
          position: "absolute", top: -20, left: 20,
          fontSize: 80, color: "rgba(59,130,246,0.25)", lineHeight: 1, fontFamily: "Georgia",
        }}>"</div>

        <div>
          <StarRow n={r.stars} />
          <div style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 17,
            lineHeight: 1.65,
            marginTop: 14,
            fontStyle: "italic",
          }}>
            "{r.text}"
          </div>
        </div>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 16, fontWeight: 700,
          }}>{r.name[0]}</div>
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{r.name}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{r.city}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Verifiziert ✓</div>
          </div>
        </div>
      </div>

      {/* Bottom stats row */}
      <div style={{
        position: "relative",
        padding: "0 28px",
        display: "flex", gap: 12,
      }}>
        {[
          { value: "4.9★", label: "Bewertung" },
          { value: "200+", label: "Kunden" },
          { value: "14", label: "Fahrzeuge" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "12px 8px",
            textAlign: "center",
          }}>
            <div style={{ color: "#3B82F6", fontSize: 18, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginTop: 2, letterSpacing: "0.1em" }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        position: "relative",
        textAlign: "center",
        marginTop: 20,
        color: "rgba(255,255,255,0.2)",
        fontSize: 11,
        letterSpacing: "0.2em",
      }}>RRON RENT A CAR · FERIZAJ · KOSOVO</div>
    </div>
  );
}
