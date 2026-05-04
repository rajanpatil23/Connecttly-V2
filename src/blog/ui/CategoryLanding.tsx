import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPostList, GRID_PER_PAGE } from "../api/wp";
import type { UiPost } from "../api/normalize";
import { useBlogData } from "../state/BlogDataProvider";
import BlogCard from "./components/BlogCard";

export default function CategoryLanding() {
  const { category = "" } = useParams();
  const { cats, loading: catsLoading } = useBlogData();
  const [posts, setPosts] = useState<UiPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const topRef = useRef<HTMLDivElement | null>(null);

  const cat = useMemo(() => cats.find(c => c.slug === category), [cats, category]);
  
  // Fetch posts for this category
  useEffect(() => {
    if (catsLoading || !cat) return;

    const trimmedSearch = query.trim();
    const mode: 'browse' | 'search' = trimmedSearch ? 'search' : 'browse';

    setIsLoading(true);
    fetchPostList(
      {
        mode,
        tabId: cat.slug,
        page: currentPage,
        perPage: GRID_PER_PAGE,
        categoryId: cat.id,
        search: trimmedSearch || undefined,
      },
      cats
    )
      .then(result => {
        setPosts(result.posts);
        setTotalPages(result.totalPages);
      })
      .catch(error => console.error('Failed to load category posts:', error))
      .finally(() => setIsLoading(false));
  }, [catsLoading, cat, cats, currentPage, query]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Determine if there are more pages
  const hasNextPage = currentPage < totalPages;

  // Generate page numbers
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

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jumpToFirst = () => handlePageChange(1);
  const jumpToLast = () => handlePageChange(totalPages);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  if (catsLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!cat) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Category not found</h1>
          <Link to="/resources/blog" className="text-[#0074ED] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <style>{`
        .cards-grid { display: grid; gap: 24px; grid-template-columns: repeat(3, 1fr); }

        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        
        @media (max-width: 980px) and (min-width: 769px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <section ref={topRef} className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 sm:mb-12"
          >
            <motion.nav variants={itemVariants} className="text-sm text-slate-600 mb-6">
              <Link to="/resources/blog" className="text-[#0074ED] hover:underline">
                Blog
              </Link>
              {" › "}
              <span className="text-slate-900">{cat.name}</span>
            </motion.nav>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-slate-900 text-center mb-3"
            >
              Explore All <span className="text-[#0074ED]">{cat.name}</span> Blogs
            </motion.h1>

            {cat.description && (
              <motion.p
                variants={itemVariants}
                className="text-center text-slate-600 text-base sm:text-lg max-w-3xl mx-auto mb-6"
              >
                {cat.description}
              </motion.p>
            )}

            <motion.form
              variants={itemVariants}
              role="search"
              onSubmit={(e) => e.preventDefault()}
              aria-label={`Search ${cat.name} posts`}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 rounded-2xl p-3 bg-white border border-slate-200 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-slate-400"
                >
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                  />
                </svg>

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${cat.name}…`}
                  aria-label="Search"
                  autoComplete="off"
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 text-base placeholder:text-slate-400"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    title="Clear"
                    className="inline-grid place-items-center w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M18.3 5.71L12 12l6.3 6.29-1.41 1.41L10.59 13.4 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.3z"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="mt-2 text-center text-sm text-slate-500">
                Showing {posts.length} posts{query ? " (search results)" : ""}.
              </div>
            </motion.form>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-slate-500">Loading posts...</div>
            </div>
          ) : (
            <>
              <ul className="cards-grid">
                {posts.map((p) => (
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

                {posts.length === 0 && (
                  <li className="col-span-full text-center text-slate-500 py-12">
                    {query ? `No posts match "${query}".` : "No posts found."}
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
        </div>
      </section>
    </main>
  );
}
