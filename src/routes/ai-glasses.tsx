import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
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
import { BRANDS } from "@/lib/brand-catalog";
import { ModelCard } from "@/components/site/ModelCard";
import { BookingModal } from "@/components/site/BookingModal";
import { breadcrumbSchema, createSeoHead, SITE_LOGO } from "@/lib/seo";
import { CONTACT_PHONE_RAW } from "@/lib/contact-config";
import rayBanLogoSvg from "@/assets/brands/ray-ban-logo.svg";

const AI_GLASSES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ray-Ban Meta AI Glasses (Wayfarer Gen 2)",
  "image": SITE_LOGO,
  "description": "Iconic Ray-Ban frames engineered with Meta AI, hands-free video capture, calls, and open-ear audio. Available at Clear Sight Opticians.",
  "brand": {
    "@type": "Brand",
    "name": "Ray-Ban",
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "29999",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "OpticalBusiness",
      "name": "Clear Sight Opticians",
    },
  },
};

export const Route = createFileRoute("/ai-glasses")({
  head: () =>
    createSeoHead({
      title: "Ray-Ban Meta & Oakley Meta AI Glasses | Clear Sight Opticians",
      description:
        "Shop Ray-Ban Meta Wayfarer Gen 2 and Oakley Meta HSTN AI glasses at Clear Sight Opticians. Experience hands-free capture, calls, and Meta AI. Book a demo at KPHB, Nizampet or Bowenpally.",
      path: "/ai-glasses",
      type: "product",
      schema: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Glasses", path: "/ai-glasses" },
        ]),
        AI_GLASSES_SCHEMA,
      ],
    }),
  component: AIGlassesPage,
});

/* ─── Data ─────────────────────────────────────────────────── */

const FEATURES = [
  { icon: Camera, title: "12MP Ultra-wide Camera", desc: "Capture first-person photo & 1080p video, hands-free." },
  { icon: Headphones, title: "Open-ear Audio", desc: "Music and calls — without earbuds blocking the world." },
  { icon: Cpu, title: "Meta AI On-demand", desc: "Ask, translate and identify anything, in real time." },
  { icon: Mic, title: "5-mic Array", desc: "Studio-clear voice even in loud environments." },
  { icon: BatteryCharging, title: "All-day Charging Case", desc: "Up to 36 hours total battery via the case." },
  { icon: Sparkles, title: "Prescription Ready", desc: "Fitted with your Rx in our on-site lab." },
];

const LOGO_TOKEN = import.meta.env.VITE_LOGO_DEV_API_KEY as string | undefined;

/* ─── Brand Logos for Video Cards ───────────────────────── */

function RayBanLogo() {
  const logoUrl = LOGO_TOKEN
    ? `https://img.logo.dev/ray-ban.com?token=${LOGO_TOKEN}&size=200&format=png&retina=true`
    : rayBanLogoSvg;
  return (
    <img
      src={logoUrl}
      alt="Ray-Ban logo"
      className="h-6 w-auto max-w-[90px] object-contain drop-shadow"
    />
  );
}

function OakleyLogo() {
  const logoUrl = LOGO_TOKEN
    ? `https://img.logo.dev/oakley.com?token=${LOGO_TOKEN}&size=200&format=png&retina=true`
    : null;
  return logoUrl ? (
    <img
      src={logoUrl}
      alt="Oakley logo"
      className="h-6 w-auto max-w-[90px] object-contain drop-shadow"
    />
  ) : (
    <svg viewBox="0 0 100 50" className="h-4 w-auto fill-current text-white shrink-0">
      <path d="M50 5C22.4 5 0 14 0 25s22.4 20 50 20 50-9 50-20S77.6 5 50 5zm0 30c-18 0-32.5-4.5-32.5-10S32 15 50 15s32.5 4.5 32.5 10S68 35 50 35z" />
    </svg>
  );
}

function MetaLogo() {
  const logoUrl = LOGO_TOKEN
    ? `https://img.logo.dev/meta.com?token=${LOGO_TOKEN}&size=200&format=png&retina=true`
    : null;
  return logoUrl ? (
    <img
      src={logoUrl}
      alt="Meta logo"
      className="h-6 w-auto max-w-[90px] object-contain drop-shadow"
    />
  ) : (
    <svg viewBox="0 0 100 50" className="h-4 w-auto fill-current text-white shrink-0">
      <path d="M68.8 8.3C61.4 8.3 55.4 12.8 50 18.9 44.6 12.8 38.6 8.3 31.2 8.3 14 8.3 0 22.3 0 39.5 0 45.4 4.8 50.2 10.7 50.2c8.2 0 14.8-4.9 20.5-11.8 5.4 6.9 11.4 11.8 19.8 11.8 16.2 0 29.5-13.8 29.5-31.2C100.5 14.6 86 8.3 68.8 8.3zm-37.6 31C21.7 39.3 10.7 30.1 10.7 19.3c0-5.8 4.6-10.3 10.5-10.3 5.4 0 10.1 3.7 14.5 9-4.2 6.5-9.1 14.8-14.5 21.3zm37.6 0c-5.4-6.5-10.3-14.8-14.5-21.3 4.4-5.3 9.1-9 14.5-9 5.9 0 10.5 4.5 10.5 10.3 0 10.8-11 20-20.5 20z" />
    </svg>
  );
}

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

      {/* Brand badges using SVG Logos */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
          {brand === "rayban" ? <RayBanLogo /> : <OakleyLogo />}
          <span className="text-white/50 text-xs px-1">×</span>
          <MetaLogo />
        </div>
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

/* ─── Page ───────────────────────────────────────────────────── */

type Tab = "rayban" | "oakley";

function AIGlassesPage() {
  const [tab, setTab] = React.useState<Tab>("rayban");
  const [bookingOpen, setBookingOpen] = React.useState(false);

  const raybanMetaModels = BRANDS.find((b) => b.slug === "ray-ban")
    ?.models.filter((m) => m.line === "Meta Glasses") || [];

  const oakleyMetaModels = BRANDS.find((b) => b.slug === "oakley")
    ?.models.filter((m) => m.line === "Meta Glasses") || [];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
              AI Glasses
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
              Iconic style meets{" "}
              <span className="font-serif italic font-medium text-electric">Meta AI.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
              Ray-Ban Meta and Oakley Meta — the frames you know, now with a 12MP camera,
              open-ear audio and on-demand Meta AI. In-store demos across all three premium stores.
            </p>
          </div>

          {/* ── Tab Switcher (Moved ABOVE Video Hero) ── */}
          <div className="mb-6">
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

          <VideoHero
            key={tab} // force re-mount to play new video
            videoSrc={tab === "rayban" ? "/videos/rayban-meta.mp4" : "/videos/oakley-meta.mp4"}
            brand={tab === "rayban" ? "rayban" : "oakley"}
            headline={tab === "rayban" ? "Iconic style meets Meta AI." : "Built for the way you move."}
            sub={tab === "rayban" ? "Capture, call, and ask Meta AI — without ever reaching for your phone." : "Capture, listen and talk to Meta AI — without breaking stride."}
          />
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {raybanMetaModels.map((m, idx) => (
                <ModelCard key={m.model} m={m} index={idx} brandName="Ray-Ban" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Oakley Tab ── */}
      {tab === "oakley" && (
        <section className="px-4 sm:px-6 lg:px-10 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-5 mb-10">
              <div>
                <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
                  Performance AI Eyewear
                </span>
                <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight">
                  Oakley Meta AI Eyewear
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                  Sport-lifestyle silhouettes meets Meta AI. Advanced audio, hands-free capture
                  and Prizm™ lens technology — engineered for athletes and active lifestyles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {oakleyMetaModels.map((m, idx) => (
                <ModelCard key={m.model} m={m} index={idx} brandName="Oakley" />
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
                Book a private AI glasses demo.
              </h2>
              <p className="mt-4 text-white/75 max-w-lg text-base">
                Try Meta AI, hands-free capture and open-ear audio in person — at any of
                our three premium stores. Our team will walk you through every feature.
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
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="bg-electric text-white px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-ink transition-colors"
              >
                Book Demo <ArrowUpRight className="size-4" />
              </button>
              <a
                href={`https://wa.me/${CONTACT_PHONE_RAW}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Meta%20AI%20glasses%20demo.`}
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

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultReason="AI glasses demo"
      />
    </div>
  );
}
