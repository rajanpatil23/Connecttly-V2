// WordPress REST API helpers with caching
import { getListFromCache, setListCache, getHeroFromCache, setHeroCache } from './cache';
import { normalizePost, type UiPost } from './normalize';

export const API_BASE = (import.meta.env.VITE_BLOG_API_BASE as string) || 'https://blogadmin.connecttly.com/wp-json';

// Constants
export const HERO_COUNT = 5;
export const GRID_PER_PAGE = 9;

function ok(r: Response) {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r;
}

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
};

export type WpEmbedded = {
  [k: string]: any;
};

export type WpPost = {
  id: number;
  date: string; // ISO
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: WpEmbedded;
  acf?: {
    read_time?: string;
    primary_category?: number; // Term ID
    author_image?: string;     // URL
    author_name?: string;      // custom display name
    author_designation?: string; // NEW: author job title/role
  };
};

export type WpComment = {
  id: number;
  post: number;
  parent: number;
  date: string;
  author_name: string;
  content: { rendered: string };
};

export type FetchListParams = {
  page: number;                  // 1-based
  perPage: number;
  categoryId?: number;
  search?: string;
  mode: 'browse' | 'search';
  tabId: string;                 // 'all' or category slug
};

function listKey(params: FetchListParams): string {
  const { page, perPage, categoryId, search, mode, tabId } = params;
  return JSON.stringify({ page, perPage, categoryId, search: search || '', mode, tabId });
}

// Fetch hero posts (latest 5) - cached
export async function fetchHeroLatest(cats: WpCategory[]): Promise<UiPost[]> {
  const cached = getHeroFromCache();
  if (cached) return cached;

  const url = `${API_BASE}/wp/v2/posts?per_page=${HERO_COUNT}&orderby=date&order=desc&_embed=1&acf_format=standard`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch hero posts');
  const data: WpPost[] = await resp.json();
  const ui = data.map(p => normalizePost(p, cats)).filter((p): p is UiPost => p !== null);
  setHeroCache(ui);
  return ui;
}

export type PostListResult = {
  posts: UiPost[];
  totalPages: number;
  totalPosts: number;
};

// Fetch grid for a specific mode/tab/page - cached
export async function fetchPostList(params: FetchListParams, cats: WpCategory[]): Promise<PostListResult> {
  const key = listKey(params);
  const cached = getListFromCache(key);
  if (cached) {
    // Return cached data with stored pagination info
    return cached;
  }

  const qs = new URLSearchParams();
  qs.set('per_page', String(params.perPage));
  qs.set('page', String(params.page));
  qs.set('orderby', 'date');
  qs.set('order', 'desc');
  qs.set('_embed', '1');
  qs.set('acf_format', 'standard');

  if (params.categoryId) qs.set('categories', String(params.categoryId));
  if (params.mode === 'search' && params.search) qs.set('search', params.search);

  const url = `${API_BASE}/wp/v2/posts?${qs.toString()}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch post list');
  
  // Read pagination info from WordPress headers
  const totalPages = parseInt(resp.headers.get('X-WP-TotalPages') || '1', 10);
  const totalPosts = parseInt(resp.headers.get('X-WP-Total') || '0', 10);
  
  const data: WpPost[] = await resp.json();
  const posts = data.map(p => normalizePost(p, cats)).filter((p): p is UiPost => p !== null);

  const result: PostListResult = {
    posts,
    totalPages,
    totalPosts,
  };

  setListCache(key, result);
  return result;
}

// Single post by slug (for detail fallback)
export async function fetchPostBySlug(slug: string, cats: WpCategory[]): Promise<UiPost | null> {
  const url = `${API_BASE}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&acf_format=standard`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch post by slug');
  const arr: WpPost[] = await resp.json();
  if (!arr?.[0]) return null;
  return normalizePost(arr[0], cats);
}

// Legacy function for backward compatibility
export async function fetchCategories(): Promise<WpCategory[]> {
  const url = `${API_BASE}/wp/v2/categories?per_page=100&hide_empty=false&_fields=id,slug,name,description,count`;
  return fetch(url).then(ok).then(r => r.json());
}

// Legacy function for backward compatibility
export async function fetchPosts(params: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
} = {}): Promise<WpPost[]> {
  const q = new URLSearchParams({
    per_page: String(params.perPage ?? 12),
    page: String(params.page ?? 1),
    _embed: '1',
    acf_format: 'standard',
  });
  if (params.categoryId) q.set('categories', String(params.categoryId));
  if (params.search) q.set('search', params.search);
  const url = `${API_BASE}/wp/v2/posts?${q.toString()}`;
  return fetch(url).then(ok).then(r => r.json());
}

export async function fetchComments(postId: number): Promise<WpComment[]> {
  const url = `${API_BASE}/wp/v2/comments?post=${postId}&orderby=date&order=asc`;
  return fetch(url).then(ok).then(r => r.json());
}

export async function postComment(input: {
  post: number;
  author_name: string;
  author_email: string;
  content: string;
  honeypot?: string; // optional spam trap
}): Promise<WpComment | { status?: string; [k: string]: any }> {
  // If honeypot filled, fake success without posting
  if (input.honeypot && input.honeypot.trim() !== '') {
    return Promise.resolve({ status: 'spam-suspected' });
  }
  const url = `${API_BASE}/wp/v2/comments`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post: input.post,
      author_name: input.author_name,
      author_email: input.author_email,
      content: input.content,
    }),
  }).then(ok).then(r => r.json());
}
