import crystalFront from "@/assets/products/maui-jim-alika/crystal-front.webp.asset.json";
import crystalQuarter from "@/assets/products/maui-jim-alika/crystal-quarter.webp.asset.json";
import crystalSide from "@/assets/products/maui-jim-alika/crystal-side.webp.asset.json";
import tortoiseFront from "@/assets/products/maui-jim-alika/tortoise-front.webp.asset.json";
import tortoiseQuarter from "@/assets/products/maui-jim-alika/tortoise-quarter.webp.asset.json";
import tortoiseSide from "@/assets/products/maui-jim-alika/tortoise-side.webp.asset.json";
import castlesBlackFront from "@/assets/products/maui-jim-castles/728-2M_front.webp.asset.json";
import castlesBlackQuarter from "@/assets/products/maui-jim-castles/728-2M_quarter.webp.asset.json";
import castlesBlackSide from "@/assets/products/maui-jim-castles/728-2M_side.webp.asset.json";
import castlesChocFront from "@/assets/products/maui-jim-castles/H728-01M_front.webp.asset.json";
import castlesChocQuarter from "@/assets/products/maui-jim-castles/H728-01M_quarter.webp.asset.json";
import castlesChocSide from "@/assets/products/maui-jim-castles/H728-01M_side.webp.asset.json";
import mauiJimLogo from "@/assets/brands/maui-jim-logo.webp.asset.json";

export type ColorVariant = {
  id: string;
  name: string;
  lens: string;
  swatch: string;
  images: { front: string; quarter: string; side: string };
};

export type GlassItem = {
  model: string;
  shape: string;
  colour: string;
  priceFrom: number;
  variants?: ColorVariant[];
};

export type BrandData = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  logo?: string;
  models: GlassItem[];
};

export const BRANDS: BrandData[] = [
  {
    slug: "maui-jim",
    name: "Maui Jim",
    tag: "Hawaii-born",
    blurb: "Born on Wailea Beach in 1980. PolarizedPlus2® lenses cut glare and pump colour — sunglasses engineered for island light.",
    logo: mauiJimLogo.url,
    models: [
      {
        model: "Alika",
        shape: "geometric",
        colour: "Crystal with Silver / Tortoise with Gold",
        priceFrom: 36590,
        variants: [
          {
            id: "crystal",
            name: "Crystal with Silver",
            lens: "Blue Hawaii",
            swatch: "linear-gradient(135deg, #e8edf2 0%, #c4ccd4 50%, #f4f6f8 100%)",
            images: { front: crystalFront.url, quarter: crystalQuarter.url, side: crystalSide.url },
          },
          {
            id: "tortoise",
            name: "Tortoise with Gold",
            lens: "HCL\u00ae Bronze",
            swatch: "linear-gradient(135deg, #5a3320 0%, #8a5230 50%, #c08a4a 100%)",
            images: { front: tortoiseFront.url, quarter: tortoiseQuarter.url, side: tortoiseSide.url },
          },
        ],
      },
      {
        model: "Castles",
        shape: "aviator",
        colour: "Matte Black / Matte Chocolate",
        priceFrom: 22290,
        variants: [
          {
            id: "black",
            name: "Matte Black",
            lens: "Neutral Grey",
            swatch: "linear-gradient(135deg, #2b2b2d 0%, #4a4a4d 50%, #1a1a1c 100%)",
            images: { front: castlesBlackFront.url, quarter: castlesBlackQuarter.url, side: castlesBlackSide.url },
          },
          {
            id: "chocolate",
            name: "Matte Chocolate",
            lens: "HCL\u00ae Bronze",
            swatch: "linear-gradient(135deg, #3a261a 0%, #7a4f30 50%, #b5824c 100%)",
            images: { front: castlesChocFront.url, quarter: castlesChocQuarter.url, side: castlesChocSide.url },
          },
        ],
      },
    ],
  },
  {
    slug: "ray-ban",
    name: "Ray-Ban",
    tag: "American icon",
    blurb: "Since 1937. The original Aviator and Wayfarer — engineered in Italy, worn worldwide.",
    models: [
      { model: "Wayfarer Classic", shape: "wayfarer", colour: "Black", priceFrom: 8490 },
      { model: "Aviator Gold", shape: "aviator", colour: "Gold / Green G-15", priceFrom: 9990 },
      { model: "Round Metal", shape: "round", colour: "Gunmetal", priceFrom: 8990 },
      { model: "Clubmaster", shape: "browline", colour: "Tortoise / Gold", priceFrom: 9490 },
      { model: "Hexagonal Flat", shape: "geometric", colour: "Copper", priceFrom: 9290 },
      { model: "Justin Sport", shape: "rectangle", colour: "Matte Black", priceFrom: 7490 },
    ],
  },
  {
    slug: "oakley",
    name: "Oakley",
    tag: "Performance",
    blurb: "Sport-built optics with Prizm lens tech — for the road, the trail and the everyday.",
    models: [
      { model: "Holbrook", shape: "wayfarer", colour: "Matte Black / Prizm", priceFrom: 11990 },
      { model: "Radar EV Path", shape: "shield", colour: "Polished Black", priceFrom: 16990 },
      { model: "Sutro", shape: "shield", colour: "Steel / Prizm Sapphire", priceFrom: 14490 },
      { model: "Flak 2.0", shape: "sport", colour: "Matte Grey Smoke", priceFrom: 13490 },
      { model: "Latch", shape: "round", colour: "Polished Clear", priceFrom: 10990 },
      { model: "Frogskins", shape: "wayfarer", colour: "Crystal Black", priceFrom: 9990 },
    ],
  },
  {
    slug: "prada",
    name: "Prada",
    tag: "Italian luxury",
    blurb: "Linea Rossa, Symbole and the iconic triangle plaque — refined, sculptural Milanese eyewear.",
    models: [
      { model: "Symbole Oval", shape: "oversized", colour: "Black / Smoke", priceFrom: 28990 },
      { model: "Linea Rossa Sport", shape: "shield", colour: "Rubber Black", priceFrom: 22990 },
      { model: "Cinéma Cat-Eye", shape: "cateye", colour: "Havana", priceFrom: 26490 },
      { model: "Heritage Round", shape: "round", colour: "Tortoise", priceFrom: 24990 },
      { model: "Geometric Plaque", shape: "geometric", colour: "Crystal", priceFrom: 25990 },
      { model: "Minimal Rectangle", shape: "rectangle", colour: "Matte Black", priceFrom: 21990 },
    ],
  },
  {
    slug: "gucci",
    name: "Gucci",
    tag: "Italian luxury",
    blurb: "Maximalist Florence — oversized silhouettes, GG monograms and web-stripe temples.",
    models: [
      { model: "GG Oversized Square", shape: "oversized", colour: "Black / Gold", priceFrom: 29990 },
      { model: "Web Cat-Eye", shape: "cateye", colour: "Havana / Web", priceFrom: 27490 },
      { model: "Pilot Metal", shape: "aviator", colour: "Gold", priceFrom: 26990 },
      { model: "Round Acetate", shape: "round", colour: "Crystal Pink", priceFrom: 24490 },
      { model: "Bold Rectangle", shape: "rectangle", colour: "Black", priceFrom: 23990 },
      { model: "Shield Mask", shape: "shield", colour: "Silver Mirror", priceFrom: 32990 },
    ],
  },
  {
    slug: "burberry",
    name: "Burberry",
    tag: "British heritage",
    blurb: "Check, monogram and trench-coat tailoring translated into eyewear from London.",
    models: [
      { model: "Check Cat-Eye", shape: "cateye", colour: "Vintage Check", priceFrom: 18990 },
      { model: "Heritage Round", shape: "round", colour: "Havana", priceFrom: 17490 },
      { model: "Monogram Square", shape: "rectangle", colour: "Black / Beige", priceFrom: 18490 },
      { model: "Classic Wayfarer", shape: "wayfarer", colour: "Tortoise", priceFrom: 16990 },
      { model: "Pilot Trench", shape: "aviator", colour: "Gold / Brown", priceFrom: 17990 },
      { model: "Geometric Check", shape: "geometric", colour: "Crystal", priceFrom: 18290 },
    ],
  },
  {
    slug: "persol",
    name: "Persol",
    tag: "Handmade Italy",
    blurb: "Turin's craft house — Meflecto temples, crystal lenses and the unmistakable arrow.",
    models: [
      { model: "649 Original", shape: "rectangle", colour: "Havana / Crystal Green", priceFrom: 21990 },
      { model: "714 Folding", shape: "wayfarer", colour: "Black / Polar", priceFrom: 26990 },
      { model: "Steve McQueen Edition", shape: "wayfarer", colour: "Tortoise", priceFrom: 27990 },
      { model: "Round Acetate", shape: "round", colour: "Terra di Siena", priceFrom: 19990 },
      { model: "Aviator Crystal", shape: "aviator", colour: "Gold", priceFrom: 22490 },
      { model: "Cellor Cat-Eye", shape: "cateye", colour: "Black", priceFrom: 20990 },
    ],
  },
  {
    slug: "carrera",
    name: "Carrera",
    tag: "Motorsport DNA",
    blurb: "Bold, fearless silhouettes built on a motorsport heritage since 1956.",
    models: [
      { model: "Champion Aviator", shape: "aviator", colour: "Matte Black", priceFrom: 9990 },
      { model: "Retro Round", shape: "round", colour: "Gold", priceFrom: 8490 },
      { model: "Sport Shield", shape: "shield", colour: "Carbon", priceFrom: 11490 },
      { model: "Hyperfit Square", shape: "rectangle", colour: "Black / Red", priceFrom: 8990 },
      { model: "Browline 78", shape: "browline", colour: "Havana / Gold", priceFrom: 9290 },
      { model: "Speedway Wrap", shape: "sport", colour: "Gunmetal", priceFrom: 10490 },
    ],
  },
  {
    slug: "tom-ford",
    name: "Tom Ford",
    tag: "Modern luxury",
    blurb: "Polished, oversized silhouettes with signature T-temples and deep acetates.",
    models: [
      { model: "Anoushka Cat-Eye", shape: "cateye", colour: "Havana", priceFrom: 32990 },
      { model: "Henry Square", shape: "rectangle", colour: "Black", priceFrom: 31490 },
      { model: "Liane Oversized", shape: "oversized", colour: "Black / Gold", priceFrom: 34990 },
      { model: "Marko Aviator", shape: "aviator", colour: "Gunmetal", priceFrom: 33490 },
      { model: "Farrah Round", shape: "round", colour: "Tortoise / Gold", priceFrom: 30990 },
      { model: "Geometric T", shape: "geometric", colour: "Crystal", priceFrom: 29990 },
    ],
  },
  {
    slug: "vogue-eyewear",
    name: "Vogue Eyewear",
    tag: "Fashion forward",
    blurb: "Trend-led capsules co-designed with style icons — accessible fashion eyewear.",
    models: [
      { model: "Gigi Cat-Eye", shape: "cateye", colour: "Tortoise", priceFrom: 5990 },
      { model: "Hailey Square", shape: "rectangle", colour: "Black", priceFrom: 5490 },
      { model: "Oversized Acetate", shape: "oversized", colour: "Honey", priceFrom: 6290 },
      { model: "Round Metal", shape: "round", colour: "Rose Gold", priceFrom: 5790 },
      { model: "Pilot Mini", shape: "aviator", colour: "Gold", priceFrom: 5990 },
      { model: "Geometric Pop", shape: "geometric", colour: "Crystal Pink", priceFrom: 5490 },
    ],
  },
  {
    slug: "police",
    name: "Police",
    tag: "Italian cool",
    blurb: "Streetwise Italian style — sport meets lifestyle with attitude.",
    models: [
      { model: "Origins Aviator", shape: "aviator", colour: "Gunmetal", priceFrom: 7990 },
      { model: "Lewis Rectangle", shape: "rectangle", colour: "Matte Black", priceFrom: 6990 },
      { model: "Tailwind Shield", shape: "shield", colour: "Black", priceFrom: 8490 },
      { model: "Glory Round", shape: "round", colour: "Gold", priceFrom: 7290 },
      { model: "Edge Browline", shape: "browline", colour: "Tortoise", priceFrom: 7790 },
      { model: "Sport Wrap", shape: "sport", colour: "Matte Grey", priceFrom: 8290 },
    ],
  },
  {
    slug: "fastrack",
    name: "Fastrack",
    tag: "Everyday",
    blurb: "Light, durable, affordable — designed for everyday Indian wear.",
    models: [
      { model: "Wayfarer Pop", shape: "wayfarer", colour: "Black", priceFrom: 1495 },
      { model: "Round Metal", shape: "round", colour: "Gold", priceFrom: 1295 },
      { model: "Sport Wrap", shape: "sport", colour: "Matte Black", priceFrom: 1795 },
      { model: "Square Acetate", shape: "rectangle", colour: "Brown", priceFrom: 1395 },
      { model: "Aviator Lite", shape: "aviator", colour: "Silver", priceFrom: 1595 },
      { model: "Cat-Eye Trend", shape: "cateye", colour: "Pink", priceFrom: 1495 },
    ],
  },
  {
    slug: "titan-eyeplus",
    name: "Titan Eyeplus",
    tag: "Indian premium",
    blurb: "Quietly premium optical favourites — clean Indian design, all-day comfort.",
    models: [
      { model: "Classic Rectangle", shape: "rectangle", colour: "Black", priceFrom: 2990 },
      { model: "Round Heritage", shape: "round", colour: "Havana", priceFrom: 3290 },
      { model: "Aviator Pro", shape: "aviator", colour: "Gold", priceFrom: 3490 },
      { model: "Rimless Glide", shape: "rimless", colour: "Silver", priceFrom: 4290 },
      { model: "Browline Office", shape: "browline", colour: "Tortoise / Black", priceFrom: 3390 },
      { model: "Cat-Eye Soft", shape: "cateye", colour: "Burgundy", priceFrom: 3190 },
    ],
  },
];

export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === slug);

export type House = {
  slug: string;
  name: string;
  tag: string;
  note: string;
  logo?: string;
};

export const HOUSES: House[] = [
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
