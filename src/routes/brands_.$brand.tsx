import * as React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getBrand, BRANDS, HOUSES, priorityIndex, type BrandData, type GlassItem } from "@/lib/brand-catalog";
import { GlassSilhouette } from "@/components/site/GlassSilhouette";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { ProductDialog } from "@/components/site/ProductDialog";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";


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

function BrandPage() {
  const { brand } = Route.useLoaderData() as { brand: BrandData };
  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug)
    .sort((a, b) => priorityIndex(a.name) - priorityIndex(b.name))
    .slice(0, 6);
  const isPrada = brand.slug === "prada";

  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-electric transition-colors">
          <ArrowLeft className="size-4" /> All brands
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl">
          {isPrada && (
            <>
              <img
                src={pradaModelMale}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-25 dark:opacity-30 mix-blend-luminosity"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            </>
          )}
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

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brand.models.map((m, i) => (
            <Reveal key={m.model} delay={(i % 3) * 0.05}>
              <TiltCard max={5} className="h-full">
                <ModelCard m={m} index={i} brandName={brand.name} />
              </TiltCard>
            </Reveal>
          ))}
        </div>

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

function ModelCard({ m, index, brandName }: { m: GlassItem; index: number; brandName: string }) {
  const hasVariants = !!m.variants && m.variants.length > 0;
  const [variantId, setVariantId] = React.useState(m.variants?.[0].id ?? "");
  const [open, setOpen] = React.useState(false);
  const variant = m.variants?.find((v) => v.id === variantId) ?? m.variants?.[0];

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
      {m.is_hot && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
          Selling fast
        </span>
      )}
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          0{index + 1}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-electric">{m.shape}</span>
      </div>

      {hasVariants && variant ? (
        <>
          <div className="my-7 block rounded-2xl bg-white p-4">
            <div className="flex items-center justify-center h-28">
              <img
                src={variant.images.front}
                alt={`${brandName} ${m.model} — ${variant.name}`}
                width={900}
                height={320}
                loading="lazy"
                className="w-full max-w-[260px] h-auto object-contain"
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
      </p>
      <p className="text-sm font-semibold mt-3">From ₹{m.priceFrom.toLocaleString("en-IN")}</p>

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
