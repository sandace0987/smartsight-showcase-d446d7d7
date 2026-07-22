// textTimeline.ts — Apple-style marketing copy keyed to scroll progress [0-1]

import type { TextCue } from "./types";

export const SMART_GLASSES_TEXT_TIMELINE: TextCue[] = [
  {
    eyebrow: "Meta AI Eyewear",
    headline: "Intelligence\nin plain sight.",
    inStart: 0.0,
    inEnd: 0.1,
    outStart: 0.25,
    outEnd: 0.33,
    keyframe: 125,
  },
  {
    headline: "Audio that surrounds,\nyet stays personal.",
    inStart: 0.33,
    inEnd: 0.43,
    outStart: 0.58,
    outEnd: 0.66,
    keyframe: 228,
  },
  {
    eyebrow: "AI Eyewear",
    headline: "The future\nis in sight.",
    inStart: 0.66,
    inEnd: 0.75,
    outStart: 9999, // never fades out — holds at end
    outEnd: 9999,
    showCTA: true,
    keyframe: 369,
  },
];

