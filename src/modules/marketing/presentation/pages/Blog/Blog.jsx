import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import SEO from "../../pages/SEO/SEO.jsx";
import { categories, allBlogPosts } from "../SEO/BlogData.js";
import "./Blog.css";

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
      <section className="blog-hero-section">
        {/* Background Glows */}
        <div className="blog-hero-glow-1" />
        <div className="blog-hero-glow-2" />
        <div className="blog-hero-glow-3" />
        <div className="blog-hero-grid-pattern" />

        <div className="blog-hero-content">
          <div className="blog-hero-grid">
            {/* Left Column */}
            <div className="blog-hero-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="blog-hero-title"
              >
                Your Learning <br />
                Journey <br />
                <span className="blog-hero-gradient-text">
                  Starts Here
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="blog-hero-subtitle"
              >
                Actionable insights, expert tutorials, and career guidance to help you stay ahead.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="blog-search-wrapper"
              >
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="blog-search-form"
                >
                  <Search className="text-slate-400" size={20} style={{ marginRight: "0.5rem", flexShrink: 0 }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics..."
                    className="blog-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="blog-search-clear-btn"
                      title="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="blog-search-submit-btn"
                  >
                    Search
                  </button>
                </form>
              </motion.div>

              {/* Category Navigation Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="blog-categories-nav"
              >
                <div className="blog-categories-track">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
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
            </div>

            {/* Right Column: Hero Illustration Artwork */}
            <div className="blog-hero-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="blog-hero-artwork-box"
              >
                <div className="blog-hero-art-glow" />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    src="/images/blog/blog-hero-exact.png"
                    alt="Student learning with modern technology"
                    className="blog-hero-img"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TOP ARTICLES SECTION ── */}
      <section className="blog-articles-section">
        <div className="blog-articles-container">
          {/* Section Header */}
          <div className="blog-articles-header">
            <div>
              <h2 className="blog-section-heading">
                Top Articles
              </h2>
              {activeCategory !== "All" && (
                <p className="blog-filter-indicator">
                  Showing results for <span style={{ fontWeight: 600, color: "var(--blue-600)" }}>{activeCategory}</span>
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
                      src={post.image}
                      alt={post.title.replace("\n", " ")}
                      className="blog-card-img"
                    />
                    <div className="blog-card-img-tint" />
                  </div>

                  <div className="blog-card-body">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
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
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        Read article <ArrowRight size={13} />
                      </span>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          onClick={(e) => toggleBookmark(post.id, e)}
                          title="Bookmark article"
                          style={{ padding: "0.25rem", color: "var(--slate-400)" }}
                        >
                          <Bookmark size={15} className={bookmarkedIds.includes(post.id) ? "fill-blue-600 text-blue-600" : ""} />
                        </button>
                        <button
                          onClick={(e) => handleShare(post, e)}
                          title="Share link"
                          style={{ padding: "0.25rem", color: "var(--slate-400)" }}
                        >
                          {copiedId === post.id ? <Check size={15} color="#16a34a" /> : <Share2 size={15} />}
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
            <div style={{ textAlign: "center", padding: "4rem 1rem", backgroundColor: "#ffffff", borderRadius: "1rem", border: "1px solid rgba(226,232,240,0.8)", marginTop: "1.5rem" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", background: "var(--blue-50)", color: "var(--blue-600)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem auto" }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--slate-800)", marginBottom: "0.25rem" }}>No articles found</h3>
              <p style={{ color: "var(--slate-500)", fontSize: "0.875rem", maxWidth: "24rem", margin: "0 auto 1.25rem auto" }}>
                Try searching with different keywords or reset your filters.
              </p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                style={{ padding: "0.5rem 1.25rem", backgroundColor: "var(--blue-600)", color: "#ffffff", borderRadius: "0.75rem", fontWeight: 600, fontSize: "0.875rem" }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="blog-newsletter-card">
            <div style={{ position: "relative", zIndex: 10, maxWidth: "42rem", margin: "0 auto" }}>
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
                  src={selectedArticle.image}
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
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ backgroundColor: "#9333ea", color: "#ffffff", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px", textTransform: "uppercase" }}>
                    {selectedArticle.category}
                  </span>
                  <span style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(4px)", color: "#ffffff", fontSize: "0.75rem", fontWeight: 500, padding: "0.25rem 0.75rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="blog-modal-body">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--slate-400)", marginBottom: "0.5rem", fontWeight: 500 }}>
                  <span>By {selectedArticle.author}</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h2 className="blog-modal-title">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.tags && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.25rem" }}>
                    {selectedArticle.tags.map((tag) => (
                      <span key={tag} style={{ backgroundColor: "var(--slate-100)", color: "var(--slate-600)", fontSize: "11px", fontWeight: 600, padding: "0.125rem 0.625rem", borderRadius: "0.375rem", border: "1px solid rgba(226, 232, 240, 0.6)" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {selectedArticle.keyTakeaway && (
                  <div className="blog-modal-takeaway">
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--blue-900)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Sparkles size={16} color="#2563eb" /> Key Takeaway
                    </h4>
                    <p style={{ fontSize: "0.875rem", color: "var(--blue-800)", lineHeight: 1.625, fontWeight: 500 }}>
                      {selectedArticle.keyTakeaway}
                    </p>
                  </div>
                )}

                <div className="blog-modal-content-text">
                  {selectedArticle.content}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid var(--slate-100)" }}>
                  <button
                    onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--slate-600)" }}
                  >
                    <Bookmark size={16} className={bookmarkedIds.includes(selectedArticle.id) ? "fill-blue-600 text-blue-600" : ""} />
                    {bookmarkedIds.includes(selectedArticle.id) ? "Saved" : "Save Article"}
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                      onClick={(e) => handleShare(selectedArticle, e)}
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--slate-600)", backgroundColor: "#f1f5f9" }}
                    >
                      {copiedId === selectedArticle.id ? <><Check size={16} color="#16a34a" /> Copied!</> : <><Share2 size={16} /> Share</>}
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      style={{ padding: "0.5rem 1.25rem", backgroundColor: "var(--blue-600)", color: "#ffffff", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600 }}
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
