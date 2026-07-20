import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { type GlassItem } from "@/lib/brand-catalog";
import { GlassSilhouette } from "@/components/site/GlassSilhouette";
import { EnquireDialog } from "@/components/site/EnquireDialog";
import { ProductDialog } from "@/components/site/ProductDialog";
import { useImageDominantColor } from "@/hooks/useImageDominantColor";
import { GLOBAL_PROMO } from "@/lib/promo-config";

export function ModelCard({ m, index, brandName }: { m: GlassItem; index: number; brandName: string }) {
  const hasVariants = !!m.variants && m.variants.length > 0;
  const [variantId, setVariantId] = React.useState(m.variants?.[0].id ?? "");
  const [open, setOpen] = React.useState(false);
  const variant = m.variants?.find((v) => v.id === variantId) ?? m.variants?.[0];
  const collection =
    brandName === "Prada" ? (m.model.includes("Linea Rossa") ? "Linea Rossa" : "Milano") : null;

  const imageSrc = m.image || variant?.images.front;
  const { color } = useImageDominantColor(imageSrc);

  const isZeiss = brandName.toLowerCase() === "zeiss";

  return (
    <article
      className={`group relative bg-secondary/60 border border-border rounded-3xl p-7 flex flex-col h-full ${
        hasVariants ? "cursor-pointer" : ""
      }`}
      onClick={hasVariants ? () => setOpen(true) : undefined}
      role={hasVariants ? "button" : undefined}
      tabIndex={hasVariants ? 0 : undefined}
      onKeyDown={
        hasVariants
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }
          : undefined
      }
      aria-label={hasVariants ? `View ${m.model} details` : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5 items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            0{index + 1}
          </span>
          {isZeiss && (
            <span className="inline-flex items-center gap-1 rounded-full bg-electric/10 border border-electric/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-electric">
              {GLOBAL_PROMO.badgeText}
            </span>
          )}
        </div>
        {m.is_hot ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-700/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/95">
            Selling fast
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-electric">{m.shape}</span>
        )}
      </div>

      {m.image ? (
        <div
          className="my-7 block overflow-hidden rounded-2xl h-36"
          style={{ backgroundColor: color, transition: "background-color 0.4s ease" }}
        >
          <img
            src={m.image}
            alt={`${brandName} ${m.model}`}
            width={900}
            height={320}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ) : hasVariants && variant ? (
        <>
          <div
            className="my-7 block overflow-hidden rounded-2xl p-4"
            style={{ backgroundColor: color, transition: "background-color 0.4s ease" }}
          >
            <div className="flex items-center justify-center h-28">
              <img
                src={variant.images.front}
                alt={`${brandName} ${m.model} — ${variant.name}`}
                width={900}
                height={320}
                loading="lazy"
                className="max-h-full max-w-full w-auto object-contain"
              />
            </div>
          </div>
          <ProductDialog
            brand={brandName}
            model={m.model}
            priceFrom={m.priceFrom}
            variants={m.variants!}
            open={open}
            onOpenChange={setOpen}
          />
        </>
      ) : (
        <div className="my-8 flex items-center justify-center h-28 text-foreground/85 group-hover:text-electric transition-colors">
          <GlassSilhouette shape={m.shape} className="w-full max-w-[220px] h-auto" />
        </div>
      )}

      <h3 className="text-xl font-bold tracking-tight">{m.model}</h3>
      <p className="text-xs text-muted-foreground mt-1 font-serif italic">
        {hasVariants && variant ? variant.name : m.colour}
        {collection ? ` · ${collection}` : ""}
      </p>

      {m.priceFrom != null && (
        <p className="text-sm font-semibold mt-3">From ₹{m.priceFrom.toLocaleString("en-IN")}</p>
      )}

      {hasVariants && m.variants!.length > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {m.variants!.map((v) => (
            <span
              key={v.id}
              className={`inline-flex rounded-full p-0.5 transition-all ${
                v.id === variantId
                  ? "ring-2 ring-electric ring-offset-1 ring-offset-secondary"
                  : "ring-1 ring-border"
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setVariantId(v.id);
                }}
                aria-label={v.name}
                title={v.name}
                className="size-5 rounded-full block overflow-hidden"
                style={{
                  background: v.swatch,
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            </span>
          ))}
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <EnquireDialog
          brand={brandName}
          model={m.model}
          colour={hasVariants && variant ? variant.name : undefined}
          trigger={
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-electric transition-colors">
              Enquire <ArrowUpRight className="size-3.5" />
            </button>
          }
        />
      </div>
    </article>
  );
}
