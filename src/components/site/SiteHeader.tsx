import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedWordmark } from "./AnimatedWordmark";
import { ThemeSwatches } from "./ThemeSwatches";
import { BookingModal } from "./BookingModal";
import logoUrl from "@/assets/miscellaneous/clear-sight-logo.avif";
import { CONTACT_PHONE_RAW } from "@/lib/contact-config";
import { GLOBAL_PROMO } from "@/lib/promo-config";

type NavItem = { to: string; hash?: string; label: string; subroute?: string };

const NAV: NavItem[] = [
  { to: "/", hash: undefined, label: "Home", subroute: "/" },
  { to: "/", hash: "ai-glasses", label: "AI Glasses", subroute: "/ai-glasses" },
  { to: "/", hash: "brands", label: "Brands", subroute: "/brands" },
  { to: "/", hash: "try-on", label: "Try On" },
  { to: "/", hash: "stores", label: "Stores", subroute: "/stores" },
  { to: "/", hash: "about", label: "About", subroute: "/about" },
  { to: "/", hash: "contact", label: "Contact Us" },
];

const SECTION_IDS = NAV.filter((n) => n.hash).map((n) => n.hash as string);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingReason, setBookingReason] = useState("Eye test");
  const { location } = useRouterState();
  const router = useRouter();
  const [showPromo, setShowPromo] = useState(true);

  // Dismiss the scrolling promotion ribbon for the current page view (not persisted across reloads)
  const handleDismissPromo = () => {
    setShowPromo(false);
  };

  useEffect(() => setOpen(false), [location.pathname]);

  // Scrollspy — highlight the nav item for the section currently in view
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(undefined);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 360) {
        setActiveSection(undefined);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // Top of page → no section highlighted ("Home")
        if (window.scrollY < 360) {
          setActiveSection(undefined);
          return;
        }
        let best: string | undefined;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActiveSection(best);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleNavClick = (item: NavItem) => (e: React.MouseEvent) => {
    if (location.pathname !== "/") {
      if (item.label.includes("Contact") || item.hash === "contact") {
        e.preventDefault();
        setBookingReason("Eye test");
        setBookingOpen(true);
        setOpen(false);
        return;
      }
      if (item.subroute) {
        e.preventDefault();
        router.navigate({ to: item.subroute });
      } else if (item.hash) {
        sessionStorage.setItem("scrollTargetSection", item.hash);
      }
      setOpen(false);
      return;
    }

    e.preventDefault();
    if (!item.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(item.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  const handleBookTestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookingReason("Eye test");
    setBookingOpen(true);
    setOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative flex h-20 lg:h-24 items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Clear Sight Opticians"
            className="relative inline-flex items-center justify-start shrink-0 h-[70px] lg:h-[80px] w-[180px] lg:w-[220px] overflow-hidden"
          >
            {/* Base Logo: Normal in light mode, dimmed in dark mode */}
            <img
              src={logoUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-contain shrink-0 transition-opacity duration-300 dark:opacity-50"
            />

            {/* Illuminated Overlay: Sweeping spotlight/torch in dark mode only, using original colors */}
            <img
              src={logoUrl}
              alt="Clear Sight Opticians"
              className="absolute inset-0 h-full w-full object-contain shrink-0 hidden dark:block brightness-[1.8] saturate-[1.5] contrast-[1.1] drop-shadow-[0_0_20px_rgba(255,255,255,1)] drop-shadow-[0_0_40px_rgba(255,255,255,0.95)] dark-torch-mask"
            />
          </Link>

          {/* Wordmark — absolutely centered on desktop only */}
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Clear Sight Opticians home"
            className="hidden md:inline-flex absolute left-1/2 -translate-x-1/2 items-center"
          >
            <AnimatedWordmark />
          </Link>

          {/* Desktop right */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">
            <a
              href={`tel:+${CONTACT_PHONE_RAW}`}
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Phone className="size-4" /> Call
            </a>
            <button
              type="button"
              onClick={handleBookTestClick}
              className="bg-electric text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ink transition-colors"
            >
              Book Eye Test
            </button>
            <ThemeSwatches />
          </div>

          {/* Mobile right cluster */}
          <div className="md:hidden flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleBookTestClick}
              aria-label="Book Eye Test"
              className="inline-flex size-9 items-center justify-center rounded-full bg-electric text-white hover:bg-ink transition-colors"
            >
              <CalendarCheck className="size-4" />
            </button>
            <ThemeSwatches />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile wordmark strip */}
        <div className="md:hidden flex justify-center border-t border-border/60 py-2">
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Clear Sight Opticians home"
            className="inline-flex items-center"
          >
            <AnimatedWordmark />
          </Link>
        </div>

        {/* Secondary nav */}
        <nav className="hidden md:flex justify-center gap-8 lg:gap-10 pb-3 -mt-1 text-[12px] font-medium uppercase tracking-[0.18em]">
          {NAV.map((item) => {
            const isActive =
              location.pathname === "/"
                ? item.hash ? item.hash === activeSection : activeSection === undefined
                : item.subroute ? location.pathname === item.subroute : false;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={handleNavClick(item)}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-electric font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-t border-border/60",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="px-6 py-5 flex flex-col gap-2">
          {NAV.map((item) => {
            const isActive =
              location.pathname === "/"
                ? item.hash ? item.hash === activeSection : activeSection === undefined
                : item.subroute ? location.pathname === item.subroute : false;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={handleNavClick(item)}
                className={cn(
                  "py-3 px-2 -mx-2 text-sm font-medium",
                  isActive ? "text-electric font-bold" : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleBookTestClick}
            className="mt-2 text-center bg-electric text-white px-5 py-3 rounded-full text-sm font-semibold"
          >
            Book Eye Test
          </button>
        </nav>
      </div>

      {location.pathname === "/" && showPromo && (
        <div className="relative w-full bg-electric text-white py-2 overflow-hidden select-none border-t border-border/20 text-[10px] font-bold uppercase tracking-[0.25em]">
          <div className="w-full overflow-hidden pr-10 sm:pr-12">
            <div className="animate-[marquee_60s_linear_infinite] inline-flex gap-8 whitespace-nowrap">
              <span>{GLOBAL_PROMO.text}</span>
              <span>✦</span>
              <span>Free ZEISS Global Certified Eye Test</span>
              <span>✦</span>
              <span>{GLOBAL_PROMO.text}</span>
              <span>✦</span>
              <span>Free ZEISS Global Certified Eye Test</span>
              <span>✦</span>
              {/* Duplicate for seamless looping marquee */}
              <span>{GLOBAL_PROMO.text}</span>
              <span>✦</span>
              <span>Free ZEISS Global Certified Eye Test</span>
              <span>✦</span>
              <span>{GLOBAL_PROMO.text}</span>
              <span>✦</span>
              <span>Free ZEISS Global Certified Eye Test</span>
              <span>✦</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismissPromo}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/25 hover:bg-black/40 p-1.5 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-white/50"
            aria-label="Dismiss promotion banner"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultReason={bookingReason}
      />
    </header>
  );
}

