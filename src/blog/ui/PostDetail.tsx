import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchPostBySlug, fetchComments } from "../api/wp";
import { normalizePost, UiPost } from "../api/normalize";
import { useBlogData } from "../state/BlogDataProvider";
import CommentsList from "./components/CommentsList";
import CommentForm from "./components/CommentForm";

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function PostDetail() {
  const { category = "", slug = "" } = useParams();
  const location = useLocation();
  const { cats, loading: catsLoading } = useBlogData();
  const [post, setPost] = useState<UiPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Try to get post from router state first (instant load)
  const statePost = location.state?.post as UiPost | undefined;

  // Fetch post data
  useEffect(() => {
    if (catsLoading || !slug) return;
    
    // If we have post from router state, use it immediately
    if (statePost && statePost.slug === slug) {
      setPost(statePost);
      setLoading(false);
      
      // Fetch comments in background
      (async () => {
        try {
          const postComments = await fetchComments(statePost.wpId);
          setComments(postComments);
        } catch (err) {
          console.error('Failed to load comments:', err);
        }
      })();
      return;
    }
    
    // Otherwise, fetch from API
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const normalized = await fetchPostBySlug(slug, cats);
        
        if (!normalized) {
          setError("Post not found");
          setPost(null);
          return;
        }
        
        setPost(normalized);
        
        // Fetch comments
        const postComments = await fetchComments(normalized.wpId);
        setComments(postComments);
      } catch (err: any) {
        setError(err.message || "Failed to load post");
        setPost(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, cats, catsLoading, statePost]);

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

  if (loading || catsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0074ED] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {error || "Post not found"}
          </h1>
          <Link to="/resources/blog" className="text-[#0074ED] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const cat = cats.find(c => c.slug === post.category);
  const catLabel = cat?.name ?? post.category;
  const authorName = post.authorName || "Connecttly";
  const authorImage = post.authorImage;
  const readTime = post.readTime;
  const authorDesignation = post.authorDesignation;

  return (
    <main className="min-h-screen bg-background">
      <style>{`
        /* ---------- BODY (2-col with sticky right rail) ---------- */
        .two-col {
          display:grid; gap: 28px; align-items: start;
          grid-template-columns: minmax(0,1fr) 340px;
        }
        .article {
          max-width: 760px;
        }
        .article :where(h1,h2,h3,h4){ color:#0f172a; margin-top:1.6em; margin-bottom:.6em; font-weight: 700; }
        .article h1 { font-size: 34px; }
        .article h2 { font-size: 28px; }
        .article h3 { font-size: 22px; }
        .article p, .article li, .article td, .article th { color:#475569; line-height:1.75; }
        .article table {
          width:100%; border-collapse:collapse; margin:16px 0; border:1px solid #e2e8f0; font-size:15px;
        }
        .article th, .article td { padding: 10px 12px; border:1px solid #e2e8f0; }
        .article img { max-width:100%; height:auto; border-radius:12px; }
        .article blockquote {
          margin: 16px 0; padding: 12px 16px; border-left: 4px solid #0074ED;
          background:#eff6ff; color:#1e293b; border-radius:8px;
        }
        .article a { color: #0074ED; text-decoration: underline; }

        .rail { position: sticky; top: 80px; display:flex; flex-direction:column; gap:16px; }

        .card {
          background:#fff; border:1px solid #e2e8f0; border-radius:16px;
          box-shadow: 0 4px 12px rgba(0,0,0,.08);
          padding: 20px;
        }
        .card h3 { margin:0 0 12px; font-size:18px; color:#0f172a; font-weight: 700; }
        .card p { margin:0 0 12px; color:#64748b; font-size: 14px; }

        .btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:#0074ED; color:#fff; border:none; border-radius:10px; padding:10px 14px;
          font-weight:600; cursor:pointer;
          box-shadow: 0 4px 12px rgba(0,116,237,.3);
          transition: all .2s;
        }
        .btn-primary:hover { background:#0062c7; transform: translateY(-1px); }

        .input {
          width:100%; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px;
          font-size:14px; color:#0f172a; background:#fff;
        }
        .input:focus { outline: none; border-color: #0074ED; }
        .legal { font-size:12px; color:#94a3b8; margin-top:8px; }
        .chip {
          display:inline-flex; align-items:center; gap:8px; font-size:14px;
          padding:10px 14px; border-radius:12px; background:#eff6ff; color:#0f172a;
          border:1px solid #bfdbfe; cursor: pointer; transition: all .2s;
        }
        .chip:hover { background: #dbeafe; }

        @media (max-width: 1024px){
          .two-col { grid-template-columns: 1fr; }
          .rail { position: static; }
          .article { max-width: 100%; }
        }
        @media (max-width: 768px){
          .article table { font-size: 13px; overflow-x: auto; display: block; }
          .article th, .article td { padding: 8px 6px; font-size: 13px; }
        }

        /* Mobile responsive styles */
        @media (max-width: 640px) {
          .article {
            overflow-x: hidden !important;
            max-width: 100% !important;
          }
          
          .article *,
          .article *::before,
          .article *::after {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .article > * {
            max-width: calc(100vw - 24px) !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .article h2 { font-size: 24px !important; }
          .article h3 { font-size: 20px !important; }
          .article h4 { font-size: 18px !important; }
          
          .article table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
            font-size: 12px;
            width: 100% !important;
          }
        }
      `}</style>

      {/* ---------- HERO SECTION ---------- */}
      <section className="overflow-hidden bg-[#ffffff] rounded-b-[40px] relative">
        {/* Grid Pattern with Radial Fade */}
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
        
        {/* Content */}
        <div className="relative z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              {/* Header */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-10 sm:mb-12"
              >
            {/* Breadcrumb */}
            <motion.nav variants={itemVariants} className="text-sm text-slate-600 mb-6">
              <Link to="/resources/blog" className="text-[#0074ED] hover:underline">
                Blog
              </Link>
              {" › "}
              <Link to={`/resources/blog/${post.category}`} className="text-[#0074ED] hover:underline">
                {catLabel}
              </Link>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div variants={itemVariants} className="order-2 lg:order-1">
                {/* Category Badge (left) + Date (right) */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FEF3E2] text-[#8B6914] font-medium text-xs uppercase tracking-wide">
                    {catLabel}
                  </span>
                  <time className="text-slate-500 text-sm" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-base text-slate-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}

                {/* Read Time */}
                {readTime && (
                  <p className="text-sm text-slate-500 mb-6">{readTime}</p>
                )}

                {/* Author Info */}
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
              </motion.div>

              {/* Right Image - Centered */}
              {post.cover && (
                <motion.figure variants={itemVariants} className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </motion.figure>
              )}
            </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTENT SECTION ---------- */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Two-column layout: Article + Sidebar */}
          <div className="two-col">
            {/* LEFT: Article content from WordPress */}
            <article className="article">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
              
              {/* Comments Section */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments</h2>
                <CommentsList comments={comments} />
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Leave a Comment</h3>
                  <CommentForm 
                    postId={post.wpId} 
                    onSubmitted={async () => {
                      const updated = await fetchComments(post.wpId);
                      setComments(updated);
                    }} 
                  />
                </div>
              </div>
            </article>

            {/* RIGHT: Sticky cards */}
            <aside className="rail" aria-label="Sidebar">
              {/* Card 1: Consultation */}
              <div className="card">
                <h3>Get Free Consultation</h3>
                <p>Talk to an expert to plan your next move.</p>
                <div className="grid gap-3">
                  <input className="input" placeholder="Your name" />
                  <input className="input" placeholder="Phone number" />
                  <button className="btn-primary">Submit</button>
                </div>
                <div className="legal">
                  By submitting, you accept our{" "}
                  <a href="#" className="text-[#0074ED] hover:underline">Privacy Policy</a>.
                </div>
              </div>

              {/* Card 2: Guide download */}
              <div className="card">
                <h3>Ready to learn more?</h3>
                <p>Download our quick guide to get started.</p>
                <div className="chip">
                  <span role="img" aria-hidden>⬇️</span> Download Guide
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
