import { lazy, Suspense, useState } from "react";
import { Camera, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FRAMES } from "./frames";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TiltCard } from "@/components/motion/TiltCard";

const TryOnLive = lazy(() => import("./TryOnLive"));

type Props = { id?: string };

export function TryOnSection({ id }: Props) {
  const [active, setActive] = useState(false);
  const [initialFrameId, setInitialFrameId] = useState<string | undefined>();
  const [hoverIdx, setHoverIdx] = useState(0);

  const start = (frameId?: string) => {
    setInitialFrameId(frameId);
    setActive(true);
  };

  return (
    <section
      id={id}
      className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32 bg-secondary/40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase inline-flex items-center gap-2">
              <span className="relative grid place-items-center">
                <span className="size-2 rounded-full bg-electric" />
                <span className="absolute size-2 rounded-full bg-electric animate-ping" />
              </span>
              <Sparkles className="size-3.5" /> Virtual Try-On · Live
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
              See how they look —{" "}
              <span className="font-serif italic font-medium text-electric">
                no appointment needed.
              </span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
              Pick a frame, hit the button, and try it on right here in your browser.
              We never upload your camera feed.
            </p>
          </div>
          {!active && (
            <MagneticButton>
              <button
                type="button"
                onClick={() => start()}
                className="inline-flex items-center gap-2 bg-electric text-white px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ink transition-colors w-fit"
              >
                <Camera className="size-4" /> Start camera
              </button>
            </MagneticButton>
          )}
        </Reveal>

        {active ? (
          <Suspense
            fallback={
              <div className="aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl bg-ink grid place-items-center text-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-10 rounded-full border-2 border-white/20 border-t-electric animate-spin" />
                  <p className="text-sm">Loading try-on…</p>
                </div>
              </div>
            }
          >
            <TryOnLive
              initialFrameId={initialFrameId}
              onClose={() => setActive(false)}
            />
          </Suspense>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <TiltCard className="lg:col-span-3 relative aspect-[4/3] rounded-3xl bg-ink overflow-hidden" max={4}>
              <div className="absolute inset-0 grid place-items-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={FRAMES[hoverIdx]?.id ?? "preview"}
                    src={FRAMES[hoverIdx]?.src ?? FRAMES[0].src}
                    alt="Try on glasses"
                    className="w-2/3 max-w-md drop-shadow-[0_20px_60px_rgba(0,71,255,0.4)]"
                    loading="lazy"
                    initial={{ opacity: 0, x: 60, rotate: -3, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.18em] border border-white/15">
                <span className="relative grid place-items-center">
                  <span className="size-1.5 rounded-full bg-electric" />
                  <span className="absolute size-1.5 rounded-full bg-electric animate-ping" />
                </span>
                Live preview
              </div>
              <MagneticButton className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={() => start(FRAMES[hoverIdx]?.id)}
                  className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric hover:text-white transition-colors"
                >
                  <Camera className="size-3.5" /> Start camera
                </button>
              </MagneticButton>
            </TiltCard>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {FRAMES.map((f, idx) => (
                <MagneticButton key={f.id} strength={0.25}>
                  <button
                    type="button"
                    onClick={() => start(f.id)}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onFocus={() => setHoverIdx(idx)}
                    className={`group w-full bg-background border rounded-2xl p-4 transition-all text-left ${
                      hoverIdx === idx ? "border-electric bg-electric/5" : "border-border hover:border-electric hover:bg-electric/5"
                    }`}
                  >
                    <div className="aspect-[2/1] grid place-items-center">
                      <img
                        src={f.src}
                        alt={`${f.brand} ${f.name}`}
                        className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-electric">
                      {f.brand}
                    </p>
                    <p className="text-sm font-semibold tracking-tight">{f.name}</p>
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
