import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageTransition } from "@/components/motion/PageTransition";
import { Glasses } from "lucide-react";
import { useFeatureToggles } from "@/hooks/useFeatureToggles";
import { ORGANIZATION_SCHEMA, createSeoHead } from "@/lib/seo";
import appCss from "../styles.css?url";

const FloatingVideoCard = lazy(() =>
  import("@/components/site/FloatingVideoCard").then((module) => ({
    default: module.FloatingVideoCard,
  })),
);
const ChatBot = lazy(() =>
  import("@/components/site/ChatBot").then((module) => ({ default: module.ChatBot })),
);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () =>
    createSeoHead({
      title: "Clear Sight Opticians | Eye Tests, Designer Eyewear & AI Glasses in Hyderabad",
      description:
        "Visit Clear Sight Opticians for ZEISS eye tests, designer frames, prescription lenses, sunglasses, contact lenses, and Ray-Ban Meta demos in KPHB, Nizampet, and Bowenpally.",
      path: "/",
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Clear Sight Opticians" },
        { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#0b0b12", media: "(prefers-color-scheme: dark)" },
        { name: "keywords", content: "best opticians in hyderabad, best opticians in kukatpally, kphb optician, nizampet optician, glasses store, eye test, eye care, designer eyewear, AI glasses, ZEISS eye test" },
        { name: "geo.region", content: "IN-TG" },
        { name: "geo.position", content: "17.493921;78.397634" },
        { name: "ICBM", content: "17.493921,78.397634" },
      ],
      links: [
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/avif", href: "/clear-sight-logo.avif" },
        { rel: "apple-touch-icon", href: "/clear-sight-logo.avif" },
      ],
    }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var saved = localStorage.getItem('theme') || 'classic-light';
              var resolved = saved === 'dark' ? 'deep-midnight' : (saved === 'light' ? 'classic-light' : saved);
              document.documentElement.setAttribute('data-theme', resolved);
              var darkThemes = ["deep-midnight", "charcoal-ember", "noir-gold", "emerald-prestige", "aureolin-bistre", "violet-imperial", "forest-luxe", "neo-glass"];
              if (darkThemes.indexOf(resolved) > -1) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              var savedZoom = localStorage.getItem('zoom') || 'classic';
              var zoomSizes = { compact: '14px', classic: '16px', relaxed: '18px' };
              var size = zoomSizes[savedZoom] || '16px';
              document.documentElement.style.fontSize = size;
            }catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(err){console.error('Service Worker registration failed:',err);});});}`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isBrandsRoute = pathname.startsWith("/brands");
  const { enableAssistant } = useFeatureToggles();

  useEffect(() => {
    // Disable browser's auto scroll restoration on page reload
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-electric focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <SiteFooter />
        <Suspense fallback={null}>{isHome && <FloatingVideoCard />}</Suspense>
        <ScrollToTop />
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>

        {isBrandsRoute && enableAssistant && (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-frame-finder"))}
            className="fixed bottom-6 left-6 z-50 flex items-center h-14 bg-electric text-white rounded-full hover:bg-ink shadow-lg border border-white/10 overflow-hidden group w-14 hover:w-44 px-4 active:scale-95 transition-all duration-300 ease-out"
          >
            <div className="shrink-0 size-6 flex items-center justify-center">
              <Glasses className="size-6 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap ml-3">
              Frame Finder
            </span>
          </button>
        )}
      </div>
    </QueryClientProvider>
  );
}
