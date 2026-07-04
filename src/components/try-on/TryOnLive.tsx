import { useEffect, useRef, useState } from "react";
import { Camera, Download, X, RefreshCw } from "lucide-react";
import { FRAMES, type Frame } from "./frames";

// Loaded lazily — this whole module is dynamically imported.
import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

// MediaPipe Face Mesh (468-point topology).
// Temples / sides of head — gives true face width to match glasses width.
const LEFT_TEMPLE = 234;   // user's left temple
const RIGHT_TEMPLE = 454;  // user's right temple
// Eye centers for vertical placement
const LEFT_EYE_CENTER = 159;  // upper eyelid mid (user's left)
const RIGHT_EYE_CENTER = 386; // upper eyelid mid (user's right)

type Props = {
  onClose: () => void;
  initialFrameId?: string;
};

export default function TryOnLive({ onClose, initialFrameId }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  // smoothed transform for jitter-free tracking across face types
  const smoothRef = useRef<{ cx: number; cy: number; w: number; angle: number } | null>(null);

  const [frame, setFrame] = useState<Frame>(
    FRAMES.find((f) => f.id === initialFrameId) ?? FRAMES[0],
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Preload glasses image whenever frame changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = frame.src;
    img.onload = () => { frameImgRef.current = img; };
  }, [frame]);

  // Start camera + landmarker on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1. Camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current!;
        video.srcObject = stream;
        await video.play();

        // 2. Face landmarker
        const fileset = await FilesetResolver.forVisionTasks(WASM_BASE);
        const landmarker = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1,
        });
        if (cancelled) { landmarker.close(); return; }
        landmarkerRef.current = landmarker;

        // 3. Match canvas to video
        const canvas = canvasRef.current!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        setStatus("ready");
        loop();
      } catch (err) {
        if (cancelled) return;
        const e = err as Error;
        setErrorMsg(e?.message?.includes("Permission")
          ? "Camera access denied. Enable it in your browser and try again."
          : "Couldn't start the camera. Please check permissions and reload.");
        setStatus("error");
      }
    })();

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && landmarkerRef.current && !rafRef.current) {
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !canvas || !landmarker) return;

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      let result: FaceLandmarkerResult | undefined;
      try {
        result = landmarker.detectForVideo(video, performance.now());
      } catch {
        // landmarker may throw if closed mid-frame
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lm = result?.faceLandmarks?.[0];
      const img = frameImgRef.current;
      if (lm && img) {
        const lT = lm[LEFT_TEMPLE];
        const rT = lm[RIGHT_TEMPLE];
        const lE = lm[LEFT_EYE_CENTER];
        const rE = lm[RIGHT_EYE_CENTER];

        const ltx = lT.x * canvas.width;
        const lty = lT.y * canvas.height;
        const rtx = rT.x * canvas.width;
        const rty = rT.y * canvas.height;

        // Center horizontally on temples, vertically on eyes
        const cx = (ltx + rtx) / 2;
        const cy = ((lE.y + rE.y) / 2) * canvas.height;

        const dx = rtx - ltx;
        const dy = rty - lty;
        const faceWidth = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const targetWidth = faceWidth * frame.widthRatio;
        const aspect = img.naturalHeight / img.naturalWidth;
        const targetHeight = targetWidth * aspect;
        const yOffset = targetHeight * frame.yOffsetRatio;

        ctx.save();
        ctx.translate(cx, cy + yOffset);
        ctx.rotate(angle);
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const capture = () => {
    const video = videoRef.current;
    const overlay = canvasRef.current;
    if (!video || !overlay) return;
    const out = document.createElement("canvas");
    out.width = video.videoWidth;
    out.height = video.videoHeight;
    const ctx = out.getContext("2d")!;
    // mirror to match preview
    ctx.translate(out.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, out.width, out.height);
    ctx.drawImage(overlay, 0, 0, out.width, out.height);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clear-sight-tryon-${frame.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink">
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover -scale-x-100"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full -scale-x-100 pointer-events-none"
        />

        {/* Top bar */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-3 z-10">
          <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.2em]">
            Live · {frame.brand} {frame.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-white text-xs font-semibold hover:bg-black/70"
          >
            <X className="size-3.5" /> Stop
          </button>
        </div>

        {/* Status overlays */}
        {status !== "ready" && (
          <div className="absolute inset-0 grid place-items-center bg-ink/80 text-white text-center px-6">
            {status === "loading" ? (
              <div className="flex flex-col items-center gap-3">
                <div className="size-10 rounded-full border-2 border-white/20 border-t-electric animate-spin" />
                <p className="text-sm">Starting camera & loading face tracker…</p>
                <p className="text-xs text-white/60">Your camera feed stays on your device.</p>
              </div>
            ) : (
              <div className="max-w-sm flex flex-col items-center gap-4">
                <p className="text-sm">{errorMsg}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 bg-electric text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  <RefreshCw className="size-3.5" /> Try again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Capture */}
        {status === "ready" && (
          <button
            type="button"
            onClick={capture}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 bg-white text-ink px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-electric hover:text-white transition-colors"
          >
            <Download className="size-3.5" /> Capture
          </button>
        )}
      </div>

      {/* Frame selector */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {FRAMES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFrame(f)}
            className={`group flex flex-col items-center gap-1 rounded-2xl border p-2 transition-all ${
              f.id === frame.id
                ? "border-electric bg-electric/5 scale-105"
                : "border-border bg-secondary/40 hover:border-electric/60"
            }`}
          >
            <img
              src={f.src}
              alt={`${f.brand} ${f.name}`}
              className="w-20 h-10 object-contain"
              loading="lazy"
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {f.name}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
        <Camera className="size-3" /> Your camera feed never leaves your device.
      </p>
    </div>
  );
}
