import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, Cpu, Headphones, Sparkles, BatteryCharging, Mic } from "lucide-react";
import raybanMeta from "@/assets/rayban-meta.webp";
import oakleyMeta from "@/assets/oakley-meta.webp";

export const Route = createFileRoute("/smart-glasses")({
  head: () => ({
    meta: [
      { title: "Smart Glasses — Ray-Ban Meta & Oakley Meta | Clear Sight" },
      { name: "description", content: "Ray-Ban Meta and Oakley Meta smart glasses with launch pricing. In-store demos across Hyderabad." },
      { property: "og:title", content: "Smart Glasses — Ray-Ban Meta & Oakley Meta" },
      { property: "og:description", content: "Hands-free capture, calls and Meta AI — in the frames you already love." },
    ],
  }),
  component: SmartGlassesPage,
});

const FEATURES = [
  { icon: Camera, title: "12MP camera", desc: "Capture POV photo & 1080p video, hands-free." },
  { icon: Headphones, title: "Open-ear audio", desc: "Music and calls — without earbuds in." },
  { icon: Cpu, title: "Meta AI", desc: "Ask, translate and identify, in real time." },
  { icon: Mic, title: "5-mic array", desc: "Studio-clear voice for calls and recording." },
  { icon: BatteryCharging, title: "All-day case", desc: "Up to 36 hours via the charging case." },
  { icon: Sparkles, title: "Prescription ready", desc: "Fitted with your prescription, in our lab." },
];

function SmartGlassesPage() {
  return (
    <div className="bg-background">
      <section className="px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Smart Glasses</span>
          <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
            Eyewear that <span className="font-serif italic font-medium text-electric">listens, looks</span> and remembers.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
            Ray-Ban Meta and Oakley Meta — the iconic silhouettes you know, with Meta AI,
            an ultra-wide camera and open-ear audio built in. Now with launch pricing
            across all three Hyderabad branches.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="relative rounded-3xl overflow-hidden bg-secondary p-8 lg:p-10 flex flex-col min-h-[520px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric">Best Seller</span>
              <span className="bg-electric text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">25% Off</span>
            </div>
            <h2 className="mt-6 text-4xl lg:text-5xl font-bold tracking-tighter">
              Ray-Ban Meta <span className="font-serif italic font-medium text-electric">Wayfarer</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">The icon, reimagined. Smart silently — looks unmistakably Ray-Ban.</p>
            <div className="mt-auto pt-8 grid grid-cols-2 items-end gap-6">
              <img src={raybanMeta} alt="Ray-Ban Meta Wayfarer" width={1024} height={1024} loading="lazy" className="w-full rounded-2xl bg-white" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">From</p>
                <p className="text-3xl font-bold text-electric">₹24,990</p>
                <p className="text-xs line-through text-muted-foreground">₹32,990</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Book demo <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </article>

          <article className="relative rounded-3xl overflow-hidden bg-ink text-white p-8 lg:p-10 flex flex-col min-h-[520px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric">Performance</span>
              <span className="bg-white text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">15% Off</span>
            </div>
            <h2 className="mt-6 text-4xl lg:text-5xl font-bold tracking-tighter">
              Oakley Meta <span className="font-serif italic font-medium text-electric">HSTN</span>
            </h2>
            <p className="mt-3 text-white/65 max-w-md">Built for the way you move. Capture, listen, talk to AI — without breaking stride.</p>
            <div className="mt-auto pt-8 grid grid-cols-2 items-end gap-6">
              <img src={oakleyMeta} alt="Oakley Meta HSTN" width={1024} height={1024} loading="lazy" className="w-full rounded-2xl" />
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">From</p>
                <p className="text-3xl font-bold text-electric">₹28,490</p>
                <p className="text-xs line-through text-white/40">₹33,490</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-electric text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Book demo <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter max-w-2xl">
            Built-in features, <span className="font-serif italic font-medium text-electric">without the screen.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-background border border-border rounded-2xl p-7">
                <span className="size-11 rounded-full bg-electric/10 grid place-items-center mb-5">
                  <f.icon className="size-5 text-electric" />
                </span>
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl bg-electric text-white rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter max-w-2xl">
              Book a private smart glasses demo.
            </h2>
            <p className="mt-4 text-white/85 max-w-lg">
              Try Meta AI, capture and audio in person — at any of our three Hyderabad studios.
            </p>
          </div>
          <Link to="/contact" className="bg-white text-electric px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Book demo <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
