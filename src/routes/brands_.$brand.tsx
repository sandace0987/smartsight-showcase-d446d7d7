import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft, Play, Volume2, VolumeX } from "lucide-react";
import { getBrand, BRANDS, HOUSES, priorityIndex, type BrandData, type GlassItem } from "@/lib/brand-catalog";
import { GlassSilhouette } from "@/components/site/GlassSilhouette";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ModelCard } from "@/components/site/ModelCard";
import { breadcrumbSchema, createSeoHead } from "@/lib/seo";
import { CONTACT_PHONE_RAW } from "@/lib/contact-config";
import { GLOBAL_PROMO } from "@/lib/promo-config";
import pradaModelMale from "@/assets/brands/prada-model-male.webp";
import pleinModel from "@/assets/brands/plein-model.webp";
import vogueModel from "@/assets/brands/vogue-model.webp";
import policeModel from "@/assets/brands/police-model.webp";
import oakleyModel from "@/assets/brands/oakley-model.webp";
import raybanModel from "@/assets/brands/rayban-model.webp";
import silhouetteModel from "@/assets/brands/silhouette-model.webp";
import pumaModel from "@/assets/brands/puma-model.webp";
import montblancModel from "@/assets/brands/montblanc-model.webp";
import burberryModel from "@/assets/brands/burberry-model.webp";
import mauiJimModel from "@/assets/brands/maui-jim-model.webp";
import porscheModel from "@/assets/brands/porsche-model.webp";
import tomFordModel from "@/assets/brands/tom-ford-model.webp";
import versaceModel from "@/assets/brands/versace-model.webp";
import carreraModel from "@/assets/brands/carrera-model.webp";
import guessModel from "@/assets/brands/guess-model.webp";
import modoModel from "@/assets/brands/modo-model.webp";
import stepperModel from "@/assets/brands/stepper-model.webp";

const CAMPAIGN_IMAGES: Record<string, string> = {
  prada: pradaModelMale,
  "philipp-plein": pleinModel,
  vogue: vogueModel,
  police: policeModel,
  oakley: oakleyModel,
  "ray-ban": raybanModel,
  silhouette: silhouetteModel,
  puma: pumaModel,
  montblanc: montblancModel,
  burberry: burberryModel,
  "maui-jim": mauiJimModel,
  "porsche-design": porscheModel,
  "tom-ford": tomFordModel,
  versace: versaceModel,
  carrera: carreraModel,
  guess: guessModel,
  modo: modoModel,
  stepper: stepperModel,
};



export const Route = createFileRoute("/brands_/$brand")({
  head: ({ params }) => {
    const b = getBrand(params.brand);
    const title = b
      ? `${b.name} Eyewear in Hyderabad | Clear Sight Opticians`
      : "Designer Eyewear Brands | Clear Sight Opticians";
    const desc = b
      ? `Shop authentic ${b.name} prescription glasses and sunglasses at Clear Sight Opticians in Hyderabad. ${b.models?.length ? `${b.models.length} models in stock.` : ""} Available at KPHB, Nizampet, and Bowenpally.`
      : "Curated designer frames and prescription eyewear at Clear Sight Opticians Hyderabad.";
    return createSeoHead({
      title,
      description: desc,
      path: `/brands/${params.brand}`,
      schema: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
          { name: b?.name ?? params.brand, path: `/brands/${params.brand}` },
        ]),
      ],
    });
  },
  loader: ({ params }) => {
    const brand = getBrand(params.brand);
    if (!brand) throw notFound();
    return { brand };
  },
  notFoundComponent: () => (
    <div className="px-6 lg:px-10 py-24 mx-auto max-w-3xl text-center">
      <h1 className="text-4xl font-bold tracking-tight">Brand not found</h1>
      <p className="mt-4 text-muted-foreground">We couldn't find that brand.</p>
      <Link to="/brands" className="mt-6 inline-flex items-center gap-2 text-electric font-semibold">
        <ArrowLeft className="size-4" /> Back to all brands
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-6 lg:px-10 py-24 mx-auto max-w-3xl text-center">
      <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: BrandPage,
});

const LOGO_TOKEN = import.meta.env.VITE_LOGO_DEV_API_KEY as string | undefined;
const houseLogo = (name: string) => {
  const h = HOUSES.find((x) => x.name === name);
  if (h?.logo) return h.logo;
  if (h?.domain && LOGO_TOKEN)
    return `https://img.logo.dev/${h.domain}?token=${LOGO_TOKEN}&size=200&format=png&retina=true`;
  return null;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BrandPage() {
  const { brand } = Route.useLoaderData() as { brand: BrandData };
  const [videoMuted, setVideoMuted] = React.useState(true);
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug)
    .sort((a, b) => priorityIndex(a.name) - priorityIndex(b.name))
    .slice(0, 6);

  if (brand.comingSoon) {
    return (
      <div className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-electric transition-colors">
            <ArrowLeft className="size-4" /> All brands
          </Link>

          <div className="mt-12 max-w-2xl bg-secondary/30 border border-border rounded-3xl p-8 lg:p-12">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Coming Soon</span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tighter">{brand.name}</h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed font-semibold">
              Adding online inventory soon.
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              For now, contact the store directly to check available models, pricing, and colorways in our physical studios.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${CONTACT_PHONE_RAW}?text=Hi%20Clear%20Sight%20Opticians,%20I'd%20like%20to%20enquire%20about%20the%20available%20inventory%20for%20${encodeURIComponent(brand.name)}%20frames.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-electric text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
              >
                Enquire via WhatsApp
              </a>
              <a
                href={`tel:+${CONTACT_PHONE_RAW}`}
                className="bg-background border border-border px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition"
              >
                Call Store Directly
              </a>
            </div>
          </div>

          {/* Other houses block */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Other houses</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {otherBrands.map((b) => {
                const logo = houseLogo(b.name);
                return (
                  <Link
                    key={b.slug}
                    to="/brands/$brand"
                    params={{ brand: b.slug }}
                    className="group bg-secondary/60 border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center hover:bg-ink hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-center h-12 w-full rounded-lg bg-white p-2 ring-1 ring-black/5">
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${b.name} logo`}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold tracking-tight text-ink">{b.name}</span>
                      )}
                    </div>
                    <span className="text-xs font-bold tracking-tight">{b.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lineList: string[] = [];
  for (const m of brand.models) {
    const l = m.line ?? "Other";
    if (m.line && !lineList.includes(l)) lineList.push(l);
  }
  if (lineList.includes("Meta Glasses")) {
    const idx = lineList.indexOf("Meta Glasses");
    if (idx > -1) {
      lineList.splice(idx, 1);
      lineList.unshift("Meta Glasses");
    }
  }
  const navSections: { id: string; label: string }[] = [
    ...lineList.map((l) => ({ id: slugify(l), label: l })),
  ];

  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-electric transition-colors">
          <ArrowLeft className="size-4" /> All brands
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl bg-secondary/40 border border-border">
          {CAMPAIGN_IMAGES[brand.slug] && (
            <img
              src={CAMPAIGN_IMAGES[brand.slug]}
              alt={`${brand.name} campaign`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-15 pointer-events-none z-0"
            />
          )}
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 p-6 lg:p-10 z-10">
            <div>
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">{brand.tag}</span>
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={420}
                  height={210}
                  className="mt-4 h-16 lg:h-24 w-auto object-contain object-left dark:invert"
                />
              ) : (
                <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter">{brand.name}</h1>
              )}
              {brand.slug === "maui-jim" && (
                <div className="mt-4 inline-flex items-center gap-2 bg-electric/10 border border-electric/30 text-electric rounded-full px-3 py-1.5 text-xs font-semibold">
                  <span className="size-1.5 rounded-full bg-electric animate-pulse" />
                  Leading supplier in Hyderabad &amp; nearby areas
                </div>
              )}
              {brand.certified && (
                <div className="mt-4 inline-flex items-center gap-2 bg-electric/10 border border-electric/30 text-electric rounded-full px-3 py-1.5 text-xs font-semibold">
                  <span className="size-1.5 rounded-full bg-electric animate-pulse" />
                  {brand.certified}
                </div>
              )}
              <p className="mt-5 text-muted-foreground max-w-2xl text-lg">{brand.blurb}</p>
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {brand.models.length} {brand.category === "lenses" ? "lens ranges" : "models in stock"}
            </div>
          </div>
        </div>

        {brand.slug === "zeiss" && (
          <div className="mt-8 p-6 lg:p-8 rounded-3xl bg-electric/10 border border-electric/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative z-10 max-w-2xl">
              <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase block mb-2">
                Exclusive In-Store Offer
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {GLOBAL_PROMO.text}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {GLOBAL_PROMO.description} This exclusive promotion is available across our Hyderabad locations (KPHB, Nizampet, and Bowenpally). Consult our styling experts in-store to redeem.
              </p>
            </div>
            <a
              href={`https://wa.me/${CONTACT_PHONE_RAW}?text=Hi%20Clear%20Sight%20Opticians,%20I'd%20like%20to%20enquire%20about%20the%20ZEISS%20lenses%20promotion.`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-electric text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition shrink-0 h-fit w-fit"
            >
              Enquire on WhatsApp
            </a>
          </div>
        )}

        {/* Featured Video for Ray-Ban and Oakley */}
        {(brand.slug === "ray-ban" || brand.slug === "oakley") && (
          <div className="mt-8 relative overflow-hidden rounded-3xl bg-ink aspect-video max-h-[480px] w-full">
            <video
              ref={videoRef}
              src={brand.slug === "ray-ban" ? "/videos/rayban-meta.mp4" : "/videos/oakley-meta.mp4"}
              poster={CAMPAIGN_IMAGES[brand.slug]}
              muted={videoMuted}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {!videoPlaying && (
              <button
                type="button"
                onClick={() => { videoRef.current?.play(); setVideoPlaying(true); }}
                className="absolute inset-0 flex items-center justify-center z-20"
                aria-label="Play campaign video"
              >
                <span className="size-16 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="size-7 text-white fill-white" />
                </span>
              </button>
            )}
            <div className="absolute bottom-6 left-6 right-16 text-white z-10">
              <span className="text-electric text-[10px] font-bold tracking-[0.22em] uppercase bg-electric/20 border border-electric/30 rounded-full px-3 py-1">
                Featured Campaign
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter mt-3">
                {brand.slug === "ray-ban" ? "Ray-Ban Meta Collection" : "Oakley Meta Performance"}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-lg">
                {brand.slug === "ray-ban"
                  ? "Explore the fusion of legendary Ray-Ban design and groundbreaking Meta technology. Capture photos, take calls, and livestream directly from your frames."
                  : "Oakley sports heritage meets intelligent audio. Engineered for performance, built with active lifestyle features and clear Prizm™ optics."}
              </p>
            </div>
            {videoPlaying && (
              <button
                type="button"
                onClick={() => setVideoMuted((m) => !m)}
                className="absolute bottom-6 right-6 size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                aria-label={videoMuted ? "Unmute video" : "Mute video"}
              >
                {videoMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
            )}
          </div>
        )}

        {navSections.length > 0 && (
          <div className="mt-10 sticky top-[108px] lg:top-[124px] z-30 -mx-4 px-4 py-3 bg-background/90 backdrop-blur-xl border-b border-border/60 flex flex-wrap gap-2">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground hover:border-electric hover:text-electric transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}



        {brand.features && brand.features.length > 0 && (
          <div className="mt-16">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Coatings &amp; special features</span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.features.map((f) => (
                <div key={f.title} className="bg-secondary/60 border border-border rounded-2xl p-6">
                  <h3 className="font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(() => {
          const hasLines = brand.models.some((m) => m.line);
          if (!hasLines) {
            return (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brand.models.map((m, i) => (
                  <Reveal key={m.model} delay={(i % 3) * 0.05}>
                    <TiltCard max={5} className="h-full">
                      <ModelCard m={m} index={i} brandName={brand.name} />
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            );
          }
           const lines: string[] = [];
          for (const m of brand.models) {
            const l = m.line ?? "Other";
            if (!lines.includes(l)) lines.push(l);
          }
          if (lines.includes("Meta Glasses")) {
            const idx = lines.indexOf("Meta Glasses");
            if (idx > -1) {
              lines.splice(idx, 1);
              lines.unshift("Meta Glasses");
            }
          }
          return lines.map((line) => {
            const models = brand.models.filter((m) => (m.line ?? "Other") === line);
            return (
              <section key={line} id={slugify(line)} className="scroll-mt-40 mt-16">
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{line}</h2>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {models.length} {models.length === 1 ? "model" : "models"}
                  </span>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {models.map((m, i) => (
                    <Reveal key={m.model} delay={(i % 3) * 0.05}>
                      <TiltCard max={5} className="h-full">
                        <ModelCard m={m} index={i} brandName={brand.name} />
                      </TiltCard>
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          });
        })()}

        <div className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Other houses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherBrands.map((b) => {
              const logo = houseLogo(b.name);
              return (
                <Link
                  key={b.slug}
                  to="/brands/$brand"
                  params={{ brand: b.slug }}
                  className="group bg-secondary/60 border border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center hover:bg-ink hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-center h-12 w-full rounded-lg bg-white p-2 ring-1 ring-black/5">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${b.name} logo`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold tracking-tight text-ink">{b.name}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-tight">{b.name}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}



