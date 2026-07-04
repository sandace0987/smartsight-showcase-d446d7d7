import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Eye, Glasses, ShieldCheck, Users } from "lucide-react";
import storeInterior from "@/assets/store-interior.jpg";
import madhuPhoto from "@/assets/madhu-founder.png";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Clear Sight Opticians | Since 2009" },
      { name: "description", content: "Hyderabad's trusted optical destination since 2009 — ZEISS Certified Vision Experts, curated luxury eyewear and clinical eye care." },
      { property: "og:title", content: "About — Clear Sight Opticians" },
      { property: "og:description", content: "Delivering clarity with style since 2009. Our journey of vision & trust." },
    ],
  }),
  component: AboutPage,
});

const MILESTONES = [
  { year: "2009", title: "Clear Sight — KPHB", desc: "Established with a vision to deliver premium eye care in Kukatpally." },
  { year: "2011", title: "Clear Sight — Bowenpally", desc: "Expanded services with advanced eyewear collections." },
  { year: "2019", title: "Clear Sight — Nizampet", desc: "Brought modern eye testing and branded eyewear closer to customers." },
  { year: "2022", title: "ZEISS Vision Partner", desc: "Became a ZEISS Vision Partner — the 1st ECP in Telangana." },
  { year: "2025", title: "ZEISS Vision Expert", desc: "Achieved ZEISS Vision Expert recognition for next-generation precision vision care." },
];

const VALUES = [
  { icon: Eye, title: "Advanced eye testing", desc: "Accurate, comfortable and reliable diagnostics with modern equipment." },
  { icon: Glasses, title: "Wide range of eyewear", desc: "International premium brands for every style and every face." },
  { icon: ShieldCheck, title: "100% authentic products", desc: "Genuine brands, trusted quality — always." },
  { icon: Users, title: "Expert, personal care", desc: "Your vision is our commitment, from test to fitting and beyond." },
];

function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="px-6 lg:px-10 pt-16 lg:pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Since 2009</span>
          <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.02]">
            Delivering clarity <span className="font-serif italic font-medium text-electric">with style.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Clear Sight Opticians began in Kukatpally in 2009 with a simple idea — that
            buying glasses in Hyderabad should feel as considered as the frames themselves.
            Today we run three studios, fit the world's finest eyewear houses, and are proud
            <span className="text-foreground font-medium"> ZEISS Certified Vision Experts</span> — the first eye-care
            professionals in Telangana to partner with ZEISS.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden">
          <img src={storeInterior} alt="Inside our Kukatpally flagship" width={1920} height={1080} loading="lazy" className="w-full h-[420px] lg:h-[560px] object-cover" />
        </div>
      </section>

      {/* Milestones */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Our milestones</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tighter">
            Our journey of <span className="font-serif italic font-medium text-electric">vision &amp; trust.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={(i % 5) * 0.05}>
                <div className="relative h-full bg-secondary/60 border border-border rounded-3xl p-6">
                  <p className="text-3xl font-bold tracking-tighter text-electric">{m.year}</p>
                  <h3 className="mt-3 font-bold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl bg-ink text-white rounded-3xl p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 grid place-items-center">
              <span className="text-6xl font-bold tracking-tighter text-electric">MA</span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Founder &amp; Chief Optometrist</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tighter">Madhu A</h2>
            <p className="mt-5 text-white/70 leading-relaxed max-w-2xl">
              "At Clear Sight Opticians, we combine modern eye-care technology with stylish
              eyewear collections to deliver comfort, clarity and confidence to every customer."
            </p>
            <p className="mt-4 text-white/60 leading-relaxed max-w-2xl">
              With over a decade and a half serving Hyderabad, Madhu leads a team of senior,
              certified optometrists committed to precision vision care and honest advice.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-secondary/60 border border-border rounded-2xl p-7">
              <span className="size-11 rounded-full bg-electric/10 grid place-items-center mb-5">
                <v.icon className="size-5 text-electric" />
              </span>
              <h3 className="font-bold text-lg">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20 lg:pb-32">
        <div className="mx-auto max-w-7xl bg-secondary border border-border rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter max-w-2xl">
            Come say hello — at any of our three Hyderabad studios.
          </h2>
          <Link to="/stores" className="bg-electric text-white px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2">
            Find a store <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
