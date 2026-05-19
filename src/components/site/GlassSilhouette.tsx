import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { shape: string };

const Wrap = ({ children, ...rest }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg viewBox="0 0 220 110" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...rest}>
    {children}
  </svg>
);

/** Distinct glasses silhouettes per shape style. No background. */
export function GlassSilhouette({ shape, ...rest }: Props) {
  switch (shape) {
    case "wayfarer":
      return (
        <Wrap {...rest}>
          <path d="M14 38 L92 34 L100 54 Q90 78 56 78 Q18 78 14 50 Z" />
          <path d="M206 38 L128 34 L120 54 Q130 78 164 78 Q202 78 206 50 Z" />
          <path d="M92 40 Q110 36 128 40" />
        </Wrap>
      );
    case "aviator":
      return (
        <Wrap {...rest}>
          <path d="M14 32 Q14 86 56 86 Q100 86 102 46 Q102 32 92 30 L24 30 Q14 30 14 32 Z" />
          <path d="M206 32 Q206 86 164 86 Q120 86 118 46 Q118 32 128 30 L196 30 Q206 30 206 32 Z" />
          <path d="M102 40 L118 40" />
          <path d="M102 50 L118 50" />
        </Wrap>
      );
    case "round":
      return (
        <Wrap {...rest}>
          <circle cx="58" cy="55" r="36" />
          <circle cx="162" cy="55" r="36" />
          <path d="M94 55 L126 55" />
          <path d="M6 42 L22 46" />
          <path d="M214 42 L198 46" />
        </Wrap>
      );
    case "cateye":
      return (
        <Wrap {...rest}>
          <path d="M10 50 Q14 24 60 28 Q104 32 102 56 Q98 80 60 80 Q14 80 10 50 Z" fill="currentColor" fillOpacity={0.12} />
          <path d="M210 50 Q206 24 160 28 Q116 32 118 56 Q122 80 160 80 Q206 80 210 50 Z" fill="currentColor" fillOpacity={0.12} />
          <path d="M102 46 Q110 40 118 46" />
        </Wrap>
      );
    case "rectangle":
      return (
        <Wrap {...rest}>
          <rect x="12" y="34" width="86" height="46" rx="4" />
          <rect x="122" y="34" width="86" height="46" rx="4" />
          <path d="M98 50 L122 50" />
        </Wrap>
      );
    case "rimless":
      return (
        <Wrap {...rest}>
          <path d="M16 44 Q60 30 96 44" strokeOpacity={0.4} />
          <path d="M16 44 Q60 78 96 60" strokeOpacity={0.4} />
          <path d="M124 44 Q160 30 204 44" strokeOpacity={0.4} />
          <path d="M124 60 Q160 78 204 44" strokeOpacity={0.4} />
          <path d="M96 50 L124 50" />
        </Wrap>
      );
    case "oversized":
      return (
        <Wrap {...rest}>
          <path d="M8 30 Q4 88 56 88 Q108 88 108 44 Q108 28 96 26 L20 26 Q8 26 8 30 Z" fill="currentColor" fillOpacity={0.18} />
          <path d="M212 30 Q216 88 164 88 Q112 88 112 44 Q112 28 124 26 L200 26 Q212 26 212 30 Z" fill="currentColor" fillOpacity={0.18} />
          <path d="M108 40 L112 40" />
        </Wrap>
      );
    case "sport":
      return (
        <Wrap {...rest}>
          <path d="M10 36 Q4 70 50 76 Q100 82 110 50 Q120 82 170 76 Q216 70 210 36 Q160 26 110 36 Q60 26 10 36 Z" fill="currentColor" fillOpacity={0.85} stroke="none" />
        </Wrap>
      );
    case "browline":
      return (
        <Wrap {...rest}>
          <path d="M10 36 L100 30 Q108 30 110 38 Q112 30 120 30 L210 36" strokeWidth={5} />
          <path d="M16 40 Q12 78 54 78 Q96 78 100 48" />
          <path d="M204 40 Q208 78 166 78 Q124 78 120 48" />
        </Wrap>
      );
    case "geometric":
      return (
        <Wrap {...rest}>
          <path d="M14 36 L96 36 L86 78 L24 78 Z" />
          <path d="M206 36 L124 36 L134 78 L196 78 Z" />
          <path d="M96 50 L124 50" />
        </Wrap>
      );
    case "shield":
      return (
        <Wrap {...rest}>
          <path d="M14 38 Q14 80 60 82 L160 82 Q206 80 206 38 Q160 28 110 36 Q60 28 14 38 Z" fill="currentColor" fillOpacity={0.7} stroke="none" />
          <path d="M14 38 Q14 80 60 82 L160 82 Q206 80 206 38" />
        </Wrap>
      );
    default:
      return (
        <Wrap {...rest}>
          <circle cx="60" cy="55" r="32" />
          <circle cx="160" cy="55" r="32" />
          <path d="M92 55 L128 55" />
        </Wrap>
      );
  }
}
