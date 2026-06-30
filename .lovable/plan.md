# Premium Click-to-Fullscreen Zoom

Replace the cursor-following circular lens (which drifts from where you point) with a polished fullscreen image viewer. Click any product image to open it large; click/scroll/pinch to zoom in to 3x and drag to pan exactly where you want.

## How it will work

```text
 Product image (in dialog / brand page)
        │  click  ▼
 ┌─────────────────────────────────────────┐
 │  Fullscreen viewer (dark backdrop)       │
 │   • Click image  → zoom IN at that point │
 │   • Click again  → zoom OUT              │
 │   • Drag         → pan around at zoom    │
 │   • Scroll wheel → zoom in/out smoothly  │
 │   • Pinch (touch)→ zoom in/out           │
 │   • [+] / [−] / reset controls, Esc/✕    │
 └─────────────────────────────────────────┘
```

- **Zoom anchored to pointer**: zooming in centers on the exact spot you clicked or scrolled over, so it always magnifies "where you point."
- **Default zoom step 3x** (per your choice), with smooth scroll/pinch allowing roughly 1x–4x.
- **Drag to pan** when zoomed, with momentum-free precise tracking and bounds so the image can't be dragged off-screen.
- **Touch support**: tap to open, double-tap to zoom, pinch to scale, one-finger drag to pan.
- **Cursor cues**: `zoom-in` on the thumbnail, `grab`/`grabbing` while panning in the viewer.

## Components

1. **New `src/components/motion/ZoomViewer.tsx`** — a self-contained fullscreen viewer built on the existing Radix `Dialog`. Props: `src`, `alt`, and a `trigger` (the clickable image). Handles transform state (scale + translate), pointer/drag, wheel, and pinch, plus on-screen controls (zoom in, zoom out, reset, close) and an Esc-to-close. Reuses current design tokens (ink backdrop, electric accents, rounded controls) so it feels native to the site.

2. **`src/components/site/ProductDialog.tsx`** — swap the `MagnifyLens` wrapper around the main gallery image for `ZoomViewer`. The thumbnail strip and details column stay unchanged.

3. **`src/routes/brands_.$brand.tsx`** — replace the two `MagnifyLens` usages with `ZoomViewer` (or a plain image where a fullscreen open isn't desired), keeping the existing layout/sizing.

4. **`src/components/motion/MagnifyLens.tsx`** — remove after all usages are migrated.

## Technical details

- Transform model: a single `transform: translate(tx,ty) scale(s)` on the image, with `transform-origin: center`. On click/scroll, compute the new translate so the pointed-at point stays under the cursor (standard "zoom to point": `t' = p - (p - t) * s'/s`).
- Pan bounds clamp translate so at least part of the image is always visible; reset returns to `scale 1, translate 0`.
- Wheel handler uses `passive: false` to prevent page scroll; pinch via two-pointer `pointermove` tracking. Transitions use `cubic-bezier(0.16,1,0.3,1)` for the premium easing already used elsewhere; live drag/pinch updates skip the transition for 1:1 responsiveness.
- Accessibility: `Dialog` traps focus and handles Esc; controls have `aria-label`s; image keeps descriptive `alt`.
- No new dependencies — built on the existing Radix dialog + Tailwind tokens.

## Verification

- `tsgo --noEmit` for types.
- Drive the preview with Playwright: open a product dialog, click the image, confirm it opens fullscreen, zooms to the clicked point, pans on drag, and closes with ✕/Esc; capture screenshots at 1x and zoomed.
