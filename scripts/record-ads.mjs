/**
 * RRON Rent A Car — Animated Ad Recorder
 * Uses Playwright + ffmpeg to capture animated ads as MP4 videos.
 * Run: node scripts/record-ads.mjs
 */
import { chromium } from "/tmp/pw-recorder/node_modules/playwright/index.mjs";
import { spawnSync }  from "child_process";
import { mkdirSync, readdirSync, unlinkSync, readFileSync, writeFileSync } from "fs";
import { join }       from "path";

const FRAMES_DIR = "/tmp/rron-frames";
const OUT_DIR    = "/tmp/rron-videos";
mkdirSync(FRAMES_DIR, { recursive: true });
mkdirSync(OUT_DIR,    { recursive: true });

const CHROME_PATH = "/nix/store/0n9rl5l9syy808xi9bk4f6dhnfrvhkww-playwright-browsers-chromium/chromium-1080/chrome-linux/chrome";

// CSS injected into each preview page so the ad fills the viewport with NO white chrome
const FILL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0 !important; padding: 0 !important;
    width: 100% !important; height: 100% !important;
    background: #000 !important; overflow: hidden !important;
  }
  body > div#root, body > #root {
    width: 100% !important; height: 100% !important;
    display: flex !important; align-items: flex-start !important;
    justify-content: flex-start !important; overflow: hidden !important;
  }
  /* Force first child element to fill exactly */
  body > #root > * {
    width: 100% !important; height: 100% !important;
    min-height: 100% !important; flex-shrink: 0 !important;
  }
`;

const ADS = [
  { name: "story-locations", url: "http://localhost:8081/__mockup/preview/ads/AdInstaStory",     w: 405, h: 720, duration: 16 },
  { name: "story-cars",      url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryCars",  w: 405, h: 720, duration: 16 },
  { name: "story-website",   url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryWeb",   w: 405, h: 720, duration: 10 },
  { name: "story-booking",   url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryBook",  w: 405, h: 720, duration: 10 },
  { name: "video-ad",        url: "http://localhost:18246/rron-video-ad/",                        w: 405, h: 720, duration: 30 },
];

const FPS = 12;

async function captureAd(browser, ad) {
  console.log(`\n▶ ${ad.name} (${ad.duration}s @ ${FPS}fps)…`);
  const framesDir = join(FRAMES_DIR, ad.name);
  mkdirSync(framesDir, { recursive: true });
  try { readdirSync(framesDir).forEach(f => unlinkSync(join(framesDir, f))); } catch {}

  const page = await browser.newPage();
  await page.setViewportSize({ width: ad.w, height: ad.h });
  await page.goto(ad.url, { waitUntil: "domcontentloaded", timeout: 20000 });

  // Inject CSS to eliminate white borders and force full-bleed layout
  await page.addStyleTag({ content: FILL_CSS });

  // Also force the video-ad's inner wrapper to fill
  await page.evaluate(() => {
    document.documentElement.style.cssText = "margin:0;padding:0;width:100%;height:100%;background:#000;overflow:hidden";
    document.body.style.cssText = "margin:0;padding:0;width:100%;height:100%;background:#000;overflow:hidden";
    const root = document.getElementById("root");
    if (root) root.style.cssText = "width:100%;height:100%;overflow:hidden;display:block";
    // For video-ad: remove centering flex wrapper
    const innerWrap = root?.querySelector("[class*='flex items-center justify-center']");
    if (innerWrap) innerWrap.style.cssText = "width:100%;height:100%;display:block;background:#000";
    // For story ads: make sure the top-level div is full bleed
    const firstChild = root?.firstElementChild;
    if (firstChild) firstChild.style.cssText += ";width:100%;height:100%;min-height:100%;";
  });

  await page.waitForTimeout(1800);

  const totalFrames = ad.duration * FPS;
  const interval    = 1000 / FPS;

  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({ path: join(framesDir, `frame-${String(i).padStart(5, "0")}.png`), type: "png" });
    await page.waitForTimeout(interval - 25);
    if (i % FPS === 0) process.stdout.write(`  ${i}/${totalFrames} frames\r`);
  }
  await page.close();
  console.log(`  ✓ ${totalFrames} frames captured`);

  const outPath = join(OUT_DIR, `rron-${ad.name}.mp4`);
  const r = spawnSync("ffmpeg", [
    "-y",
    "-framerate", String(FPS),
    "-i", join(framesDir, "frame-%05d.png"),
    "-vf", `scale=${ad.w * 2}:${ad.h * 2}`,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-crf", "18",
    "-preset", "fast",
    outPath,
  ], { stdio: "pipe" });

  if (r.status !== 0) {
    console.error("  ✗ ffmpeg:", r.stderr.toString().slice(-300));
  } else {
    const kb = readFileSync(outPath).length >> 10;
    console.log(`  ✓ ${outPath} (${kb}KB)`);
  }
  return outPath;
}

(async () => {
  console.log("Launching browser…");
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const outputs = [];
  for (const ad of ADS) {
    try { outputs.push(await captureAd(browser, ad)); }
    catch (e) { console.error(`  ✗ ${ad.name}:`, e.message); }
  }

  await browser.close();

  // Package as ZIP using JSZip
  const { default: JSZip } = await import("/home/runner/workspace/artifacts/mockup-sandbox/node_modules/jszip/dist/jszip.min.js");
  const zip = new JSZip();
  for (const p of outputs) zip.file(p.split("/").pop(), readFileSync(p));
  const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 5 } });
  const zipPath = "/home/runner/workspace/artifacts/mockup-sandbox/public/rron-video-ads.zip";
  writeFileSync(zipPath, buf);
  console.log(`\n✅ ZIP: ${zipPath} (${buf.length >> 10}KB)`);

  // Also copy MP4s to public for individual download
  for (const p of outputs) {
    const dest = `/home/runner/workspace/artifacts/mockup-sandbox/public/${p.split("/").pop()}`;
    writeFileSync(dest, readFileSync(p));
  }
  console.log("Done! Files:", outputs.map(p => p.split("/").pop()).join(", "));
})();
