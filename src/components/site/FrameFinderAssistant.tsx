import * as React from "react";
import { X, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Smartphone, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BRANDS, type GlassItem } from "@/lib/brand-catalog";
import { ProductDialog } from "@/components/site/ProductDialog";
import { useImageDominantColor } from "@/hooks/useImageDominantColor";
import { CONTACT_PHONE_RAW } from "@/lib/contact-config";
import { cn } from "@/lib/utils";

interface FrameFinderAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "welcome" | "budget" | "faceShape" | "frameType" | "smart" | "loading" | "results";

const BUDGET_OPTIONS = [
  { label: "Under ₹10,000", max: 10000 },
  { label: "₹10,000 - ₹25,000", max: 25000 },
  { label: "₹25,000 - ₹50,000", max: 50000 },
  { label: "No Limit", max: 999999 },
];

const FACE_SHAPES = [
  { id: "round", label: "Round Face", desc: "Angular styles (Square, Rectangle) add contrast" },
  { id: "square", label: "Square Face", desc: "Curved styles (Round, Oval) soften edges" },
  { id: "oval", label: "Oval Face", desc: "Symmetric shapes fit almost any frame style" },
  { id: "heart", label: "Heart Face", desc: "Aviators, Round & Cat-eye balance features" },
  { id: "diamond", label: "Diamond Face", desc: "Rimless or Oval frames complement cheekbones" },
];

const FRAME_TYPES = [
  { id: "full-rim", label: "Full Rim", desc: "Classic, bold, fully outlined frames" },
  { id: "rimless", label: "Rimless", desc: "Ultra-lightweight, invisible minimalist look" },
  { id: "semi-rimless", label: "Semi-Rimless", desc: "Sporty, vintage style with top-rim focus" },
  { id: "any", label: "Any Type", desc: "Show me all structural frame options" },
];

const SMART_GLASSES_PREF = [
  { id: "yes", label: "Yes, I want AI Glasses", desc: "Features camera, audio, and Meta AI" },
  { id: "no", label: "No, Standard Eyewear", desc: "Traditional luxury & prescription frames" },
  { id: "any", label: "Show me both options", desc: "Open to both tech and traditional eyewear" },
];

interface RecommendationCardProps {
  model: GlassItem;
  brandName: string;
  onClick: () => void;
}

function RecommendationCard({ model, brandName, onClick }: RecommendationCardProps) {
  const variant = model.variants?.[0];
  const imageSrc = model.image || variant?.images.front;
  const { color } = useImageDominantColor(imageSrc || "");

  const searchTxt = `Hi Clear Sight, I'd like to check out the ${brandName} ${model.model} frame recommended by the Frame Finder.`;
  const whatsappUrl = `https://wa.me/${CONTACT_PHONE_RAW}?text=${encodeURIComponent(searchTxt)}`;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl border border-border/60 bg-secondary/15 flex items-center justify-between gap-4 transition-all duration-200 group/card",
        model.variants && model.variants.length > 0
          ? "cursor-pointer hover:bg-secondary/30 hover:border-electric/30 hover:shadow-sm"
          : "cursor-default"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Sleek horizontal rectangle with dynamic dominant background color matching cards strategy! */}
        <div
          className="w-20 h-14 rounded-xl border border-border/40 p-1 shrink-0 flex items-center justify-center overflow-hidden transition-colors"
          style={{ backgroundColor: color || "rgba(255, 255, 255, 0.05)", transition: "background-color 0.4s ease" }}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="" className="max-h-full max-w-full w-auto object-contain" />
          ) : (
            <span className="text-[10px] font-bold text-muted-foreground uppercase">{model.shape}</span>
          )}
        </div>
        <div>
          <span className="text-[8px] font-bold uppercase tracking-widest text-electric">{brandName}</span>
          <h4 className="font-bold text-sm tracking-tight text-foreground leading-snug group-hover/card:text-electric transition-colors">
            {model.model}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            {model.priceFrom != null ? (
              <span className="text-[10px] font-bold text-foreground/80">
                {model.model.toLowerCase().includes("meta") || model.model.toLowerCase().includes("vanguard") || model.model.toLowerCase().includes("hstn")
                  ? "Starting at "
                  : "From "}
                ₹{model.priceFrom.toLocaleString("en-IN")}
              </span>
            ) : (
              <span className="text-[9px] text-muted-foreground">Contact store for price</span>
            )}
            <span className="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-[9px] text-muted-foreground uppercase font-semibold tracking-wider">{model.shape}</span>
          </div>
        </div>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="bg-electric text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-ink transition shrink-0"
      >
        Enquire
      </a>
    </div>
  );
}

export function FrameFinderAssistant({ open, onOpenChange }: FrameFinderAssistantProps) {
  const [step, setStep] = React.useState<Step>("welcome");
  const [budget, setBudget] = React.useState<number | null>(null);
  const [faceShape, setFaceShape] = React.useState<string | null>(null);
  const [frameType, setFrameType] = React.useState<string | null>(null);
  const [smartPref, setSmartPref] = React.useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [recommendations, setRecommendations] = React.useState<{ model: GlassItem; brandName: string; score: number }[]>([]);
  const [selectedModel, setSelectedModel] = React.useState<{ model: GlassItem; brandName: string } | null>(null);

  const navigate = useNavigate();
  const isAllSkipped = budget === null && faceShape === null && frameType === null && smartPref === null;

  // Loading animation
  React.useEffect(() => {
    if (step !== "loading") return;

    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            calculateRecommendations();
            setStep("results");
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [step]);

  const handleStart = () => setStep("budget");
  
  const handleBudgetSelect = (max: number) => {
    setBudget(max);
    setStep("faceShape");
  };

  const handleFaceShapeSelect = (shape: string) => {
    setFaceShape(shape);
    setStep("frameType");
  };

  const handleFrameTypeSelect = (type: string) => {
    setFrameType(type);
    setStep("smart");
  };

  const handleSmartSelect = (pref: string) => {
    setSmartPref(pref);
    setStep("loading");
  };

  const resetAssistant = () => {
    setBudget(null);
    setFaceShape(null);
    setFrameType(null);
    setSmartPref(null);
    setStep("welcome");
  };

  const calculateRecommendations = () => {
    const scoredList: { model: GlassItem; brandName: string; score: number }[] = [];

    BRANDS.forEach((brand) => {
      // Skip lenses, contact lenses, and coming soon houses (e.g. Tom Ford) which have no variant image assets
      if (brand.category === "lenses" || brand.comingSoon) return;

      brand.models.forEach((model) => {
        let score = 0;

        // 1. Budget scoring (higher matches get premium points)
        if (model.priceFrom != null) {
          if (budget && model.priceFrom <= budget) {
            score += 4;
          } else if (budget && model.priceFrom <= budget * 1.15) {
            score += 1; // slightly over budget
          }
        } else {
          score += 2; // neutral if price is not listed
        }

        // 2. Face shape styling mappings
        if (faceShape) {
          const frameShape = model.shape.toLowerCase();
          if (faceShape === "round") {
            if (frameShape.includes("square") || frameShape.includes("rectangular") || frameShape.includes("wayfarer")) score += 3;
          } else if (faceShape === "square") {
            if (frameShape.includes("round") || frameShape.includes("oval") || frameShape.includes("aviator")) score += 3;
          } else if (faceShape === "oval") {
            score += 3; // Oval matches all shapes
          } else if (faceShape === "heart") {
            if (frameShape.includes("aviator") || frameShape.includes("round") || frameShape.includes("cat-eye")) score += 3;
          } else if (faceShape === "diamond") {
            if (model.frameType === "rimless" || frameShape.includes("oval") || frameShape.includes("round")) score += 3;
          }
        }

        // 3. Frame type preference
        if (frameType && frameType !== "any") {
          if (model.frameType === frameType) {
            score += 3;
          }
        } else {
          score += 1; // neutral
        }

        // 4. Smart Glasses preference
        if (smartPref) {
          const isMeta = model.line === "Meta Glasses";
          if (smartPref === "yes" && isMeta) {
            score += 4;
          } else if (smartPref === "no" && !isMeta) {
            score += 3;
          } else if (smartPref === "any") {
            score += 2;
          }
        }

        // 5. Bonus for hot/popular frames
        if (model.is_hot) {
          score += 1;
        }

        scoredList.push({
          model,
          brandName: brand.name,
          score,
        });
      });
    });

    // Sort descending by score, randomize slightly among equals to keep it dynamic
    const sorted = scoredList.sort((a, b) => b.score - a.score + (Math.random() - 0.5) * 0.2);
    setRecommendations(sorted.slice(0, 3));
  };

  const getLoadingMessage = () => {
    if (loadingProgress < 30) return "Analyzing facial metrics...";
    if (loadingProgress < 60) return "Evaluating lens compatibility...";
    if (loadingProgress < 90) return "Filtering designer frame catalogs...";
    return "Curating top frame profiles...";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:rounded-3xl p-0 overflow-hidden bg-background/95 border border-border/60 shadow-2xl backdrop-blur-xl">

        {step === "welcome" && (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="size-16 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="size-7 text-electric" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric block mb-2">
              Clear Sight Assistant
            </span>
            <h2 className="text-3xl font-bold tracking-tighter max-w-sm">
              Find Your Perfect Frame in 60 Seconds
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Our smart styling finder matches your face shape, personal design tastes, and budget against 100+ luxury models.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button
                type="button"
                onClick={handleStart}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-electric text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink transition"
              >
                Let's Start <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-border hover:bg-secondary/35 text-muted-foreground hover:text-foreground transition"
              >
                No, Thanks
              </button>
            </div>
          </div>
        )}

        {(step === "budget" || step === "faceShape" || step === "frameType" || step === "smart") && (
          <div className="p-6 sm:p-8">
            {/* Header / Progress */}
            <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (step === "budget") setStep("welcome");
                    if (step === "faceShape") setStep("budget");
                    if (step === "frameType") setStep("faceShape");
                    if (step === "smart") setStep("frameType");
                  }}
                  className="size-7 rounded-full border border-border/40 hover:border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Question{" "}
                  {step === "budget" ? "1/4" : step === "faceShape" ? "2/4" : step === "frameType" ? "3/4" : "4/4"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  switch (step) {
                    case "budget":
                      setBudget(null);
                      setStep("faceShape");
                      break;
                    case "faceShape":
                      setFaceShape(null);
                      setStep("frameType");
                      break;
                    case "frameType":
                      setFrameType(null);
                      setStep("smart");
                      break;
                    case "smart":
                      setSmartPref(null);
                      setStep("loading");
                      break;
                  }
                }}
                className="text-[10px] font-bold uppercase tracking-[0.16em] text-electric hover:underline"
              >
                Skip Option
              </button>
            </div>

            {/* Step 1: Budget */}
            {step === "budget" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Select your maximum budget</h3>
                <p className="text-xs text-muted-foreground mb-6">We'll filter our collection to keep matches in your desired price range.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUDGET_OPTIONS.map((opt) => {
                    const isSelected = budget === opt.max;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleBudgetSelect(opt.max)}
                        className={cn(
                          "p-4 text-left rounded-2xl border text-sm font-semibold transition-all duration-200",
                          isSelected
                            ? "border-electric bg-electric/10 text-electric shadow-sm"
                            : "border-border/60 bg-secondary/15 hover:bg-secondary/40 hover:border-electric/50 text-foreground"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Face Shape */}
            {step === "faceShape" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Identify your facial shape</h3>
                <p className="text-xs text-muted-foreground mb-6">Recommended lens shapes are designed to balance and highlight your natural features.</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 thin-scrollbar">
                  {FACE_SHAPES.map((opt) => {
                    const isSelected = faceShape === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleFaceShapeSelect(opt.id)}
                        className={cn(
                          "w-full p-4 text-left rounded-2xl border transition-all duration-200 flex flex-col gap-0.5",
                          isSelected
                            ? "border-electric bg-electric/10 text-electric shadow-sm"
                            : "border-border/60 bg-secondary/15 hover:bg-secondary/40 hover:border-electric/50 text-foreground"
                        )}
                      >
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground leading-normal">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Frame Type */}
            {step === "frameType" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Choose your structural style</h3>
                <p className="text-xs text-muted-foreground mb-6">Rimless is lightweight and minimalist, while full rim makes a bold statement.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FRAME_TYPES.map((opt) => {
                    const isSelected = frameType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleFrameTypeSelect(opt.id)}
                        className={cn(
                          "p-4 text-left rounded-2xl border transition-all duration-200 flex flex-col gap-0.5",
                          isSelected
                            ? "border-electric bg-electric/10 text-electric shadow-sm"
                            : "border-border/60 bg-secondary/15 hover:bg-secondary/40 hover:border-electric/50 text-foreground"
                        )}
                      >
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground leading-normal mt-0.5">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Smart Glasses */}
            {step === "smart" && (
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Interest in AI Glasses features?</h3>
                <p className="text-xs text-muted-foreground mb-6">Select yes if you're looking for built-in camera, music audio, and Meta AI.</p>
                <div className="space-y-2">
                  {SMART_GLASSES_PREF.map((opt) => {
                    const isSelected = smartPref === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSmartSelect(opt.id)}
                        className={cn(
                          "w-full p-4 text-left rounded-2xl border transition-all duration-200 flex flex-col gap-0.5",
                          isSelected
                            ? "border-electric bg-electric/10 text-electric shadow-sm"
                            : "border-border/60 bg-secondary/15 hover:bg-secondary/40 hover:border-electric/50 text-foreground"
                        )}
                      >
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className="text-[10px] text-muted-foreground leading-normal">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {step === "loading" && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative size-20 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-electric/10 border-t-electric animate-spin" />
              <Sparkles className="size-6 text-electric animate-pulse" />
            </div>
            <h3 className="text-xl font-bold tracking-tight animate-pulse mb-2">{getLoadingMessage()}</h3>
            <p className="text-xs text-muted-foreground">Scoring style criteria against catalog...</p>
            
            {/* Custom progress bar */}
            <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-electric transition-all duration-100 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {step === "results" && (
          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto thin-scrollbar">
            {isAllSkipped ? (
              <div className="text-center flex flex-col items-center py-6">
                <div className="size-16 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center mb-6">
                  <Sparkles className="size-7 text-electric" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric block mb-2">
                  No Preferences Given
                </span>
                <h2 className="text-2xl font-bold tracking-tighter max-w-sm">
                  Uh-oh! You have not given any preferences.
                </h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                  No worries! You can select and browse all frames manually to find the perfect style for yourself.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                  <button
                    type="button"
                    onClick={resetAssistant}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-border hover:bg-secondary/35 text-muted-foreground hover:text-foreground transition"
                  >
                    <RefreshCw className="size-3.5" /> Start Over
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      navigate({ to: "/brands" });
                    }}
                    className="flex-1 bg-electric text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink transition"
                  >
                    Browse All Frames
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center flex flex-col items-center mb-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-electric block mb-1">
                    Your Matches
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">Top Recommended Frames</h2>
                  <p className="text-xs text-muted-foreground mt-1">Based on facial structure, style profile, and budget settings.</p>
                </div>

                <div className="space-y-4">
                  {recommendations.map(({ model, brandName }) => (
                    <RecommendationCard
                      key={model.model}
                      model={model}
                      brandName={brandName}
                      onClick={() => {
                        if (model.variants && model.variants.length > 0) {
                          setSelectedModel({ model, brandName });
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 flex gap-3 pt-4 border-t border-border/40">
                  <button
                    type="button"
                    onClick={resetAssistant}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-border hover:bg-secondary/35 text-muted-foreground hover:text-foreground transition"
                  >
                    <RefreshCw className="size-3.5" /> Start Over
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      navigate({ to: "/brands" });
                    }}
                    className="flex-1 bg-electric text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink transition"
                  >
                    Browse All Frames
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
      {selectedModel && (
        <ProductDialog
          brand={selectedModel.brandName}
          model={selectedModel.model.model}
          priceFrom={selectedModel.model.priceFrom}
          variants={selectedModel.model.variants || []}
          open={!!selectedModel}
          onOpenChange={(open) => {
            if (!open) setSelectedModel(null);
          }}
        />
      )}
    </Dialog>
  );
}
