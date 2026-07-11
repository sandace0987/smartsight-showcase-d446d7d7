import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Camera,
  Cpu,
  Headphones,
  Sparkles,
  BatteryCharging,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";
import { EnquireDialog } from "@/components/site/EnquireDialog";

// Ray-Ban Meta images
import rbMatteBlackClear from "@/assets/meta/rayban/rb-matte-black-clear.webp";
import rbShinyBlackGreen from "@/assets/meta/rayban/rb-shiny-black-green.webp";
import rbMatteBlackGraphite from "@/assets/meta/rayban/rb-matte-black-graphite.webp";
import rbCosmicBlueSapphire from "@/assets/meta/rayban/rb-cosmic-blue-sapphire.webp";
import rbMatteBlackGreyTransitions from "@/assets/meta/rayban/rb-matte-black-grey-transitions.webp";
import rbTransparentGreySapphire from "@/assets/meta/rayban/rb-transparent-grey-sapphire.webp";

// Oakley Meta images
import oakWarmGreyPrizmRuby from "@/assets/meta/oakley/oak-warm-grey-prizm-ruby.webp";
import oakBlackAmethyst from "@/assets/meta/oakley/oak-black-amethyst.webp";
import oakBrownSmoke from "@/assets/meta/oakley/oak-brown-smoke-deep-water.webp";
import oakBlackDarkGolf from "@/assets/meta/oakley/oak-black-prizm-dark-golf.webp";

export const Route = createFileRoute("/smart-glasses")({
  head: () => ({
    meta: [
      { title: "Meta Smart Glasses — Ray-Ban Meta & Oakley Meta | Clear Sight" },
      {
        name: "description",
        content:
          "Shop Ray-Ban Meta Wayfarer Gen 2 and Oakley Meta HSTN AI glasses at Clear Sight Opticians Hyderabad. In-store demos, expert fitting and exclusive pricing.",
      },
      { property: "og:title", content: "Meta Smart Glasses — Ray-Ban Meta & Oakley Meta" },
      {
        property: "og:description",
        content: "Iconic style meets Meta AI. Hands-free capture, calls and Meta AI in the frames you love.",
      },
    ],
  }),
  component: SmartGlassesPage,
});

/* ─── Data ─────────────────────────────────────────────────── */

type MetaModel = {
  sku: string;
  name: string;
  frame: string;
  lens: string;
  price: number;
  image: string;
  swatch: string;
};

const RAYBAN_MODELS: MetaModel[] = [
  {
    sku: "SK-1001200-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Matt Black",
    lens: "Clear",
    price: 39900,
    image: rbMatteBlackClear,
    swatch: "#1a1a1a",
  },
  {
    sku: "SK-1001203-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Shiny Black",
    lens: "Green",
    price: 39900,
    image: rbShinyBlackGreen,
    swatch: "#1a1a1a",
  },
  {
    sku: "SK-1001238-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Matt Black",
    lens: "Polar Gradient Graphite",
    price: 42100,
    image: rbMatteBlackGraphite,
    swatch: "#2c2c2c",
  },
  {
    sku: "SK-1001237-01",
    name: "Wayfarer (Gen 2)",
    frame: "Matt Black",
    lens: "Polar Gradient Graphite",
    price: 42100,
    image: rbMatteBlackGraphite,
    swatch: "#2c2c2c",
  },
  {
    sku: "SK-1001242-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Shiny Cosmic Blue",
    lens: "Transitions® Sapphire",
    price: 45700,
    image: rbCosmicBlueSapphire,
    swatch: "#3b6fd4",
  },
  {
    sku: "SK-1001247-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Matt Black",
    lens: "Transitions® Grey",
    price: 45700,
    image: rbMatteBlackGreyTransitions,
    swatch: "#1a1a1a",
  },
  {
    sku: "SK-1001846-01",
    name: "Wayfarer (Gen 2)",
    frame: "Large Shiny Transparent Grey",
    lens: "Transitions® Sapphire",
    price: 45700,
    image: rbTransparentGreySapphire,
    swatch: "#a8b0c0",
  },
];

const OAKLEY_MODELS: MetaModel[] = [
  {
    sku: "SK-1001193-01",
    name: "HSTN",
    frame: "Warm Grey",
    lens: "Prizm™ Ruby",
    price: 41800,
    image: oakWarmGreyPrizmRuby,
    swatch: "#9a8070",
  },
  {
    sku: "SK-1001194-01",
    name: "HSTN",
    frame: "Black",
    lens: "Clear to Amethyst Transitions®",
    price: 47600,
    image: oakBlackAmethyst,
    swatch: "#1a1a1a",
  },
  {
    sku: "SK-1001197-01",
    name: "HSTN",
    frame: "Brown Smoke",
    lens: "Prizm™ Deep Water Polarised",
    price: 44200,
    image: oakBrownSmoke,
    swatch: "#5a3e2b",
  },
  {
    sku: "SK-1001850-01",
    name: "HSTN",
    frame: "Black",
    lens: "Prizm™ Dark Golf",
    price: 41800,
    image: oakBlackDarkGolf,
    swatch: "#1a1a1a",
  },
];

const FEATURES = [
  { icon: Camera, title: "12MP Ultra-wide Camera", desc: "Capture first-person photo & 1080p video, hands-free." },
  { icon: Headphones, title: "Open-ear Audio", desc: "Music and calls — without earbuds blocking the world." },
  { icon: Cpu, title: "Meta AI On-demand", desc: "Ask, translate and identify anything, in real time." },
  { icon: Mic, title: "5-mic Array", desc: "Studio-clear voice even in loud environments." },
  { icon: BatteryCharging, title: "All-day Charging Case", desc: "Up to 36 hours total battery via the case." },
  { icon: Sparkles, title: "Prescription Ready", desc: "Fitted with your Rx in our on-site lab." },
];

/* ─── Video Hero ─────────────────────────────────────────────── */

function VideoHero({
  videoSrc,
  brand,
  headline,
  sub,
}: {
  videoSrc: string;
  brand: "rayban" | "oakley";
  headline: string;
  sub: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-ink">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Brand badges */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3">
        {brand === "rayban" ? (
          <>
            <span className="text-white/90 text-xs font-bold tracking-[0.25em] uppercase bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
              Ray-Ban
            </span>
            <span className="text-white/50 text-xs">×</span>
            <span className="text-white/90 text-xs font-bold tracking-[0.25em] uppercase bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
              Meta
            </span>
          </>
        ) : (
          <>
            <span className="text-white/90 text-xs font-bold tracking-[0.25em] uppercase bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
              Oakley
            </span>
            <span className="text-white/50 text-xs">×</span>
            <span className="text-white/90 text-xs font-bold tracking-[0.25em] uppercase bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1.5">
              Meta
            </span>
          </>
        )}
      </div>

      {/* Headline */}
      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 right-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.02] max-w-2xl"
        >
          {headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-white/70 text-sm sm:text-base max-w-lg"
        >
          {sub}
        </motion.p>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-8 size-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────── */

function MetaProductCard({
  model,
  discountPct,
  brand,
}: {
  model: MetaModel;
  discountPct: number;
  brand: string;
}) {
  const discounted = Math.round(model.price * (1 - discountPct / 100) / 100) * 100;
  return (
    <article className="group bg-secondary/60 border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:border-electric/40 transition-all duration-300 hover:shadow-lg">
      {/* image */}
      <div className="relative bg-white p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <img
          src={model.image}
          alt={`${brand} ${model.name} — ${model.frame} / ${model.lens}`}
          width={800}
          height={600}
          loading="lazy"
          className="max-h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* discount badge */}
        <span className="absolute top-3 right-3 bg-electric text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {discountPct}% Off
        </span>
      </div>

      {/* info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="size-3 rounded-full border border-border/80 shrink-0"
            style={{ background: model.swatch }}
            title={model.frame}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-electric">
            {brand}
          </span>
        </div>

        <h3 className="text-lg font-bold tracking-tight mt-1">
          {brand} {model.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-serif italic leading-relaxed">
          {model.frame} · {model.lens}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-electric">
            ₹{discounted.toLocaleString("en-IN")}
          </span>
          <span className="text-xs line-through text-muted-foreground">
            ₹{model.price.toLocaleString("en-IN")}
          </span>
        </div>

        <EnquireDialog
          brand={brand}
          model={`${brand} ${model.name} — ${model.frame} / ${model.lens}`}
          trigger={
            <button className="mt-auto pt-5 w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
              Book Demo <ArrowUpRight className="size-3.5" />
            </button>
          }
        />
      </div>
    </article>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

type Tab = "rayban" | "oakley";

function SmartGlassesPage() {
  const [tab, setTab] = React.useState<Tab>("rayban");

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
              Smart Glasses
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
              Iconic style meets{" "}
              <span className="font-serif italic font-medium text-electric">Meta AI.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
              Ray-Ban Meta and Oakley Meta — the frames you know, now with a 12MP camera,
              open-ear audio and on-demand Meta AI. In-store demos across all three Hyderabad studios.
            </p>
          </div>

          <VideoHero
            videoSrc="/videos/rayban-meta.mp4"
            brand="rayban"
            headline="Iconic style meets Meta AI."
            sub="Capture, call, and ask Meta AI — without ever reaching for your phone."
          />
        </div>
      </section>

      {/* ── Tab Switcher ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-16 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 p-1 bg-secondary/60 border border-border rounded-full w-fit">
            {(["rayban", "oakley"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 ${
                  tab === t
                    ? "bg-ink text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "rayban" ? "Ray-Ban Meta" : "Oakley Meta"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ray-Ban Tab ── */}
      {tab === "rayban" && (
        <section className="px-4 sm:px-6 lg:px-10 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-5 mb-10">
              <div>
                <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
                  AI Eyewear
                </span>
                <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight">
                  Ray-Ban Meta Wayfarer (Gen 2)
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                  The Wayfarer you know — reimagined with Meta AI, a 12MP camera and open-ear audio.
                  Hollywood-iconic. Quietly intelligent.
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {RAYBAN_MODELS.length} models
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {RAYBAN_MODELS.map((m) => (
                <MetaProductCard key={m.sku} model={m} discountPct={15} brand="Ray-Ban Meta" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Oakley Tab ── */}
      {tab === "oakley" && (
        <section className="px-4 sm:px-6 lg:px-10 py-10">
          <div className="mx-auto max-w-7xl">
            {/* Oakley video strip */}
            <div className="mb-10 rounded-2xl overflow-hidden">
              <VideoHero
                videoSrc="/videos/oakley-meta.mp4"
                brand="oakley"
                headline="Built for the way you move."
                sub="Capture, listen and talk to Meta AI — without breaking stride."
              />
            </div>

            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-5 mb-10">
              <div>
                <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
                  Performance AI Eyewear
                </span>
                <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight">
                  Oakley Meta HSTN
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                  Sport-lifestyle silhouette meets Meta AI. Advanced audio, hands-free capture
                  and Prizm™ lens technology — engineered for athletes.
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {OAKLEY_MODELS.length} models
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {OAKLEY_MODELS.map((m) => (
                <MetaProductCard key={m.sku} model={m} discountPct={20} brand="Oakley Meta" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28 bg-secondary/60 border-y border-border mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-14">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
              Built In
            </span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold tracking-tighter">
              Every feature you need.{" "}
              <span className="font-serif italic font-medium text-electric">
                No screen required.
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-background border border-border rounded-2xl p-7">
                <span className="size-11 rounded-full bg-electric/10 grid place-items-center mb-5">
                  <f.icon className="size-5 text-electric" />
                </span>
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In-Store CTA ── */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden bg-ink text-white p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* ambient glow */}
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-electric/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-electric/10 blur-3xl pointer-events-none"
            />

            <div className="relative">
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
                Experience It
              </span>
              <h2 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tighter max-w-xl leading-tight">
                Book a private smart glasses demo.
              </h2>
              <p className="mt-4 text-white/75 max-w-lg text-base">
                Try Meta AI, hands-free capture and open-ear audio in person — at any of
                our three Hyderabad studios. Our team will walk you through every feature.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-electric" />
                  Kukatpally (KPHB) · Nizampet · Bowenpally
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-electric" />
                  No appointment needed — walk in anytime
                </li>
              </ul>
            </div>

            <div className="relative flex flex-col gap-3 shrink-0">
              <Link
                to="/contact"
                className="bg-electric text-white px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-ink transition-colors"
              >
                Book Demo <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/919440525789?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Meta%20smart%20glasses%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/25 text-white px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
