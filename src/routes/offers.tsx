import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers | Clear Sight Opticians" },
      { name: "description", content: "Limited-time deals on Ray-Ban Meta, Oakley Meta, luxury frames and complete prescription packages." },
      { property: "og:title", content: "Offers | Clear Sight Opticians" },
      { property: "og:description", content: "Premium eyewear deals across all Hyderabad branches." },
    ],
  }),
  component: OffersPage,
});

const OFFERS = [
  { tag: "Smart Glasses", title: "Up to 25% off Ray-Ban Meta", desc: "All silhouettes, all colourways. In-store only.", accent: true },
  { tag: "Smart Glasses", title: "15% off Oakley Meta HSTN", desc: "Including prescription fitting in our lab." },
  { tag: "Luxury", title: "Save ₹5,000 on Prada & Gucci", desc: "On any full-price optical frame above ₹20,000." },
  { tag: "Bundle", title: "Frame + lenses, ₹6,499", desc: "Complete starter package with anti-glare coating." },
  { tag: "Sunglasses", title: "Buy 1, get 1 at 50%", desc: "Across Ray-Ban, Carrera, Vogue & Police." },
  { tag: "Contact Lenses", title: "3 months free", desc: "On any annual contact lens subscription." },
];

function OffersPage() {
  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">This Season</span>
        <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-3xl">
          Limited-time <span className="font-serif italic font-medium text-electric">offers.</span>
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
          Quietly generous deals on the brands you love, refreshed every season,
          honoured at every branch.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFERS.map((o, i) => (
            <article
              key={o.title}
              className={`rounded-3xl p-8 lg:p-10 flex flex-col min-h-[280px] ${o.accent ? "bg-electric text-white" : "bg-secondary/60 border border-border"}`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className={`text-[10px] font-bold uppercase tracking-[0.22em] ${o.accent ? "text-white/80" : "text-electric"}`}>
                  {o.tag}
                </span>
                <span className={`text-[10px] font-mono tracking-widest ${o.accent ? "text-white/60" : "text-muted-foreground"}`}>
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">{o.title}</h3>
              <p className={`mt-3 text-sm ${o.accent ? "text-white/85" : "text-muted-foreground"} font-serif italic`}>
                {o.desc}
              </p>
              <Link
                to="/contact"
                className={`mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold ${o.accent ? "text-white" : "text-electric"}`}
              >
                Claim in store <ArrowUpRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
