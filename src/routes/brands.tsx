import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Glasses } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { housesByCategory, type House, BRANDS } from "@/lib/brand-catalog";
import { FrameFinderAssistant } from "@/components/site/FrameFinderAssistant";
import { useFeatureToggles } from "@/hooks/useFeatureToggles";
import pradaModelMale from "@/assets/brands/prada-model-male.webp";
import pleinModel from "@/assets/brands/plein-model.webp";
import vogueModel from "@/assets/brands/vogue-model.webp";
import policeModel from "@/assets/brands/police-model.webp";
import oakleyModel from "@/assets/brands/oakley-model.webp";
import raybanModel from "@/assets/brands/rayban-model.webp";
import pumaModel from "@/assets/brands/puma-model.webp";
import silhouetteModel from "@/assets/brands/silhouette-model.webp";
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
import zeissModel from "@/assets/brands/zeiss-model.webp";
import essilorModel from "@/assets/brands/essilor-model.webp";
import { breadcrumbSchema, createSeoHead, itemListSchema } from "@/lib/seo";

const BRAND_MODELS: Record<string, { src: string; alt: string }> = {
  prada: { src: pradaModelMale, alt: "Male model wearing Prada sunglasses" },
  "philipp-plein": { src: pleinModel, alt: "Model wearing Philipp Plein eyewear" },
  vogue: { src: vogueModel, alt: "Model wearing Vogue Eyewear" },
  police: { src: policeModel, alt: "Model wearing Police sunglasses" },
  oakley: { src: oakleyModel, alt: "Athlete wearing Oakley sunglasses" },
  "ray-ban": { src: raybanModel, alt: "Models wearing Ray-Ban Scuderia Ferrari" },
  puma: { src: pumaModel, alt: "Model wearing Puma athletic eyewear" },
  silhouette: { src: silhouetteModel, alt: "Model wearing Silhouette rimless eyewear" },
  montblanc: { src: montblancModel, alt: "Model wearing Montblanc designer frames" },
  burberry: { src: burberryModel, alt: "Model wearing Burberry eyewear" },
  "maui-jim": { src: mauiJimModel, alt: "Model wearing Maui Jim polarized sunglasses" },
  "porsche-design": { src: porscheModel, alt: "Model wearing Porsche Design minimalism eyewear" },
  "tom-ford": { src: tomFordModel, alt: "Model wearing Tom Ford luxury sunglasses" },
  versace: { src: versaceModel, alt: "Model wearing Versace luxury sunglasses" },
  carrera: { src: carreraModel, alt: "Model wearing Carrera sunglasses" },
  guess: { src: guessModel, alt: "Model wearing Guess eyewear" },
  modo: { src: modoModel, alt: "Model wearing Modo eyewear" },
  stepper: { src: stepperModel, alt: "Model wearing Stepper skin-friendly frames" },
  zeiss: { src: zeissModel, alt: "ZEISS Certified Vision Expert diagnostic equipment and precision lenses" },
  essilor: { src: essilorModel, alt: "Essilor Varilux and Crizal precision lenses" },
};

const SECTIONS = [
  { id: "glasses", label: "Glasses", heading: "Eyeglasses & Sunglasses" },
  { id: "lenses", label: "Lenses & Contact Lenses", heading: "Lenses & Contact Lenses" },
  { id: "kids", label: "For Kids", heading: "For Kids" },
] as const;

export const Route = createFileRoute("/brands")({
  head: () =>
    createSeoHead({
      title: "Designer Eyewear Brands in Hyderabad | Clear Sight Opticians",
      description:
        "Explore our curated selection of global designer eyewear brands including Prada, Oakley, Ray-Ban, Silhouette, Maui Jim, Puma, and more. Available at KPHB, Nizampet & Bowenpally, Hyderabad.",
      path: "/brands",
      schema: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
        ]),
        itemListSchema(
          "Designer eyewear brands at Clear Sight Opticians Hyderabad",
          "/brands",
          BRANDS.map((b) => ({ name: b.name, path: `/brands/${b.slug}` })),
        ),
      ],
    }),
  component: BrandsPage,
});


function BrandsPage() {
  const [assistantOpen, setAssistantOpen] = React.useState(false);
  const { enableAssistant } = useFeatureToggles();

  React.useEffect(() => {
    if (enableAssistant && sessionStorage.getItem("cs_assistant_prompted") !== "true") {
      const timer = setTimeout(() => {
        setAssistantOpen(true);
        sessionStorage.setItem("cs_assistant_prompted", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [enableAssistant]);

  React.useEffect(() => {
    const handleOpen = () => setAssistantOpen(true);
    window.addEventListener("open-frame-finder", handleOpen);
    return () => window.removeEventListener("open-frame-finder", handleOpen);
  }, []);

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
            and stocked across our three premium stores.
          </p>
        </div>

        {/* Section tabs */}
        <div className="mt-10 sticky top-[108px] lg:top-[124px] z-30 -mx-4 px-4 py-3 bg-background/90 backdrop-blur-xl border-b border-border/60 flex flex-wrap gap-2">
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
            <Link
              to="/"
              onClick={() => sessionStorage.setItem("scrollTargetSection", "contact")}
              className="bg-electric text-white px-7 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Get in touch <ArrowUpRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>

      <FrameFinderAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </div>
  );
}

function BrandCard({ h, index }: { h: House; index: number }) {
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_API_KEY;
  const logoSrc = h.logo
    ? h.logo
    : h.domain && logoDevKey
      ? `https://img.logo.dev/${h.domain}?token=${logoDevKey}&size=200&format=png&retina=true`
      : null;

  const inner = (
    <>
      {h.slug && BRAND_MODELS[h.slug] && (
        <img
          src={BRAND_MODELS[h.slug].src}
          alt={BRAND_MODELS[h.slug].alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none z-0"
        />
      )}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-10">
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
          <div className="shrink-0 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5 flex items-center justify-center h-20 w-32">
            <span className="text-[11px] font-bold text-ink text-center tracking-tight px-1 select-none uppercase">
              {h.name}
            </span>
          </div>
        )}
      </div>
      <h3 className="relative z-10 text-2xl font-bold tracking-tight">{h.name}</h3>
      <p className="relative z-10 mt-3 text-sm text-muted-foreground group-hover:text-white/70 font-serif italic">
        {h.note}
      </p>
    </>
  );

  const isClickable = h.slug && !h.comingSoon;
  const className = isClickable
    ? "relative group bg-secondary/60 border border-border rounded-3xl p-8 hover:bg-ink hover:text-white transition-colors block h-full overflow-hidden"
    : "relative group bg-secondary/40 border border-border/60 rounded-3xl p-8 opacity-75 hover:opacity-90 transition-opacity block h-full overflow-hidden cursor-default";

  if (isClickable) {
    return (
      <Link to="/brands/$brand" params={{ brand: h.slug! }} className={className}>
        {inner}
      </Link>
    );
  }

  const showTooltip = h.slug && ["carrera", "guess", "modo", "stepper"].includes(h.slug);

  if (!showTooltip) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            {inner}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-ink border border-border/80 text-white p-3 rounded-xl max-w-xs text-xs shadow-xl">
          <p className="font-semibold mb-1">Coming Soon</p>
          <p className="text-white/75">
            We are adding this collection to our inventory. In the meantime, contact us directly via WhatsApp or Call to check available stock.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
