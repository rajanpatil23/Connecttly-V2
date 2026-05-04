import type { WpPost, WpCategory } from './wp';

export type UiPost = {
  id: string;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  cover?: string;
  category: string; // category slug for routing
  readTime?: string;
  authorName?: string;
  authorImage?: string;
  authorDesignation?: string; // NEW: author job title/role
  html: string; // full post content HTML
  wpId: number; // numeric WP id (for comments)
};

// Helper to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export const stripHtml = (s: string) => {
  const stripped = (s || '').replace(/<[^>]*>/g, '').trim();
  return decodeHtmlEntities(stripped);
};

const mediaUrl = (p: WpPost) => p?._embedded?.['wp:featuredmedia']?.[0]?.source_url as string | undefined;
const authorName = (p: WpPost) => p?.acf?.author_name || p?._embedded?.author?.[0]?.name as string | undefined;
const authorAvatar = (p: WpPost) => p?.acf?.author_image || p?._embedded?.author?.[0]?.avatar_urls?.['96'] as string | undefined;

// WordPress Category ID to Slug overrides
// Use ONLY when the WP slug differs from the frontend route slug.
const CATEGORY_ID_OVERRIDES: Record<number, string> = {};

export function normalizePost(p: WpPost, cats: WpCategory[]): UiPost | null {
  const rawPrimary = p?.acf?.primary_category ?? p?.categories?.[0];
  const primaryId = typeof rawPrimary === 'string' ? Number(rawPrimary) : rawPrimary;

  // Look up WP category by id (coerce both sides to be safe)
  const wpCat = cats.find(c => Number(c.id) === Number(primaryId));

  // Prefer override → WP slug
  let catSlug = (primaryId != null && CATEGORY_ID_OVERRIDES[primaryId as number]) || wpCat?.slug;

  // Filter out true uncategorized posts
  if (!catSlug || catSlug === 'uncategorized') {
    console.warn(`[blog] Post ${p.id} ("${p.slug}") skipped: no valid category. primaryId=${primaryId}`, { wpCat, allCats: cats.map(c => ({ id: c.id, slug: c.slug })) });
    return null;
  }
  
  return {
    id: String(p.id),
    wpId: p.id,
    title: decodeHtmlEntities(p.title?.rendered ?? ''),
    slug: p.slug,
    date: (p.date || '').slice(0, 10),
    excerpt: stripHtml(p.excerpt?.rendered ?? ''),
    cover: mediaUrl(p),
    category: catSlug,
    readTime: p.acf?.read_time,
    authorName: authorName(p),
    authorImage: authorAvatar(p),
    authorDesignation: p.acf?.author_designation || undefined, // NEW: use ACF field
    html: p.content?.rendered ?? '',
  };
}
