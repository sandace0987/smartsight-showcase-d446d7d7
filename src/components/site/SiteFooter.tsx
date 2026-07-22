import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import logoUrl from "@/assets/miscellaneous/clear-sight-logo.avif";
import { CONTACT_PHONE, CONTACT_PHONE_RAW, DEVELOPER_EMAIL } from "@/lib/contact-config";

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
            The premier optical destination in Hyderabad — luxury frames, AI eyewear
            and clinical-grade eye care, fitted by experts.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.instagram.com/clearsight.official?igsh=MTg2OXFwZDJtZ3B6NA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-electric hover:border-electric transition-colors"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://www.facebook.com/clearsight.official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-electric hover:border-electric transition-colors"
            >
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/brands" className="hover:text-electric">Brands</Link></li>
            <li><Link to="/ai-glasses" className="hover:text-electric">AI Glasses</Link></li>
            <li><Link to="/stores" className="hover:text-electric">Store Locator</Link></li>
            <li><Link to="/about" className="hover:text-electric">About</Link></li>
          </ul>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-3 mt-8">Legal</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-electric">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-electric">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Kukatpally (KPHB) Flagship</p>
          <p className="text-sm text-white/70 leading-relaxed">
            Shop #4, Padmaja Complex,<br />
            JNTU Road, 6th Phase, KPHB,<br />
            Hyderabad - 500085
          </p>
          <p className="mt-3 text-sm text-white/70">
            Also at Nizampet &amp; Bowenpally · Open daily 9:00 AM – 9:30 PM
          </p>
          <a href={`tel:+${CONTACT_PHONE_RAW}`} className="mt-4 inline-block text-sm font-semibold text-white hover:text-electric">
            {CONTACT_PHONE}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Clear Sight Opticians Private Limited.</p>
        <p>
          made with ❤️ by{" "}
          <a
            href={`mailto:${DEVELOPER_EMAIL}`}
            className="hover:text-electric transition-colors underline decoration-dotted"
          >
            skb
          </a>
        </p>
        <p className="font-serif italic">Vision, made personal.</p>
      </div>
    </footer>
  );
}
