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

// WordPress Category ID to Slug mapping
// Maps WordPress category IDs to our frontend route slugs
const CATEGORY_ID_MAP: Record<number, string> = {
  4: 'performance-marketing',
  5: 'linkedin-growth',
  6: 'content-creative',
  7: 'growth-demand-generation',  // WordPress slug is 'growth-demand-generation'
  1: 'analytics-ai',
  9: 'brand-reputation',
};

export function normalizePost(p: WpPost, cats: WpCategory[]): UiPost | null {
  const primaryId = p?.acf?.primary_category ?? p?.categories?.[0];
  
  // First, try to get the WordPress category
  const wpCat = cats.find(c => c.id === primaryId);
  
  // Use our hardcoded mapping first (for consistent routing)
  let catSlug = CATEGORY_ID_MAP[primaryId];
  
  // If no mapping exists, use WordPress slug directly
  if (!catSlug && wpCat) {
    catSlug = wpCat.slug;
  }
  
  // Filter out uncategorized posts - return null if no valid category
  if (!catSlug || catSlug === 'uncategorized') {
    console.warn(`Post ${p.id} has no valid category. Primary ID: ${primaryId}, WP Cat:`, wpCat);
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
