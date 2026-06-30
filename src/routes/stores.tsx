import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import storeInterior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Stores — Clear Sight Opticians, Hyderabad" },
      { name: "description", content: "Visit Clear Sight Opticians in Kukatpally, Banjara Hills and Jubilee Hills." },
      { property: "og:title", content: "Stores — Clear Sight Opticians, Hyderabad" },
      { property: "og:description", content: "Three Hyderabad studios. One standard of care." },
    ],
  }),
  component: StoresPage,
});

const STORES = [
  {
    name: "Kukatpally (KPHB)",
    tag: "Flagship",
    address: "Shop #4, Padmaja Complex, 6th Phase, JNTU Road, KPHB, Kukatpally, Hyderabad, Telangana",
    phone: "+91 99999 99999",
    hours: "Mon–Sun · 10:00 AM – 9:30 PM",
  },
  {
    name: "Nizampet",
    tag: "Studio",
    address: "Beside Vazra Nirman Pushpak, Nizampet Colony, Hyderabad, Telangana",
    phone: "+91 99999 99999",
    hours: "Mon–Sun · 10:00 AM – 9:30 PM",
  },
  {
    name: "Bowenpally",
    tag: "Studio",
    address: "Near Delhi Public School, Sikh Village Road, Bowenpally, Hyderabad, Telangana",
    phone: "+91 99999 99999",
    hours: "Mon–Sun · 10:00 AM – 9:00 PM",
  },
];


function StoresPage() {
  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Visit</span>
        <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-3xl">
          Three Hyderabad <span className="font-serif italic font-medium text-electric">studios.</span>
        </h1>
        <p className="mt-6 text-muted-foreground max-w-2xl text-lg">
          Walk-ins welcome. Bring your prescription — or get one done with us, on the house.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {STORES.map((s, i) => (
            <article key={s.name} className="grid grid-cols-1 lg:grid-cols-12 bg-secondary/60 border border-border rounded-3xl overflow-hidden">
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto overflow-hidden bg-secondary">
                <img
                  src={storeInterior}
                  alt={`${s.name} interior`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className={`w-full h-full object-cover ${i === 1 ? "scale-110" : i === 2 ? "-scale-x-100" : ""}`}
                />
              </div>
              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric">{s.tag}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500" /> Open today
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter">{s.name}</h2>
                <p className="text-muted-foreground leading-relaxed flex items-start gap-3 max-w-xl">
                  <MapPin className="size-5 mt-0.5 shrink-0 text-electric" /> {s.address}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <p className="inline-flex items-center gap-2"><Phone className="size-4 text-muted-foreground" /> {s.phone}</p>
                  <p className="inline-flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /> {s.hours}</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <a href="#" className="bg-ink text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors">
                    Get directions
                  </a>
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="bg-background border border-border px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition-colors">
                    Call now
                  </a>
                  <Link to="/contact" className="bg-background border border-border px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition-colors">
                    Book at this store
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
