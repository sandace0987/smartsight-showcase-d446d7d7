import rayban from "@/assets/try-on/rayban-wayfarer.png";
import aviator from "@/assets/try-on/rayban-aviator.png";
import oakley from "@/assets/try-on/oakley-holbrook.png";
import meta from "@/assets/try-on/rayban-meta.png";
import round from "@/assets/try-on/round-tortoise.png";

export type Frame = {
  id: string;
  name: string;
  brand: string;
  src: string;
  /** glasses width as multiple of inter-eye-corner distance */
  widthRatio: number;
  /** vertical offset as fraction of glasses height (positive = down) */
  yOffsetRatio: number;
};

export const FRAMES: Frame[] = [
  { id: "wayfarer", name: "Wayfarer",       brand: "Ray-Ban",      src: rayban,  widthRatio: 1.05, yOffsetRatio: 0.05 },
  { id: "aviator",  name: "Aviator",        brand: "Ray-Ban",      src: aviator, widthRatio: 1.08, yOffsetRatio: 0.10 },
  { id: "holbrook", name: "Holbrook",       brand: "Oakley",       src: oakley,  widthRatio: 1.06, yOffsetRatio: 0.05 },
  { id: "meta",     name: "Meta Wayfarer",  brand: "Ray-Ban Meta", src: meta,    widthRatio: 1.05, yOffsetRatio: 0.05 },
  { id: "round",    name: "Round Tortoise", brand: "Clear Sight",  src: round,   widthRatio: 1.00, yOffsetRatio: 0.05 },
];
