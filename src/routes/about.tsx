import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import storeInterior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Clear Sight Opticians" },
      { name: "description", content: "Hyderabad's trusted optical destination since 2012, curated luxury eyewear and clinical eye care." },
      { property: "og:title", content: "About | Clear Sight Opticians" },
      { property: "og:description", content: "A decade of vision care, fitted by experts." },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { v: "12+", l: "Years in Hyderabad" },
  { v: "3", l: "Studios across the city" },
  { v: "60+", l: "Luxury & lifestyle brands" },
  { v: "50k+", l: "Pairs fitted" },
];

function AboutPage() {
  return (
    <div className="bg-background">
      <section className="px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">About</span>
          <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
            A quiet obsession with <span className="font-serif italic font-medium text-electric">how you see, and how you're seen.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Clear Sight Opticians began in Kukatpally in 2012 with a simple idea, that
            buying glasses in Hyderabad should feel as considered as the frames themselves.
            Twelve years on, we run three studios, fit more than fifty premium and luxury
            houses, and remain the first Hyderabad address for Ray-Ban Meta and Oakley Meta.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden">
          <img src={storeInterior} alt="Inside our Kukatpally flagship" width={1920} height={1080} loading="lazy" className="w-full h-[420px] lg:h-[560px] object-cover" />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l} className="border-t border-border pt-6">
              <p className="text-5xl lg:text-6xl font-bold tracking-tighter text-electric">{s.v}</p>
              <p className="text-sm text-muted-foreground mt-3 font-serif italic">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter">
              Curated, not <span className="font-serif italic font-medium text-electric">crowded.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We carry fewer frames than a department store on purpose. Every house on our
              wall earns its place, through craft, design or sheer originality. The result
              is a smaller, sharper edit, and a buying experience that respects your time.
            </p>
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter">
              Clinical care, <span className="font-serif italic font-medium text-electric">human pace.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our optometrists are senior, certified and unhurried. Eye tests take as long
              as they need to. Lens fitting happens on-site, in our own lab. And the styling
              conversation is yours to lead. We just bring the options.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl bg-ink text-white rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter max-w-2xl">
            Come say hello at any of our three Hyderabad studios.
          </h2>
          <Link to="/stores" className="bg-electric text-white px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Find a store <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
