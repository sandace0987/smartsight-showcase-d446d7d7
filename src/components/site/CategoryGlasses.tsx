import * as React from "react";

/** Distinct decorative glasses silhouettes per category. Pure SVG, no background. */
type Props = React.SVGProps<SVGSVGElement> & { variant: string };

const Common = ({ children, ...rest }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...rest}
  >
    {children}
  </svg>
);

export function CategoryGlasses({ variant, ...rest }: Props) {
  switch (variant) {
    // Eyeglasses — classic rectangular wayfarer
    case "Eyeglasses":
      return (
        <Common {...rest}>
          <rect x="14" y="32" width="70" height="44" rx="10" />
          <rect x="116" y="32" width="70" height="44" rx="10" />
          <path d="M84 50 Q100 42 116 50" />
          <path d="M2 36 L14 40" />
          <path d="M198 36 L186 40" />
        </Common>
      );
    // Sunglasses — bold cat-eye, filled lenses
    case "Sunglasses":
      return (
        <Common {...rest}>
          <path
            d="M14 40 Q12 70 40 74 Q78 78 84 50 Q86 44 90 44 L110 44 Q114 44 116 50 Q122 78 160 74 Q188 70 186 40 Q150 30 116 38 Q100 42 84 38 Q50 30 14 40 Z"
            fill="currentColor"
            fillOpacity={0.85}
            stroke="none"
          />
        </Common>
      );
    // Smart Glasses — wayfarer with a little camera dot + tech bar
    case "Smart Glasses":
      return (
        <Common {...rest}>
          <rect x="14" y="34" width="72" height="42" rx="8" />
          <rect x="114" y="34" width="72" height="42" rx="8" />
          <path d="M86 48 L114 48" />
          <circle cx="22" cy="44" r="2.5" fill="currentColor" stroke="none" />
          <path d="M150 70 L178 70" strokeWidth={3} />
        </Common>
      );
    // Contact Lenses — two concentric circles (lens domes)
    case "Contact Lenses":
      return (
        <Common {...rest}>
          <circle cx="70" cy="50" r="34" />
          <circle cx="70" cy="50" r="20" />
          <circle cx="130" cy="50" r="34" />
          <circle cx="130" cy="50" r="20" />
          <path d="M58 38 Q66 32 76 36" strokeOpacity={0.6} />
          <path d="M118 38 Q126 32 136 36" strokeOpacity={0.6} />
        </Common>
      );
    // Kids Eyewear — round playful frames with little hearts/stars
    case "Kids Eyewear":
      return (
        <Common {...rest}>
          <circle cx="55" cy="54" r="30" />
          <circle cx="145" cy="54" r="30" />
          <path d="M85 50 Q100 40 115 50" />
          <path d="M10 44 L25 48" />
          <path d="M190 44 L175 48" />
          <path d="M100 18 L102 22 L106 22 L103 25 L104 29 L100 26 L96 29 L97 25 L94 22 L98 22 Z" fill="currentColor" stroke="none" />
        </Common>
      );
    // Luxury Frames — aviator teardrop with double bridge
    case "Luxury Frames":
      return (
        <Common {...rest}>
          <path d="M14 36 Q14 80 50 80 Q90 80 92 44 Q92 36 84 34 L24 34 Q14 34 14 36 Z" />
          <path d="M186 36 Q186 80 150 80 Q110 80 108 44 Q108 36 116 34 L176 34 Q186 34 186 36 Z" />
          <path d="M92 42 L108 42" />
          <path d="M92 52 L108 52" />
        </Common>
      );
    default:
      return (
        <Common {...rest}>
          <circle cx="60" cy="50" r="28" />
          <circle cx="140" cy="50" r="28" />
          <path d="M88 50 L112 50" />
        </Common>
      );
  }
}
