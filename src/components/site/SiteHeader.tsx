import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative flex h-16 lg:h-20 items-center justify-between gap-6">
          {/* Logo mark — left */}
          <Link to="/" aria-label="Clear Sight Opticians" className="flex-1 inline-flex items-center justify-start">
            <img
              src={logoUrl}
              alt="Clear Sight Opticians"
              className="h-8 lg:h-10 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Wordmark — absolutely centered */}
          <Link
            to="/"
            aria-label="Clear Sight Opticians home"
            className="hidden md:inline-flex absolute left-1/2 -translate-x-1/2 items-center"
          >
            <AnimatedWordmark />
          </Link>

          {/* Right */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">
            <a
              href="tel:+919999999999"
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

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Secondary nav */}
        <nav className="hidden md:flex justify-center gap-8 lg:gap-10 pb-3 -mt-1 text-[12px] font-medium uppercase tracking-[0.18em]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
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
