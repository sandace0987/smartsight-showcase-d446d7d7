import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
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
  MessageCircle,
} from "lucide-react";
import { CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL } from "@/lib/contact-config";
import { HOUSES } from "@/lib/brand-catalog";
import { BookingModal } from "@/components/site/BookingModal";
import heroPortraitLight from "@/assets/homepage/hero-portrait-light.webp";
import heroPortraitDark from "@/assets/homepage/hero-portrait-dark.webp";
import pradaModelMale from "@/assets/brands/prada-model-male.webp";
import raybanModel from "@/assets/brands/rayban-model.webp";
import oakleyModel from "@/assets/brands/oakley-model.webp";
import pradaMilanoLogo from "@/assets/brands/prada-milano-logo.webp";
import rayBanLogo from "@/assets/brands/ray-ban-logo.svg";
import guessLogo from "@/assets/brands/guess-logo.webp";
import silhouetteLogo from "@/assets/brands/silhouette-logo.webp";

import storeInterior from "@/assets/miscellaneous/store-interior.webp";
import kphb1 from "@/assets/miscellaneous/kphb-interior-1.webp";
import kphb2 from "@/assets/miscellaneous/kphb-interior-2.webp";
import nizampet1 from "@/assets/miscellaneous/nizampet-1.webp";
import nizampet2 from "@/assets/miscellaneous/nizampet-2.webp";
import bowenpallyImg from "@/assets/miscellaneous/bowenpally.webp";

import pumaModel from "@/assets/brands/puma-model.webp";
import silhouetteModel from "@/assets/brands/silhouette-model.webp";
import vogueModel from "@/assets/brands/vogue-model.webp";
import montblancModel from "@/assets/brands/montblanc-model.webp";
import burberryModel from "@/assets/brands/burberry-model.webp";
import mauiJimModel from "@/assets/brands/maui-jim-model.webp";

import { StoreImageCarousel } from "@/components/site/StoreImageCarousel";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";
import { SMART_GLASSES_SEQUENCE } from "@/components/ProductReveal/sequence";
import { SMART_GLASSES_TEXT_TIMELINE } from "@/components/ProductReveal/textTimeline";

import zeissModel from "@/assets/brands/zeiss-model.webp";
import essilorModel from "@/assets/brands/essilor-model.webp";

const BRAND_CAMPAIGN_IMAGES: Record<string, string> = {
  prada: pradaModelMale,
  "ray-ban": raybanModel,
  oakley: oakleyModel,
  vogue: vogueModel,
  silhouette: silhouetteModel,
  puma: pumaModel,
  montblanc: montblancModel,
  burberry: burberryModel,
  "maui-jim": mauiJimModel,
  zeiss: zeissModel,
  essilor: essilorModel,
};
import { Gamepad2 } from "lucide-react";
import { FAQSection } from "@/components/site/FAQSection";
import { breadcrumbSchema, createSeoHead, faqSchema, itemListSchema, STORE_LOCATIONS } from "@/lib/seo";

const ProductReveal = lazy(() =>
  import("@/components/ProductReveal/ProductReveal").then((module) => ({
    default: module.ProductReveal,
  })),
);
const TryOnSection = lazy(() =>
  import("@/components/try-on/TryOnSection").then((module) => ({
    default: module.TryOnSection,
  })),
);
const CatchGame = lazy(() =>
  import("@/components/site/CatchGame").then((module) => ({ default: module.CatchGame })),
);


const HOMEPAGE_FAQS = [
  {
    question: "Where can I get a professional ZEISS eye test in Hyderabad?",
    answer: "Clear Sight Opticians is a proud ZEISS Certified Vision Expert — the first partner in Telangana. You can get advanced, precise vision profiling and professional eye tests using state-of-the-art ZEISS diagnostic equipment at all three of our Hyderabad studios: Kukatpally (KPHB), Nizampet, and Bowenpally. Eye tests are complimentary with any eyewear purchase.",
  },
  {
    question: "Can I get custom prescription lenses for Ray-Ban Meta AI glasses?",
    answer: "Yes, absolutely. We specialize in fitting custom, high-index prescription lenses into Ray-Ban Meta and Oakley Meta AI glasses. Whether you need single vision, progressive, blue-light filtering, or transition lenses, our in-house optical lab fits them precisely without affecting the open-ear audio or camera systems.",
  },
  {
    question: "What luxury designer eyewear brands do you stock?",
    answer: "We carry a curated edit of the world's finest eyewear brands, including Prada, Gucci, Oakley, Ray-Ban, Maui Jim, Silhouette, Montblanc, and Tom Ford. Every frame we sell is 100% authentic and comes with its original case, certificate, and manufacturer warranty.",
  },
  {
    question: "Do you offer walk-in appointments for vision check-ups?",
    answer: "Yes, walk-ins are always welcome at all three of our Hyderabad locations. However, to minimize wait times during weekends or peak hours, we recommend booking a slot in advance by calling us or scheduling via WhatsApp through our Contact page.",
  },
  {
    question: "Do you offer lifetime support for frames purchased from your store?",
    answer: "Yes! Every frame purchased from Clear Sight Opticians qualifies for our complimentary lifetime fitting service. You can walk into any of our KPHB, Nizampet, or Bowenpally studios anytime for free frame adjustments, nose pad replacements, screw tightening, and ultrasonic deep cleaning.",
  },
  {
    question: "Which Clear Sight store is nearest to me?",
    answer: "Choose KPHB for JNTU, Kukatpally, Miyapur, and Pragathi Nagar; Nizampet for Bachupally and Hyder Nagar; and Bowenpally for Secunderabad, Cantonment, Sikh Village, Paradise, and Begumpet.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeoHead({
      title: "Clear Sight Opticians | ZEISS Vision Experts, Designer Eyewear & Smart Glasses in Hyderabad",
      description:
        "Book a ZEISS vision expert consultation, prescription lenses, designer eyewear, contact lenses, computer glasses, and Ray-Ban Meta demos at Clear Sight Opticians in KPHB, Nizampet, and Bowenpally.",
      path: "/",
      schema: [
        breadcrumbSchema([{ name: "Home", path: "/" }]),
        itemListSchema(
          "Clear Sight Opticians Hyderabad stores",
          "/stores",
          STORE_LOCATIONS.map((store) => ({ name: store.name, path: `/stores#${store.id}` })),
        ),
        faqSchema(HOMEPAGE_FAQS),
      ],
    }),
    links: [
      { rel: "preload", as: "image", href: heroPortraitLight, fetchPriority: "high" },
      { rel: "preload", as: "image", href: heroPortraitDark, fetchPriority: "high" },
    ],
  }),
  component: HomePage,
});

const LOGO_TOKEN = import.meta.env.VITE_LOGO_DEV_API_KEY as string | undefined;

type MarqueeBrand = { name: string; domain: string; ai?: boolean; logo?: string };

const BRANDS: MarqueeBrand[] = [
  { name: "Ray-Ban", domain: "ray-ban.com", ai: true, logo: rayBanLogo },
  { name: "Oakley", domain: "oakley.com", ai: true },
  { name: "Prada Milano", domain: "prada.com", logo: pradaMilanoLogo },
  { name: "Montblanc", domain: "montblanc.com" },
  { name: "Prada Linea Rossa", domain: "prada.com" },
  { name: "Puma", domain: "puma.com" },
  { name: "Silhouette", domain: "silhouette.com", logo: silhouetteLogo },
  { name: "Tom Ford", domain: "tomford.com" },
  { name: "Burberry", domain: "burberry.com" },
  { name: "Philipp Plein", domain: "plein.com" },
  { name: "Versace", domain: "versace.com" },
  { name: "Porsche Design", domain: "porsche-design.com" },
  { name: "Guess", domain: "guess.com", logo: guessLogo },
  { name: "Police", domain: "policelifestyle.com" },
  { name: "Carrera", domain: "carreraworld.com" },
  { name: "Modo", domain: "modo.com" },
  { name: "Maui Jim", domain: "mauijim.com" },
  { name: "Stepper", domain: "steppereyewear.com" },
  { name: "CooperVision", domain: "coopervision.com" },
  { name: "Johnson & Johnson", domain: "jnj.com" },
  { name: "Bausch & Lomb", domain: "bausch.com.au" },
  { name: "Alcon", domain: "alcon.com" },
  { name: "ZEISS", domain: "zeiss.com" },
  { name: "Hoya", domain: "hoyavision.com" },
  { name: "Essilor", domain: "essilor.com" },
];

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png&size=200&retina=true`;

/** Marquee logo — colourises on hover (desktop) and on tap/click (touch devices). */
function MarqueeItem({ b }: { b: MarqueeBrand }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="flex flex-col items-center justify-center gap-2 px-10 shrink-0 focus:outline-none"
    >
      <div className="relative flex items-center justify-center">
        <img
          src={b.logo ?? logoUrl(b.domain)}
          alt={`${b.name} logo`}
          loading="lazy"
          className={cn(
            "h-10 lg:h-14 w-auto max-w-[180px] object-contain transition duration-300 hover:opacity-100 hover:grayscale-0",
            on ? "opacity-100 grayscale-0" : "opacity-70 grayscale",
          )}
        />
        {b.ai && (
          <span className="absolute -top-2 -right-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
            +AI
          </span>
        )}
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
        {b.name}
      </span>
    </button>
  );
}





const WHY = [
  { icon: Eye, title: "Expert optical guidance", desc: "Certified optometrists with 15+ years on the floor." },
  { icon: Gem, title: "Luxury & designer brands", desc: "From Prada to Persol — the world's finest, in one place." },
  { icon: Cpu, title: "AI eyewear, fitted", desc: "Ray-Ban Meta & Oakley Meta with on-site demos." },
  { icon: Sparkles, title: "Contact Lenses & Fitting", desc: "Daily, monthly & toric lenses from Acuvue, CooperVision & Alcon." },
  { icon: Store, title: "Multi-store convenience", desc: "Three premium stores, same expert care." },
  { icon: ShieldCheck, title: "Lifetime fitting service", desc: "Free adjustments and tune-ups, forever." },
];

const ANSWER_BLOCKS = [
  {
    question: "Where can I get a ZEISS eye test in Hyderabad?",
    answer:
      "Clear Sight Opticians offers professional ZEISS eye testing at KPHB, Nizampet, and Bowenpally. Each visit includes careful refraction, frame guidance, and lens recommendations for your daily routine.",
  },
  {
    question: "Do you offer contact lenses and trial fittings?",
    answer:
      "Yes! We stock leading contact lens brands including Johnson & Johnson Acuvue, CooperVision, Bausch & Lomb, and Alcon. We offer professional contact lens trial fittings, prescription checks, toric/astigmatism solutions, and daily or monthly disposables at all three stores.",
  },
  {
    question: "Can Ray-Ban Meta and Oakley Meta take prescription lenses?",
    answer:
      "Yes. Our team helps fit compatible prescription, progressive, transition, and blue-light lens options for Ray-Ban Meta and Oakley Meta frames without blocking the camera, speakers, or controls.",
  },
  {
    question: "Which designer eyewear brands are available?",
    answer:
      "We stock authentic designer eyewear including Ray-Ban, Oakley, Prada, Maui Jim, Silhouette, Montblanc, ZEISS, Essilor, and premium contact lenses.",
  },
  {
    question: "Which Clear Sight store is nearest to me?",
    answer:
      "Choose KPHB for JNTU, Kukatpally, Miyapur, and Pragathi Nagar; Nizampet for Bachupally and Hyder Nagar; and Bowenpally for Secunderabad, Cantonment, Sikh Village, Paradise, and Begumpet.",
  },
];

const STORE_IMAGES = {
  kphb: [kphb1, kphb2],
  nizampet: [nizampet1, nizampet2],
  bowenpally: [bowenpallyImg],
} as const;

const STORES = STORE_LOCATIONS.map((store) => ({
  ...store,
  images: [...STORE_IMAGES[store.id]] as string[],
}));

const TESTIMONIALS = [
  {
    quote:
      "Picked up the Ray-Ban Meta at Kukatpally — the team walked me through every feature, fitted them, and even helped with the app. Genuinely premium.",
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

function LetterShimmer({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -4, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: (offset + index) * 0.06,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}


function HomePage() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [playing, setPlaying] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingReason, setBookingReason] = useState("Contact lens fitting");

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = [
      "Hi Clear Sight Opticians, I'd like to book an appointment.",
      fd.get("name") && `Name: ${fd.get("name")}`,
      fd.get("mobile") && `Mobile: ${fd.get("mobile")}`,
      fd.get("email") && `Email: ${fd.get("email")}`,
      fd.get("store") && `Preferred store: ${fd.get("store")}`,
      fd.get("reason") && `Reason: ${fd.get("reason")}`,
      fd.get("notes") && `Notes: ${fd.get("notes")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTargetSection") || hash;
    if (!target) return;
    sessionStorage.removeItem("scrollTargetSection");
    setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  }, [hash]);



  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 pb-16 lg:pb-24">
        <div className="relative w-full h-[calc(100svh-8rem)] sm:h-[calc(100svh-7.5rem)] lg:h-[calc(100vh-6.5rem)] overflow-hidden rounded-[28px] lg:rounded-[40px] bg-secondary">
          <motion.img
            src={isDark ? heroPortraitDark : heroPortraitLight}
            alt="Person wearing clear-frame luxury eyewear in cinematic blue light"
            width={1500}
            height={1191}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          {/* Top badge */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 text-white/85 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-electric animate-pulse" />
              Hyderabad
            </div>
          </div>

          {/* Top-right CTA */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10">
            <MagneticButton>
              <Link
                to="/brands"
                className="inline-flex items-center gap-2 bg-white text-ink px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-electric hover:text-white transition-colors shadow-lg"
              >
                Explore Brands
                <ArrowUpRight className="size-4" />
              </Link>
            </MagneticButton>
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
                {["See", "better.", "Look", "better."].map((w, i) => {
                  const offsets = [0, 4, 12, 17];
                  return (
                    <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.12em] mr-[0.28em]">
                      <motion.span
                        className="inline-block will-change-transform"
                        variants={{
                          hidden: { y: "110%" },
                          show: { y: "0%", transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        <LetterShimmer text={w} offset={offsets[i]} />
                      </motion.span>
                    </span>
                  );
                })}
                <br />
                <span className="inline-flex items-center gap-x-[0.28em] whitespace-nowrap">
                  <span className="inline-block overflow-hidden">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={{
                        hidden: { y: "110%" },
                        show: { y: "0%", transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <LetterShimmer text="Live" offset={25} />
                    </motion.span>
                  </span>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 0.85, y: 20 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="relative font-serif italic font-medium px-5 py-1 sm:px-8 sm:py-1.5 rounded-full inline-flex items-center justify-center"
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
                    <LetterShimmer text="smarter." offset={30} />
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
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10"
              >
                <p className="text-white/85 text-base sm:text-lg max-w-md leading-relaxed">
                  Luxury frames, Meta AI glasses, &amp; lenses — expertly fitted.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Play mini-game button */}
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-electric hover:text-white"
            >
              <Gamepad2 className="size-4" />
              Play: Catch the Frames
            </button>
          )}

          {/* Mini-game overlay */}
          <AnimatePresence>
            {playing && (
              <Suspense fallback={null}>
                <CatchGame key="catch-game" onExit={() => setPlaying(false)} />
              </Suspense>
            )}
          </AnimatePresence>

        </div>
      </section>


      {/* ============== STATS COUNTER ============== */}
      <section className="px-6 lg:px-10 -mt-8 lg:-mt-12 mb-4">
        <Reveal className="mx-auto max-w-7xl grid grid-cols-3 gap-4 sm:gap-8 rounded-3xl border border-border bg-background/60 backdrop-blur p-6 sm:p-10">
          <div className="text-center sm:text-left">
            <p className="text-4xl sm:text-6xl font-bold tracking-tighter text-electric">
              <CountUp to={15} suffix="+" />
            </p>
            <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Years in Hyderabad
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center border-x border-border">
            <img
              src={logoUrl("zeiss.com")}
              alt="ZEISS"
              loading="lazy"
              className="h-8 sm:h-12 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              ZEISS Vision Experts
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-4xl sm:text-6xl font-bold tracking-tighter text-electric">
              <CountUp to={3} suffix="" />
            </p>
            <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Boutique locations
            </p>
          </div>
        </Reveal>
      </section>


      {/* ============== BRAND MARQUEE ============== */}
      <section className="py-10 lg:py-14 border-y border-border overflow-hidden">
        <div className="flex w-max animate-[marquee_69s_linear_infinite] items-center">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <MarqueeItem key={i} b={b} />
          ))}
        </div>
      </section>




      {/* ============== SMART GLASSES — LOOPING VIDEO REVEAL ============== */}
      <Suspense fallback={<section id="smart-glasses" className="min-h-[50vh] bg-ink" />}>
        <ProductReveal
          textTimeline={SMART_GLASSES_TEXT_TIMELINE}
          id="smart-glasses"
        />
      </Suspense>


      {/* ============== BRANDS ============== */}
      <section id="brands" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-12 lg:mb-16">
            <div>
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">The Houses</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mt-3">
                The brands we carry.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                A curated edit from the world's finest eyewear houses, stocked across our three premium stores.
              </p>
            </div>
            <Link to="/brands" className="text-sm font-bold border-b-2 border-electric pb-1 tracking-[0.2em] uppercase w-fit">
              View collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["ray-ban", "oakley", "maui-jim", "prada", "montblanc", "silhouette", "zeiss", "essilor"]
              .map((s) => HOUSES.find((h) => h.slug === s))
              .filter((h): h is NonNullable<typeof h> => Boolean(h))
              .map((h, i) => (
                <Reveal key={h.slug} delay={(i % 3) * 0.05}>
                  <TiltCard max={5}>
                    <Link
                      to="/brands/$brand"
                      params={{ brand: h.slug! }}
                      className="group relative bg-secondary/60 border border-border rounded-3xl p-8 hover:bg-ink hover:text-white transition-colors block h-full overflow-hidden"
                    >
                      {BRAND_CAMPAIGN_IMAGES[h.slug!] && (
                        <img
                          src={BRAND_CAMPAIGN_IMAGES[h.slug!]}
                          alt={`${h.name} campaign`}
                          loading="lazy"
                          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity z-0"
                        />
                      )}
                      <div className="relative z-10 flex items-start justify-between gap-4 mb-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground group-hover:text-white/50">
                          0{i + 1}
                        </span>
                        <div className="shrink-0 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 flex items-center justify-center h-20 w-32">
                          <img
                            src={h.logo ?? logoUrl(h.domain!)}
                            alt={`${h.name} logo`}
                            width={200}
                            height={100}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                      <h3 className="relative z-10 text-2xl font-bold tracking-tight">{h.name}</h3>
                      <p className="relative z-10 mt-3 text-sm text-muted-foreground group-hover:text-white/70 font-serif italic">
                        {h.note}
                      </p>
                    </Link>

                  </TiltCard>
                </Reveal>
              ))}


            <Reveal delay={0.1}>
              <Link
                to="/brands"
                className="group bg-ink text-white rounded-3xl p-8 flex flex-col justify-between h-full min-h-[220px] hover:bg-electric transition-colors"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                  {HOUSES.length}+ houses
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">View collection</h3>
                  <p className="mt-2 text-sm text-white/70 inline-flex items-center gap-2">
                    Explore every brand <ArrowUpRight className="size-4" />
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>






      {/* ============== VIRTUAL TRY-ON ============== */}
      <Suspense fallback={<section id="try-on" className="min-h-[50vh] bg-secondary/40" />}>
        <TryOnSection id="try-on" />
      </Suspense>



      {/* ============== STORE LOCATOR ============== */}
      <section id="stores" className="scroll-mt-24 px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Visit a store</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tighter">
                Three{" "}
                <span className="font-serif italic font-medium text-electric">premium stores.</span>
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
                  <StoreImageCarousel
                    images={s.images}
                    alt={s.name}
                    className={i === 1 ? "scale-110" : ""}
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
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-ink text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors"
                    >
                      Directions
                    </a>
                    <a
                      href={s.phoneHref}
                      className="flex-1 text-center bg-electric text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink transition-colors"
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

          {/* ============== CONTACT LENSES HIGHLIGHT BANNER ============== */}
          <div className="mt-12 bg-gradient-to-r from-electric/15 via-electric/5 to-transparent border border-electric/25 rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-electric animate-pulse" />
                <span className="text-electric text-xs font-bold uppercase tracking-[0.22em]">Vision Care Highlight</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Prescription Contact Lenses &amp; Trial Fittings</h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Daily disposables, monthly wear, toric (astigmatism), and multifocal lenses from world-class brands including CooperVision, Johnson &amp; Johnson Acuvue, Bausch &amp; Lomb, and Alcon. Complimentary trial fittings at all three stores.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBookingReason("Contact lens fitting");
                setBookingOpen(true);
              }}
              className="bg-electric text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink transition-colors shrink-0 shadow-sm"
            >
              Book Lens Trial
            </button>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-electric text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-ink hover:border hover:border-border transition-colors shadow-sm"
            >
              Our Story & Team <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/40 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter max-w-2xl">
              Loved by Hyderabad's{" "}
              <span className="font-serif italic font-medium text-electric">most particular wearers.</span>
            </h2>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-electric text-electric" />
                ))}
              </div>
              5.0 · 97 Google reviews
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-card border border-border rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
                <Quote className="size-6 text-electric" />
                <blockquote className="text-lg leading-relaxed text-foreground/90 flex-1">"{t.quote}"</blockquote>
                <figcaption>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-serif italic mt-1">{t.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============== ANSWER ENGINE CONTENT ============== */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">
              Quick answers
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tighter">
              Eye care answers for{" "}
              <span className="font-serif italic font-medium text-electric">Hyderabad.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Direct answers to the questions customers ask before choosing an optician,
              eye test, prescription lens, or smart glasses demo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ANSWER_BLOCKS.map((item) => (
              <article key={item.question} className="rounded-2xl border border-border bg-secondary/40 p-7">
                <h3 className="text-lg font-bold tracking-tight">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FAQS (AEO & SEO) ============== */}
      <FAQSection />


      {/* ============== BOOKING / CONTACT ============== */}
      <section id="contact" className="scroll-mt-24 px-6 lg:px-10 pt-20 lg:pt-28 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Get In Touch</span>
          <h2 className="mt-3 text-4xl lg:text-6xl font-bold tracking-tighter max-w-3xl leading-[1.02]">
            Book your eye test or AI glasses{" "}
            <span className="font-serif italic font-medium text-electric">demo.</span>
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4 space-y-8">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Call</h3>
                <a href={`tel:+${CONTACT_PHONE_RAW}`} className="text-2xl font-bold tracking-tight inline-flex items-center gap-3">
                  <Phone className="size-5 text-electric" /> {CONTACT_PHONE}
                </a>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">WhatsApp</h3>
                <a href={`https://wa.me/${CONTACT_PHONE_RAW}`} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold tracking-tight inline-flex items-center gap-3">
                  <MessageCircle className="size-5 text-electric" /> Chat with us
                </a>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Email</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl font-bold tracking-tight inline-flex items-center gap-3 break-all">
                  <Mail className="size-5 text-electric" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Opening Hours</h3>
                <p className="text-lg font-bold tracking-tight inline-flex items-center gap-3">
                  <Clock className="size-5 text-electric" /> Mon–Sun: 9:00 AM – 9:30 PM
                </p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Main Address</h3>
                <p className="text-sm text-muted-foreground leading-relaxed inline-flex items-start gap-3">
                  <MapPin className="size-5 text-electric mt-0.5" />
                  <span>Shop #4, Padmaja Complex, JNTU Road, 6th Phase, KPHB, Hyderabad - 500085</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Also at Nizampet &amp; Bowenpally · Open daily 9:00 AM – 9:30 PM
                </p>
              </div>
            </aside>

            <form onSubmit={handleBookingSubmit} className="lg:col-span-8 bg-secondary/60 border border-border rounded-3xl p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Full name</span>
                <input name="name" type="text" placeholder="Name..." className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Mobile</span>
                <input name="mobile" type="tel" placeholder="+91 …" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</span>
                <input name="email" type="email" placeholder="you@example.com" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Preferred store</span>
                <select name="store" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors">
                  <option className="bg-card text-foreground">Kukatpally (KPHB)</option>
                  <option className="bg-card text-foreground">Nizampet</option>
                  <option className="bg-card text-foreground">Bowenpally</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Reason</span>
                <select name="reason" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors">
                  <option className="bg-card text-foreground">Eye test</option>
                  <option className="bg-card text-foreground">AI glasses demo</option>
                  <option className="bg-card text-foreground">Glasses Service &amp; Repairs</option>
                  <option className="bg-card text-foreground">Kids Eyewear &amp; Myopia Care</option>
                  <option className="bg-card text-foreground">Frame styling</option>
                  <option className="bg-card text-foreground">Contact lens fitting</option>
                  <option className="bg-card text-foreground">Something else</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Notes</span>
                <textarea name="notes" rows={4} placeholder="Tell us anything that would help us prepare." className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors resize-none" />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 mt-4 inline-flex items-center justify-center gap-2 bg-electric text-white py-4 rounded-full font-bold tracking-[0.18em] uppercase text-xs hover:bg-ink transition-colors"
              >
                <MessageCircle className="size-4" /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultReason={bookingReason}
      />
    </div>
  );
}
