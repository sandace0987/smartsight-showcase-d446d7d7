import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", hash: undefined, label: "Home" },
  { to: "/", hash: "brands", label: "Brands" },
  { to: "/", hash: "smart-glasses", label: "Smart Glasses" },
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
        <div className="flex h-16 lg:h-20 items-center justify-between gap-6">
          {/* Search */}
          <div className="hidden md:flex flex-1 items-center">
            <label className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search eyewear, brands…"
                className="w-full pl-11 pr-4 py-2.5 bg-secondary border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:border-electric transition-colors"
              />
            </label>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-1 md:text-center group">
            <span className="text-[13px] lg:text-[15px] font-bold tracking-[0.18em] lg:tracking-[0.2em] uppercase whitespace-nowrap">
              Clear <span className="text-electric">Sight</span>{" "}
              <span className="text-muted-foreground font-medium">Opticians</span>
            </span>
          </Link>

          {/* Right */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-5">
            <a
              href="tel:+919999999999"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <Phone className="size-4" /> Call
            </a>
            <Link
              to="/contact"
              className="bg-electric text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ink transition-colors"
            >
              Book Eye Test
            </Link>
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
