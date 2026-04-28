# Sibola Juara — Football Field Booking App

A modern football field booking app: discover top fields, book in seconds, manage your team, and pay securely.

This monorepo contains:

- **`apps/mobile`** — React Native (Expo + Expo Router + TypeScript) mobile app, styled with NativeWind.
- **`apps/api`** — Node.js + Express + Prisma + MySQL backend API.

## Stack

| Area | Tech |
| --- | --- |
| Mobile framework | React Native, Expo SDK 54, Expo Router (file-based) |
| Language | TypeScript (strict) |
| Styling | NativeWind 4 (Tailwind CSS for React Native) |
| State | Zustand (client state) + React Query (server state) |
| Maps | `react-native-maps` |
| Charts | `react-native-svg` (line + donut) — designed to be swappable for Victory Native |
| Backend | Node.js + Express |
| Database | MySQL via Prisma ORM |
| Auth | JWT + bcryptjs |
| Validation | Zod |

## Project structure

```
sibola-juara-mobile/
├─ apps/
│  ├─ mobile/                 # Expo + RN + NativeWind app
│  │  ├─ app/                 # Expo Router routes
│  │  │  ├─ index.tsx         # Splash
│  │  │  ├─ (auth)/           # Login, onboarding
│  │  │  ├─ (tabs)/           # Home, Bookings, Calendar, Messages, Profile
│  │  │  ├─ field/[id].tsx    # Field detail (with map)
│  │  │  ├─ booking/new.tsx   # Multi-step booking form
│  │  │  ├─ payment/[id].tsx  # Payment & status
│  │  │  ├─ settings.tsx
│  │  │  └─ analytics.tsx     # Analytics & insights
│  │  ├─ src/
│  │  │  ├─ components/       # Button, Card, Tag, Charts, …
│  │  │  ├─ data/mockData.ts  # Local mock data (drives the UI)
│  │  │  ├─ lib/              # api client, query client, formatters
│  │  │  ├─ store/            # Zustand stores
│  │  │  └─ types/
│  │  ├─ tailwind.config.js
│  │  ├─ global.css
│  │  └─ app.json
│  └─ api/                    # Express + Prisma + MySQL
│     ├─ src/
│     │  ├─ routes/           # auth, fields, bookings, payments, analytics
│     │  ├─ middleware/auth.ts
│     │  ├─ lib/{db,auth}.ts
│     │  └─ index.ts
│     ├─ prisma/
│     │  ├─ schema.prisma
│     │  └─ seed.ts
│     └─ .env.example
└─ README.md
```

## Screens (12)

1. Splash
2. Login (email/phone + Google + Apple)
3. Onboarding (4 slides + paginator)
4. Dashboard / Home (overview, upcoming match, active bookings, nearby fields, quick actions)
5. Booking Form — multi-step (date/time → field → payment → review)
6. Field Detail (hero image, slots, facilities, optional map)
7. My Bookings (Upcoming / Past / Cancelled tabs + Manage Team)
8. Schedule Calendar (month view + event list)
9. Payment & Status (summary, method, success banner)
10. Profile (avatar, membership, stats, recent bookings)
11. Settings (notification toggles, payments, privacy, general)
12. Analytics & Insights (line chart + donut)

## Mobile setup

```bash
cd apps/mobile
npm install
npm run start          # Expo dev server
npm run android        # or
npm run ios            # or
npm run web            # web preview
npm run typecheck      # TypeScript only
```

Configuration:

- API base URL is read from `expo.extra.apiBaseUrl` in `app.json` (defaults to `http://localhost:4000`). Override per-environment by editing `app.json` or supplying an EAS profile.
- All screens render against the mock data in `src/data/mockData.ts` so the UI works fully without a backend. Wire React Query to `src/lib/api.ts` to switch over to the live API.

## Backend setup

```bash
cd apps/api
cp .env.example .env             # set DATABASE_URL + JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run db:seed                  # seeds demo user, fields, teams
npm run dev                      # http://localhost:4000
```

Default seed credentials: `ardiansyah@sibolajuara.id` / `password123`.

### Required environment variables

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `4000` | API port |
| `DATABASE_URL` | `mysql://user:pass@localhost:3306/sibola_juara` | MySQL connection string |
| `JWT_SECRET` | `super-secret` | Used to sign auth tokens |
| `CORS_ORIGINS` | `http://localhost:8081` | Comma-separated allow-list |

### Endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | — | Register a new user |
| POST | `/auth/login` | — | Login, returns JWT |
| GET | `/fields` | — | List all fields |
| GET | `/fields/:id` | — | Field detail |
| GET | `/bookings` | required | List my bookings |
| GET | `/bookings/:id` | required | Booking detail |
| POST | `/bookings` | required | Create booking |
| PATCH | `/bookings/:id/cancel` | required | Cancel booking |
| POST | `/payments/charge` | required | Mark booking paid |
| GET | `/analytics/summary` | required | Dashboard analytics |
| GET | `/health` | — | Liveness probe |

## Database

The Prisma schema (`apps/api/prisma/schema.prisma`) models:

- `User` (auth, membership, points)
- `Field` (location, price, facilities, lat/long for the map screen)
- `Team` + `TeamMember`
- `Booking` (with home/away team, status, payment status)
- `Notification`

Run `npx prisma studio` to browse data interactively.

## Notes on Victory Native

Recent versions of Victory Native (v41+) require `@shopify/react-native-skia`, which substantially complicates RN setup. To keep the slice runnable out of the box on every platform (web included), the `LineChart` and `DonutChart` components in `apps/mobile/src/components/` are written directly on top of `react-native-svg`. They render the same shapes as the design and can be swapped for `victory-native` charts later by importing them in `app/analytics.tsx`.
