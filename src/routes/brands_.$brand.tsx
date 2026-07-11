import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { getBrand, BRANDS, HOUSES, priorityIndex, type BrandData, type GlassItem } from "@/lib/brand-catalog";
import { GlassSilhouette } from "@/components/site/GlassSilhouette";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

// Meta product images — Ray-Ban
import rbMatteBlackClear from "@/assets/meta/rayban/rb-matte-black-clear.webp";
import rbShinyBlackGreen from "@/assets/meta/rayban/rb-shiny-black-green.webp";
import rbMatteBlackGraphite from "@/assets/meta/rayban/rb-matte-black-graphite.webp";
import rbCosmicBlueSapphire from "@/assets/meta/rayban/rb-cosmic-blue-sapphire.webp";
import rbMatteBlackGreyTransitions from "@/assets/meta/rayban/rb-matte-black-grey-transitions.webp";
import rbTransparentGreySapphire from "@/assets/meta/rayban/rb-transparent-grey-sapphire.webp";
// Meta product images — Oakley
import oakWarmGreyPrizmRuby from "@/assets/meta/oakley/oak-warm-grey-prizm-ruby.webp";
import oakBlackAmethyst from "@/assets/meta/oakley/oak-black-amethyst.webp";
import oakBrownSmoke from "@/assets/meta/oakley/oak-brown-smoke-deep-water.webp";
import oakBlackDarkGolf from "@/assets/meta/oakley/oak-black-prizm-dark-golf.webp";


export const Route = createFileRoute("/brands_/$brand")({
  head: ({ params }) => {
    const b = getBrand(params.brand);
    const title = b ? `${b.name} — Clear Sight Opticians` : "Brand — Clear Sight Opticians";
    const desc = b ? `Shop ${b.name} eyewear at Clear Sight Opticians, Hyderabad. ${b.blurb}` : "Curated luxury eyewear.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
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

const LOGO_TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string | undefined;
const houseLogo = (name: string) => {
  const h = HOUSES.find((x) => x.name === name);
  if (h?.logo) return h.logo;
  if (h?.domain && LOGO_TOKEN)
    return `https://img.logo.dev/${h.domain}?token=${LOGO_TOKEN}&size=200&format=png&retina=true`;
  return null;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Real Meta smart-glasses product data (in-stock models only). */
type MetaModelEntry = {
  sku: string;
  model: string;
  frame: string;
  lens: string;
  price: number;
  discountPct: number;
  image: string;
  swatch: string;
  videoSrc: string;
};

const META_MODELS: Record<string, MetaModelEntry[]> = {
  "ray-ban": [
    {
      sku: "SK-1001200-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Matt Black",
      lens: "Clear",
      price: 39900,
      discountPct: 15,
      image: rbMatteBlackClear,
      swatch: "#1a1a1a",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001203-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Shiny Black",
      lens: "Green",
      price: 39900,
      discountPct: 15,
      image: rbShinyBlackGreen,
      swatch: "#1a1a1a",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001238-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Matt Black",
      lens: "Polar Gradient Graphite",
      price: 42100,
      discountPct: 15,
      image: rbMatteBlackGraphite,
      swatch: "#2c2c2c",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001237-01",
      model: "Wayfarer (Gen 2)",
      frame: "Matt Black",
      lens: "Polar Gradient Graphite",
      price: 42100,
      discountPct: 15,
      image: rbMatteBlackGraphite,
      swatch: "#2c2c2c",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001242-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Shiny Cosmic Blue",
      lens: "Transitions\u00ae Sapphire",
      price: 45700,
      discountPct: 15,
      image: rbCosmicBlueSapphire,
      swatch: "#3b6fd4",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001247-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Matt Black",
      lens: "Transitions\u00ae Grey",
      price: 45700,
      discountPct: 15,
      image: rbMatteBlackGreyTransitions,
      swatch: "#1a1a1a",
      videoSrc: "/videos/rayban-meta.mp4",
    },
    {
      sku: "SK-1001846-01",
      model: "Wayfarer (Gen 2)",
      frame: "Large Shiny Transparent Grey",
      lens: "Transitions\u00ae Sapphire",
      price: 45700,
      discountPct: 15,
      image: rbTransparentGreySapphire,
      swatch: "#a8b0c0",
      videoSrc: "/videos/rayban-meta.mp4",
    },
  ],
  oakley: [
    {
      sku: "SK-1001193-01",
      model: "HSTN",
      frame: "Warm Grey",
      lens: "Prizm\u2122 Ruby",
      price: 41800,
      discountPct: 20,
      image: oakWarmGreyPrizmRuby,
      swatch: "#9a8070",
      videoSrc: "/videos/oakley-meta.mp4",
    },
    {
      sku: "SK-1001194-01",
      model: "HSTN",
      frame: "Black",
      lens: "Clear to Amethyst Transitions\u00ae",
      price: 47600,
      discountPct: 20,
      image: oakBlackAmethyst,
      swatch: "#1a1a1a",
      videoSrc: "/videos/oakley-meta.mp4",
    },
    {
      sku: "SK-1001197-01",
      model: "HSTN",
      frame: "Brown Smoke",
      lens: "Prizm\u2122 Deep Water Polarised",
      price: 44200,
      discountPct: 20,
      image: oakBrownSmoke,
      swatch: "#5a3e2b",
      videoSrc: "/videos/oakley-meta.mp4",
    },
    {
      sku: "SK-1001850-01",
      model: "HSTN",
      frame: "Black",
      lens: "Prizm\u2122 Dark Golf",
      price: 41800,
      discountPct: 20,
      image: oakBlackDarkGolf,
      swatch: "#1a1a1a",
      videoSrc: "/videos/oakley-meta.mp4",
    },
  ],
};

function BrandPage() {
  const { brand } = Route.useLoaderData() as { brand: BrandData };
  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug)
    .sort((a, b) => priorityIndex(a.name) - priorityIndex(b.name))
    .slice(0, 6);

  const metaModels = META_MODELS[brand.slug];
  const lineList: string[] = [];
  for (const m of brand.models) {
    const l = m.line ?? "Other";
    if (m.line && !lineList.includes(l)) lineList.push(l);
  }
  const navSections: { id: string; label: string }[] = [
    ...(metaModels ? [{ id: "meta-glasses", label: "Meta Glasses" }] : []),
    ...lineList.map((l) => ({ id: slugify(l), label: l })),
  ];

  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-electric transition-colors">
          <ArrowLeft className="size-4" /> All brands
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl">
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 p-6 lg:p-10">
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

        {navSections.length > 0 && (
          <div className="mt-10 sticky top-32 z-30 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-xl border-b border-border/60 flex flex-wrap gap-2">
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

        {metaModels && (
          <section id="meta-glasses" className="scroll-mt-40 mt-16">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-5">
              <div>
                <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">AI Eyewear</span>
                <h2 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight">Meta Glasses</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {brand.slug === "ray-ban"
                    ? "Iconic Wayfarer silhouette with Meta AI, 12MP camera and open-ear audio."
                    : "Sport-performance frames with Meta AI, Prizm™ lenses and advanced audio."}
                </p>
              </div>
              <Link
                to="/smart-glasses"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-electric hover:underline"
              >
                View all <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            {/* Video strip */}
            <MetaVideoStrip videoSrc={metaModels[0].videoSrc} brandName={brand.name} />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {metaModels.map((m, i) => (
                <Reveal key={m.sku} delay={(i % 3) * 0.05}>
                  <TiltCard max={5} className="h-full">
                    <MetaProductCard m={m} brandName={brand.name} />
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </section>
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

/** Video strip shown at the top of the Meta Glasses subsection. */
function MetaVideoStrip({ videoSrc, brandName }: { videoSrc: string; brandName: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((v) => !v);
  };

  return (
    <div className="relative mt-6 rounded-2xl overflow-hidden bg-ink aspect-[21/9] sm:aspect-[21/7]">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-6 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">{brandName} × Meta</p>
        <p className="text-lg font-bold mt-1">Iconic style meets Meta AI.</p>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-4 right-5 size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
      </button>
    </div>
  );
}

/** Real product card for Meta Glasses in the brand house page. */
function MetaProductCard({ m, brandName }: { m: MetaModelEntry; brandName: string }) {
  const discounted = Math.round(m.price * (1 - m.discountPct / 100) / 100) * 100;
  return (
    <article className="group bg-secondary/60 border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:border-electric/40 transition-all duration-300">
      {/* image area */}
      <div className="relative bg-white p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <img
          src={m.image}
          alt={`${brandName} ${m.model} — ${m.frame} / ${m.lens}`}
          width={800}
          height={600}
          loading="lazy"
          className="max-h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-electric text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {m.discountPct}% Off
        </span>
      </div>

      {/* details */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="size-3 rounded-full border border-border/80 shrink-0"
            style={{ background: m.swatch }}
            title={m.frame}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-electric">
            {brandName} Meta
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-tight mt-1">{brandName} Meta {m.model}</h3>
        <p className="text-xs text-muted-foreground mt-1 font-serif italic leading-relaxed">
          {m.frame} · {m.lens}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-electric">
            ₹{discounted.toLocaleString("en-IN")}
          </span>
          <span className="text-xs line-through text-muted-foreground">
            ₹{m.price.toLocaleString("en-IN")}
          </span>
        </div>

        <EnquireDialog
          brand={brandName}
          model={`${brandName} Meta ${m.model} — ${m.frame} / ${m.lens}`}
          trigger={
            <button className="mt-auto pt-4 w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
              Book Demo <ArrowUpRight className="size-3.5" />
            </button>
          }
        />
      </div>
    </article>
  );
}


function ModelCard({ m, index, brandName }: { m: GlassItem; index: number; brandName: string }) {
  const hasVariants = !!m.variants && m.variants.length > 0;
  const [variantId, setVariantId] = React.useState(m.variants?.[0].id ?? "");
  const [open, setOpen] = React.useState(false);
  const variant = m.variants?.find((v) => v.id === variantId) ?? m.variants?.[0];
  const collection =
    brandName === "Prada" ? (m.model.includes("Linea Rossa") ? "Linea Rossa" : "Milano") : null;

  return (
    <article
      className={`group relative bg-secondary/60 border border-border rounded-3xl p-7 flex flex-col h-full ${
        hasVariants ? "cursor-pointer" : ""
      }`}
      onClick={hasVariants ? () => setOpen(true) : undefined}
      role={hasVariants ? "button" : undefined}
      tabIndex={hasVariants ? 0 : undefined}
      onKeyDown={
        hasVariants
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }
          : undefined
      }
      aria-label={hasVariants ? `View ${m.model} details` : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          0{index + 1}
        </span>
        {m.is_hot ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-700/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/95">
            Selling fast
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-electric">{m.shape}</span>
        )}
      </div>

      {hasVariants && variant ? (
        <>
          <div className="my-7 block overflow-hidden rounded-2xl bg-white p-4">
            <div className="flex items-center justify-center h-28">
              <img
                src={variant.images.front}
                alt={`${brandName} ${m.model} — ${variant.name}`}
                width={900}
                height={320}
                loading="lazy"
                className="max-h-full max-w-full w-auto object-contain"
              />
            </div>
          </div>
          <ProductDialog
            brand={brandName}
            model={m.model}
            priceFrom={m.priceFrom}
            variants={m.variants!}
            open={open}
            onOpenChange={setOpen}
          />
        </>
      ) : (
        <div className="my-8 flex items-center justify-center h-28 text-foreground/85 group-hover:text-electric transition-colors">
          <GlassSilhouette shape={m.shape} className="w-full max-w-[220px] h-auto" />
        </div>
      )}

      <h3 className="text-xl font-bold tracking-tight">{m.model}</h3>
      <p className="text-xs text-muted-foreground mt-1 font-serif italic">
        {hasVariants && variant ? variant.name : m.colour}
        {collection ? ` · ${collection}` : ""}
      </p>

      {m.priceFrom != null && (
        <p className="text-sm font-semibold mt-3">From ₹{m.priceFrom.toLocaleString("en-IN")}</p>
      )}

      {hasVariants && (
        <div className="mt-3 flex items-center gap-2">
          {m.variants!.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setVariantId(v.id);
              }}
              aria-label={v.name}
              title={v.name}
              className={`size-6 rounded-full border transition-all ${
                v.id === variantId ? "ring-2 ring-electric ring-offset-2 ring-offset-secondary border-transparent" : "border-border"
              }`}
              style={{ background: v.swatch }}
            />
          ))}
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <EnquireDialog
          brand={brandName}
          model={m.model}
          colour={hasVariants && variant ? variant.name : undefined}
          trigger={
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
              Enquire <ArrowUpRight className="size-3.5" />
            </button>
          }
        />
      </div>
    </article>
  );
}
