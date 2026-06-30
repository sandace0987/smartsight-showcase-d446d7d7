import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowUpRight,
  Heart,
  Sparkles,
  Cpu,
  Eye,
  ShieldCheck,
  Gem,
  Store,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Quote,
} from "lucide-react";
import { CategoryGlasses } from "@/components/site/CategoryGlasses";
import heroPortrait from "@/assets/hero-portrait.jpg";

import raybanMetaHero from "@/assets/rayban-meta-hero.jpg";
import oakleyMeta from "@/assets/oakley-meta.jpg";
import productTortoise from "@/assets/product-tortoise.jpg";
import productAviator from "@/assets/product-aviator.jpg";
import productGoldWire from "@/assets/product-gold-wire.jpg";
import productAzure from "@/assets/product-azure.jpg";
import storeInterior from "@/assets/store-interior.jpg";
import { TryOnSection } from "@/components/try-on/TryOnSection";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { motion } from "framer-motion";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clear Sight Opticians | Luxury Eyewear & Smart Glasses in Hyderabad" },
      {
        name: "description",
        content:
          "Curated luxury frames, smart eyewear and clinical eye care across Hyderabad. Ray-Ban Meta & Oakley Meta now with launch pricing.",
      },
      { property: "og:title", content: "Clear Sight Opticians | Luxury Eyewear in Hyderabad" },
      {
        property: "og:description",
        content: "Premium prescription glasses, sunglasses, contact lenses and smart eyewear.",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: heroPortrait, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

const BRANDS = ["RAY·BAN", "OAKLEY", "PRADA", "GUCCI", "BURBERRY", "PERSOL", "CARRERA", "TOM FORD", "VOGUE", "POLICE"];

const PRODUCTS = [
  { name: "Vanguard Tortoise", category: "Clear Sight Signature", price: "₹14,500", badge: "Best Seller", img: productTortoise },
  { name: "Eclipse Aviator", category: "Prada Linea Rossa", price: "₹22,900", badge: "Limited", img: productAviator },
  { name: "Aura Gold Wire", category: "Gucci Collection", price: "₹31,000", img: productGoldWire },
  { name: "Azure Square", category: "Clear Sight Studio", price: "₹12,800", img: productAzure },
];

const COLLECTIONS = [
  { title: "Eyeglasses", count: "320+ frames" },
  { title: "Sunglasses", count: "280+ frames" },
  { title: "Smart Glasses", count: "Meta editions" },
  { title: "Contact Lenses", count: "Premium daily & monthly" },
  { title: "Kids Eyewear", count: "Durable & cute" },
  { title: "Luxury Frames", count: "Prada · Gucci · Tom Ford" },
];

const WHY = [
  { icon: Eye, title: "Expert optical guidance", desc: "Certified optometrists with 15+ years on the floor." },
  { icon: Gem, title: "Luxury & designer brands", desc: "From Prada to Persol, the world's finest, in one place." },
  { icon: Cpu, title: "Smart eyewear, fitted", desc: "Ray-Ban Meta & Oakley Meta with on-site demos." },
  { icon: Store, title: "Multi-store convenience", desc: "Three Hyderabad locations, same expert care." },
  { icon: ShieldCheck, title: "Lifetime fitting service", desc: "Free adjustments and tune-ups, forever." },
  { icon: Sparkles, title: "Personalised styling", desc: "Frame consultations matched to your face shape." },
];

const STORES = [
  {
    name: "Kukatpally (KPHB)",
    tag: "Flagship",
    address: "Shop #4, Padmaja Complex, JNTU Road, 6th Phase, KPHB, Hyderabad - 500085",
    phone: "+91 94405 25789",
    hours: "10:00 AM – 9:30 PM",
  },
  {
    name: "Nizampet",
    tag: "Studio",
    address: "Beside Vazra Nirman Pushpak, Nizampet Colony, Hyderabad, Telangana",
    phone: "+91 94405 25789",
    hours: "10:00 AM – 9:30 PM",
  },
  {
    name: "Bowenpally",
    tag: "Studio",
    address: "Near Delhi Public School, Sikh Village Road, Bowenpally, Hyderabad, Telangana",
    phone: "+91 94405 25789",
    hours: "10:00 AM – 9:00 PM",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Picked up the Ray-Ban Meta at Kukatpally. The team walked me through every feature, fitted them, and even helped with the app. Genuinely premium.",
    name: "Aarav Reddy",
    context: "Purchased Ray-Ban Meta Wayfarer",
  },
  {
    quote:
      "I wear glasses every day and these are the most flattering frames I've owned in years. The styling consultation was worth the visit alone.",
    name: "Niharika Iyer",
    context: "Bought Gucci Optical",
  },
  {
    quote:
      "Comprehensive eye test, no upsell, and they had Oakley Meta in stock with a serious discount. New regulars.",
    name: "Dr. Karthik Rao",
    context: "Oakley Meta + lenses",
  },
];

function HomePage() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    requestAnimationFrame(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, [hash]);

  return (
    <div className="bg-background">
      {/* ============== HERO ============== */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 pb-16 lg:pb-24">
        <div className="relative w-full h-[560px] sm:h-[640px] lg:h-[780px] overflow-hidden rounded-[28px] lg:rounded-[40px] bg-secondary">
          <img
            src={heroPortrait}
            alt="Person wearing clear-frame luxury eyewear in cinematic blue light"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-[reveal_1.2s_cubic-bezier(0.16,1,0.3,1)_both]"
          />
          {/* gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />


          {/* Top badge */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-white/85 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="size-1.5 rounded-full bg-electric" />
            Hyderabad · Est. 2012
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <motion.h1
                className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold leading-[0.92] tracking-tighter"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              >
                {["See", "better.", "Look", "better."].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.12em] mr-[0.28em]">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={{
                        hidden: { y: "110%" },
                        show: { y: "0%", transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
                <br />
                <span className="inline-block overflow-hidden align-baseline pb-[0.12em] mr-[0.28em]">
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: "0%", transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    Live
                  </motion.span>
                </span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 20 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="relative font-serif italic font-medium px-5 py-1 sm:px-8 sm:py-1.5 rounded-full inline-block"
                  style={{
                    backdropFilter: "blur(10px) saturate(170%) contrast(110%)",
                    WebkitBackdropFilter: "blur(10px) saturate(170%) contrast(110%)",
                    background:
                      "radial-gradient(120% 140% at 25% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 38%, rgba(255,255,255,0.04) 65%, rgba(255,255,255,0.18) 100%)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -2px 8px rgba(15,23,42,0.25), inset 0 0 30px rgba(255,255,255,0.18), 0 12px 40px -8px rgba(0,71,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    textShadow: "0 2px 18px rgba(255,255,255,0.35)",
                  }}
                >
                  smarter.
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full lens-iridescence mix-blend-screen opacity-60"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(0,71,255,0.0) 0%, rgba(0,71,255,0.22) 20%, rgba(255,255,255,0.35) 38%, rgba(255,0,128,0.18) 58%, rgba(0,200,255,0.22) 78%, rgba(0,71,255,0.0) 100%)",
                    }}
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                    <span
                      className="absolute top-0 bottom-0 w-[45%] lens-shimmer-track"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                        filter: "blur(6px)",
                        mixBlendMode: "screen",
                      }}
                    />
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      top: "12%",
                      left: "10%",
                      width: "38%",
                      height: "30%",
                      background: "radial-gradient(ellipse at center, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
                      filter: "blur(2px)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      bottom: "8%",
                      left: "22%",
                      right: "22%",
                      height: "22%",
                      background: "radial-gradient(ellipse at center, rgba(0,71,255,0.22), rgba(0,71,255,0) 70%)",
                      filter: "blur(3px)",
                    }}
                  />
                </motion.span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
              >
                <p className="text-white/85 text-base sm:text-lg max-w-md leading-relaxed">
                  Premium eyewear curated for the visionary. Discover Ray-Ban Meta,
                  Oakley Meta and the world's finest luxury frames, fitted by experts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton>
                    <Link
                      to="/brands"
                      className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-electric hover:text-white transition-colors"
                    >
                      Explore Brands
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/30 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
                    >
                      Book Eye Test
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ============== STATS COUNTER ============== */}
      <section className="px-6 lg:px-10 -mt-8 lg:-mt-12 mb-4">
        <Reveal className="mx-auto max-w-7xl grid grid-cols-3 gap-4 sm:gap-8 rounded-3xl border border-border bg-background/60 backdrop-blur p-6 sm:p-10">
          {[
            { v: 15, suffix: "+", label: "Years in Hyderabad" },
            { v: 12, suffix: "+", label: "Luxury houses stocked" },
            { v: 3, suffix: "", label: "Boutique locations" },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-4xl sm:text-6xl font-bold tracking-tighter text-electric">
                <CountUp to={s.v} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============== BRAND MARQUEE ============== */}
      <section className="py-10 lg:py-14 border-y border-border overflow-hidden">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] opacity-40">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="px-10 text-xl lg:text-2xl font-bold tracking-[0.18em] whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ============== RAY-BAN META — HERO SHOWCASE ============== */}
      <section id="smart-glasses" className="relative scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32 bg-ink overflow-hidden">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-white">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-electric/90">
              <span className="size-1.5 rounded-full bg-electric" />
              Ray-Ban Meta
            </div>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter">
              Iconic frames.
              <br />
              <span className="font-serif italic font-medium text-white/80">Now intelligent.</span>
            </h2>
            <p className="mt-6 text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
              Capture, call, and ask Meta AI without ever reaching for your phone. The Wayfarer you know, reimagined.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="bg-electric text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-ink transition-colors">
                Try in store
              </Link>
              <Link to="/services" className="border border-white/25 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                Learn more
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 bg-electric/20 blur-3xl rounded-full pointer-events-none" />
            <img
              src={raybanMetaHero}
              alt="Ray-Ban Meta smart glasses on an obsidian pedestal with electric-blue rim lighting"
              width={1600}
              height={1024}
              loading="lazy"
              className="relative w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ============== OAKLEY COMPANION + OFFER ============== */}
      <section className="px-6 lg:px-10 py-16 lg:py-24 bg-secondary/60">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-ink text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px]">
            <img src={oakleyMeta} alt="Oakley Meta performance glasses" width={1024} height={1024} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
            <div className="relative">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] font-bold uppercase tracking-widest border border-white/15">
                Performance
              </span>
              <h3 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight max-w-md">
                Oakley Meta, for the way you move.
              </h3>
            </div>
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/70 text-sm max-w-sm">
                HSTN &amp; Sphaera silhouettes with advanced audio, capture and Meta AI.
              </p>
              <Link to="/smart-glasses" className="inline-flex items-center gap-2 text-sm font-semibold text-electric">
                Shop Oakley Meta <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-electric text-white p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Limited</span>
              <p className="mt-3 text-3xl font-bold leading-tight">Up to 30% off smart eyewear</p>
            </div>
            <p className="text-white/85 text-sm mt-6">
              Visit any branch for an in-person demo. Stock moves quickly.
            </p>
            <Link to="/stores" className="mt-6 inline-flex items-center gap-2 bg-white text-electric px-5 py-3 rounded-full text-sm font-semibold w-fit">
              Find a store <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== NEW ARRIVALS ============== */}
      <section id="brands" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12 lg:mb-16">
            <div>
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">New Arrivals</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-3">
                Hand-picked, this season.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                A small, considered edit from the world's best houses and our own studio.
              </p>
            </div>
            <Link to="/brands" className="text-sm font-bold border-b-2 border-electric pb-1 tracking-[0.2em] uppercase w-fit">
              View all collection
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {PRODUCTS.map((p, idx) => (
              <Reveal key={p.name} as="article" delay={idx * 0.06} className="group cursor-pointer">
                <TiltCard className="relative aspect-[3/4] bg-secondary rounded-2xl overflow-hidden mb-4">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={800}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.badge === "Limited" ? "bg-electric text-white" : "bg-white/90 backdrop-blur text-ink"}`}>
                      {p.badge}
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label="Save"
                    className="absolute top-3 right-3 size-10 bg-white/95 rounded-full grid place-items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  >
                    <Heart className="size-4 text-ink" />
                  </button>
                </TiltCard>
                <h4 className="font-bold">{p.name}</h4>
                <p className="text-muted-foreground text-sm font-serif italic">{p.category}</p>
                <p className="mt-2 font-bold text-electric">{p.price}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== COLLECTIONS GRID ============== */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {COLLECTIONS.map((c, i) => (
              <Link
                key={c.title}
                to="/brands"
                className="group relative aspect-[5/4] rounded-2xl bg-secondary p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:bg-ink hover:text-white transition-colors"
              >
                <CategoryGlasses
                  variant={c.title}
                  className="absolute -right-6 -bottom-6 w-56 sm:w-64 h-auto text-foreground/15 group-hover:text-white/25 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none"
                />
                <span className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-white/50">
                  0{i + 1}
                </span>
                <div className="relative">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/70 mt-1">{c.count}</p>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 size-5 opacity-40 group-hover:opacity-100 group-hover:text-electric transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE ============== */}
      <section id="about" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-28 bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-14">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Why Clear Sight</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tighter">
              The trusted name in Hyderabad eyewear,{" "}
              <span className="font-serif italic font-medium text-electric">for over a decade.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="bg-background rounded-2xl p-7 border border-border">
                <span className="size-11 rounded-full bg-electric/10 grid place-items-center mb-5">
                  <w.icon className="size-5 text-electric" />
                </span>
                <h3 className="font-bold text-lg">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== STORE LOCATOR ============== */}
      <section id="stores" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Visit a store</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tighter">
                Three Hyderabad{" "}
                <span className="font-serif italic font-medium text-electric">studios.</span>
              </h2>
            </div>
            <Link to="/stores" className="text-sm font-bold border-b-2 border-electric pb-1 tracking-[0.2em] uppercase w-fit">
              All locations
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {STORES.map((s, i) => (
              <article key={s.name} className="bg-background border border-border rounded-3xl overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img
                    src={storeInterior}
                    alt={`${s.name} interior`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className={`w-full h-full object-cover ${i === 1 ? "scale-110" : i === 2 ? "-scale-x-100" : ""}`}
                  />
                </div>
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-electric">{s.tag}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-500" /> Open Today
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <MapPin className="size-4 mt-0.5 shrink-0" /> {s.address}
                  </p>
                  <div className="flex flex-col gap-1.5 text-sm">
                    <p className="inline-flex items-center gap-2"><Phone className="size-4 text-muted-foreground" />{s.phone}</p>
                    <p className="inline-flex items-center gap-2"><Clock className="size-4 text-muted-foreground" />{s.hours}</p>
                  </div>
                  <div className="mt-auto pt-2 flex gap-2">
                    <a
                      href="#"
                      className="flex-1 text-center bg-ink text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors"
                    >
                      Directions
                    </a>
                    <a
                      href={`tel:${s.phone.replace(/\s/g, "")}`}
                      className="flex-1 text-center bg-secondary py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter max-w-2xl">
              Loved by Hyderabad's{" "}
              <span className="font-serif italic font-medium text-electric">most particular wearers.</span>
            </h2>
            <div className="hidden md:flex items-center gap-2 text-sm text-white/60">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-electric text-electric" />
                ))}
              </div>
              4.9 · 1,200+ reviews
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
                <Quote className="size-6 text-electric" />
                <blockquote className="text-lg leading-relaxed text-white/90 flex-1">"{t.quote}"</blockquote>
                <figcaption>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-white/50 font-serif italic mt-1">{t.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============== VIRTUAL TRY-ON ============== */}
      <TryOnSection id="try-on" />

      {/* ============== OFFERS CTA ============== */}
      <section id="offers" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-electric text-white rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">Smart Glasses</span>
            <h3 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tighter leading-tight">
              Save up to ₹12,000 on Ray-Ban &amp; Oakley Meta.
            </h3>
            <p className="mt-5 text-white/85 max-w-md">
              Launch pricing across all three Hyderabad locations. In-store only.
            </p>
            <Link
              to="/offers"
              className="mt-8 inline-flex items-center gap-2 bg-white text-electric px-7 py-3.5 rounded-full text-sm font-semibold"
            >
              View all offers <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="bg-secondary rounded-3xl p-10 lg:p-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric">Eye Test</span>
            <h3 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tighter leading-tight">
              Comprehensive eye test, <span className="font-serif italic font-medium text-electric">on us.</span>
            </h3>
            <p className="mt-5 text-muted-foreground max-w-md">
              Complimentary digital eye examination with every frame purchase.
              Walk-ins welcome, or book a slot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-ink text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-electric transition-colors">
                Book Eye Test
              </Link>
              <Link to="/stores" className="inline-flex items-center gap-2 border-2 border-ink/15 px-7 py-3 rounded-full text-sm font-semibold hover:border-electric hover:text-electric transition-colors">
                Visit a store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============== BOOKING / CONTACT ============== */}
      <section id="contact" className="scroll-mt-24 px-6 lg:px-10 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl bg-ink text-white rounded-[28px] lg:rounded-[40px] p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-[1.02]">
              Book a private{" "}
              <span className="font-serif italic font-medium text-electric">consultation</span> today.
            </h2>
            <p className="mt-6 text-white/65 max-w-md leading-relaxed">
              Eye tests, frame styling, smart glasses demos. One of our specialists
              will be expecting you.
            </p>
            <div className="mt-10 space-y-4 text-sm text-white/80">
              <p className="inline-flex items-center gap-3"><Phone className="size-4 shrink-0 text-electric" /><span>+91 94405 25789</span></p>
              <p className="inline-flex items-center gap-3"><Mail className="size-4 shrink-0 text-electric" /><span>hello@clearsight.in</span></p>
              <p className="inline-flex items-start gap-3"><MapPin className="size-4 shrink-0 text-electric mt-0.5" /><span>Kukatpally (KPHB), Nizampet, Bowenpally</span></p>
            </div>
          </div>
          <form className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Full name</span>
              <input type="text" placeholder="Aarav Reddy" className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-electric placeholder:text-white/30 transition-colors" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Mobile</span>
              <input type="tel" placeholder="+91 …" className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-electric placeholder:text-white/30 transition-colors" />
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Preferred store</span>
              <select className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-electric transition-colors">
                <option className="bg-ink">Kukatpally (KPHB)</option>
                <option className="bg-ink">Nizampet</option>
                <option className="bg-ink">Bowenpally</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">What brings you in?</span>
              <textarea rows={3} placeholder="Eye test, smart glasses demo, frame styling…" className="bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-electric placeholder:text-white/30 transition-colors resize-none" />
            </label>
            <button
              type="button"
              className="sm:col-span-2 mt-2 bg-electric text-white py-4 rounded-full font-bold tracking-[0.18em] uppercase text-xs hover:bg-white hover:text-electric transition-colors"
            >
              Request appointment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
