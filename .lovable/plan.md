## Goal
Add the first real product — **Maui Jim → Alika** — as a single model with **2 colour variants**, each with **3 orientation photos** (front, quarter, side). Colour options appear on the product card and inside a product detail view. Also add the Maui Jim logo, optimize images, and handle dark mode.

## Confirmed
1. Maui Jim added as a **new brand house**. 2. Card shows the **front photo** as default. 3. "Out of stock" badges **omitted** (shown as enquire/available).

## Source data
- **Alika** · ₹36,590 · geometric/panto shape
- **Crystal with Silver** (lens Blue Hawaii) → B837-05 front/quarter/side
- **Tortoise with Gold** (lens HCL® Bronze) → H837-10 front/quarter/side

## Plan

### 1. Assets (already optimal for fast loading)
The 6 product photos are 900×320 WebP, 5–10 KB each — no further compression needed. The Maui Jim logo (transparent PNG) is converted to WebP (~smaller). All uploaded to the CDN via `lovable-assets`, pointer JSONs stored under `src/assets/products/maui-jim-alika/` and `src/assets/brands/`. Images use `loading="lazy"` + width/height to avoid layout shift.

### 2. Catalog data model (`src/lib/brand-catalog.ts`)
Add optional photo/variant support, leaving silhouette models untouched:
```text
ColorVariant = { id, name, lens, swatch (css), images: { front, quarter, side } }
GlassItem    = { model, shape, colour, priceFrom, variants? }
```
Add **Maui Jim** brand (`slug: "maui-jim"`, tag "Hawaii-born", PolarizedPlus2 blurb, `logo` field) with one model — Alika — carrying both variants and their asset URLs. Crystal swatch = light silver gradient; Tortoise = brown tortoise.

### 3. Brands grid (`src/routes/brands.tsx`)
Add Maui Jim to `HOUSES` and the page `head()` description. (There is no separate logo carousel in the app today; the "brands carousel" = this brands grid + the per-brand "Other houses" row. The Maui Jim card/header will show its logo.)

### 4. Product card (`src/routes/brands_.$brand.tsx`)
For models with `variants`:
- Show the selected variant's **front photo** inside `MagnifyLens`, on a **light photo surface** (a white/neutral-light rounded panel kept light in both themes) so white-background product shots look intentional in dark mode. Silhouette models stay exactly as today.
- **Colour swatch dots** under the price; clicking swaps photo + frame/lens label.
- Clicking the image/title opens the new **ProductDialog**.
- Real price ₹36,590.

### 5. Product detail view — new `src/components/site/ProductDialog.tsx`
Mirrors the Maui Jim reference layout:
- Large main image on a light surface, with the magnifier lens.
- **Orientation thumbnails** (front/quarter/side) to switch the main image.
- **Colour swatches** to switch variant (updates image, thumbnails, frame/lens text).
- Model name, price, Frame + Lens colour.
- **Enquire** button opening the existing `EnquireDialog`, pre-filling brand/model and the selected colour.

### 6. Maui Jim logo + dark mode
- Brand detail header: show the logo for Maui Jim (replacing/above the text name) using `dark:invert` so the black signature flips to white in dark mode.
- Brands grid Maui Jim card: show the small logo with the same `dark:invert` treatment.
- Product photo surfaces stay light in both themes; lens swatches and UI use existing semantic tokens.

### Technical notes
- Files: `src/lib/brand-catalog.ts`, `src/routes/brands.tsx`, `src/routes/brands_.$brand.tsx`, new `src/components/site/ProductDialog.tsx`, `EnquireDialog.tsx` (optional `colour` prop), + asset pointer JSONs.
- `MagnifyLens` wraps `<img>` unchanged. `EnquireDialog` colour prop is backward compatible.
- Only Maui Jim Alika gets real photos; all other brands keep silhouettes.
