import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Magnification applied on a click / double-tap zoom. */
  zoom?: number;
  /** Maximum scale reachable via wheel / pinch. */
  maxZoom?: number;
  trigger: React.ReactNode;
};

const EASE = "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)";

type Transform = { s: number; tx: number; ty: number };
const IDENTITY: Transform = { s: 1, tx: 0, ty: 0 };

/**
 * Click any image to open a fullscreen viewer.
 * - Click / double-tap to zoom in at that exact point (toggles back out).
 * - Scroll wheel / pinch to zoom continuously, anchored to the pointer.
 * - Drag to pan while zoomed.
 */
export function ZoomViewer({ src, alt, zoom = 3, maxZoom = 4, trigger }: Props) {
  const [open, setOpen] = React.useState(false);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState<Transform>(IDENTITY);
  const [animate, setAnimate] = React.useState(true);
  const [dragging, setDragging] = React.useState(false);

  // refs for live pointer/pinch handling
  const pointers = React.useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragStart = React.useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pinchStart = React.useRef<{ dist: number; s: number; cx: number; cy: number; tx: number; ty: number } | null>(null);
  const moved = React.useRef(false);

  React.useEffect(() => {
    if (!open) {
      setT(IDENTITY);
      setAnimate(true);
      pointers.current.clear();
      dragStart.current = null;
      pinchStart.current = null;
    }
  }, [open]);

  const stageRect = () => stageRef.current?.getBoundingClientRect();

  /** Clamp translation so the scaled image stays mostly within view. */
  const clamp = (next: Transform): Transform => {
    const rect = stageRect();
    if (!rect) return next;
    // allowable travel from center: half of the overflow on each axis.
    const maxX = (rect.width * (next.s - 1)) / 2;
    const maxY = (rect.height * (next.s - 1)) / 2;
    return {
      s: next.s,
      tx: Math.max(-maxX, Math.min(maxX, next.tx)),
      ty: Math.max(-maxY, Math.min(maxY, next.ty)),
    };
  };

  /** Zoom toward a point given in client coordinates. */
  const zoomToPoint = (clientX: number, clientY: number, nextScale: number, smooth: boolean) => {
    const rect = stageRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // pointer position relative to the stage center
    const px = clientX - cx;
    const py = clientY - cy;
    setAnimate(smooth);
    setT((prev) => {
      const ratio = nextScale / prev.s;
      // keep the pointed-at point stationary: t' = p - (p - t) * ratio
      return clamp({
        s: nextScale,
        tx: px - (px - prev.tx) * ratio,
        ty: py - (py - prev.ty) * ratio,
      });
    });
  };

  const reset = () => {
    setAnimate(true);
    setT(IDENTITY);
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
    const next = Math.max(1, Math.min(maxZoom, t.s * factor));
    zoomToPoint(e.clientX, e.clientY, next, false);
  };

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);
  const mid = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const m = mid(a, b);
      pinchStart.current = { dist: dist(a, b), s: t.s, cx: m.x, cy: m.y, tx: t.tx, ty: t.ty };
      dragStart.current = null;
    } else if (t.s > 1) {
      dragStart.current = { x: e.clientX, y: e.clientY, tx: t.tx, ty: t.ty };
      setDragging(true);
    }
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // pinch zoom
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const ps = pinchStart.current;
      const ratio = dist(a, b) / (ps.dist || 1);
      const next = Math.max(1, Math.min(maxZoom, ps.s * ratio));
      const rect = stageRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = ps.cx - cx;
      const py = ps.cy - cy;
      const r = next / ps.s;
      setAnimate(false);
      setT(clamp({ s: next, tx: px - (px - ps.tx) * r, ty: py - (py - ps.ty) * r }));
      moved.current = true;
      return;
    }

    // drag pan
    if (dragStart.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true;
      setAnimate(false);
      setT((prev) => clamp({ s: prev.s, tx: dragStart.current!.tx + dx, ty: dragStart.current!.ty + dy }));
    }
  };

  const endPointer: React.PointerEventHandler<HTMLDivElement> = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      // a tap with no drag toggles zoom at the pointed location
      if (!moved.current) {
        if (t.s > 1) reset();
        else zoomToPoint(e.clientX, e.clientY, zoom, true);
      }
      dragStart.current = null;
      setDragging(false);
    }
  };

  const stepZoom = (dir: 1 | -1) => {
    const rect = stageRect();
    const next = Math.max(1, Math.min(maxZoom, t.s * (dir === 1 ? 1.4 : 1 / 1.4)));
    if (rect) zoomToPoint(rect.left + rect.width / 2, rect.top + rect.height / 2, next, true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-w-[96vw] w-[96vw] h-[92vh] p-0 overflow-hidden border-none bg-ink/95 sm:rounded-2xl [&>button]:z-50 [&>button]:text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          ref={stageRef}
          className={cn(
            "relative h-full w-full touch-none select-none overflow-hidden",
            t.s > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          )}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          {/* checkerboard-free clean stage */}
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12">
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="max-h-full max-w-full object-contain"
              style={{
                transform: `translate3d(${t.tx}px, ${t.ty}px, 0) scale(${t.s})`,
                transition: animate ? EASE : "none",
                willChange: "transform",
              }}
            />
          </div>

          {/* controls */}
          <div className="pointer-events-auto absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/15">
            <ControlButton label="Zoom out" onClick={() => stepZoom(-1)} disabled={t.s <= 1}>
              <ZoomOut className="size-4" />
            </ControlButton>
            <span className="min-w-[3.25rem] text-center text-xs font-semibold tabular-nums text-white/90">
              {Math.round(t.s * 100)}%
            </span>
            <ControlButton label="Zoom in" onClick={() => stepZoom(1)} disabled={t.s >= maxZoom}>
              <ZoomIn className="size-4" />
            </ControlButton>
            <span className="mx-0.5 h-5 w-px bg-white/15" />
            <ControlButton label="Reset zoom" onClick={reset} disabled={t.s === 1 && t.tx === 0 && t.ty === 0}>
              <RotateCcw className="size-4" />
            </ControlButton>
          </div>

          <span className="pointer-events-none absolute left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            {t.s > 1 ? "Drag to pan · click to reset" : "Click image or scroll to zoom"}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ControlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
