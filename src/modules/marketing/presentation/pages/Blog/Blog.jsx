import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Clock,
  BookOpen,
  Share2,
  Bookmark,
  X,
  Check,
  Sparkles,
  BrainCircuit,
  Globe,
  BriefcaseBusiness,
  ChartNoAxesCombined,
} from "lucide-react";
import SEO from "../../pages/SEO/SEO";
import { categories, allBlogPosts } from "../../pages/SEO/BlogData";
import blogHeroImg from "../../../../../assets/blog/blog-hero-exact.png";
import blogHeroFallback from "../../../../../assets/blog_hero_book.jpg";
import BlogAnimation from "./BlogAnimation";
import "./Blog.css";
import BlogOverview from "./BlogOverview";
import BlogStories from "./BlogStories";
import BlogWriteForUs from "./BlogWriteForUs";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Filtered posts based on active category & search keyword
  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category.toLowerCase().includes(activeCategory.toLowerCase());
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShare = (post, e) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="blog-page-container">
      <SEO
        title="Blog & Tech Articles | TXhub"
        description="Actionable insights, expert tutorials, and career guidance in AI, Web Development, Cloud, and Software Engineering."
      />

      {/* ── 1. HERO SECTION ── */}





      {/* ── 2. TOP ARTICLES SECTION ── */}
      <section className="blog-articles-section">
        <div className="blog-articles-container">
          {/* Section Header */}
          <div className="blog-articles-header">
            <div>
              <h2 className="blog-section-heading">
                Explore Our <span>Top Articles</span>
              </h2>
              {/* Category Navigation Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="blog-categories-nav"
              >
                <div className="blog-categories-track">
                  {categories.map((cat) => {
                    const IconComponent =
                      cat.name.toLowerCase().includes("ai")
                        ? BrainCircuit
                        : cat.name.toLowerCase().includes("web")
                          ? Globe
                        : cat.name.toLowerCase().includes("career")
                          ? BriefcaseBusiness
                        : cat.name.toLowerCase().includes("data")
                          ? ChartNoAxesCombined
                          : cat.icon;
                    const isActive = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`blog-category-btn ${isActive ? "active" : ""}`}
                      >
                        <div className="blog-cat-icon-circle">
                          <IconComponent size={19} />
                        </div>
                        <span className="blog-cat-label">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </motion.div>
              {activeCategory !== "All" && (
                <p className="blog-filter-indicator">
                  Showing results for <span className="blog-filter-category-name">{activeCategory}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setShowAllArticles(!showAllArticles);
                if (activeCategory !== "All") setActiveCategory("All");
              }}
              className="blog-view-all-link"
            >
              <span>{showAllArticles ? "Show Top 4" : "View all"}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Articles Grid */}
          <div className="blog-articles-grid">
            <AnimatePresence mode="popLayout">
              {(showAllArticles ? filteredPosts : filteredPosts.slice(0, 4)).map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedArticle(post)}
                  className="blog-card"
                >
                  <div className="blog-card-media">
                    <img
                      src={post.image || blogHeroFallback}
                      alt={post.title.replace("\n", " ")}
                      className="blog-card-img"
                    />
                    <div className="blog-card-img-tint" />
                  </div>

                  <div className="blog-card-body">
                    <div>
                      <div className="blog-card-meta-header">
                        <span className="blog-card-category-badge">
                          {post.category}
                        </span>
                        <span className="blog-card-readtime">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="blog-card-title">
                        {post.title}
                      </h3>

                      <p className="blog-card-desc">
                        {post.description}
                      </p>
                    </div>

                    <div className="blog-card-footer">
                      <span className="blog-card-read-action">
                        Read article <ArrowRight size={13} />
                      </span>

                      <div className="blog-card-actions">
                        <button
                          onClick={(e) => toggleBookmark(post.id, e)}
                          title="Bookmark article"
                          className="blog-card-action-btn"
                        >
                          <Bookmark size={15} className={bookmarkedIds.includes(post.id) ? "blog-bookmark-active" : ""} />
                        </button>
                        <button
                          onClick={(e) => handleShare(post, e)}
                          title="Share link"
                          className="blog-card-action-btn"
                        >
                          {copiedId === post.id ? <Check size={15} className="blog-check-icon" /> : <Share2 size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty Search State */}
          {filteredPosts.length === 0 && (
            <div className="blog-empty-state">
              <div className="blog-empty-state-icon">
                <BookOpen size={24} />
              </div>
              <h3 className="blog-empty-state-title">No articles found</h3>
              <p className="blog-empty-state-desc">
                Try searching with different keywords or reset your filters.
              </p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="blog-empty-state-btn"
              >
                Reset Filters
              </button>
            </div>
          )}

          <BlogOverview />
          <BlogStories />
          <BlogWriteForUs />

          {/* Newsletter CTA */}
          <div className="blog-newsletter-card">
            <div className="blog-newsletter-inner">
              <span className="blog-newsletter-badge">
                <Sparkles size={13} /> Stay Updated
              </span>
              <h3 className="blog-newsletter-title">
                Join Our Tech Learning Community
              </h3>
              <p className="blog-newsletter-desc">
                Get the latest articles, tutorials, and career insights delivered to your inbox weekly.
              </p>
              <div className="blog-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="blog-newsletter-input"
                />
                <button className="blog-newsletter-btn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ARTICLE DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="blog-modal-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="blog-modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="blog-modal-dialog"
            >
              <div className="blog-modal-header-img-box">
                <img
                  src={selectedArticle.image || blogHeroFallback}
                  alt={selectedArticle.title.replace("\n", " ")}
                  className="blog-modal-header-img"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="blog-modal-close-btn"
                  aria-label="Close article"
                >
                  <X size={18} />
                </button>
                <div className="blog-modal-header-badges">
                  <span className="blog-modal-category-badge">
                    {selectedArticle.category}
                  </span>
                  <span className="blog-modal-readtime-badge">
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="blog-modal-body">
                <div className="blog-modal-meta-row">
                  <span>By {selectedArticle.author}</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h2 className="blog-modal-title">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.tags && (
                  <div className="blog-modal-tags-list">
                    {selectedArticle.tags.map((tag) => (
                      <span key={tag} className="blog-modal-tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {selectedArticle.keyTakeaway && (
                  <div className="blog-modal-takeaway">
                    <h4 className="blog-modal-takeaway-heading">
                      <Sparkles size={16} className="blog-takeaway-sparkle-icon" /> Key Takeaway
                    </h4>
                    <p className="blog-modal-takeaway-text">
                      {selectedArticle.keyTakeaway}
                    </p>
                  </div>
                )}

                <div className="blog-modal-content-text">
                  {selectedArticle.content}
                </div>

                <div className="blog-modal-footer">
                  <button
                    onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                    className="blog-modal-save-btn"
                  >
                    <Bookmark size={16} className={bookmarkedIds.includes(selectedArticle.id) ? "blog-bookmark-active" : ""} />
                    {bookmarkedIds.includes(selectedArticle.id) ? "Saved" : "Save Article"}
                  </button>

                  <div className="blog-modal-actions">
                    <button
                      onClick={(e) => handleShare(selectedArticle, e)}
                      className="blog-modal-share-btn"
                    >
                      {copiedId === selectedArticle.id ? <><Check size={16} className="blog-check-icon" /> Copied!</> : <><Share2 size={16} /> Share</>}
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="blog-modal-close-action-btn"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;
