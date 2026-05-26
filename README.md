# 🛒 Walton Plaza — Frontend Evaluation

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_4-38bdf8?style=for-the-badge&logo=tailwind-css)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-e10098?style=for-the-badge&logo=graphql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ed?style=for-the-badge&logo=docker)

High-performance product listing and detail system built for Walton Plaza. Features Server-Side Rendering (SSR), optimistic UI updates, dynamic EMI calculations, robust cart state management, and fully responsive layouts optimized for mobile performance.

---

## 🚀 Quick Start

### 1. Set Up the Project

After cloning or downloading the project repository, navigate to the directory and run these setup steps:

```bash
# 1. Install dependencies
npm install

# 2. Create the .env file and copy values from .env.example
cp .env.example .env
```

### 2. Run the Application

You can run the application either locally or using Docker.

#### Option A: Running Locally

```bash
# 1. Generate GraphQL types
npm run codegen

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — automatically redirects to `/products`.

#### Option B: Running with Docker

You can spin up the application using Docker Compose. The container handles running `npm install`, generating GraphQL types via `npm run codegen`, and starting the development server with hot-reloading automatically:

```bash
# Run Docker Compose
docker compose up --build --remove-orphans
```

To run on a different host port if `5000` is already in use (e.g. port `5001`):
```bash
HOST_PORT=5001 docker compose up --build --remove-orphans
```

Open [http://localhost:5000](http://localhost:5000) (or the custom port you specified) — automatically redirects to `/products`.

---

## 🛠 Tech Stack & Rationale

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js (App Router) | React Server Components (RSC) for optimized initial data fetch, streaming rendering, and route-level loading state isolation. |
| **UI Styling** | React 19 + Tailwind CSS | Utility-first styling for premium responsive layout, transition states, and micro-animations. |
| **Data Fetching** | Apollo Client + Codegen | Typed GraphQL operations, fragment caching, and custom pagination merge policies. |
| **State Management**| Zustand | Lightweight persistence to `localStorage` with SSR-compatible client hydration triggers. |
| **Validation** | Zod | Runtime validation for environment configurations at boot. |
| **Notifications** | Sonner | Accessibly optimized toast notifications. |

---

## 📂 Project Structure

```text
src/
├── app/(shop)/cart/              # Detailed cart overview and item modifiers
├── app/(shop)/checkout/          # Multi-grid shipping validation and checkout details
├── app/(shop)/products/          # PLP + PDP route mappings (isolated route-groups)
├── components/layout/            # Responsive Header, Footer, and SVG logos
├── components/products/          # ProductCard, Gallery lightbox, Filter panels, Magnifiers
├── components/ui/                # Button, Badge, Skeletons, Inputs
├── features/cart/                # Zustand cart store, sidebar drawers, and hydration
├── features/products/            # Utilities, attributes filters, and pricing logic
└── graphql/                      # Typed fragments, schemas, and Apollo client configurations
```

---

## ✨ Core Features & Optimizations

### 🛍️ Product Listing Page (PLP)
- **RSC Optimized**: Initial catalog page renders on the server for enhanced SEO scores.
- **Intersection scroll**: Infinite scroll triggers automatically, supported by a cache-merging policy based on filter parameters.
- **Visual Skeletons**:
  - Isolated loading route (`loading.tsx`) inside route group boundaries to prevent visual jumps.
  - Infinite scroll loader elements at the base of listings.
  - **Filter Transition Skeletons**: Intercepts url changes on client filter selection, showing visual skeleton cards during Next.js router transitions.
- **Price Range Debouncing**: Knobs and inputs in the price slider track local states at 60 FPS instantly, debouncing search parameters synchronization by `400ms` to prevent Next.js router transition lag.

### 💳 Reusable Product Card
- **Memoization**: Wrapped in `React.memo` to prevent redundant re-renders.
- **Optimistic CTA**: Handles item mutations inside React 19 async transition hooks (`useTransition`).
- **Images**: Automatically sizes preview images and eagerly preloads above-the-fold images (`priority={true}`) to optimize Lighthouse LCP.

### 🔍 Product Details Page (PDP)
- **Advanced Gallery**: Fully responsive touch-friendly gallery with fullscreen lightbox modal.
- **CSS Magnifier**: Desktop magnifier tracking using CSS GPU-accelerated coordinate transitions (`translate3d`).
- **Dynamic Pricing & Stock**: Variance updates stock labels and handles CTA statuses. Dynamic EMI values are recalculated in real time.

### 🛒 Cart & Checkout Page Mobile Revamp
- **Card-Style Cart Items**: Replaced stacking mobile lists with side-by-side thumbnail and metadata cards, wrapping quantity controls and subtotals in inline grids.
- **Checkout Grid Alignment**: Explicitly declared `grid-cols-1` layouts to guarantee perfect column flows on small devices, optimizing card paddings (`p-4 sm:p-6`) to maximize screen usage.
- **Safe Hydration**: Prevented hydration errors using `skipHydration: true` Zustand store setups synchronized via client `rehydrate` hooks.

---

## ⚡ Performance Techniques

| Technique | Where Applied |
|-----------|-------|
| **`React.memo`** | Card item rendering |
| **Server Components** | Entry routes, base pages, layouts |
| **GraphQL Fragments** | Normalized data query payloads |
| **Debounce Filtering** | Price filter slider input hooks |
| **GPU CSS Translation** | Image zoom lens coordinates |
| **Hydration Hook** | Zustand local storage synchronizations |

---

## 📋 Evaluation Criteria Audit & Code Verification

This section maps the requested evaluation criteria directly to their specific files and implementation blocks in the project structure.

### 🏗️ Section 1: Architecture & Setup

#### 1. Setup Next.js App Router with TypeScript strict mode
- **Status**: Completed
- **File Map**: `/src/app` page routes; strict rules enabled inside [tsconfig.json](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/tsconfig.json#L7) (`"strict": true` and `"noUncheckedIndexedAccess": true`).

#### 2. Scalable folder structure
- **Status**: Completed
- **File Map**: Features are isolated into domains like `src/features/cart/` (State, Components, Hydration) and `src/graphql/` (Queries, Fragment schemes, Client instances).

#### 3. Configure GraphQL client with caching
- **Status**: Completed
- **File Map**: Initialized inside [apollo-client.ts](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/graphql/client/apollo-client.ts). Includes a custom merge cache policy (`InMemoryCache`) for key argument validation during infinite scrolls.

#### 4. Typed GraphQL queries
- **Status**: Completed
- **File Map**: GraphQL Codegen outputs typed results from `codegen.ts` to `src/graphql/generated` at compile-time.

#### 5. Environment-based API config
- **Status**: Completed
- **File Map**: Formulated inside [env.ts](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/config/env.ts) using `zod` object parsers to check crucial environment variables at startup.

---

### 🛍️ Section 2: Product Listing Page (PLP)

#### 6. Fetch products via GraphQL
- **Status**: Completed
- **File Map**: Managed server-side inside the listing route [page.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/app/%28shop%29/products/%28list%29/page.tsx) and resolved client-side.

#### 7. Pagination or infinite scroll (choice & justification)
- **Status**: Completed
- **Justification**: **Infinite Scroll** is implemented via IntersectionObserver. This pattern minimizes page-change layout shifts and navigation friction on mobile devices. Details are logged in the features list above.

#### 8. Loading skeleton & error handling
- **Status**: Completed
- **File Map**:
  - Isolated route loader in App Router groups `(list)/loading.tsx`.
  - Infinite scroll loaders and page error boundaries.
  - Active transition loader skeletons inside [ProductsCatalog.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductsCatalog.tsx).

#### 9. Filters (price, category, availability)
- **Status**: Completed
- **File Map**: Coded in [ProductFiltersBar.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductFiltersBar.tsx). Integrated with local state debouncing in [PriceRangeFilter.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/PriceRangeFilter.tsx).

#### 10. Sorting (price, rating)
- **Status**: Completed
- **File Map**: Controlled via [ProductSortBar.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductSortBar.tsx).

---

### 💳 Section 3: Product Card

#### 11. Reusable ProductCard component
- **Status**: Completed
- **File Map**: Formulated in [ProductCard.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductCard.tsx). Implements eager loading properties on above-the-fold cards, transforms on hover, and React 19 transitions.

---

### 🔍 Section 4: Product Details Page (PDP)

#### 12. Dynamic routing
- **Status**: Completed
- **File Map**: Dynamic parameter mapping inside `src/app/(shop)/products/[uid]/page.tsx`.

#### 13. Fetch product details
- **Status**: Completed
- **File Map**: Built in [ProductDetailView.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductDetailView.tsx). Integrates responsive thumbnail galleries, touch lightbox zoom overlays, variance stock CTA switches, and live EMI price builders.

---

### 🛒 Section 5: State Management

#### 14. Cart system (add/remove/update)
- **Status**: Completed
- **File Map**: Formulated in [cart-store.ts](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/features/cart/store/cart-store.ts).

#### 15. State persistence & safe hydration
- **Status**: Completed
- **File Map**: Persisted inside local storage via Zustand persist. Visual SSR glitches and hydration crashes are prevented by skipping store hydration at boot and rehydrating client-side using [use-cart-hydration.ts](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/features/cart/hooks/use-cart-hydration.ts).

---

### ⚡ Section 6: Performance Optimization

#### 16. Memoization strategy
- **Status**: Completed
- **File Map**: Product cards are wrapped in `React.memo` (inside [ProductCard.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/ProductCard.tsx#L125)). Attributes sorting/filters use `useMemo` and `useCallback` hooks.

#### 17. Server vs Client Components
- **Status**: Completed
- **File Map**: Static layouts and pages default to Server Components. Interactivity is isolated using the `"use client"` directive.

#### 18. GraphQL optimization
- **Status**: Completed
- **File Map**: Implemented using specific, minimal fields declared inside GraphQL Fragments to prevent over-fetching.

---

### ⚛️ Section 7: React 19

#### 19. Use at least one modern React 19 feature
- **Status**: Completed
- **File Map**: Multi-feature implementation across the code:
  - **Form Actions & `useActionState`**: Implemented inside [checkout/page.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/app/%28shop%29/checkout/page.tsx) to bind shipping form action workflows.
  - **Decoupled Form Pending Status via `useFormStatus`**: Submit buttons read parent action pending states dynamically.
  - **Optimistic State via `useOptimistic`**: Implemented in [AddToCartButton.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/AddToCartButton.tsx) to provide instant visual feedback on click.
  - **Asynchronous Transitions (`useTransition`)**: Handles async execution borders.

---

## ⚛️ React 19 Implementations & Architecture

The application has been updated to use modern React 19 APIs natively for state mutations, forms, and optimistic visual feedback:

### 1. Form Actions & `useActionState` (State Transitions)
The shipping details form inside [checkout/page.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/app/%28shop%29/checkout/page.tsx) has been upgraded from manual submit listeners and loading states to React 19's native `useActionState` hook:
```tsx
const [formState, formAction, isPending] = useActionState(
  async (prevState, formData) => { ... },
  null
);
```
- **Form Bindings**: Submits native `FormData` payloads through `<form action={formAction}>` bindings.
- **Visual Feedback**: Errors are tracked natively via `formState?.errors` and displayed in the corresponding fields.

### 2. Nested Form Status Tracker (`useFormStatus`)
Rather than passing down loading flags as props, the checkout submit button is extracted into a child `<SubmitOrderButton />` component that reads parent status natively:
```tsx
import { useFormStatus } from "react-dom";
const { pending } = useFormStatus();
```
- **Impact**: Removes prop-drilling, encapsulates visual buttons, and leverages context-aware React 19 form behaviors.

### 3. Immediate Optimistic Toggles (`useOptimistic`)
In [AddToCartButton.tsx](file:///Users/rakibulislam/Desktop/ACI%20Projects/walton_frontend_evaluation/src/components/products/AddToCartButton.tsx), adding elements triggers React 19's `useOptimistic` state hook:
```tsx
const [optimisticAdding, setOptimisticAdding] = useOptimistic(
  false,
  (state, nextValue: boolean) => nextValue
);
```
- **Impact**: Instantly sets the button label to "Adding..." on user click, hiding transition delay latency during Apollo Store writes and page redirections.

### 4. Native Reference Binding (Prop-level refs)
`InputField.tsx` passes ref attributes directly as standard props (`ref={ref}`) instead of wrapping custom elements in complex `forwardRef` hooks, complying with React 19's simplified ref bindings.

---

## 🔌 API Reference
- **Endpoint**: `https://devapi.waltonplaza.com.bd/graphql`
- **Primary query**: `getProducts(pagination, filter)`
