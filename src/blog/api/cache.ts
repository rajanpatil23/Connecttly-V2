// Simple in-memory cache for blog posts
import type { UiPost } from './normalize';
import type { PostListResult } from './wp';

type ListKey = string;

const listCache = new Map<ListKey, PostListResult>();
const heroCache = new Map<string, UiPost[]>();
const heroCacheKey = 'hero:latest';

export function getListFromCache(key: ListKey): PostListResult | undefined {
  return listCache.get(key);
}

export function setListCache(key: ListKey, value: PostListResult): void {
  listCache.set(key, value);
}

export function getHeroFromCache(): UiPost[] | undefined {
  return heroCache.get(heroCacheKey);
}

export function setHeroCache(value: UiPost[]): void {
  heroCache.set(heroCacheKey, value);
}

export function clearCache(): void {
  listCache.clear();
  heroCache.clear();
}
