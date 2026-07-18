import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Car, Sparkles } from "lucide-react";
import kphb1 from "@/assets/miscellaneous/kphb-interior-1.webp";
import kphb2 from "@/assets/miscellaneous/kphb-interior-2.webp";
import nizampet1 from "@/assets/miscellaneous/nizampet-1.webp";
import nizampet2 from "@/assets/miscellaneous/nizampet-2.webp";
import bowenpallyImg from "@/assets/miscellaneous/bowenpally.webp";
import { StoreImageCarousel } from "@/components/site/StoreImageCarousel";
import {
  breadcrumbSchema,
  createSeoHead,
  itemListSchema,
  STORE_LOCATIONS,
  storeSchema,
} from "@/lib/seo";

export const Route = createFileRoute("/stores")({
  head: () =>
    createSeoHead({
      title: "Optical Stores in Hyderabad | KPHB, Nizampet & Bowenpally | Clear Sight",
      description:
        "Visit Clear Sight Opticians in KPHB, Nizampet, or Bowenpally for ZEISS eye tests, designer eyewear, prescription lenses, computer glasses, and smart glasses demos.",
      path: "/stores",
      schema: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stores", path: "/stores" },
        ]),
        itemListSchema(
          "Clear Sight Opticians store locations",
          "/stores",
          STORE_LOCATIONS.map((store) => ({ name: store.name, path: `/stores#${store.id}` })),
        ),
        ...STORE_LOCATIONS.map(storeSchema),
      ],
    }),
  component: StoresPage,
});

const STORE_IMAGES = {
  kphb: [kphb1, kphb2],
  nizampet: [nizampet1, nizampet2],
  bowenpally: [bowenpallyImg],
} as const;

const STORES = STORE_LOCATIONS.map((store) => ({
  ...store,
  images: [...STORE_IMAGES[store.id]] as string[],
}));


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
            <article key={s.name} id={s.id} className="grid grid-cols-1 lg:grid-cols-12 bg-secondary/60 border border-border rounded-3xl overflow-hidden">
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto overflow-hidden bg-secondary">
                <StoreImageCarousel
                  images={s.images}
                  alt={s.name}
                  className={i === 1 ? "scale-110" : ""}
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

                {/* Address */}
                <p className="text-muted-foreground leading-relaxed flex items-start gap-3 max-w-xl">
                  <MapPin className="size-5 mt-0.5 shrink-0 text-electric" /> {s.address}
                </p>

                {/* Phone + Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <a
                    href={s.phoneHref}
                    className="inline-flex items-center gap-2 hover:text-electric transition-colors"
                    aria-label={`Call ${s.name}`}
                  >
                    <Phone className="size-4 text-muted-foreground" /> {s.phone}
                  </a>
                  <p className="inline-flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" /> {s.hours}
                  </p>
                </div>

                {/* Visit note */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{s.visitNote}</p>

                {/* Nearby areas */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Nearby</p>
                  <div className="flex flex-wrap gap-2">
                    {s.nearbyAreas.map((area) => (
                      <span key={area} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <Sparkles className="size-3 inline mr-1 text-electric" />Services
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {s.services.map((svc) => (
                      <li key={svc} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-electric shrink-0" />{svc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Parking */}
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Car className="size-4 shrink-0 text-muted-foreground" /> {s.parkingNote}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <a
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-ink text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric transition-colors"
                  >
                    Get directions
                  </a>
                  <a
                    href={s.phoneHref}
                    className="bg-background border border-border px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition-colors"
                  >
                    Call now
                  </a>
                  <Link
                    to="/"
                    onClick={() => sessionStorage.setItem("scrollTargetSection", "contact")}
                    className="bg-background border border-border px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-electric hover:text-electric transition-colors"
                  >
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

