## Virtual Try-On — on the homepage, loaded on demand

A new section on the homepage where the user can try on glasses with their webcam. Nothing heavy loads until they click **Start camera** — so the homepage stays fast.

### User flow

1. New homepage section ("Try them on") sits between Smart Glasses and Offers.
2. Default state: a poster image of the section, a short headline ("See how they look — no appointment needed"), a row of frame thumbnails, and a big **Start camera** button. Zero JS for face tracking loaded yet.
3. On click:
   - Browser prompts for camera permission.
   - We dynamically `import()` MediaPipe + the try-on component (code-split chunk, ~1 MB, fetched once and cached).
   - The poster fades into the live webcam feed with the selected glasses overlaid on the face.
4. While active: thumbnail strip switches frames instantly, a **Capture** button downloads a PNG snapshot, a **Stop** button releases the camera and returns to the poster state.
5. If permission is denied or no camera is found → friendly inline message with a "Try again" button. No modal, no route change.

### Why on-demand matters

- MediaPipe Face Landmarker model is ~3 MB; the wasm runtime is ~1 MB. We never want this on first paint.
- Camera access prompts are scary if they fire unexpectedly. Requiring an explicit click is both better UX and required by most browsers anyway.
- Implementation: the heavy component lives in its own file and is loaded via `const mod = await import("@/components/try-on/TryOnLive")` only inside the Start-camera click handler. The placeholder section itself is tiny and SSR-friendly.

### Technical approach

**Face tracking**: `@mediapipe/tasks-vision` Face Landmarker (browser-only, WASM + WebGL, ~30 fps). Landmarks 33, 263, and 168 give us eye corners and nose bridge — enough to compute position, width, and rotation for the overlay.

**Rendering**: `<video>` + `<canvas>` stacked. Each frame: detect landmarks → compute transform → draw the selected glasses PNG on the canvas.

**Frames**: a small manifest with 4–6 transparent PNGs in `src/assets/try-on/` (Ray-Ban Wayfarer, Aviator, Oakley Holbrook, Ray-Ban Meta, etc.). Each entry has `{ id, name, brand, src, widthRatio }` where `widthRatio` is the glasses-width ÷ eye-distance ratio used for scaling.

**Privacy**:
- `getUserMedia` only on explicit click.
- Stream stays in the browser, never uploaded.
- `track.stop()` on Stop, on unmount, and on tab hide.
- Small caption: "Your camera feed stays on your device."

**Performance**:
- Lazy chunk via dynamic `import()`.
- `requestAnimationFrame` loop paused when `document.hidden`.
- Single Face Landmarker instance, reused across frame swaps.

### Files

```text
src/components/try-on/
  TryOnSection.tsx     — light placeholder section (poster, copy, thumbnails, Start button). Imported by index.tsx.
  TryOnLive.tsx        — heavy component: video, canvas, MediaPipe loop, capture, stop. Loaded lazily.
  useFaceLandmarker.ts — hook that loads the model once and exposes detect().
  frames.ts            — frame manifest.
src/assets/try-on/
  rayban-wayfarer.png
  rayban-aviator.png
  oakley-holbrook.png
  rayban-meta.png
  ...
```

Touch-ups:
- `src/routes/index.tsx` — add `<TryOnSection id="try-on" />` between Smart Glasses and Offers.
- `src/components/site/SiteHeader.tsx` — add `{ to: "/", hash: "try-on", label: "Try On" }` to the NAV array so the navbar can scroll to it like the other sections.

### Dependencies

- `@mediapipe/tasks-vision` (lazy-loaded, not in the initial bundle)

No backend, no Lovable Cloud, no API keys.

### Out of scope (good follow-ups)

- True 3D frames with three.js + GLB models.
- "Upload a selfie" fallback for users with no camera.
- Share-to-WhatsApp/Instagram of the captured snapshot.
- Face-shape based recommendations.
