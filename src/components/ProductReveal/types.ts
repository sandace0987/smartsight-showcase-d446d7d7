// types.ts — shared type definitions for ProductReveal

export interface FrameSequenceConfig {
  /** Base path prefix — e.g. "/frames/smart-glasses/frame-" */
  basePath: string;
  /** Zero-padded digit width — e.g. 3 → "001", "002" */
  padWidth: number;
  /** File extension including dot — ".webp" */
  ext: string;
  /** Total number of extracted frames */
  totalFrames: number;
}

export interface TextCue {
  /** 0–1 progress point where this cue starts fading in */
  inStart: number;
  /** 0–1 progress point where this cue is fully visible */
  inEnd: number;
  /** 0–1 progress point where this cue starts fading out */
  outStart: number;
  /** 0–1 progress point where this cue is fully gone */
  outEnd: number;
  /** Small eyebrow label above headline */
  eyebrow?: string;
  /** Main headline — split on \n for line breaks */
  headline: string;
  /** Supporting copy under the headline */
  body?: string;
  /** Whether to render action CTA buttons at the end */
  showCTA?: boolean;
  /** The target sharp frame index in the image sequence (1-indexed) */
  keyframe: number;
}

export interface ProductRevealProps {
  /** Frame sequence configuration */
  sequence?: FrameSequenceConfig;
  /** Text cues keyed to scroll progress */
  textTimeline: TextCue[];
  /** Approximate scroll distance in px mapped to full animation — default 3000 */
  scrollHeight?: number;
  /** Section HTML id for hash navigation */
  id?: string;
}
