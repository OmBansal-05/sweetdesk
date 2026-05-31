# SweetDesk

**SweetDesk** is a sweet shop management platform built for Indian mithai businesses. It helps shop owners manage products, customers, orders, inventory, and shop settings from a single modern dashboard.

Phase 1 is a fully interactive frontend prototype with mock data and client-side state. Phase 2 will add authentication, PostgreSQL persistence, and real CRUD APIs.

---

## Project Overview

SweetDesk is designed for confectionery and mithai shops that need a simple, professional tool to run daily operations — tracking sweets like Kaju Katli and Gulab Jamun, managing customer orders, monitoring ingredient stock, and viewing sales insights.

The application consists of two main areas:

- **Marketing site** — public landing page at `/`
- **App shell** — authenticated-style dashboard experience at `/dashboard`, `/products`, and related routes (currently open with no login required)

---

## Features Implemented in Phase 1

### Landing Page
- Modern SaaS-style marketing page
- Hero, features, benefits, and CTA sections
- Responsive design with SweetDesk branding (rose/amber palette)
- Links to the app dashboard

### App Shell
- Left sidebar navigation with active route highlighting
- Top navbar with shop name and user placeholder
- Responsive layout (collapsible sidebar on mobile)

### Dashboard
- Summary stat cards (revenue, orders, customers, low stock)
- Quick Actions (Add Product, Create Order, Add Customer, Update Inventory)
- Top selling sweets with revenue bars
- Today's production summary
- Revenue by sweet category
- Recent orders table
- Low stock alerts

### Products
- Product table with Indian sweet shop sample data
- Search by name, ID, or category
- Category filter pills
- Sort by name, price, or stock
- Product count display
- Add Product modal with validation
- Edit Product via details panel (reuses Add modal)
- Clickable row details panel

### Customers
- Customer cards with order history summary
- Search by name and email
- Customer count display
- Add Customer modal with validation
- Edit Customer on each card

### Orders
- Orders table with status badges
- Search by Order ID and customer name
- Status filter pills (All, Pending, In progress, Ready, Completed)
- Order count display
- Create Order modal with validation
- Edit Order per row (Order ID preserved)

### Inventory
- Inventory table with stock level indicators
- Summary cards (total items, low stock, suppliers)
- Search by item name
- Low stock filter
- Item count display
- Add Item modal with validation
- Edit Item per row (Item ID preserved)

### Settings
- Editable shop information (name, email, phone, address)
- Read-only regional settings (currency, timezone, tax rate)
- Notification toggles (UI only)
- Save Changes with required-field validation
- Local state updates on save

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Fonts | Geist (via `next/font`) |
| Linting | ESLint + eslint-config-next |
| Data (Phase 1) | Static mock data in `lib/mock-data.ts` |
| State (Phase 1) | React `useState` / `useMemo` (client-side only) |

---

## Project Structure

```
sweetdesk/
├── app/
│   ├── page.tsx                 # Public landing page
│   ├── layout.tsx               # Root layout (fonts, globals)
│   ├── globals.css              # Tailwind + theme variables
│   └── (shell)/                 # App routes (shared shell layout)
│       ├── layout.tsx           # Sidebar + navbar wrapper
│       ├── dashboard/page.tsx
│       ├── products/page.tsx
│       ├── customers/page.tsx
│       ├── orders/page.tsx
│       ├── inventory/page.tsx
│       └── settings/page.tsx
├── components/
│   └── shell/                   # App shell UI components
│       ├── app-shell.tsx
│       ├── sidebar.tsx
│       ├── top-navbar.tsx
│       ├── logo.tsx
│       ├── page-header.tsx
│       ├── status-badge.tsx
│       └── nav-icon.tsx
├── lib/
│   ├── mock-data.ts             # Sample products, customers, orders, etc.
│   └── navigation.ts            # Sidebar nav configuration
├── public/                      # Static assets
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## Pages and Functionality

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/dashboard` | Shop overview, analytics, quick actions |
| `/products` | Sweet product catalog — search, filter, sort, add, edit |
| `/customers` | Customer profiles — search, add, edit |
| `/orders` | Order tracking — search, filter by status, create, edit |
| `/inventory` | Stock and supplies — search, low-stock filter, add, edit |
| `/settings` | Shop details and preferences |

All app routes share the same sidebar and top navbar via the `(shell)` route group.

---

## How to Run Locally

### Prerequisites

- **Node.js** 18.18 or later
- **npm** (or yarn / pnpm / bun)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd sweetdesk

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Landing page: [http://localhost:3000](http://localhost:3000)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Other Commands

```bash
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

---

## Current Limitations

Phase 1 is a **frontend prototype**. The following are not yet implemented:

| Limitation | Details |
|------------|---------|
| **No authentication** | All app routes are publicly accessible |
| **No database** | Data does not persist after page refresh |
| **No API routes** | All CRUD operations use in-memory React state |
| **Mock data only** | Sample Indian sweet shop data in `lib/mock-data.ts` |
| **No multi-user / multi-shop** | Single implicit shop context |
| **Orders are simplified** | Customer stored as name string; no line-item breakdown |
| **Dashboard stats partially static** | Some stat cards use fixed mock values |
| **Notification toggles** | UI only; preferences are not saved |
| **Regional settings** | Currency, timezone, and tax rate are read-only |
| **No role-based access** | No owner/manager/staff permissions |

Changes made via Add/Edit modals exist only for the current browser session.

---

## Phase 2 Roadmap

Phase 2 will transform SweetDesk into a production-ready application.

### Planned additions

1. **Authentication** — Login, register, session management (Auth.js)
2. **Protected routes** — Middleware guarding `/dashboard` and app pages
3. **PostgreSQL** — Persistent data storage
4. **Prisma** — Type-safe ORM and migrations
5. **REST APIs** — Real CRUD endpoints for all entities
6. **Multi-shop tenancy** — User ↔ Shop scoping for SaaS readiness
7. **Normalized orders** — Customer FK, order line items
8. **Server-side dashboard** — Live aggregations from the database
9. **Persistent settings** — Shop and notification preferences saved to DB

### Suggested implementation order

```
Database & Prisma → Auth → Settings API → Products → Customers
→ Inventory → Orders → Dashboard API → Cleanup
```

---

## Screenshots

> Add screenshots here as the project grows. Suggested captures:

### Landing Page
<!-- ![Landing Page](./docs/screenshots/landing-page.png) -->
_Placeholder: Marketing landing page hero section_

### Dashboard
<!-- ![Dashboard](./docs/screenshots/dashboard.png) -->
_Placeholder: Dashboard with stats, quick actions, and analytics_

### Products
<!-- ![Products](./docs/screenshots/products.png) -->
_Placeholder: Products table with search, filters, and details panel_

### Orders
<!-- ![Orders](./docs/screenshots/orders.png) -->
_Placeholder: Orders table with status filters and create/edit modals_

### Inventory
<!-- ![Inventory](./docs/screenshots/inventory.png) -->
_Placeholder: Inventory table with stock indicators and summary cards_

---

## License

Private project. All rights reserved.

---

## Author

Built as a sweet shop management platform for Indian mithai businesses.
