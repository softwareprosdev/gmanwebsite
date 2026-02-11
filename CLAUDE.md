# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RGV Handyman — a professional handyman services website for South Texas (Rio Grande Valley). Built with a futuristic dark theme using Teal & Gold colors. Includes a public-facing site and an admin dashboard for managing clients, bookings, and services.

**Live site**: https://rgvhandyman.softwarepros.org

## Commands

```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint
```

Build requires `--legacy-peer-deps` flag for install (handled automatically by nixpacks.toml for deployment).

## Tech Stack

- **Next.js 16** with App Router (React 19, TypeScript 5)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Framer Motion** for scroll-triggered and entrance animations
- **React Icons** (admin panel icons)
- **GSAP** and **@splinetool/runtime** available but lightly used
- **Deployment**: Coolify (self-hosted VPS) via Nixpacks, Node.js 22

## Architecture

### Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

### App Structure
```
src/app/           → Next.js App Router pages
src/components/    → Shared components (layout/, sections/, ui/, animations/)
src/data/          → Static data (services.ts, portfolio.ts, navigation.ts)
```

### Public Pages (Server Components by default)
- `/` — Homepage with Hero, Services, Portfolio, Booking sections
- `/services` — Full service catalog
- `/portfolio` — Before/after project gallery
- `/about` — Company info
- `/contact` — Booking form (client component with form validation)

### Admin Dashboard (`src/app/admin/`)
- `/admin/login` — Auth page (demo: localStorage-based, accepts any credentials)
- `/admin` — Dashboard with stats
- `/admin/clients`, `/admin/bookings`, `/admin/services`, `/admin/settings`
- Uses `AdminLayout` component for sidebar navigation
- Data stored in JSON files (`lib/clients.json`, `lib/bookings.json`)
- Data access via functions in `lib/data.ts` (read, search, filter, stats)

### Key Components
- **`ScrollReveal`** (`components/animations/`) — Framer Motion scroll-triggered wrapper with direction, delay, scale options. Helper exports: `FadeIn`, `SlideIn`, `PopIn`
- **`NeonButton`** (`components/ui/`) — Button with 4 variants: `primary`, `secondary`, `outline`, `ghost`
- **`Navbar`** / **`Footer`** (`components/layout/`) — Client components with responsive mobile menu

### Design System (globals.css)
- CSS variables: `--teal-primary`, `--teal-light`, `--teal-dark`, `--gold-accent`, `--gold-light`, `--gold-dark`
- Custom classes: `.text-gradient-teal`, `.text-gradient-gold`, `.text-gradient-teal-gold`, `.glass-panel`
- Custom animations: `animate-float`, `animate-rotate`, `animate-pulse-glow`, `animate-gold-glow`, `animate-nebula`
- Border utilities: `.border-teal-primary`, `.border-gold-accent` (include glow shadows)

### Patterns
- Mark interactive components with `"use client"` — layout/page files are server components by default
- Root layout (`layout.tsx`) includes Navbar/Footer globally, SEO metadata, and JSON-LD structured data for local business
- Admin pages wrap content in `AdminLayout` for sidebar navigation
- No external state management — uses React hooks and localStorage for admin auth

## Environment Variables

Only one required variable (see `.env.example`):
```
NEXT_PUBLIC_SITE_URL=https://rgvhandyman.softwarepros.org
```

## Commit Convention

Uses conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`
