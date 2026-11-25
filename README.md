# বাজার দর (Bazar Dor)

**বাজার দর (Bazar Dor)** is a responsive Bangla grocery and daily essentials price-tracking web application built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **daisyUI**, **BetterAuth**, and **MongoDB**. It lets users track daily price movements, compare prices across local markets (bazaars), filter products by category, and manage their user profile.

---

## Key Features

1. **Live Price Ticker & Bangla Date Header:** Displays the **বাজার দর** brand header with the Bangla date underneath, active category highlighting, user session controls, and a continuous scrolling price ticker (`react-marquee-text`) showing item emojis, names, prices per unit, and percentage movement indicators.
2. **Daily Market Movers & Full Product Catalog:** Features dedicated home page sections for top price risers (**আজ দাম বেড়েছে ▲**), top price fallers (**আজ দাম কমেছে ▼**), and the complete product grid (**সব পণ্য**) with smooth anchor scrolling from the hero CTA.
3. **Category Browsing & Numeric Bengali Price Sorting:** Allows users to browse products by category (`/category/[categoryId]`) with skeleton loading states, custom 404 handling for invalid routes, and sorting (**সাজান**: ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম) that sorts Bengali numerals by numeric value.
4. **Protected Product Details & Market-Wise Price Breakdown:** Restricts `/product/[productId]` to authenticated users and presents item summary details, minimum/maximum/average price cards, and bazaar-by-bazar pricing.
5. **Authentication & Profile Management:** Supports email/password sign-in and sign-up along with Google and GitHub OAuth via **BetterAuth** backed by **MongoDB**, toast notifications via `react-hot-toast` and `react-toastify`, protected route redirects with `?next=` preservation, and profile name updates (`/profile` and `/profile/edit`).

---

## Technologies Used

* **Core Framework & UI:** Next.js (`16.4.6` with App Router & Turbopack), React (`19.3.0`), React DOM (`19.3.0`)
* **Authentication & Database:** BetterAuth (`^1.7.28`), MongoDB (`^7.9.1`)
* **Styling & Component Libraries:** Tailwind CSS, daisyUI, `lucide-react` (`^1.80.0`)
* **Ticker & Notifications:** `react-marquee-text` (`^1.0.6`), `react-hot-toast` (`^2.6.1`), `react-toastify` (`^11.2.0`)
* **Language:** JavaScript

---

## Deployment & Links

* **Live Link:** `https://your-bazar-dor-app.vercel.app`
* **GitHub Repository:** `https://github.com/your-username/bazar-dor-webapp`