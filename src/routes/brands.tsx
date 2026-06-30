import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — Clear Sight Opticians" },
      { name: "description", content: "Ray-Ban, Oakley, Prada, Gucci, Burberry, Persol, Carrera and more — curated luxury eyewear in Hyderabad." },
      { property: "og:title", content: "Brands — Clear Sight Opticians" },
      { property: "og:description", content: "Curated luxury eyewear houses, in one place." },
    ],
  }),
  component: BrandsPage,
});

const HOUSES = [
  { slug: "maui-jim", name: "Maui Jim", tag: "Hawaii-born", note: "Alika & PolarizedPlus2®", logo: mauiJimLogo.url },
  { slug: "ray-ban", name: "Ray-Ban", tag: "American icon", note: "Wayfarer, Aviator & Meta editions" },
  { slug: "oakley", name: "Oakley", tag: "Performance", note: "Sport, lifestyle & Meta HSTN" },
  { slug: "prada", name: "Prada", tag: "Italian luxury", note: "Linea Rossa & Symbole" },
  { slug: "gucci", name: "Gucci", tag: "Italian luxury", note: "Optical & oversized sun" },
  { slug: "burberry", name: "Burberry", tag: "British heritage", note: "Check & monogram series" },
  { slug: "persol", name: "Persol", tag: "Handmade Italy", note: "649 & 714 collection" },
  { slug: "carrera", name: "Carrera", tag: "Motorsport DNA", note: "Aviator & retro sport" },
  { slug: "tom-ford", name: "Tom Ford", tag: "Modern luxury", note: "Optical & oversize sun" },
  { slug: "vogue-eyewear", name: "Vogue Eyewear", tag: "Fashion forward", note: "Trend-led capsule" },
  { slug: "police", name: "Police", tag: "Italian cool", note: "Sport & lifestyle" },
  { slug: "fastrack", name: "Fastrack", tag: "Everyday", note: "Affordable, all-day" },
  { slug: "titan-eyeplus", name: "Titan Eyeplus", tag: "Indian premium", note: "Optical favourites" },
];

function BrandsPage() {
  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">The Houses</span>
        <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-3xl">
          A curated edit of the world's <span className="font-serif italic font-medium text-electric">finest eyewear.</span>
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
          From Italian ateliers to American icons — each brand we carry is hand-selected
          and stocked across our three Hyderabad studios.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOUSES.map((h, i) => (
            <Reveal key={h.name} delay={(i % 3) * 0.05}>
              <TiltCard max={5}>
                <Link
                  to="/brands/$brand"
                  params={{ brand: h.slug }}
                  className="group bg-secondary/60 border border-border rounded-3xl p-8 hover:bg-ink hover:text-white transition-colors block h-full"
                >
                  <div className="flex items-start justify-between mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground group-hover:text-white/50">
                      0{i + 1 < 10 ? i + 1 : i + 1}
                    </span>
                    <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:text-electric transition-all" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">{h.name}</h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-electric mt-2 font-bold">{h.tag}</p>
                  <p className="mt-4 text-sm text-muted-foreground group-hover:text-white/70 font-serif italic">
                    {h.note}
                  </p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>

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
