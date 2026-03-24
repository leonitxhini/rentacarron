/**
 * RRON Rent A Car — Animated Ad Recorder
 * Uses Playwright + ffmpeg to capture animated ads as MP4 videos.
 * Run: node scripts/record-ads.mjs  (from workspace root)
 */
import { chromium } from "/tmp/pw-recorder/node_modules/playwright/index.mjs";
import { spawnSync }  from "child_process";
import { mkdirSync, readdirSync, unlinkSync } from "fs";
import { join }       from "path";

const FRAMES_DIR = "/tmp/rron-frames";
const OUT_DIR    = "/tmp/rron-videos";
mkdirSync(FRAMES_DIR, { recursive: true });
mkdirSync(OUT_DIR,    { recursive: true });

// Nix-managed Chrome that has all its libraries linked correctly
const CHROME_PATH = "/nix/store/0n9rl5l9syy808xi9bk4f6dhnfrvhkww-playwright-browsers-chromium/chromium-1080/chrome-linux/chrome";

const ADS = [
  { name: "story-locations", url: "http://localhost:8081/__mockup/preview/ads/AdInstaStory",     w: 405, h: 720, duration: 16 },
  { name: "story-cars",      url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryCars",  w: 405, h: 720, duration: 16 },
  { name: "story-website",   url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryWeb",   w: 405, h: 720, duration: 10 },
  { name: "story-booking",   url: "http://localhost:8081/__mockup/preview/ads/AdInstaStoryBook",  w: 405, h: 720, duration: 10 },
  { name: "video-ad",        url: "http://localhost:18246/rron-video-ad/",                        w: 405, h: 720, duration: 30 },
];

const FPS = 12; // lower fps = faster capture, still smooth for social

async function captureAd(browser, ad) {
  console.log(`\n▶ ${ad.name} (${ad.duration}s @ ${FPS}fps)…`);
  const framesDir = join(FRAMES_DIR, ad.name);
  mkdirSync(framesDir, { recursive: true });
  try { readdirSync(framesDir).forEach(f => unlinkSync(join(framesDir, f))); } catch {}

  const page = await browser.newPage();
  await page.setViewportSize({ width: ad.w, height: ad.h });
  await page.goto(ad.url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForTimeout(2000); // let first animation frame render

  const totalFrames = ad.duration * FPS;
  const interval    = 1000 / FPS;

  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({ path: join(framesDir, `frame-${String(i).padStart(5, "0")}.png`), type: "png" });
    await page.waitForTimeout(interval - 20); // account for screenshot overhead
    if (i % FPS === 0) process.stdout.write(`  ${i}/${totalFrames} frames\r`);
  }
  await page.close();
  console.log(`  ✓ Captured ${totalFrames} frames`);

  const outPath = join(OUT_DIR, `rron-${ad.name}.mp4`);
  const r = spawnSync("ffmpeg", [
    "-y",
    "-framerate", String(FPS),
    "-i", join(framesDir, "frame-%05d.png"),
    "-vf", `scale=${ad.w * 2}:${ad.h * 2}`,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-crf", "20",
    "-preset", "fast",
    outPath,
  ], { stdio: "pipe" });

  if (r.status !== 0) {
    console.error("  ✗ ffmpeg:", r.stderr.toString().slice(-300));
  } else {
    const size = Math.round(spawnSync("du", ["-sk", outPath]).stdout.toString().split("\t")[0]) + "KB";
    console.log(`  ✓ ${outPath} (${size})`);
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

  const zipPath = "/tmp/rron-video-ads.zip";
  spawnSync("zip", ["-j", zipPath, ...outputs], { stdio: "inherit" });
  console.log(`\n✅ ZIP ready: ${zipPath}`);
  console.log("Files:", outputs.map(p => p.split("/").pop()).join(", "));
})();
