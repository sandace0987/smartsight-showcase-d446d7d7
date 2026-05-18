import { lazy, Suspense, useState } from "react";
import { Camera, Sparkles } from "lucide-react";
import { FRAMES } from "./frames";

const TryOnLive = lazy(() => import("./TryOnLive"));

type Props = { id?: string };

export function TryOnSection({ id }: Props) {
  const [active, setActive] = useState(false);
  const [initialFrameId, setInitialFrameId] = useState<string | undefined>();

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase inline-flex items-center gap-2">
              <Sparkles className="size-3.5" /> Virtual Try-On
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
            <button
              type="button"
              onClick={() => start()}
              className="inline-flex items-center gap-2 bg-electric text-white px-7 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ink transition-colors w-fit"
            >
              <Camera className="size-4" /> Start camera
            </button>
          )}
        </div>

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
          // Poster / preview state — light, no JS for tracking yet
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 relative aspect-[4/3] rounded-3xl bg-ink overflow-hidden">
              <div className="absolute inset-0 grid place-items-center">
                <img
                  src={FRAMES[0].src}
                  alt="Try on glasses"
                  className="w-2/3 max-w-md drop-shadow-[0_20px_60px_rgba(0,71,255,0.4)]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => start()}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric hover:text-white transition-colors"
              >
                <Camera className="size-3.5" /> Start camera
              </button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => start(f.id)}
                  className="group bg-background border border-border rounded-2xl p-4 hover:border-electric hover:bg-electric/5 transition-all text-left"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
