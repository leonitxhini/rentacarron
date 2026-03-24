import { AdInstaStory } from "./AdInstaStory";
import { AdInstaStoryCars } from "./AdInstaStoryCars";
import { AdInstaStoryWeb } from "./AdInstaStoryWeb";
import { AdInstaStoryBook } from "./AdInstaStoryBook";
import { AdInstaSquare } from "./AdInstaSquare";
import { AdInstaPortrait } from "./AdInstaPortrait";
import AdLocations from "./AdLocations";
import { AdWhatsApp } from "./AdWhatsApp";
import { AdPremium } from "./AdPremium";
import { AdAirport } from "./AdAirport";
import AdWeekend from "./AdWeekend";
import AdFleet from "./AdFleet";

const BLUE = "#3B82F6";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center",
      marginTop: 10,
    }}>{children}</div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      margin: "48px 0 28px",
    }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

export function AdsGallery() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#04060d",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "48px 40px 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
          RRON Rent A Car
        </div>
        <h1 style={{ margin: 0, color: "#fff", fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>
          Ad Gallery
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginTop: 8 }}>
          Instagram Stories · Feed Posts · Square Ads
        </p>
      </div>

      {/* ── INSTAGRAM STORIES ── */}
      <Section title="Instagram Stories — 9:16" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { el: <AdInstaStory />,      label: "Locations",    w: 380, h: 675 },
          { el: <AdInstaStoryCars />,  label: "Cars",         w: 380, h: 675 },
          { el: <AdInstaStoryWeb />,   label: "Website Hero", w: 380, h: 675 },
          { el: <AdInstaStoryBook />,  label: "Booking",      w: 380, h: 675 },
        ].map(({ el, label, w, h }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: w, height: h, borderRadius: 16, overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              flexShrink: 0,
            }}>{el}</div>
            <Label>{label}</Label>
          </div>
        ))}
      </div>

      {/* ── INSTAGRAM FEED ── */}
      <Section title="Instagram Feed" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
        {[
          { el: <AdInstaSquare />,   label: "Square 1:1",    w: 530, h: 530 },
          { el: <AdInstaPortrait />, label: "Portrait 4:5",  w: 530, h: 663 },
        ].map(({ el, label, w, h }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: w, height: h, borderRadius: 16, overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              flexShrink: 0,
            }}>{el}</div>
            <Label>{label}</Label>
          </div>
        ))}
      </div>

      {/* ── SQUARE ADS ── */}
      <Section title="Square Ads — 1:1" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { el: <AdPremium />,   label: "Drive Premium" },
          { el: <AdLocations />, label: "Locations"     },
          { el: <AdAirport />,   label: "Airport"       },
          { el: <AdWhatsApp />,  label: "WhatsApp"      },
          { el: <AdWeekend />,   label: "Weekend Deal"  },
          { el: <AdFleet />,     label: "Fleet"         },
        ].map(({ el, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 530, height: 530, borderRadius: 16, overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              flexShrink: 0,
            }}>{el}</div>
            <Label>{label}</Label>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 64, color: "rgba(255,255,255,0.15)", fontSize: 12 }}>
        rentacarron.com · +383 48 188 415
      </div>
    </div>
  );
}
