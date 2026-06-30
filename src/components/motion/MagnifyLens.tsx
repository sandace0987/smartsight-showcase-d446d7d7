import { useRef, useState, type ReactNode } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsTouch } from "@/hooks/use-motion-prefs";

type Props = {
  children: ReactNode;
  /** Magnification factor inside the lens */
  zoom?: number;
  /** Diameter of the circular lens in px */
  lensSize?: number;
  className?: string;
};

/**
 * Wraps content (image or SVG) and shows a circular magnifying-glass lens.
 * - Desktop: the lens follows the cursor on hover.
 * - Touch: tap to toggle magnify mode, then drag a finger to pan the lens.
 */
export function MagnifyLens({ children, zoom = 3, lensSize = 150, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const touch = useIsTouch();

  const setFromPoint = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
    // clamp the lens centre inside the content bounds for a clean edge
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    setPos({ x, y });
  };

  return (
    <div
      ref={ref}
      className={cn("relative select-none", touch && "cursor-zoom-in", className)}
      onMouseEnter={(e) => {
        if (touch) return;
        setActive(true);
        setFromPoint(e.clientX, e.clientY);
      }}
      onMouseMove={(e) => {
        if (!touch) setFromPoint(e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
        if (!touch) setActive(false);
      }}
      onTouchStart={(e) => {
        if (!touch) return;
        const t = e.touches[0];
        setActive((a) => {
          const next = !a;
          if (next) setFromPoint(t.clientX, t.clientY);
          return next;
        });
      }}
      onTouchMove={(e) => {
        if (!touch || !active) return;
        e.preventDefault();
        const t = e.touches[0];
        setFromPoint(t.clientX, t.clientY);
      }}
    >
      {children}

      {/* touch affordance */}
      {touch && !active && (
        <span className="pointer-events-none absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          <ZoomIn className="size-3" /> Tap to zoom
        </span>
      )}

      {active && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-30 rounded-full overflow-hidden",
            "border border-white/70 ring-1 ring-black/10",
            "shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)]",
            "bg-secondary/95 backdrop-blur-[1px] animate-scale-in"
          )}
          style={{
            width: lensSize,
            height: lensSize,
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
            transition: "left 220ms cubic-bezier(0.16, 1, 0.3, 1), top 220ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "left, top",
          }}
        >
          <div
            className="absolute"
            style={{
              width: size.w,
              height: size.h,
              left: -(pos.x * zoom - lensSize / 2),
              top: -(pos.y * zoom - lensSize / 2),
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
          {/* premium glass: inner ring + soft top sheen + crosshair dot */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/10" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" />
        </div>
      )}
    </div>
  );
}
