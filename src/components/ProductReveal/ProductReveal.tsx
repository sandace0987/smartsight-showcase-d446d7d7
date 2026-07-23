// ProductReveal.tsx — High-performance looping video reveal section

"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BookingModal } from "@/components/site/BookingModal";
import type { ProductRevealProps, TextCue } from "./types";

interface TextOverlayProps {
  cue: TextCue;
  onBookDemo: () => void;
}

const TextOverlay: FC<TextOverlayProps> = ({ cue, onBookDemo }) => {
  const lines = cue.headline.split("\n");

  return (
    <motion.div
      key={cue.eyebrow ?? cue.headline.slice(0, 20)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 bottom-8 sm:bottom-12 flex flex-col items-center text-center px-6 z-20"
    >
      {cue.eyebrow && (
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-electric mb-3 opacity-90">
          {cue.eyebrow}
        </span>
      )}

      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-white max-w-3xl drop-shadow-md">
        {lines.map((line, i) =>
          i % 2 === 0 ? (
            <span key={i} className="block">
              {line}
            </span>
          ) : (
            <span
              key={i}
              className="block font-serif italic font-normal text-white/80"
            >
              {line}
            </span>
          )
        )}
      </h2>

      {cue.body && (
        <p className="mt-4 text-xs sm:text-base text-white/70 max-w-sm sm:max-w-md leading-relaxed">
          {cue.body}
        </p>
      )}

      {cue.showCTA && (
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6">
          <Link
            to="/ai-glasses"
            className="bg-white text-black px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric hover:text-white transition-colors shadow-lg"
          >
            Shop Collection
          </Link>
          <button
            type="button"
            onClick={onBookDemo}
            className="border border-white/30 bg-black/40 backdrop-blur-sm text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Book Free Demo
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const ProductReveal: FC<ProductRevealProps> = ({
  textTimeline,
  id = "smart-glasses",
}) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCueIndex, setActiveCueIndex] = useState(0);

  useEffect(() => {
    if (!textTimeline || textTimeline.length <= 1) return;
    const interval = setInterval(() => {
      setActiveCueIndex((prev) => (prev + 1) % textTimeline.length);
    }, 3600); // 3.6s per text cue
    return () => clearInterval(interval);
  }, [textTimeline]);

  const activeCue = textTimeline[activeCueIndex] || textTimeline[0];

  return (
    <section
      id={id}
      className="relative scroll-mt-24 px-4 sm:px-8 my-8 sm:my-14"
    >
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl h-[55vh] sm:h-[70vh] max-h-[720px] min-h-[460px] flex items-center justify-center">
        {/* Ambient background blur glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 opacity-30 blur-3xl z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,71,255,0.35), rgba(0,0,0,0) 70%)",
          }}
        />

        {/* ── Looping Background Video ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="relative z-10 w-full h-full object-contain md:object-cover transition-all duration-300"
        >
          <source src="/videos/smart-glasses-reveal.webm" type="video/webm" />
          <source src="/videos/smart-glasses-reveal.mp4" type="video/mp4" />
        </video>

        {/* Dark subtle gradient overlay over video for readable text */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 z-10 pointer-events-none"
        />

        {/* ── Section Header Badge ── */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          <span className="text-white text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase bg-white/10 border border-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-sm">
            Meta AI Eyewear
          </span>
          <Link
            to="/ai-glasses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white border-b-2 border-white/80 pb-0.5 tracking-[0.2em] uppercase hover:text-electric hover:border-electric transition-colors"
          >
            Explore All
          </Link>
        </div>

        {/* ── Auto-cycling Text Overlay ── */}
        <AnimatePresence mode="wait">
          {activeCue && (
            <TextOverlay
              key={activeCueIndex}
              cue={activeCue}
              onBookDemo={() => setBookingOpen(true)}
            />
          )}
        </AnimatePresence>

        {/* Indicator dots for active text cue */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
          {textTimeline.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === activeCueIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultReason="AI glasses demo"
      />
    </section>
  );
};
