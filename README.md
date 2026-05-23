# Walton Plaza — Frontend Evaluation

High-performance product listing and detail system built with **Next.js App Router**, **React 19**, **TypeScript (strict)**, **Tailwind CSS**, and **GraphQL**.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run codegen
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/products`.

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | RSC for initial data fetch, streaming, route-level loading/error states |
| UI | React 19 + Tailwind CSS 4 | `useOptimistic`, `useTransition`; utility-first styling |
| Data | Apollo Client + GraphQL Codegen | Normalized cache, SSR/RSC support, typed operations |
| State | Zustand (cart) | Lightweight persist to `localStorage`, minimal boilerplate |
| Validation | Zod | Runtime env validation at startup |

## Project Structure

```
src/
├── app/(shop)/products/          # PLP + PDP routes
├── components/products/          # ProductCard, gallery, filters, catalog
├── components/ui/                # Button, Badge, Skeleton
├── features/cart/                # Zustand store, drawer, hydration
├── features/products/            # Filters, pricing, product helpers
└── graphql/                      # Schema, queries, Apollo clients, codegen
```

## Implementation Summary

### Section 2 — Product Listing Page (PLP)

- **GraphQL fetch** via server component for first page (SSR/SEO)
- **Infinite scroll** (not pagination) — better mobile UX; Apollo merge policy merges pages by `filter` key
- **Loading skeletons** — route-level `loading.tsx` + inline skeletons while fetching more
- **Error handling** — route `error.tsx` + inline error on load-more failure
- **Filters** (client-side on loaded products):
  - Price range (min/max)
  - Category (derived from `productAttributes`)
  - Availability (in stock / out of stock)
- **Sorting** (client-side):
  - Price ascending / descending
  - Rating (from `productAttributes` when available)

> **Trade-off:** The Walton API only exposes `uid`, `posItemCode`, and `isActive` filters server-side. Price/category/availability filters apply to loaded items. Scroll loads more from the API.

### Section 3 — Product Card

- **`ProductCard`** — memoized (`React.memo`) for list performance
- **`next/image`** — responsive sizes, lazy loading, placeholder fallback
- **Hover micro-interaction** — lift + shadow + image scale on hover
- **Optimistic add to cart** — `useOptimistic` + `useTransition` (React 19)

### Section 4 — Product Details Page (PDP)

- **Dynamic route** — `/products/[uid]`
- **Image gallery** — Integrated a high-performance **hover zoom magnifier** (desktop floating window on the right with GPU-accelerated `translate3d` translation and magnifier lens) and a fullscreen **Lightbox Modal** (featuring arrow navigation, bottom thumbnails strip, and body scroll locking).
- **Layout Alignment** — Equal height grid card structures for both the gallery and the info columns.
- **Variant selector** — per-variant stock state, disabled when out of stock
- **Stock-aware CTA** — disabled button + badge when variant is out of stock
- **Dynamic pricing** — MRP strikethrough, discount badge, selling price from variant metrics
- **`LabeledSectionTabs`** — reusable component for all `{ enLabel, values }` API sections

### Section 5 — Cart & Checkout System

- **Zustand store** — add / remove / update quantity / clear
- **Persistence** — `localStorage` via Zustand `persist` middleware (`walton-cart` key)
- **Hydration** — `skipHydration: true` + `useCartHydration()` on mount with client-only guards to avoid SSR hydration mismatches
- **Direct Redirection Flow**:
  - **Cart Page (`/cart`)** — Dedicated route showing detailed cart items, quantity adjustments, and subtotal.
  - **Checkout Page (`/checkout`)** — Shipping address form inputs with client validations and pre-selected Cash on Delivery payment.
  - **Order Success (`/checkout/success`)** — Receipt overview showing order ID, items count, total, and shipping coordinates.

### Section 6 — Performance Optimization

| Technique | Where |
|-----------|-------|
| `React.memo` | `ProductCard` |
| Server Components | PLP/PDP pages, layout, metadata |
| Client boundaries | Filters, catalog scroll, cart/checkout, variant selection |
| GraphQL fragments | `ProductCardFields`, `ProductDetailFields` — no over-fetching |
| Apollo cache merge | Paginated `getProducts` field policy |
| CSS GPU acceleration | `translate3d` for smooth magnifier lens tracking |
| `next/image` | All product images with `sizes` hints |

### Section 7 — React 19 Features

- **Async Transitions (`useTransition`)** — Leverages React 19's new support for passing asynchronous functions directly inside `startTransition`. This enables non-blocking asynchronous state updates (cart addition + client-side page routing transitions) while keeping `isPending` true.

## Architecture Decisions

### Server vs Client Components

| Component | Type | Why |
|-----------|------|-----|
| PLP / PDP pages | Server | SEO, faster TTFB |
| `ProductsCatalog` | Client | Infinite scroll, Intersection Observer |
| `ProductFiltersBar` | Client | URL search params, interactivity |
| `ProductDetailView` | Client | Variant selection state |
| Cart | Client | localStorage persistence |

### GraphQL Client

- Apollo with `@apollo/client-integration-nextjs` for App Router
- GraphQL Code Generator (`client` preset) for typed documents + fragment masking
- Local schema from API reference (no build-time introspection dependency)

### Cart State

Zustand over Context/Redux — isolated domain, no provider nesting, persist built-in.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Codegen + production build |
| `npm run codegen` | Generate typed GraphQL documents |
| `npm run lint` | ESLint |

## API Reference

Endpoint: `https://devapi.waltonplaza.com.bd/graphql`

Primary query: `getProducts(pagination, filter)`

See `docs/waltonplaza-api-reference.docx.pdf` for field mapping and edge cases.

## License

Private — Walton Hi-Tech Industries PLC evaluation project.
