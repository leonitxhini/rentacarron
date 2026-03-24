# RRON Rent A Car – Workspace

## Overview

pnpm monorepo. Full-featured car rental web app with dark premium design.  
**Target deployment: 100% Cloudflare (Pages + Functions + D1 + R2)**

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + TailwindCSS + shadcn/ui |
| API (production) | Hono — Cloudflare Pages Functions |
| API (development) | Express 5 — runs on Replit |
| Database (production) | Cloudflare D1 (SQLite via Drizzle ORM) |
| Database (development) | PostgreSQL on Replit |
| Image storage | Cloudflare R2 (new uploads) + Pages CDN (existing images) |
| Routing | Wouter |
| State | TanStack Query |
| i18n | Custom React context (EN / SQ Albanian) |

## Structure

```
artifacts/
├── car-rental/             # Frontend + Cloudflare Pages Functions
│   ├── src/                # React app (Vite)
│   ├── functions/
│   │   └── api/
│   │       └── [[path]].ts # Hono API — handles all /api/* in production
│   ├── migrations/
│   │   ├── 0001_schema.sql # D1 table creation
│   │   └── 0002_seed.sql   # D1 seed data (all cars + locations)
│   ├── public/
│   │   ├── _redirects      # SPA fallback
│   │   └── _headers        # Security + cache headers
│   └── wrangler.toml       # Cloudflare config (D1 + R2 bindings)
└── api-server/             # Express API — used only for local dev on Replit
lib/
├── db/                     # Drizzle + PostgreSQL (dev only)
└── api-client-react/       # Generated React Query hooks
```

## Business Info

- **Company**: RRON Rent A Car
- **Phone**: +383 48 188 415
- **Location**: Ferizaj, Kosovo 70000
- **WhatsApp**: 38348188415
- **Email**: rentacarron@hotmail.com
- **Instagram**: https://www.instagram.com/rentacarron/
- **Facebook**: https://www.facebook.com/rentrroni

## Public Pages

- `/` — Hero, fleet preview, how it works, services, footer
- `/fleet` — All cars with filters
- `/booking/:carId` — Booking form
- `/booking/confirm/:id` — Booking confirmation

## Admin Dashboard

- **URL**: `/rron-secure-4x9k` (secret, not linked publicly)
- **Password**: Set via `VITE_ADMIN_PASSWORD` (Cloudflare Pages env var)
- **API auth**: Bearer token sent automatically; API checks `ADMIN_SECRET` Worker var

---

## Cloudflare Deployment Guide

### Prerequisites — do once

1. [Cloudflare account](https://dash.cloudflare.com) (free)
2. GitHub repo connected (push your code there)

### Step 1 — Create D1 Database

In Cloudflare Dashboard → **D1** → **Create database** → name it `rron-db`  
Copy the **Database ID** (looks like `a1b2c3d4-...`)

### Step 2 — Update wrangler.toml

Open `artifacts/car-rental/wrangler.toml` and replace:
```
database_id = "PLACEHOLDER_REPLACE_WITH_YOUR_D1_ID"
```
with your actual Database ID. Then push to GitHub.

### Step 3 — Run Migrations

In Cloudflare Dashboard → D1 → `rron-db` → **Console**, run:

```sql
-- Paste contents of migrations/0001_schema.sql
-- Then paste contents of migrations/0002_seed.sql
```

Or via Wrangler CLI:
```bash
wrangler d1 execute rron-db --file=artifacts/car-rental/migrations/0001_schema.sql --remote
wrangler d1 execute rron-db --file=artifacts/car-rental/migrations/0002_seed.sql --remote
```

### Step 4 — Create R2 Bucket (for admin image uploads)

Cloudflare Dashboard → **R2** → **Create bucket** → name it `rron-images`  
Enable **Public access** → copy the public URL (e.g. `https://pub-xxx.r2.dev`)

### Step 5 — Connect GitHub to Cloudflare Pages

Dashboard → **Pages** → **Connect to Git** → select repo

**Build settings:**
| Setting | Value |
|---|---|
| Root directory | `artifacts/car-rental` |
| Build command | `cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @workspace/car-rental run build` |
| Build output directory | `dist` |
| Node.js version | `22` |

**Environment variables:**
| Variable | Value |
|---|---|
| `VITE_ADMIN_PASSWORD` | Your chosen admin password |

**Bindings (Pages → Settings → Functions → Bindings):**
| Type | Name | Value |
|---|---|---|
| D1 Database | `DB` | `rron-db` |
| R2 Bucket | `IMAGES` | `rron-images` |
| Variable | `ADMIN_SECRET` | Same as VITE_ADMIN_PASSWORD |
| Variable | `R2_PUBLIC_URL` | Your R2 public URL |

### Step 6 — Deploy!

Click **Save and Deploy**. Done — everything runs on Cloudflare.

---

## Local Development

The Express API (`artifacts/api-server`) is used only for local development on Replit.  
It connects to the Replit PostgreSQL database.

- Frontend: `http://localhost:22460`  
- API: `http://localhost:8080`

In production, the frontend calls `/api/*` which is handled by Pages Functions.  
`VITE_API_URL` is **not set** in production — same-origin calls work automatically.
