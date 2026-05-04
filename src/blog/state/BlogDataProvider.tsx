import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCategories, WpCategory } from '../api/wp';

interface Ctx {
  cats: WpCategory[];
  mapById: Map<number, WpCategory>;
  loading: boolean;
}

const BlogDataContext = createContext<Ctx>({ cats: [], mapById: new Map(), loading: true });

// Helper to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export function BlogDataProvider({ children }: { children: React.ReactNode }) {
  const [cats, setCats] = useState<WpCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(rawCats => {
      // Filter out "Uncategorized" and decode HTML entities in category names
      const filtered = rawCats
        .filter(c => c.slug !== 'uncategorized')
        .map(c => ({
          ...c,
          name: decodeHtmlEntities(c.name),
          description: c.description ? decodeHtmlEntities(c.description) : c.description
        }));
      setCats(filtered);
    }).finally(() => setLoading(false));
  }, []);

  const mapById = useMemo(() => new Map(cats.map(c => [c.id, c])), [cats]);

  return (
    <BlogDataContext.Provider value={{ cats, mapById, loading }}>
      {children}
    </BlogDataContext.Provider>
  );
}

export const useBlogData = () => useContext(BlogDataContext);
