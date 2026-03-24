# Workspace

## Overview

pnpm workspace monorepo using TypeScript. RRON Rent A Car — full-featured car rental web app with dark premium design, public site, admin dashboard, and Express REST API.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)
- **Frontend**: React + Vite, TailwindCSS, shadcn/ui
- **Routing**: Wouter
- **State**: TanStack Query (via generated hooks)
- **Animations**: Framer Motion
- **i18n**: Custom React context (EN/SQ — Albanian)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server  →  Replit deployment
│   └── car-rental/         # React + Vite frontend →  Cloudflare Pages
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## RRON Car Rental Features

### Public Website
- **Home** (`/`) — Hero with booking search, featured fleet, how it works, services, footer
- **Fleet** (`/fleet`) — All cars with category filters and availability badges
- **Booking** (`/booking/:carId`) — Full booking form (customer details, locations, dates)
- **Booking Confirmation** (`/booking/confirm/:id`) — Success page with booking details
- **Language switcher** — EN / SQ (Albanian) toggle in navbar and mobile menu

### Admin Dashboard
- **Secret URL**: `/rron-secure-4x9k` — not linked from anywhere public
- **Password**: `admin123` (stored in `ADMIN_SECRET` env var on API server; `VITE_ADMIN_PASSWORD` on frontend)
- **Auth**: Client-side sessionStorage + server-side Bearer token middleware on all `/api/admin/*` and `/api/upload/*` routes
- **Dashboard** — Stats: total cars, bookings, revenue, pending
- **Cars** — Full CRUD: add, edit, delete, toggle availability; image upload
- **Bookings** — View all bookings, update status
- **Chart** — Recharts bar chart for booking status breakdown

## API Routes (all prefixed `/api`)

### Public
- `GET /api/cars` — List cars
- `GET /api/cars/:id` — Get one car
- `GET /api/locations` — List locations
- `POST /api/bookings` — Create booking
- `GET /api/bookings/:id` — Get booking
- `GET /api/healthz` — Health check

### Admin (requires `Authorization: Bearer <ADMIN_SECRET>`)
- `GET /api/admin/stats` — Dashboard statistics
- `POST/PUT/DELETE /api/cars/:id` — Create/update/delete car
- `POST/PUT/DELETE /api/locations/:id` — Create/update/delete location
- `PUT/DELETE /api/bookings/:id` — Update/delete booking
- `POST /api/upload/car-image` — Upload car image

## Database Tables

- `cars` — Car fleet with pricing, specs, availability, image URL
- `locations` — Pickup/dropoff locations
- `bookings` — Customer bookings with status tracking

## Real Business Info

- **Company**: RRON Rent A Car
- **Phone**: +383 48 188 415
- **Location**: Ferizaj, Kosovo 70000
- **WhatsApp**: 38348188415
- **Email**: rentacarron@hotmail.com
- **Instagram**: https://www.instagram.com/rentacarron/
- **Facebook**: https://www.facebook.com/rentrroni

---

## Deployment

### API Server → Replit

1. Click **Deploy** in Replit
2. Set env var `ADMIN_SECRET` = a strong secret (same as frontend's `VITE_ADMIN_PASSWORD`)
3. Set env var `ALLOWED_ORIGINS` = your Cloudflare Pages URL (e.g. `https://rronrentacar.pages.dev`)
4. `DATABASE_URL` is automatically set by Replit

### Frontend → Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `pnpm --filter @workspace/car-rental run build` |
| Output directory | `artifacts/car-rental/dist` |
| Node.js version | 22 |

**Environment variables in Cloudflare dashboard:**

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://rentacarron.replit.app` |
| `VITE_ADMIN_PASSWORD` | `admin123` (or your chosen secret) |

**SPA routing**: already handled by `artifacts/car-rental/public/_redirects`  
**Security headers**: already set in `artifacts/car-rental/public/_headers`

---

## TypeScript & Composite Projects

- `lib/*` packages are composite and emit declarations via `tsc --build`
- `artifacts/*` are leaf packages checked with `tsc --noEmit`
- Root `tsconfig.json` lists only lib packages as project references

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
