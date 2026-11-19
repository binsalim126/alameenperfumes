# AL-AMEEN PERFUMES - Luxury Multi-Page E-Commerce & Admin Portal

A luxury, responsive perfume e-commerce system with **Retail & Wholesale** dual-mode pricing, 1-click **WhatsApp checkout**, dedicated multi-page navigation, and a full-featured **Admin Portal**.

---

## Architecture & Pages

- **`index.html`** – Flagship home landing page (Hero, fragrance families category selector, bestsellers with side-scrolling on mobile, promos, features strip, heritage preview, testimonials, newsletter, and footer).
- **`shop.html`** – Dedicated full catalog shop page with live debounced search, category filter chips, sorting (popularity, price low/high, rating), product quick-view modal, and cart drawer.
- **`about.html`** – Dedicated heritage & craft page detailing pure Assam agarwood distillation, French cold maturation, note architecture (Top, Heart, Base), and wholesale partnership standards.
- **`contact.html`** – Dedicated contact desk with 1-click WhatsApp instant chat, dual inquiry form (Retail vs. Wholesale), boutique & distillation hub details, and FAQ accordion.
- **`admin.html`** – Secure Admin Dashboard (single-admin locked to `AlameenPerfumes` / `Alameen@786`). Features expandable vertical product cards (zero side-scrolling), Announcement Bar ON/OFF toggle, and Festive Offer Batch discount rate manager.
- **`core.js`** – Shared state, catalog of 12 luxury formulations, pricing engine (wholesale tier MOQ discounts + festive offer rates), and local storage synchronization.

---

## Admin Credentials

- **Admin ID:** `AlameenPerfumes`
- **Password:** `Alameen@786`
- **Dashboard URL:** [`admin.html`](file:///c:/Users/umaru/OneDrive/Desktop/AL-AMEEN%20PERFUMES/admin.html)

---

## Key Features & Resolutions

1. **Firm Font Typography:** Styled with Google Fonts `Poppins` (weights 400 through 900) for firm, bold, modern luxury headings and clean body copy.
2. **Laptop Bottom Tabs Fixed:** Mobile curved dock is strictly hidden on laptop/desktop (`display: none !important;` on screens $> 768px$).
3. **Clean Header & Announcement:** Removed default offer tag and tagline clutter; announcement bar default is set to OFF and managed from the Admin Portal.
4. **Authentic Footer SVG Icons:** Genuine inline SVGs for Instagram, Facebook, YouTube, and WhatsApp.
5. **Longer "Add to Bag" Buttons:** Replaced mobile circular icon buttons with full-width / longer pill buttons with text & cart icon on all cards.
6. **Mobile Hero Layout:** Hero perfume visual is placed below the headline & CTAs on mobile/tablet so the brand message leads first.
7. **Admin Expandable Cards:** Eliminated horizontal table scrolling on mobile/tablet; clicking any product or its arrow expands all wholesale tiers, notes, and controls downwards smoothly.
8. **Offer Batch & Festive Discount:** Admin can toggle festive offer discounts ON/OFF, set custom discount %, and see prices automatically adjust across the storefront with strikethrough.
