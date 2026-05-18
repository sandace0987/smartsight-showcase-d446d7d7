import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

/* ============================================================
   SMART GLASSES — SCROLL-DRIVEN PNG SEQUENCE
   - 16 frames showing case → glasses out → arms open → POV.
   - Tall pinned section; scroll progress (0 → 1) drives frame index.
   - Frames are pre-loaded into <img> objects and drawn to a canvas
     each tick for flicker-free playback.
   ============================================================ */

const FRAME_COUNT = 16;
const FRAMES: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) =>
    new URL(
      `../../assets/glasses-sequence/${String(i + 1).padStart(2, "0")}.jpg`,
      import.meta.url,
    ).href,
);

const clamp = (v: number, mn = 0, mx = 1) => Math.min(mx, Math.max(mn, v));

/* ---------- Captions tied to scroll progress ---------- */

const CAPTIONS = [
  { text: "In the case.",   sub: "Crafted to be carried.",                    start: 0.00, end: 0.18 },
  { text: "Opening up.",    sub: "A satisfying click — and they're ready.",   start: 0.20, end: 0.36 },
  { text: "Out of the box.", sub: "Wayfarer silhouette, smart inside.",       start: 0.38, end: 0.56 },
  { text: "Facing you.",    sub: "Built for the way you wear them.",          start: 0.58, end: 0.74 },
  { text: "On your face.",  sub: "Meta AI, capture & open-ear audio.",        start: 0.76, end: 0.92 },
] as const;

function Captions({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setP(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end pb-12 lg:pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center relative h-48">
        {CAPTIONS.map((c, i) => {
          const window = (p - c.start) / (c.end - c.start);
          const opacity = clamp(window < 0.5 ? window * 2 : (1 - window) * 2, 0, 1);
          const y = (1 - opacity) * 16;
          return (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-opacity"
              style={{ opacity, transform: `translateY(${y}px)` }}
            >
              <span className="text-electric text-[11px] font-bold tracking-[0.32em] uppercase mb-3">
                0{i + 1} — Stage
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
                {c.text.split(" ").map((w, j, arr) =>
                  j === arr.length - 1 ? (
                    <span key={j} className="font-serif italic font-medium text-electric">
                      {" "}{w}
                    </span>
                  ) : (
                    <span key={j}>{j === 0 ? "" : " "}{w}</span>
                  ),
                )}
              </h3>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base">{c.sub}</p>
            </div>
          );
        })}

        {/* Final CTA */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
          style={{
            opacity: clamp((p - 0.93) / 0.06, 0, 1),
            transform: `translateY(${(1 - clamp((p - 0.93) / 0.06)) * 24}px)`,
          }}
        >
          <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            Live <span className="font-serif italic font-medium text-electric">smarter.</span>
          </h3>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-md">
            Ray-Ban Meta &amp; Oakley Meta — fitted in our Hyderabad studios.
          </p>
          <Link
            to="/smart-glasses"
            className="mt-6 inline-flex items-center gap-2 bg-electric text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-ink transition-colors"
          >
            Explore Smart Glasses <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Scroll-driven canvas sequence ---------- */

export function SmartGlassesScroll({ id = "smart" }: { id?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);

  // Preload all frames
  useEffect(() => {
    let alive = true;
    let count = 0;
    const imgs: HTMLImageElement[] = [];
    FRAMES.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (!alive) return;
        count++;
        setLoaded(count);
        if (count === FRAME_COUNT) setReady(true);
      };
      img.onerror = () => {
        if (!alive) return;
        count++;
        setLoaded(count);
        if (count === FRAME_COUNT) setReady(true);
      };
      imgs[i] = img;
    });
    imagesRef.current = imgs;
    return () => { alive = false; };
  }, []);

  // Scroll → progress
  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      progressRef.current = clamp(scrolled / total, 0, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Render loop: draw current frame to canvas
  useEffect(() => {
    if (!ready) return;
    let raf = 0;

    const draw = () => {
      const canvas = canvasRef.current;
      const imgs = imagesRef.current;
      if (canvas && imgs.length) {
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progressRef.current * FRAME_COUNT),
        );
        if (idx !== currentFrameRef.current) {
          const img = imgs[idx];
          if (img && img.complete && img.naturalWidth > 0) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const cssW = canvas.clientWidth;
            const cssH = canvas.clientHeight;
            if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
              canvas.width = cssW * dpr;
              canvas.height = cssH * dpr;
            }
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              // contain-fit
              const ratio = img.naturalWidth / img.naturalHeight;
              const cRatio = canvas.width / canvas.height;
              let dw, dh, dx, dy;
              if (ratio > cRatio) {
                dw = canvas.width;
                dh = dw / ratio;
              } else {
                dh = canvas.height;
                dw = dh * ratio;
              }
              dx = (canvas.width - dw) / 2;
              dy = (canvas.height - dh) / 2;
              ctx.drawImage(img, dx, dy, dw, dh);
              currentFrameRef.current = idx;
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  return (
    <section
      id="smart"
      ref={wrapRef}
      className="relative bg-gradient-to-b from-secondary/60 via-background to-secondary/40"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* eyebrow */}
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-10">
          <span className="text-electric text-[11px] font-bold tracking-[0.28em] uppercase">
            Smart Glasses · Ray-Ban Meta
          </span>
        </div>
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-10 text-[10px] font-semibold tracking-[0.28em] uppercase text-muted-foreground">
          Scroll to unbox ↓
        </div>

        {/* Canvas */}
        <div className="absolute inset-0 grid place-items-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1100px] max-h-[78vh]"
            style={{ display: "block" }}
          />
        </div>

        {/* Loading shimmer */}
        {!ready && (
          <div className="absolute inset-x-0 bottom-1/2 translate-y-1/2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Loading sequence… {loaded}/{FRAME_COUNT}
          </div>
        )}

        {/* Captions */}
        <Captions progressRef={progressRef} />
      </div>
    </section>
  );
}
