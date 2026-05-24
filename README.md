# 🛒 Walton Plaza — Frontend Evaluation

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_4-38bdf8?style=for-the-badge&logo=tailwind-css)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-e10098?style=for-the-badge&logo=graphql)

High-performance product listing and detail system built for Walton Plaza. Features Server-Side Rendering (SSR), optimistic UI updates, dynamic EMI calculations, and robust cart state management.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env.local

# 3. Generate GraphQL types
npm run codegen

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — automatically redirects to `/products`.

---

## 🛠 Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js (App Router) | RSC for initial data fetch, streaming, route-level loading/error states |
| **UI** | React 19 + Tailwind CSS | `useOptimistic`, `useTransition`; utility-first styling for rich aesthetics |
| **Data** | Apollo Client + GraphQL Codegen | Normalized cache, SSR/RSC support, strict typed operations |
| **State** | Zustand (Cart) | Lightweight persist to `localStorage`, minimal boilerplate |
| **Validation**| Zod | Runtime environment validation at startup |
| **Notifications**| Sonner | High-performance, accessible toast notifications |

---

## 📂 Project Structure

```text
src/
├── app/(shop)/products/          # PLP + PDP routes (Route Groups used for skeleton isolation)
├── components/products/          # ProductCard, Gallery, Filters, Catalog
├── components/ui/                # Button, Badge, Skeleton, Sonner Toaster
├── features/cart/                # Zustand store, Drawer, Hydration
├── features/products/            # Filters, Pricing, Product Helpers
└── graphql/                      # Schema, Queries, Apollo clients, Codegen
```

---

## ✨ Key Features & Implementation

### 🛍️ Product Listing Page (PLP)
- **SSR/SEO Optimized**: GraphQL fetch via Server Components for the first page.
- **Infinite Scroll**: Better mobile UX; Apollo merge policy merges pages by `filter` key.
- **Advanced State Management**: 
  - Route-level `loading.tsx` properly isolated using Route Groups `(list)` to prevent layout flashing.
  - Inline skeletons while fetching more products.
- **Client-Side Filters & Sorting**:
  - Price range (min/max), Category, Availability.
  - Price (Asc/Desc) and Rating sorting.

> **Note:** Price/category/availability filters apply to loaded items seamlessly in the client.

### 💳 Product Card
- **Performance**: Memoized (`React.memo`) for list rendering performance.
- **LCP Optimized**: Critical "above-the-fold" images are eagerly loaded using `priority={true}` to ensure maximum Lighthouse scores.
- **Hover Micro-interactions**: Lift + shadow + image scale on hover, with interactive `cursor-pointer` indicators.
- **Optimistic UI**: `useOptimistic` + `useTransition` for instant cart additions.

### 🔍 Product Details Page (PDP)
- **Dynamic Routing**: `/products/[uid]`
- **Interactive Image Gallery**: 
  - Desktop **hover zoom magnifier** (GPU-accelerated `translate3d`).
  - Fullscreen **Lightbox Modal** (keyboard navigation, thumbnails, scroll locking).
- **Dynamic EMI Calculation**: Real-time EMI offer generation based on the selling price (e.g., 5% OFF, 6-months plans).
- **Stock-Aware CTA**: Variant selection updates stock status in real-time, disabling buttons if out of stock.

### 🛒 Cart & Checkout System
- **Zustand Store**: Add / remove / update quantity / clear.
- **Local Persistence**: State saved to `localStorage` via Zustand `persist` middleware (`walton-cart` key).
- **Safe Hydration**: `skipHydration: true` + custom hydration hooks to avoid SSR mismatches.
- **Direct Redirection Flow**:
  - **Cart Page (`/cart`)**: Detailed items, quantity adjustments, and subtotal.
  - **Checkout Page (`/checkout`)**: Shipping address inputs with validation.
  - **Order Success (`/checkout/success`)**: Receipt overview with order ID and details.
- **Toast Notifications**: Interactive Sonner toast notifications (Top-Right) on cart actions (e.g. item added, order placed).

---

## ⚡ Performance Optimizations

| Technique | Where Applied |
|-----------|-------|
| **`React.memo`** | `ProductCard` rendering |
| **Server Components** | PLP/PDP pages, layouts, metadata |
| **Route Groups** | Skeleton isolation `(list)/loading.tsx` |
| **GraphQL Fragments** | `ProductCardFields`, `ProductDetailFields` (No over-fetching) |
| **LCP Image Eager Loading** | First 4 ProductCards and PDP main image |
| **CSS GPU Acceleration** | `translate3d` for magnifier lens tracking |

---

## 🔌 API Reference

**Endpoint:** `https://devapi.waltonplaza.com.bd/graphql`

**Primary query:** `getProducts(pagination, filter)`

*(Note: Data relies strictly on the GraphQL schema definitions provided in the API.)*

---

## 📄 License

Private — Walton Hi-Tech Industries PLC evaluation project.
