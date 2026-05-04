import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchHeroLatest, fetchPostList, GRID_PER_PAGE } from "../api/wp";
import type { UiPost } from "../api/normalize";
import { useBlogData } from "../state/BlogDataProvider";
import BlogCard from "./components/BlogCard";

type TabId = 'all' | string; // 'all' or category.slug

export default function BlogIndex() {
  const { cats, loading: catsLoading } = useBlogData();
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [pageByTab, setPageByTab] = useState<Record<TabId, number>>({ all: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [heroPosts, setHeroPosts] = useState<UiPost[]>([]);
  const [gridPosts, setGridPosts] = useState<UiPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const blogsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Initial load: fetch hero + grid for "all" tab
  useEffect(() => {
    if (catsLoading) return;

    (async () => {
      try {
        // Fetch hero posts (cached)
        const hero = await fetchHeroLatest(cats);
        setHeroPosts(hero);

        // Fetch initial grid for "all" tab, page 1, browse mode
        setIsLoading(true);
        const result = await fetchPostList(
          {
            mode: 'browse',
            tabId: 'all',
            page: 1,
            perPage: GRID_PER_PAGE,
          },
          cats
        );
        setGridPosts(result.posts);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [catsLoading, cats]);

  // Auto-play carousel
  useEffect(() => {
    if (heroPosts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPosts.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [heroPosts.length]);

  // Build categories list
  const categories = useMemo(() => {
    return [
      { name: "All", value: "all" },
      ...cats.map(c => ({ name: c.name, value: c.slug }))
    ];
  }, [cats]);

  // Quick search focus with "/" key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable);
      if (!inInput && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load grid when activeTab, page, or search changes
  useEffect(() => {
    if (catsLoading) return;

    const currentPage = pageByTab[activeTab] ?? 1;
    const trimmedSearch = searchQuery.trim();
    const mode: 'browse' | 'search' = trimmedSearch ? 'search' : 'browse';

    const categoryId =
      activeTab === 'all'
        ? undefined
        : cats.find(c => c.slug === activeTab)?.id;

    setIsLoading(true);
    fetchPostList(
      {
        mode,
        tabId: activeTab,
        page: currentPage,
        perPage: GRID_PER_PAGE,
        categoryId,
        search: trimmedSearch || undefined,
      },
      cats
    )
      .then(result => {
        setGridPosts(result.posts);
        setTotalPages(result.totalPages);
      })
      .catch(error => console.error('Failed to load posts:', error))
      .finally(() => setIsLoading(false));
  }, [activeTab, pageByTab, searchQuery, catsLoading, cats]);

  // Display posts (no client-side pagination - API handles it)
  const currentPage = pageByTab[activeTab] ?? 1;
  const visiblePosts = gridPosts;
  const hasNextPage = currentPage < totalPages;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
    setPageByTab(prev => ({
      ...prev,
      [newTab]: prev[newTab] ?? 1,
    }));
    setSearchQuery('');
  };

  const handlePageChange = (pageNum: number) => {
    setPageByTab(prev => ({
      ...prev,
      [activeTab]: pageNum,
    }));
    blogsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPageByTab(prev => ({
      ...prev,
      [activeTab]: 1,
    }));
  };

  const jumpToFirst = () => handlePageChange(1);
  const jumpToLast = () => handlePageChange(totalPages);

  const formatDate = (d: string | Date) => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroPosts.length) % heroPosts.length);
  };

  if (catsLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-background">
      <style>{`
        .cards-grid {
          display: grid; gap: 24px;
          grid-template-columns: repeat(3, 1fr);
        }
        
        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
        }

        .tabs-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .tabs-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          margin: 0 8px;
        }
        .tabs-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        .tabs-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* ===== HERO CAROUSEL ===== */}
      <section className="overflow-hidden bg-[#ffffff] rounded-b-[40px] relative">
        <div className="absolute inset-0 pointer-events-none rounded-b-[40px]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              ellipse 80% 60% at 50% 45%,
              black 0%,
              rgba(0, 0, 0, 0.8) 15%,
              rgba(0, 0, 0, 0.6) 30%,
              rgba(0, 0, 0, 0.3) 50%,
              transparent 70%,
              transparent 100%
            )
          `
        }}></div>
        
        <div className="relative z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <AnimatePresence mode="wait">
                {heroPosts.map((post, index) => {
                  if (index !== currentSlide) return null;
                  
                  const cat = cats.find(c => c.slug === post.category);
                  const catLabel = cat?.name ?? post.category;
                  const authorName = post.authorName || "Connecttly";
                  const authorImage = post.authorImage;
                  const readTime = post.readTime;
                  const authorDesignation = post.authorDesignation;

                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center cursor-pointer"
                      onClick={() => navigate(`/resources/blog/${post.category}/${post.slug}`, { state: { post } })}
                    >
                      <div className="order-2 lg:order-1 pointer-events-none flex flex-col justify-between h-full min-h-[400px]">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FEF3E2] text-[#8B6914] font-medium text-xs uppercase tracking-wide">
                            {catLabel}
                          </span>
                          <time className="text-slate-500 text-sm" dateTime={String(post.date)}>
                            {formatDate(post.date)}
                          </time>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                          {post.title}
                        </h1>

                        {post.excerpt && (
                          <p className="text-base text-slate-600 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        {readTime && (
                          <p className="text-sm text-slate-500">{readTime}</p>
                        )}

                        <div className="flex items-center gap-3">
                          {authorImage ? (
                            <img 
                              src={authorImage} 
                              alt={authorName} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold">
                              {authorName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold text-slate-900">{authorName}</p>
                            {authorDesignation && (
                              <p className="text-xs text-slate-500">{authorDesignation}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {post.cover && (
                        <figure className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white flex items-center justify-center min-h-[300px] lg:min-h-[400px] pointer-events-none">
                          <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                        </figure>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>

                <div className="flex gap-2">
                  {heroPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? 'w-8 bg-[#0074ED]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blogs" ref={blogsRef} className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="md:hidden mb-8">
            <label htmlFor="blog-category" className="block text-sm font-medium text-slate-600 mb-2">
              Filter blogs
            </label>
            <select
              id="blog-category"
              value={activeTab}
              onChange={(e) => { setShowSearch(false); handleTabChange(e.target.value); }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0074ED] focus:border-transparent"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:block mb-12">
            {!showSearch ? (
              <div className="flex items-center gap-3 flex-wrap">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => handleTabChange(c.value)}
                    className={`
                      whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors
                      ${activeTab === c.value
                        ? 'bg-[#0A1F3D] text-white border-[#0A1F3D]'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }
                    `}
                  >
                    {c.name}
                  </button>
                ))}

                <button
                  onClick={() => { setShowSearch(true); setSearchQuery(""); }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium ml-auto"
                  aria-label="Search blogs"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  aria-label="Back to categories"
                >
                  <ArrowLeft className="h-4 w-4 text-slate-600" />
                </button>
                <input
                  ref={searchRef}
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles, topics, or tags…"
                  className="flex-1 h-11 px-4 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0074ED] focus:border-transparent"
                />
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-slate-500">Loading posts...</div>
              </div>
            ) : (
              <>
                <ul className="cards-grid">
                  {visiblePosts.map((p) => (
                    <BlogCard
                      key={p.id}
                      post={p}
                      to={`/resources/blog/${p.category}/${p.slug}`}
                      title={p.title}
                      excerpt={p.excerpt}
                      date={p.date}
                      cover={p.cover}
                      category={p.category}
                      aspectRatio="16/9"
                      readTime={p.readTime}
                      authorName={p.authorName}
                      authorImage={p.authorImage}
                      authorDesignation={p.authorDesignation}
                    />
                  ))}

                  {visiblePosts.length === 0 && (
                    <li className="col-span-full text-center text-slate-500 py-12">
                      No posts match your search.
                    </li>
                  )}
                </ul>

                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-4 mt-12">
                    <div className="flex justify-center items-center gap-2">
                      {currentPage > 1 && totalPages > 5 && (
                        <button
                          onClick={jumpToFirst}
                          className="hidden sm:flex w-10 h-10 rounded-lg items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                          aria-label="First page"
                          title="First page"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                          </svg>
                        </button>
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          currentPage === 1
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {getPageNumbers().map((pageNum, index) => {
                        if (pageNum === '...') {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="w-10 h-10 flex items-center justify-center text-slate-400 font-medium"
                            >
                              ...
                            </span>
                          );
                        }

                        const isActive = pageNum === currentPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum as number)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                              isActive
                                ? 'bg-[#0074ED] text-white shadow-md'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          !hasNextPage
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {hasNextPage && totalPages > 5 && (
                        <button
                          onClick={jumpToLast}
                          className="hidden sm:flex w-10 h-10 rounded-lg items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                          aria-label="Last page"
                          title="Last page"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="text-sm text-slate-600">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
