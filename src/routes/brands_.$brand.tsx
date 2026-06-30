import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getBrand, BRANDS, type BrandData } from "@/lib/brand-catalog";
import { GlassSilhouette } from "@/components/site/GlassSilhouette";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagnifyLens } from "@/components/motion/MagnifyLens";

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

function BrandPage() {
  const { brand } = Route.useLoaderData() as { brand: BrandData };
  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug).slice(0, 6);

  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground hover:text-electric transition-colors">
          <ArrowLeft className="size-4" /> All brands
        </Link>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">{brand.tag}</span>
            <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter">{brand.name}</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">{brand.blurb}</p>
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            {brand.models.length} models in stock
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brand.models.map((m, i) => (
            <Reveal key={m.model} delay={(i % 3) * 0.05}>
              <TiltCard max={5} className="h-full">
                <article className="group bg-secondary/60 border border-border rounded-3xl p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-electric">{m.shape}</span>
                  </div>

                  <MagnifyLens
                    zoom={2.4}
                    lensSize={150}
                    className="my-8 flex items-center justify-center h-28 cursor-zoom-in text-foreground/85 group-hover:text-electric transition-colors"
                  >
                    <GlassSilhouette shape={m.shape} className="w-full max-w-[220px] h-auto" />
                  </MagnifyLens>

                  <h3 className="text-xl font-bold tracking-tight">{m.model}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-serif italic">{m.colour}</p>
                  <p className="text-sm font-semibold mt-3">From ₹{m.priceFrom.toLocaleString("en-IN")}</p>

                  <EnquireDialog
                    brand={brand.name}
                    model={m.model}
                    trigger={
                      <button className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
                        Enquire <ArrowUpRight className="size-3.5" />
                      </button>
                    }
                  />
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Other houses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                to="/brands/$brand"
                params={{ brand: b.slug }}
                className="bg-secondary/60 border border-border rounded-2xl p-5 text-sm font-bold tracking-tight hover:bg-ink hover:text-white transition-colors"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
