import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Send } from "lucide-react";

const SHOP_WHATSAPP = "919440525789"; // shop number, digits only, country code first

type Props = {
  brand: string;
  model: string;
  colour?: string;
  trigger: React.ReactNode;
};

export function EnquireDialog({ brand, model, colour: initialColour, trigger }: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [size, setSize] = React.useState("Medium");
  const [colour, setColour] = React.useState(initialColour ?? "");
  const [prescription, setPrescription] = React.useState("No");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (initialColour) setColour(initialColour);
  }, [initialColour]);



  const buildMessage = (withDetails: boolean) => {
    if (!withDetails) {
      return `Hi Clear Sight Opticians, I'd like to enquire about the ${brand} — ${model}.`;
    }
    return [
      `Hi Clear Sight Opticians, I'd like to enquire about:`,
      `Brand: ${brand}`,
      `Model: ${model}`,
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      `Size: ${size}`,
      colour && `Colour: ${colour}`,
      `Prescription: ${prescription}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean).join("\n");
  };

  const openWhatsApp = (withDetails: boolean) => {
    const url = `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(buildMessage(withDetails))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg sm:rounded-2xl">
        <DialogHeader className="pr-28">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Enquire — {brand}
            <span className="block text-xs font-medium uppercase tracking-[0.22em] text-electric mt-1">{model}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Call now — top right (left of close X) */}
        <button
          type="button"
          onClick={() => openWhatsApp(false)}
          className="absolute right-12 top-4 inline-flex items-center gap-1.5 bg-electric text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] hover:opacity-90 transition"
          aria-label="Call now via WhatsApp"
        >
          <Phone className="size-3.5" /> Call now
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors" />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value)} className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Colour</span>
            <input value={colour} onChange={(e) => setColour(e.target.value)} placeholder="Black, Tortoise…" className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors" />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Prescription needed?</span>
            <select value={prescription} onChange={(e) => setPrescription(e.target.value)} className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors">
              <option>No</option>
              <option>Yes — single vision</option>
              <option>Yes — progressive</option>
              <option>Yes — reading</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Notes</span>
            <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else we should know?" className="bg-transparent border-b border-border py-2 focus:outline-none focus:border-electric transition-colors resize-none" />
          </label>
        </div>

        <button
          type="button"
          onClick={() => openWhatsApp(true)}
          className="mt-4 inline-flex items-center justify-center gap-2 bg-ink text-white py-3.5 rounded-full font-bold tracking-[0.18em] uppercase text-xs hover:bg-electric transition-colors"
        >
          <Send className="size-4" /> Enquire now
        </button>
      </DialogContent>
    </Dialog>
  );
}
