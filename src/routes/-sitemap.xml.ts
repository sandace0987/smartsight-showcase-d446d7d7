import { BRANDS } from '@/lib/brand-catalog';

const SITE_URL = 'https://www.clearsightopticians.in';

const BUILD_DATE = new Date().toISOString().split('T')[0];

const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/ai-glasses',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/brands',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/stores',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/terms-and-conditions',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(): string {
  const brandPages = BRANDS.map((b) => ({
    path: `/brands/${b.slug}`,
    priority: '0.7',
    changefreq: 'weekly' as const,
  }));

  const allPages = [...pages, ...brandPages];

  const urls = allPages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const GET = async () => {
  return new Response(buildSitemap(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
};