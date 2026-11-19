import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  BrainCircuit,
  Globe,
  BriefcaseBusiness,
  ChartNoAxesCombined,
} from "lucide-react";
import SEO from "../../pages/SEO/SEO";
import { categories, allBlogPosts } from "../../pages/SEO/BlogData";
import { BlogArticleCard } from "./components/BlogArticleCard";
import { BlogArticleDetailModal } from "./components/BlogArticleDetailModal";
import BlogOverview from "./BlogOverview";
import BlogStories from "./BlogStories";
import BlogWriteForUs from "./BlogWriteForUs";
import "./Blog.css";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

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
        title="Blog & Tech Articles | TX-Pathwing"
        description="Actionable insights, expert tutorials, and career guidance in AI, Web Development, Cloud, and Software Engineering."
      />

      <section className="blog-articles-section">
        <div className="blog-articles-container">
          <div className="blog-articles-header">
            <div>
              <h2 className="blog-section-heading">
                Explore Our <span>Top Articles</span>
              </h2>

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
                        <span className="blog-cat-label">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {activeCategory !== "All" && (
                <p className="blog-filter-indicator">
                  Showing results for{" "}
                  <span className="blog-filter-category-name">{activeCategory}</span>
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

          <div className="blog-articles-grid">
            <AnimatePresence mode="popLayout">
              {(showAllArticles ? filteredPosts : filteredPosts.slice(0, 4)).map(
                (post, index) => (
                  <BlogArticleCard
                    key={post.id}
                    post={post}
                    index={index}
                    onSelect={setSelectedArticle}
                    bookmarked={bookmarkedIds.includes(post.id)}
                    onToggleBookmark={toggleBookmark}
                    isCopied={copiedId === post.id}
                    onShare={handleShare}
                  />
                )
              )}
            </AnimatePresence>
          </div>

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
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="blog-empty-state-btn"
              >
                Reset Filters
              </button>
            </div>
          )}

          <BlogOverview />
          <BlogStories />
          <BlogWriteForUs />

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
                <button className="blog-newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogArticleDetailModal
        selectedArticle={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        copiedId={copiedId}
        onShare={handleShare}
      />
    </div>
  );
};

export default Blog;
