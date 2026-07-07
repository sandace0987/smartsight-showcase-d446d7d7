import prada from "@/assets/try-on/prada-cateye.webp";
import pradaRect from "@/assets/try-on/prada-rectangle.webp";
import burberry from "@/assets/try-on/burberry-square.webp";
import burberryWay from "@/assets/try-on/burberry-wayfarer.webp";
import mauiAviator from "@/assets/try-on/mauijim-aviator.webp";
import mauiSport from "@/assets/try-on/mauijim-sport.webp";

export type Frame = {
  id: string;
  name: string;
  brand: string;
  /** frame style / genre */
  genre: string;
  src: string;
  /** glasses front width as multiple of temple-to-temple face width */
  widthRatio: number;
  /** vertical offset as fraction of glasses height (positive = down) */
  yOffsetRatio: number;
};

export const FRAMES: Frame[] = [
  { id: "prada-cateye",      name: "Cat-Eye",   brand: "Prada",     genre: "Cat-Eye",   src: prada,       widthRatio: 0.98, yOffsetRatio: 0.02 },
  { id: "burberry-square",   name: "Square",    brand: "Burberry",  genre: "Square",    src: burberry,    widthRatio: 1.00, yOffsetRatio: 0.04 },
  { id: "mauijim-aviator",   name: "Aviator",   brand: "Maui Jim",  genre: "Aviator",   src: mauiAviator, widthRatio: 1.04, yOffsetRatio: 0.10 },
  { id: "prada-rectangle",   name: "Rectangle", brand: "Prada",     genre: "Rectangle", src: pradaRect,   widthRatio: 0.98, yOffsetRatio: 0.13 },
  { id: "burberry-wayfarer", name: "Wayfarer",  brand: "Burberry",  genre: "Wayfarer",  src: burberryWay, widthRatio: 1.02, yOffsetRatio: 0.04 },
  { id: "mauijim-sport",     name: "Sport",     brand: "Maui Jim",  genre: "Sport",     src: mauiSport,   widthRatio: 1.04, yOffsetRatio: 0.06 },
];
