import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomViewer } from "@/components/motion/ZoomViewer";
import { HoverLens } from "@/components/motion/HoverLens";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { ArrowUpRight } from "lucide-react";
import type { ColorVariant } from "@/lib/brand-catalog";

type Props = {
  brand: string;
  model: string;
  priceFrom: number;
  variants: ColorVariant[];
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ORIENTATIONS: Array<{ key: keyof ColorVariant["images"]; label: string }> = [
  { key: "front", label: "Front" },
  { key: "quarter", label: "Angle" },
  { key: "side", label: "Side" },
];

export function ProductDialog({ brand, model, priceFrom, variants, trigger, open, onOpenChange }: Props) {
  const [variantId, setVariantId] = React.useState(variants[0].id);
  const [view, setView] = React.useState<keyof ColorVariant["images"]>("front");

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  return (
    // Stop synthetic click events from Radix's portal bubbling up the React tree
    // to a clickable parent (which would instantly re-open the dialog on close).
    <span onClick={(e) => e.stopPropagation()}>
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl sm:rounded-2xl p-0 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="bg-white p-6 flex flex-col gap-4">
            <ZoomViewer
              src={variant.images[view]}
              alt={`${brand} ${model} — ${variant.name}, ${view} view`}
              trigger={
                <button
                  type="button"
                  aria-label="Hover to magnify · click for fullscreen zoom"
                  className="aspect-[3/2] block w-full overflow-hidden rounded-lg"
                >
                  <HoverLens
                    src={variant.images[view]}
                    alt={`${brand} ${model} — ${variant.name}, ${view} view`}
                    width={900}
                    height={320}
                    className="h-full w-full flex items-center justify-center"
                    imgClassName="max-h-full"
                  />
                </button>
              }
            />
            <div className="flex items-center justify-center gap-3">
              {ORIENTATIONS.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setView(o.key)}
                  aria-label={o.label}
                  className={`w-20 h-14 rounded-lg border bg-white p-1 transition-colors ${
                    view === o.key ? "border-electric" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <img src={variant.images[o.key]} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-7 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric">{brand}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter">{model}</h2>
            <p className="mt-3 text-lg font-semibold">₹{priceFrom.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">GST included</p>

            <div className="mt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Colour</span>
              <div className="mt-2 flex items-center gap-3">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    aria-label={v.name}
                    title={v.name}
                    className={`size-8 rounded-full border transition-all ${
                      v.id === variantId ? "ring-2 ring-electric ring-offset-2 ring-offset-background border-transparent" : "border-border"
                    }`}
                    style={{ background: v.swatch }}
                  />
                ))}
              </div>
            </div>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-4">
                <dt className="w-24 text-muted-foreground">Frame</dt>
                <dd className="font-medium">{variant.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 text-muted-foreground">Lens</dt>
                <dd className="font-medium">{variant.lens}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-8">
              <EnquireDialog
                brand={brand}
                model={model}
                colour={variant.name}
                trigger={
                  <button className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
                    Enquire <ArrowUpRight className="size-3.5" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
