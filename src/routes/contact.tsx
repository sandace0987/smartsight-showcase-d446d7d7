import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book Eye Test — Clear Sight Opticians" },
      { name: "description", content: "Book an eye test, smart glasses demo or styling consultation at Clear Sight Opticians, Hyderabad." },
      { property: "og:title", content: "Contact & Book — Clear Sight Opticians" },
      { property: "og:description", content: "Get in touch or reserve a private consultation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="px-6 lg:px-10 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-electric text-xs font-bold tracking-[0.22em] uppercase">Get In Touch</span>
        <h1 className="mt-3 text-5xl lg:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.02]">
          Book your eye test or smart glasses{" "}
          <span className="font-serif italic font-medium text-electric">demo.</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Call</h3>
              <a href="tel:+919440525789" className="text-2xl font-bold tracking-tight inline-flex items-center gap-3">
                <Phone className="size-5 text-electric" /> +91 94405 25789
              </a>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">WhatsApp</h3>
              <a href="https://wa.me/919440525789" className="text-2xl font-bold tracking-tight inline-flex items-center gap-3">
                <MessageCircle className="size-5 text-electric" /> Chat with us
              </a>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Email</h3>
              <a href="mailto:hello@clearsight.in" className="text-xl font-bold tracking-tight inline-flex items-center gap-3 break-all">
                <Mail className="size-5 text-electric" />
                <span>hello@clearsight.in</span>
              </a>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Main Address</h3>
              <p className="text-sm text-muted-foreground leading-relaxed inline-flex items-start gap-3">
                <MapPin className="size-5 text-electric mt-0.5" />
                Shop #4, Padmaja Complex, 6th Phase, JNTU Road, KPHB, Kukatpally, Hyderabad, Telangana
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Also at Nizampet &amp; Bowenpally · Open daily 10:00 AM – 9:30 PM
              </p>
            </div>
          </aside>

          <form className="lg:col-span-8 bg-secondary/60 border border-border rounded-3xl p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Full name</span>
              <input type="text" placeholder="Aarav Reddy" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Mobile</span>
              <input type="tel" placeholder="+91 …" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</span>
              <input type="email" placeholder="you@example.com" className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Preferred store</span>
              <select className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors">
                <option>Kukatpally (KPHB)</option>
                <option>Nizampet</option>
                <option>Bowenpally</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Reason</span>
              <select className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors">
                <option>Eye test</option>
                <option>Smart glasses demo</option>
                <option>Frame styling</option>
                <option>Contact lens fitting</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Notes</span>
              <textarea rows={4} placeholder="Tell us anything that would help us prepare." className="bg-transparent border-b border-border py-3 focus:outline-none focus:border-electric transition-colors resize-none" />
            </label>
            <button
              type="button"
              className="sm:col-span-2 mt-4 bg-electric text-white py-4 rounded-full font-bold tracking-[0.18em] uppercase text-xs hover:bg-ink transition-colors"
            >
              Request appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
