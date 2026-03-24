import { useRef } from "react";
import { toPng } from "html-to-image";
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

function DownloadBtn({ label, nodeRef, filename }: { label: string; nodeRef: React.RefObject<HTMLDivElement>; filename: string }) {
  const download = async () => {
    if (!nodeRef.current) return;
    try {
      const dataUrl = await toPng(nodeRef.current, { pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `rron-${filename}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button onClick={download} style={{
      marginTop: 10, padding: "7px 18px",
      background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)",
      borderRadius: 100, color: BLUE, fontSize: 11, fontWeight: 700,
      cursor: "pointer", letterSpacing: "0.08em",
      display: "flex", alignItems: "center", gap: 6,
      transition: "background 0.2s",
    }}
    onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.25)")}
    onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.12)")}>
      ↓ Download {label}
    </button>
  );
}

function AdCard({ children, label, filename, w, h }: { children: React.ReactNode; label: string; filename: string; w: number; h: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div ref={ref} style={{ width: w, height: h, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", flexShrink: 0 }}>
        {children}
      </div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", marginTop: 10 }}>
        {label}
      </div>
      <DownloadBtn label="PNG" nodeRef={ref} filename={filename} />
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "48px 0 28px" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

export function AdsGallery() {
  return (
    <div style={{ minHeight: "100vh", background: "#04060d", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", padding: "48px 40px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>RRON Rent A Car</div>
        <h1 style={{ margin: 0, color: "#fff", fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>Ad Gallery</h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginTop: 8 }}>Click ↓ Download on any ad to save it as PNG</p>
      </div>

      {/* ── INSTAGRAM STORIES ── */}
      <Section title="Instagram Stories — 9:16" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        <AdCard label="Locations"    filename="story-locations" w={380} h={675}><AdInstaStory /></AdCard>
        <AdCard label="Cars"         filename="story-cars"      w={380} h={675}><AdInstaStoryCars /></AdCard>
        <AdCard label="Website Hero" filename="story-website"   w={380} h={675}><AdInstaStoryWeb /></AdCard>
        <AdCard label="Booking"      filename="story-booking"   w={380} h={675}><AdInstaStoryBook /></AdCard>
      </div>

      {/* ── INSTAGRAM FEED ── */}
      <Section title="Instagram Feed" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
        <AdCard label="Square 1:1"   filename="feed-square"   w={530} h={530}><AdInstaSquare /></AdCard>
        <AdCard label="Portrait 4:5" filename="feed-portrait" w={530} h={663}><AdInstaPortrait /></AdCard>
      </div>

      {/* ── SQUARE ADS ── */}
      <Section title="Square Ads — 1:1" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        <AdCard label="Drive Premium" filename="square-premium"  w={530} h={530}><AdPremium /></AdCard>
        <AdCard label="Locations"     filename="square-locations" w={530} h={530}><AdLocations /></AdCard>
        <AdCard label="Airport"       filename="square-airport"  w={530} h={530}><AdAirport /></AdCard>
        <AdCard label="WhatsApp"      filename="square-whatsapp" w={530} h={530}><AdWhatsApp /></AdCard>
        <AdCard label="Weekend Deal"  filename="square-weekend"  w={530} h={530}><AdWeekend /></AdCard>
        <AdCard label="Fleet"         filename="square-fleet"    w={530} h={530}><AdFleet /></AdCard>
      </div>

      <div style={{ textAlign: "center", marginTop: 64, color: "rgba(255,255,255,0.15)", fontSize: 12 }}>
        rentacarron.com · +383 48 188 415
      </div>
    </div>
  );
}
