import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsTouch, useReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function TiltCard({ children, className, max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 16 });
  const sy = useSpring(my, { stiffness: 180, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const disabled = touch || reduced;

  const handleMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        disabled
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
      }
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
