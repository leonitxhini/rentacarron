# Workspace

## Overview

pnpm workspace monorepo using TypeScript. RRON Car Rental web application.

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

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── car-rental/         # React + Vite frontend (RRON Car Rental)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## RRON Car Rental Features

### Public Website
- **Home** (`/`) — Hero with booking search, featured fleet, how it works, services, footer
- **Fleet** (`/fleet`) — All cars with category filters and availability badges
- **Booking** (`/booking/:carId`) — Full booking form (customer details, locations, dates)
- **Booking Confirmation** (`/booking/confirm/:id`) — Success page with booking details

### Admin Dashboard (`/admin`)
- Password protected (client-side, password: `admin123`)
- **Dashboard** tab — Stats: total cars, bookings, revenue, pending bookings
- **Cars** tab — Full CRUD: add, edit, delete cars; toggle availability
- **Bookings** tab — View all bookings, update status (pending/confirmed/cancelled/completed)
- **Locations** tab — Manage pickup/dropoff locations

## API Routes (all at `/api`)

- `GET/POST /api/cars` — List/create cars
- `GET/PUT/DELETE /api/cars/:id` — Get/update/delete car
- `GET/POST /api/locations` — List/create locations
- `PUT/DELETE /api/locations/:id` — Update/delete location
- `GET/POST /api/bookings` — List/create bookings
- `GET/PUT/DELETE /api/bookings/:id` — Get/update/delete booking
- `GET /api/admin/stats` — Admin dashboard statistics

## Database Tables

- `cars` — Car fleet with pricing, specs, availability
- `locations` — Pickup/dropoff locations (airports + HQ)
- `bookings` — Customer bookings with status tracking

## Sample Data

Pre-seeded:
- 8 cars (Audi A6, Audi A5, VW Golf 8, BMW 3 Series, Mercedes C-Class, VW Passat, Skoda Octavia, Toyota Corolla)
- 4 locations (Ferizaj HQ, Pristina Airport, Skopje Airport, Kukes Airport)

## TypeScript & Composite Projects

- `lib/*` packages are composite and emit declarations via `tsc --build`.
- `artifacts/*` are leaf packages checked with `tsc --noEmit`.
- Root `tsconfig.json` lists only lib packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
