# 🛍️ PixelMart – Product Management Dashboard

A modern **Next.js 14 e-commerce dashboard** with authentication, product management, and a responsive UI.  
Built using **React 19, TypeScript, Tailwind CSS, and shadcn/ui**.

---

## 🚀 Features

### 🔐 Authentication

- Email & password-based login/signup (stored in `localStorage`)
- Secure session management with React Context API
- Protected routes with redirection
- Demo login: **demo@pixelmart.com / demo123**

### 🧾 Product Listing

- 40+ products (20 per page)
- Filtering by category, brand, status, and price range
- Real-time search and multi-option sorting
- Product detail modal + pagination
- Fully responsive grid layout

### 🛠️ Product Management

- Add new products with name, price, quantity, brand, category, status, SKU, and image upload
- Real-time validation (name, price, SKU, etc.)
- Image preview before submission
- Auto redirect to product list on success
- Data stored in `localStorage` (persists on reload)

### 💾 Data Handling

- Static products from `/public/data/products.json`
- User-added products persisted in browser
- Static + user data displayed together

### 📱 Responsive Design

- Mobile-first (320px+)
- Tablet and desktop optimized
- Accessible and touch-friendly

---

## 🧰 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 19 + TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **State:** Context API
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

---

## ⚙️ Setup

```bash
git clone <repo-url>
cd wearmart
npm install
npm run dev
```

Open 👉 `http://localhost:3000`

Demo credentials:  
**Email:** demo@pixelmart.com  
**Password:** demo123

---

## 📊 Pages

- `/login` – Login (public)
- `/signup` – Signup (public)
- `/products` – Product listing (protected)
- `/add-product` – Add product (protected)

---

## 🧠 Highlights

- SSR + static data preloading
- Debounced search and filters
- Context-based state management
- Pagination & validation
- Modern, clean, production-ready UI

---

**PixelMart v1.0** – Modern, scalable, and production-ready e-commerce dashboard.
