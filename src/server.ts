import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

function generateSitemap(): string {
  const baseUrl = "https://www.clearsightopticians.in";
  
  const corePages = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/ai-glasses", changefreq: "weekly", priority: 0.9 },
    { url: "/brands", changefreq: "weekly", priority: 0.9 },
    { url: "/stores", changefreq: "monthly", priority: 0.9 },
    { url: "/about", changefreq: "monthly", priority: 0.7 },
    { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
    { url: "/terms-and-conditions", changefreq: "yearly", priority: 0.3 },
  ];

  const brandSlugs = [
    'maui-jim',
    'ray-ban',
    'oakley',
    'philipp-plein',
    'prada',
    'burberry',
    'carrera',
    'tom-ford',
    'police',
    'zeiss',
    'vogue',
    'silhouette',
    'montblanc',
    'puma',
  ];
  
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...corePages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`),
    ...brandSlugs.map(slug => `
  <url>
    <loc>${baseUrl}/brands/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
  ].join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: https://www.clearsightopticians.in/sitemap.xml`;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      
      if (url.pathname === "/sitemap.xml") {
        return new Response(generateSitemap(), {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }
      
      if (url.pathname === "/robots.txt") {
        return new Response(generateRobotsTxt(), {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }

      const handler = await getServerEntry();
      let response = await handler.fetch(request, env, ctx);
      response = await normalizeCatastrophicSsrResponse(response);

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }
      return response;
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
