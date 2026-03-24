import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
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

type AdEntry = { ref: React.RefObject<HTMLDivElement>; filename: string; label: string; w: number; h: number };

function useAdRefs() {
  return {
    storyLoc:  useRef<HTMLDivElement>(null),
    storyCars: useRef<HTMLDivElement>(null),
    storyWeb:  useRef<HTMLDivElement>(null),
    storyBook: useRef<HTMLDivElement>(null),
    square:    useRef<HTMLDivElement>(null),
    portrait:  useRef<HTMLDivElement>(null),
    premium:   useRef<HTMLDivElement>(null),
    locations: useRef<HTMLDivElement>(null),
    airport:   useRef<HTMLDivElement>(null),
    whatsapp:  useRef<HTMLDivElement>(null),
    weekend:   useRef<HTMLDivElement>(null),
    fleet:     useRef<HTMLDivElement>(null),
  };
}

function DownloadBtn({ nodeRef, filename }: { nodeRef: React.RefObject<HTMLDivElement>; filename: string }) {
  const [busy, setBusy] = useState(false);
  const go = async () => {
    if (!nodeRef.current || busy) return;
    setBusy(true);
    try {
      const url = await toPng(nodeRef.current, { pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = url; a.download = `rron-${filename}.png`; a.click();
    } finally { setBusy(false); }
  };
  return (
    <button onClick={go} disabled={busy} style={{
      marginTop: 10, padding: "7px 18px",
      background: busy ? "rgba(59,130,246,0.25)" : "rgba(59,130,246,0.12)",
      border: "1px solid rgba(59,130,246,0.3)", borderRadius: 100,
      color: BLUE, fontSize: 11, fontWeight: 700, cursor: busy ? "wait" : "pointer",
      letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6,
    }}>
      {busy ? "⏳ Saving…" : "↓ PNG"}
    </button>
  );
}

function AdCard({ children, label, filename, nodeRef, w, h }: { children: React.ReactNode; label: string; filename: string; nodeRef: React.RefObject<HTMLDivElement>; w: number; h: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div ref={nodeRef} style={{ width: w, height: h, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", flexShrink: 0 }}>
        {children}
      </div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", marginTop: 10 }}>{label}</div>
      <DownloadBtn nodeRef={nodeRef} filename={filename} />
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
  const refs = useAdRefs();
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState("");

  const ads: AdEntry[] = [
    { ref: refs.storyLoc,  filename: "story-locations", label: "Story Locations", w: 380, h: 675 },
    { ref: refs.storyCars, filename: "story-cars",       label: "Story Cars",      w: 380, h: 675 },
    { ref: refs.storyWeb,  filename: "story-website",    label: "Story Website",   w: 380, h: 675 },
    { ref: refs.storyBook, filename: "story-booking",    label: "Story Booking",   w: 380, h: 675 },
    { ref: refs.square,    filename: "feed-square",      label: "Square 1:1",      w: 530, h: 530 },
    { ref: refs.portrait,  filename: "feed-portrait",    label: "Portrait 4:5",    w: 530, h: 663 },
    { ref: refs.premium,   filename: "square-premium",   label: "Drive Premium",   w: 530, h: 530 },
    { ref: refs.locations, filename: "square-locations", label: "Locations",       w: 530, h: 530 },
    { ref: refs.airport,   filename: "square-airport",   label: "Airport",         w: 530, h: 530 },
    { ref: refs.whatsapp,  filename: "square-whatsapp",  label: "WhatsApp",        w: 530, h: 530 },
    { ref: refs.weekend,   filename: "square-weekend",   label: "Weekend Deal",    w: 530, h: 530 },
    { ref: refs.fleet,     filename: "square-fleet",     label: "Fleet",           w: 530, h: 530 },
  ];

  const downloadAll = async () => {
    if (zipping) return;
    setZipping(true);
    const zip = new JSZip();
    for (let i = 0; i < ads.length; i++) {
      const { ref, filename, label } = ads[i];
      if (!ref.current) continue;
      setZipProgress(`Capturing ${i + 1}/${ads.length}: ${label}…`);
      try {
        const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
        const base64 = dataUrl.split(",")[1];
        zip.file(`rron-${filename}.png`, base64, { base64: true });
      } catch (e) { console.error(filename, e); }
    }
    setZipProgress("Creating ZIP…");
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "rron-ads.zip"; a.click();
    URL.revokeObjectURL(url);
    setZipping(false);
    setZipProgress("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#04060d", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", padding: "48px 40px 80px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap'); * { box-sizing: border-box; } body { margin: 0; }`}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>RRON Rent A Car</div>
        <h1 style={{ margin: "0 0 8px", color: "#fff", fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em" }}>Ad Gallery</h1>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 24px" }}>12 ads · Instagram Stories, Feed & Square</p>

        {/* Download All ZIP button */}
        <button onClick={downloadAll} disabled={zipping} style={{
          padding: "14px 32px", borderRadius: 14,
          background: zipping ? "rgba(59,130,246,0.3)" : `linear-gradient(135deg, ${BLUE}, #2563EB)`,
          border: "none", color: "#fff", fontSize: 15, fontWeight: 800,
          cursor: zipping ? "wait" : "pointer", letterSpacing: "-0.01em",
          boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          {zipping ? `⏳ ${zipProgress}` : "⬇ Download All as ZIP"}
        </button>
        {!zipping && <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 10 }}>12 PNGs · 2× resolution · ready for Instagram</div>}
      </div>

      {/* Stories */}
      <Section title="Instagram Stories — 9:16" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        <AdCard label="Locations"    filename="story-locations" nodeRef={refs.storyLoc}  w={380} h={675}><AdInstaStory /></AdCard>
        <AdCard label="Cars"         filename="story-cars"      nodeRef={refs.storyCars} w={380} h={675}><AdInstaStoryCars /></AdCard>
        <AdCard label="Website Hero" filename="story-website"   nodeRef={refs.storyWeb}  w={380} h={675}><AdInstaStoryWeb /></AdCard>
        <AdCard label="Booking"      filename="story-booking"   nodeRef={refs.storyBook} w={380} h={675}><AdInstaStoryBook /></AdCard>
      </div>

      {/* Feed */}
      <Section title="Instagram Feed" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
        <AdCard label="Square 1:1"   filename="feed-square"   nodeRef={refs.square}   w={530} h={530}><AdInstaSquare /></AdCard>
        <AdCard label="Portrait 4:5" filename="feed-portrait" nodeRef={refs.portrait} w={530} h={663}><AdInstaPortrait /></AdCard>
      </div>

      {/* Square ads */}
      <Section title="Square Ads — 1:1" />
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        <AdCard label="Drive Premium" filename="square-premium"   nodeRef={refs.premium}   w={530} h={530}><AdPremium /></AdCard>
        <AdCard label="Locations"     filename="square-locations" nodeRef={refs.locations} w={530} h={530}><AdLocations /></AdCard>
        <AdCard label="Airport"       filename="square-airport"   nodeRef={refs.airport}   w={530} h={530}><AdAirport /></AdCard>
        <AdCard label="WhatsApp"      filename="square-whatsapp"  nodeRef={refs.whatsapp}  w={530} h={530}><AdWhatsApp /></AdCard>
        <AdCard label="Weekend Deal"  filename="square-weekend"   nodeRef={refs.weekend}   w={530} h={530}><AdWeekend /></AdCard>
        <AdCard label="Fleet"         filename="square-fleet"     nodeRef={refs.fleet}     w={530} h={530}><AdFleet /></AdCard>
      </div>

      <div style={{ textAlign: "center", marginTop: 64, color: "rgba(255,255,255,0.15)", fontSize: 12 }}>rentacarron.com · +383 48 188 415</div>
    </div>
  );
}
