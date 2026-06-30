import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedWordmark } from "./AnimatedWordmark";
import { ThemeToggle } from "./ThemeToggle";
import logoUrl from "@/assets/clear-sight-logo.avif";

const NAV = [
  { to: "/", hash: undefined, label: "Home" },
  { to: "/", hash: "brands", label: "Brands" },
  { to: "/", hash: "smart-glasses", label: "Smart Glasses" },
  { to: "/", hash: "try-on", label: "Try On" },
  { to: "/", hash: "offers", label: "Offers" },
  { to: "/", hash: "stores", label: "Stores" },
  { to: "/", hash: "about", label: "About" },
  { to: "/", hash: "contact", label: "Contact" },
] as const;

const SECTION_IDS = NAV.filter((n) => n.hash).map((n) => n.hash as string);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const { location } = useRouterState();

  useEffect(() => setOpen(false), [location.pathname]);

  // Scrollspy — highlight the nav item for the section currently in view
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(undefined);
      return;
    }
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // Top of page → no section highlighted ("Home")
        if (window.scrollY < 120) {
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
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleHashClick = (hash: string | undefined) => (e: React.MouseEvent) => {
    if (location.pathname !== "/") return; // let router handle cross-route nav
    if (!hash) {
      // "Home" — scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
      return;
    }
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative flex h-16 lg:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Logo mark — left */}
          <Link to="/" aria-label="Clear Sight Opticians" className="inline-flex items-center justify-start shrink-0">
            <img
              src={logoUrl}
              alt="Clear Sight Opticians"
              className="h-8 lg:h-10 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Wordmark — absolutely centered on desktop only */}
          <Link
            to="/"
            aria-label="Clear Sight Opticians home"
            className="hidden md:inline-flex absolute left-1/2 -translate-x-1/2 items-center"
          >
            <AnimatedWordmark />
          </Link>

          {/* Desktop right */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">
            <a
              href="tel:+919440525789"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Phone className="size-4" /> Call
            </a>
            <Link
              to="/contact"
              className="bg-electric text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ink transition-colors"
            >
              Book Eye Test
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile right cluster */}
          <div className="md:hidden flex items-center gap-1.5 shrink-0">
            <Link
              to="/contact"
              aria-label="Book Eye Test"
              className="inline-flex size-9 items-center justify-center rounded-full bg-electric text-white hover:bg-ink transition-colors"
            >
              <CalendarCheck className="size-4" />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile wordmark strip */}
        <div className="md:hidden flex justify-center border-t border-border/60 py-2">
          <Link to="/" aria-label="Clear Sight Opticians home" className="inline-flex items-center">
            <AnimatedWordmark />
          </Link>
        </div>

        {/* Secondary nav */}
        <nav className="hidden md:flex justify-center gap-8 lg:gap-10 pb-3 -mt-1 text-[12px] font-medium uppercase tracking-[0.18em]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={handleHashClick(item.hash)}
              activeOptions={{ exact: true, includeHash: true }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-electric" }}
            >
              {item.label}
            </Link>
          ))}
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
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={handleHashClick(item.hash)}
              activeOptions={{ exact: true, includeHash: true }}
              className="py-2 text-sm font-medium text-foreground/80"
              activeProps={{ className: "text-electric" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 text-center bg-electric text-white px-5 py-3 rounded-full text-sm font-semibold"
          >
            Book Eye Test
          </Link>
        </nav>
      </div>
    </header>
  );
}
