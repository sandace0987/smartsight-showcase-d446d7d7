import { useState } from "react";
import { Play, X } from "lucide-react";
import eyeTest from "@/assets/eye-test.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function FloatingVideoCard() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="hidden md:flex fixed bottom-28 right-6 lg:bottom-28 lg:right-8 z-40 bg-card text-card-foreground p-4 rounded-2xl shadow-2xl gap-4 items-center max-w-xs animate-[fade-up_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_both] border border-border/60">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play how it works video"
          className="size-20 rounded-xl bg-secondary overflow-hidden relative shrink-0 group cursor-pointer"
        >
          <img
            src={eyeTest}
            alt="Eye testing equipment"
            width={200}
            height={200}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-9 bg-background/95 rounded-full grid place-items-center shadow-md transition-transform group-hover:scale-110">
              <Play className="size-4 text-foreground fill-foreground ml-0.5" />
            </div>
          </div>
        </button>
        <div className="min-w-0">
          <h4 className="font-bold text-sm mb-1 text-foreground">See How It Works</h4>
          <p className="text-[11px] text-muted-foreground leading-snug mb-2">
            Advanced digital eye testing across all branches.
          </p>
          <div className="flex -space-x-2">
            <div className="size-6 rounded-full border-2 border-card bg-electric" />
            <div className="size-6 rounded-full border-2 border-card bg-secondary" />
            <div className="size-6 rounded-full border-2 border-card bg-foreground" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 size-6 rounded-full bg-foreground text-background grid place-items-center shadow-md hover:bg-electric hover:text-white transition-colors"
        >
          <X className="size-3" />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-ink text-white">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-white text-2xl font-bold tracking-tight">
              See How It Works
            </DialogTitle>
            <DialogDescription className="text-white/60">
              A short look inside our digital eye testing experience.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="aspect-video w-full rounded-xl bg-black/60 border border-white/10 grid place-items-center relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,var(--electric),transparent_60%)]"
              />
              <div className="relative text-center">
                <div className="mx-auto size-16 rounded-full bg-white/10 backdrop-blur grid place-items-center mb-4 border border-white/20">
                  <Play className="size-6 text-white fill-white ml-1" />
                </div>
                <p className="text-sm font-semibold tracking-widest uppercase text-white/80">
                  Video placeholder
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Your walkthrough video will appear here.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
