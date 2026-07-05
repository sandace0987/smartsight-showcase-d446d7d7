import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { housesByCategory, type House } from "@/lib/brand-catalog";
import pradaModelMale from "@/assets/brands/prada-model-male.png";

const SECTIONS = [
  { id: "glasses", label: "Glasses", heading: "Eyeglasses & Sunglasses" },
  { id: "lenses", label: "Lenses & Contact Lenses", heading: "Lenses & Contact Lenses" },
  { id: "kids", label: "For Kids", heading: "For Kids" },
] as const;

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — Clear Sight Opticians" },
      { name: "description", content: "Maui Jim, Ray-Ban, Oakley, Prada, Gucci, Persol and more — curated luxury eyewear in Hyderabad." },
      { property: "og:title", content: "Brands — Clear Sight Opticians" },
      { property: "og:description", content: "Curated luxury eyewear houses, in one place." },
    ],
  }),
  component: BrandsPage,
});


function BrandsPage() {
  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">The Houses</span>
          <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-3xl">
            A curated edit of the world's <span className="font-serif italic font-medium text-electric">finest eyewear.</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
            From Italian ateliers to American icons — each brand we carry is hand-selected
            and stocked across our three Hyderabad studios.
          </p>
        </div>

        {/* Section tabs */}
        <div className="mt-10 sticky top-20 lg:top-24 z-30 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-xl border-b border-border/60 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground hover:border-electric hover:text-electric transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        {SECTIONS.map((section) => {
          const houses = housesByCategory(section.id);
          return (
            <section key={section.id} id={section.id} className="scroll-mt-40 mt-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter">
                {section.heading}
              </h2>
              {section.id === "kids" && (
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  ZEISS offers advanced optical solutions for children, featuring specific lines tailored to digital lifestyles and myopia management. Their primary offerings include ZEISS SmartLife Young for everyday digital vision and ZEISS MyoCare for slowing myopia progression in growing eyes.
                </p>
              )}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {houses.map((h, i) => (
                  <Reveal key={h.name} delay={(i % 3) * 0.05}>
                    <TiltCard max={5}>
                      <BrandCard h={h} index={i} />
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-20 bg-ink text-white rounded-3xl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter max-w-xl">
              Looking for a brand we haven't listed?
            </h2>
            <p className="text-white/65 mt-3 max-w-lg">
              We source on request — tell us what you're after.
            </p>
          </div>
          <MagneticButton>
            <Link to="/contact" className="bg-electric text-white px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2">
              Get in touch <ArrowUpRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

function BrandCard({ h, index }: { h: House; index: number }) {
  const logoDevKey = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;
  const logoSrc = h.logo
    ? h.logo
    : h.domain && logoDevKey
      ? `https://img.logo.dev/${h.domain}?token=${logoDevKey}&size=200&format=png&retina=true`
      : null;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-4 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground group-hover:text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        {logoSrc ? (
          <div className="shrink-0 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 flex items-center justify-center h-20 w-32">
            <img
              src={logoSrc}
              alt={`${h.name} logo`}
              width={200}
              height={100}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          h.slug && (
            <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:text-electric transition-all" />
          )
        )}
      </div>
      <h3 className="text-2xl font-bold tracking-tight">{h.name}</h3>
      <p className="mt-3 text-sm text-muted-foreground group-hover:text-white/70 font-serif italic">
        {h.note}
      </p>
      {h.slug === "prada" && (
        <img
          src={pradaModelMale}
          alt="Male model wearing Prada sunglasses"
          loading="lazy"
          className="absolute bottom-0 right-0 w-[180px] h-auto object-contain pointer-events-none z-10"
        />
      )}
    </>
  );

  const className =
    "relative group bg-secondary/60 border border-border rounded-3xl p-8 hover:bg-ink hover:text-white transition-colors block h-full overflow-hidden";

  if (h.slug) {
    return (
      <Link to="/brands/$brand" params={{ brand: h.slug }} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

