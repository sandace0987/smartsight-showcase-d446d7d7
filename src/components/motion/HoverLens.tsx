import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Magnification factor inside the lens. */
  zoom?: number;
  /** Lens diameter in px. */
  lensSize?: number;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
};

/**
 * Premium hover loupe. Move the cursor over the image to reveal a soft circular
 * lens that magnifies the area underneath, anchored precisely to the pointer.
 * Disabled on touch / coarse pointers where it adds no value.
 */
export function HoverLens({
  src,
  alt,
  zoom = 2.4,
  lensSize = 200,
  className,
  imgClassName,
  width,
  height,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const [active, setActive] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [bg, setBg] = React.useState({ size: "0px 0px", pos: "0px 0px" });
  const [fine, setFine] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  React.useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setActive(false);
      return;
    }
    setActive(true);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const wrapRect = wrap.getBoundingClientRect();
      setPos({ x: e.clientX - wrapRect.left, y: e.clientY - wrapRect.top });
      setBg({
        size: `${rect.width * zoom}px ${rect.height * zoom}px`,
        pos: `${-(x * zoom - lensSize / 2)}px ${-(y * zoom - lensSize / 2)}px`,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", fine && "cursor-none", className)}
      onPointerMove={fine ? handleMove : undefined}
      onPointerEnter={fine ? () => setActive(true) : undefined}
      onPointerLeave={() => setActive(false)}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        className={cn("w-full h-auto object-contain select-none", imgClassName)}
      />

      {fine && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 rounded-full",
            "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] ring-1 ring-black/10",
            "transition-[opacity,transform] duration-200 ease-out",
            active ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
          style={{
            width: lensSize,
            height: lensSize,
            transform: `translate3d(${pos.x - lensSize / 2}px, ${pos.y - lensSize / 2}px, 0)`,
            backgroundImage: `url(${src})`,
            backgroundColor: "#fff",
            backgroundRepeat: "no-repeat",
            backgroundSize: bg.size,
            backgroundPosition: bg.pos,
          }}
        >
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60" />
        </div>
      )}
    </div>
  );
}
