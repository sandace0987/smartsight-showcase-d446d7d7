import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import logoUrl from "@/assets/clear-sight-logo.avif";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white px-6 lg:px-10 pt-20 pb-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img
            src={logoUrl}
            alt="Clear Sight Opticians"
            className="h-16 w-auto mb-6 brightness-0 invert opacity-90"
          />
          <p className="text-white/60 max-w-sm leading-relaxed">
            The premier optical destination in Hyderabad — luxury frames, smart eyewear
            and clinical-grade eye care, fitted by experts.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" aria-label="Instagram" className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-electric hover:border-electric transition-colors">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-electric hover:border-electric transition-colors">
              <Twitter className="size-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-electric hover:border-electric transition-colors">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/brands" className="hover:text-electric">Brands</Link></li>
            <li><Link to="/smart-glasses" className="hover:text-electric">Smart Glasses</Link></li>
            <li><Link to="/offers" className="hover:text-electric">Offers</Link></li>
            <li><Link to="/stores" className="hover:text-electric">Store Locator</Link></li>
            <li><Link to="/about" className="hover:text-electric">About</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Kukatpally (KPHB) Flagship</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            Shop #4, Padmaja Complex,<br />
            JNTU Road, 6th Phase, KPHB,<br />
            Hyderabad - 500085
          </p>
          <p className="mt-3 text-sm text-white/70">
            Also at Nizampet &amp; Bowenpally · Open daily 10:00 AM – 9:30 PM
          </p>
          <a href="tel:+919440525789" className="mt-4 inline-block text-sm font-semibold text-white hover:text-electric">
            +91 94405 25789
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Clear Sight Opticians Private Limited.</p>
        <p className="font-serif italic">Vision, made personal.</p>
      </div>
    </footer>
  );
}
