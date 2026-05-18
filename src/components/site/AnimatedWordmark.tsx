import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Each style is a className applied to the word — different typographies / weights / casing
const STYLES = [
  "font-sans font-bold uppercase tracking-[0.2em]",
  "font-serif italic font-medium normal-case tracking-tight text-[1.15em]",
  "font-sans font-black uppercase tracking-[0.32em]",
  "font-serif font-semibold uppercase tracking-[0.1em]",
  "font-mono font-medium lowercase tracking-tight",
  "font-serif italic font-light normal-case tracking-wide text-[1.2em]",
  "font-sans font-extralight uppercase tracking-[0.4em]",
];

const CASINGS = [
  (s: string) => s.toUpperCase(),
  (s: string) => s.toLowerCase(),
  (s: string) => s,
  (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
];

function ShufflingWord({
  word,
  interval,
  className,
  delay = 0,
}: {
  word: string;
  interval: number;
  className?: string;
  delay?: number;
}) {
  const [i, setI] = useState(0);
  const [c, setC] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    // Randomize after mount to avoid SSR/CSR hydration mismatch
    setI(Math.floor(Math.random() * STYLES.length));
    setC(Math.floor(Math.random() * CASINGS.length));
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setFlip(true);
        setTimeout(() => {
          setI((p) => (p + 1 + Math.floor(Math.random() * (STYLES.length - 1))) % STYLES.length);
          setC((p) => (p + 1) % CASINGS.length);
          setFlip(false);
        }, 180);
      }, interval);
    }, delay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [interval, delay]);

  return (
    <span
      suppressHydrationWarning
      className={cn(
        "inline-block transition-all duration-200 ease-out will-change-transform",
        flip ? "opacity-0 -translate-y-1 blur-[2px]" : "opacity-100 translate-y-0 blur-0",
        STYLES[i],
        className,
      )}
      style={{ minWidth: "1ch" }}
    >
      {CASINGS[c](word)}
    </span>
  );
}

export function AnimatedWordmark() {
  return (
    <span className="text-[13px] lg:text-[15px] whitespace-nowrap inline-flex items-baseline gap-2">
      <ShufflingWord word="Clear" interval={2200} delay={0} />
      <ShufflingWord word="Sight" interval={1700} delay={400} className="text-electric" />
      <ShufflingWord word="Opticians" interval={2900} delay={900} className="text-muted-foreground" />
    </span>
  );
}
