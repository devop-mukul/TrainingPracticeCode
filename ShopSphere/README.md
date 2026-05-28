# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ShopSphere Supabase: Phase 1 (Cart Table)

Phase 1 creates the `cart_items` table so each logged-in user can save cart rows in the database.

### Run SQL in Supabase

1. Open your Supabase project dashboard.
2. Go to SQL Editor.
3. Open [supabase/phase1_cart_items.sql](supabase/phase1_cart_items.sql).
4. Copy the SQL and run it in SQL Editor.

### What this creates

- `public.cart_items` with columns:
	- `id`
	- `user_id`
	- `product_id`
	- `title`
	- `price`
	- `quantity`
	- `image`
	- `created_at`
- `unique(user_id, product_id)` so one product has one row per user.
- Basic indexes for faster reads.
- Row Level Security enabled (policies can be added in a later phase).
