import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT_PHONE_RAW } from "@/lib/contact-config";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
};

export function BookingModal({ isOpen, onClose, defaultReason = "Eye test" }: BookingModalProps) {
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [store, setStore] = React.useState("Kukatpally (KPHB)");
  const [reason, setReason] = React.useState(defaultReason);
  const [notes, setNotes] = React.useState("");

  // Update default reason whenever modal opens or defaultReason changes
  React.useEffect(() => {
    if (isOpen) {
      setReason(defaultReason);
    }
  }, [isOpen, defaultReason]);

  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Handle browser back button when modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    let hasPushed = false;
    if (!window.history.state?.bookingModalOpen) {
      window.history.pushState({ bookingModalOpen: true }, "");
      hasPushed = true;
    }

    const handlePopState = () => {
      onCloseRef.current();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (hasPushed && window.history.state?.bookingModalOpen) {
        window.history.back();
      }
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hi Clear Sight Opticians, I'd like to book an appointment:`,
      name && `Name: ${name}`,
      mobile && `Mobile: ${mobile}`,
      email && `Email: ${email}`,
      `Preferred Store: ${store}`,
      `Reason: ${reason}`,
      notes && `Notes: ${notes}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl sm:rounded-3xl p-6 sm:p-8">
        <DialogHeader className="pr-20">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Book Appointment
            <span className="block text-xs font-medium uppercase tracking-[0.22em] text-electric mt-1">
              Clear Sight Opticians
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Call now badge */}
        <a
          href={`tel:+${CONTACT_PHONE_RAW}`}
          className="absolute right-12 top-6 inline-flex items-center gap-1.5 bg-electric text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-ink transition-colors"
          aria-label="Call store now"
        >
          <Phone className="size-3.5" /> Call
        </a>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Full name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name..."
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Mobile
            </span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91 …"
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Preferred store
            </span>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors"
            >
              <option className="bg-card text-foreground">Kukatpally (KPHB)</option>
              <option className="bg-card text-foreground">Nizampet</option>
              <option className="bg-card text-foreground">Bowenpally</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Reason
            </span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors"
            >
              <option className="bg-card text-foreground">Eye test</option>
              <option className="bg-card text-foreground">AI glasses demo</option>
              <option className="bg-card text-foreground">Glasses Service &amp; Repairs</option>
              <option className="bg-card text-foreground">Kids Eyewear &amp; Myopia Care</option>
              <option className="bg-card text-foreground">Frame styling</option>
              <option className="bg-card text-foreground">Contact lens fitting</option>
              <option className="bg-card text-foreground">Something else</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Notes
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us anything that would help us prepare."
              className="bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-electric transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            className="sm:col-span-2 mt-3 inline-flex items-center justify-center gap-2 bg-electric text-white py-3.5 rounded-full font-bold tracking-[0.18em] uppercase text-xs hover:bg-ink transition-colors"
          >
            <MessageCircle className="size-4" /> Send via WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
