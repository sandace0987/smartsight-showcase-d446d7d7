import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import f01 from "@/assets/smart-seq/01.jpg";
import f02 from "@/assets/smart-seq/02.jpg";
import f03 from "@/assets/smart-seq/03.jpg";
import f04 from "@/assets/smart-seq/04.jpg";
import f05 from "@/assets/smart-seq/05.jpg";
import f06 from "@/assets/smart-seq/06.jpg";
import f07 from "@/assets/smart-seq/07.jpg";
import f08 from "@/assets/smart-seq/08.jpg";
import f09 from "@/assets/smart-seq/09.jpg";
import f10 from "@/assets/smart-seq/10.jpg";
import f11 from "@/assets/smart-seq/11.jpg";
import f12 from "@/assets/smart-seq/12.jpg";

const FRAMES = [f01, f02, f03, f04, f05, f06, f07, f08, f09, f10, f11, f12];
const clamp = (v: number, mn = 0, mx = 1) => Math.min(mx, Math.max(mn, v));

export function SmartGlassesScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    let count = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        count++;
        if (count === FRAMES.length) setLoaded(true);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = -rect.top;
        setProgress(clamp(scrolled / total));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Map progress to a fractional frame index for crossfading
  const frameFloat = progress * (FRAMES.length - 1);
  const currentIdx = Math.floor(frameFloat);
  const nextIdx = Math.min(currentIdx + 1, FRAMES.length - 1);
  const blend = frameFloat - currentIdx;

  // Tagline appears at the end
  const taglineOpacity = clamp((progress - 0.88) / 0.1);

  return (
    <section
      id="smart"
      ref={wrapRef}
      className="relative bg-background"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a1f2e]">
        {/* Eyebrow */}
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-20">
          <span className="text-electric text-[11px] font-bold tracking-[0.28em] uppercase">
            Smart Glasses · Ray-Ban Meta
          </span>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20 text-[10px] font-semibold tracking-[0.28em] uppercase text-white/50 transition-opacity duration-500"
          style={{ opacity: progress < 0.05 ? 1 : 0 }}
        >
          Scroll to unbox ↓
        </div>

        {/* Frame stack */}
        <div className="absolute inset-0">
          {loaded ? (
            <>
              <img
                src={FRAMES[currentIdx]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 1 }}
                draggable={false}
              />
              <img
                src={FRAMES[nextIdx]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: blend }}
                draggable={false}
              />
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40 text-xs tracking-widest uppercase">
              Loading…
            </div>
          )}
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>

        {/* Final tagline overlay */}
        <div
          className="absolute inset-x-0 bottom-0 pb-16 lg:pb-24 px-6 lg:px-10 text-center pointer-events-none"
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineOpacity) * 20}px)`,
          }}
        >
          <h3 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            Live{" "}
            <span className="font-serif italic font-medium text-electric">
              smarter.
            </span>
          </h3>
          <p className="mt-4 text-white/70 text-sm sm:text-base max-w-md mx-auto">
            Ray-Ban Meta &amp; Oakley Meta — fitted in our Hyderabad studios.
          </p>
          <Link
            to="/smart-glasses"
            className="mt-7 inline-flex items-center gap-2 bg-electric text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-electric transition-colors pointer-events-auto"
          >
            Explore Smart Glasses <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-electric transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
