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
  Terminal,
  CheckCircle2,
  GraduationCap,
  Building2,
  ShieldCheck,
  Send,
  Calendar,
  Compass,
  ThumbsUp,
  Eye,
} from "lucide-react";
import {
  BLOG_CATEGORIES,
  FEATURED_ARTICLE,
  LATEST_ARTICLES,
  LEARNING_JOURNEY_STEPS,
  INTERNSHIP_WORKFLOW_STEPS,
  COLLEGE_LMS_BENEFITS,
} from "./Blog.js";
import "./Blog.css";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [clapsMap, setClapsMap] = useState({
    "featured-1": FEATURED_ARTICLE.claps,
    ...Object.fromEntries(LATEST_ARTICLES.map((a) => [a.id, a.claps])),
  });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filtered posts based on active category & search query
  const filteredPosts = useMemo(() => {
    return LATEST_ARTICLES.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.shortDescription.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const handleClap = (id, e) => {
    e?.stopPropagation();
    setClapsMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setNewsletterEmail(""), 3000);
    }
  };

  return (
    <div className="tx-blog-page">
      

      {/* ───────────────────────────────────────────────────────
          1. HERO SECTION
      ──────────────────────────────────────────────────────── */}
      <section className="tx-hero-section">
        <div className="tx-hero-glow-blob-1" />
        <div className="tx-hero-glow-blob-2" />
        <div className="tx-hero-grid-pattern" />

        <div className="tx-hero-container">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tx-hero-badge"
          >
            <Sparkles size={15} className="text-cyan" />
            <span>Official Journal for B.Tech & Degree Students</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tx-hero-title"
          >
            Practical Technology. Real Experience. <br />
            <span className="tx-gradient-text">Zero Fluff.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="tx-hero-description"
          >
            Bridge the campus-to-corporate gap. Master hands-on programming with
            in-browser code execution, build in cloud virtual labs, complete
            official internships, and graduate with verifiable digital credentials.
          </motion.p>

          {/* Search Bar with Live Matching */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="tx-search-container"
          >
            <form onSubmit={(e) => e.preventDefault()} className="tx-search-form">
              <Search size={20} className="tx-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles on coding practice, internships, virtual labs, hackathons..."
                className="tx-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="tx-search-clear"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="tx-search-btn">
                <span>Search</span>
              </button>
            </form>
          </motion.div>

          {/* Quick Metrics from PDF */}
          <div className="tx-hero-metrics">
            <div className="tx-metric-pill">
              <span className="tx-metric-dot" />
              <strong>8 Core Tracks</strong> from MVP Curriculum
            </div>
            <div className="tx-metric-pill">
              <Terminal size={14} className="text-blue" />
              <span>In-Browser Test Case Execution</span>
            </div>
            <div className="tx-metric-pill">
              <Compass size={14} className="text-purple" />
              <span>Official & Occasional Internships</span>
            </div>
            <div className="tx-metric-pill">
              <ShieldCheck size={14} className="text-cyan" />
              <span>Verifiable QR Credentials</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          2. BLOG CATEGORIES BAR
      ──────────────────────────────────────────────────────── */}
      <section className="tx-categories-section">
        <div className="tx-categories-wrapper">
          <div className="tx-categories-scroll">
            {BLOG_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`tx-category-chip ${isActive ? "active" : ""}`}
                >
                  <Icon size={16} className="tx-category-icon" />
                  <span>{cat.name}</span>
                  <span className="tx-category-count">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          3. FEATURED ARTICLE SECTION
      ──────────────────────────────────────────────────────── */}
      {(activeCategory === "All" ||
        activeCategory === FEATURED_ARTICLE.category) &&
        !searchQuery && (
          <section id="featured" className="tx-featured-section">
            <div className="tx-container">
              <div className="tx-featured-label-row">
                <span className="tx-section-tag">
                  <Sparkles size={14} /> Spotlight Story
                </span>
                <span className="tx-featured-sublabel">
                  Must-read for pre-final & final year engineering students
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="tx-featured-card"
                onClick={() => setSelectedArticle(FEATURED_ARTICLE)}
              >
                <div className="tx-featured-media">
                  <img
                    src={FEATURED_ARTICLE.image}
                    alt={FEATURED_ARTICLE.title}
                    className="tx-featured-img"
                  />
                  <div className="tx-featured-media-overlay" />
                  <span className="tx-category-badge tx-badge-float">
                    {FEATURED_ARTICLE.category}
                  </span>
                </div>

                <div className="tx-featured-body">
                  <div className="tx-article-meta">
                    <span className="tx-meta-item">
                      <Clock size={14} /> {FEATURED_ARTICLE.readTime}
                    </span>
                    <span className="tx-meta-dot">•</span>
                    <span className="tx-meta-item">
                      <Calendar size={14} /> {FEATURED_ARTICLE.date}
                    </span>
                    <span className="tx-meta-dot">•</span>
                    <span className="tx-meta-item">
                      <Eye size={14} /> {FEATURED_ARTICLE.views}
                    </span>
                  </div>

                  <h2 className="tx-featured-title">
                    {FEATURED_ARTICLE.title}
                  </h2>

                  <p className="tx-featured-excerpt">
                    {FEATURED_ARTICLE.shortDescription}
                  </p>

                  <div className="tx-featured-takeaway-box">
                    <strong>Key Student Takeaway:</strong> Problem solving with
                    live test cases and mentor audits transforms academic theory
                    into verifiable corporate proof recruiters respect.
                  </div>

                  <div className="tx-featured-footer">
                    <div className="tx-author-info">
                      <div className="tx-author-avatar">TX</div>
                      <div>
                        <div className="tx-author-name">
                          {FEATURED_ARTICLE.author}
                        </div>
                        <div className="tx-author-role">
                          {FEATURED_ARTICLE.authorRole}
                        </div>
                      </div>
                    </div>

                    <div className="tx-card-actions">
                      <button
                        type="button"
                        onClick={(e) => handleClap(FEATURED_ARTICLE.id, e)}
                        className="tx-action-btn clap"
                        title="Applaud article"
                      >
                        <ThumbsUp size={16} />
                        <span className="tx-btn-count">
                          {clapsMap[FEATURED_ARTICLE.id]}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(FEATURED_ARTICLE.id, e)}
                        className={`tx-action-btn ${
                          bookmarkedIds.includes(FEATURED_ARTICLE.id)
                            ? "saved"
                            : ""
                        }`}
                        title="Bookmark article"
                      >
                        <Bookmark size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleShare(FEATURED_ARTICLE, e)}
                        className="tx-action-btn"
                        title="Share link"
                      >
                        {copiedId === FEATURED_ARTICLE.id ? (
                          <Check size={17} className="text-green" />
                        ) : (
                          <Share2 size={17} />
                        )}
                      </button>

                      <button className="tx-btn-primary">
                        <span>Read Full Story</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

      {/* ───────────────────────────────────────────────────────
          4. LATEST BLOG ARTICLES GRID
      ──────────────────────────────────────────────────────── */}
      <section id="articles" className="tx-articles-grid-section">
        <div className="tx-container">
          <div className="tx-section-header">
            <div>
              <span className="tx-section-tag">
                <BookOpen size={14} /> Curated Guides
              </span>
              <h2 className="tx-section-title">
                {activeCategory === "All"
                  ? "Latest Student Insights"
                  : `${activeCategory} Articles`}
              </h2>
            </div>

            <div className="tx-header-stats">
              Showing <strong>{filteredPosts.length}</strong> realistic articles
              grounded in TX-Path-Wing MVP
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="tx-empty-state">
              <Search size={40} className="tx-empty-icon" />
              <h3>No articles found</h3>
              <p>
                No articles matched "{searchQuery}". Try searching for
                "internship", "coding", "mentor", or "labs".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="tx-btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="tx-grid">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="tx-article-card"
                    onClick={() => setSelectedArticle(post)}
                  >
                    <div className="tx-card-image-wrap">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="tx-card-image"
                        loading="lazy"
                      />
                      <div className="tx-card-badge-row">
                        <span className="tx-category-badge">
                          {post.category}
                        </span>
                        <span className="tx-readtime-badge">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="tx-card-content">
                      <div className="tx-card-date">
                        <Calendar size={13} /> {post.date}
                        <span className="tx-meta-dot">•</span>
                        <Eye size={13} /> {post.views}
                      </div>

                      <h3 className="tx-card-title">{post.title}</h3>

                      <p className="tx-card-description">
                        {post.shortDescription}
                      </p>

                      <div className="tx-card-tags">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tx-tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="tx-card-bottom">
                        <div className="tx-card-author">
                          <span className="tx-avatar-dot">TX</span>
                          <span className="tx-card-author-name">
                            {post.author}
                          </span>
                        </div>

                        <div className="tx-card-actions-mini">
                          <button
                            type="button"
                            onClick={(e) => handleClap(post.id, e)}
                            className="tx-mini-btn"
                            title="Clap"
                          >
                            <ThumbsUp size={14} />
                            <span className="tx-mini-count">
                              {clapsMap[post.id]}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(post.id, e)}
                            className={`tx-mini-btn ${
                              bookmarkedIds.includes(post.id) ? "saved" : ""
                            }`}
                            title="Save"
                          >
                            <Bookmark size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleShare(post, e)}
                            className="tx-mini-btn"
                            title="Share"
                          >
                            {copiedId === post.id ? (
                              <Check size={14} className="text-green" />
                            ) : (
                              <Share2 size={14} />
                            )}
                          </button>

                          <span className="tx-readmore-trigger">
                            <span>Read</span>
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          5. STUDENT LEARNING JOURNEY (Styled after screenshot_step8.png)
      ──────────────────────────────────────────────────────── */}
      <section id="journey" className="tx-journey-section">
        <div className="tx-container">
          <div className="tx-section-header-center">
            <span className="tx-section-tag">
              <GraduationCap size={14} /> The Learner Journey
            </span>
            <h2 className="tx-section-title">
              Six Stages. One Verifiable Record.
            </h2>
            <p className="tx-section-subtitle">
              Learn → Practice → Build → Get Assessed → Get Certified → Become
              Industry Ready. The core competency pathway defined in the
              TX-Path-Wing platform.
            </p>
          </div>

          <div className="tx-journey-grid">
            {LEARNING_JOURNEY_STEPS.map((step, idx) => {
              const isCurrent = step.badge === "CURRENT";
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`tx-stage-card ${isCurrent ? "active-stage" : ""}`}
                >
                  <div className="tx-stage-head">
                    <span className="tx-stage-num">{step.step}</span>
                    <div className="tx-stage-badges">
                      <span
                        className={`tx-pill-badge ${
                          step.badge === "PASSED"
                            ? "passed"
                            : step.badge === "CURRENT"
                            ? "current"
                            : "goal"
                        }`}
                      >
                        {step.badge === "PASSED" && <Check size={11} />}
                        {step.badge}
                      </span>
                      {step.aiLayer && (
                        <span className="tx-pill-badge ai">
                          <span className="tx-ai-dot" /> AI LAYER
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="tx-stage-title">{step.title}</h3>
                  <div className="tx-stage-subtitle">{step.subtitle}</div>
                  <p className="tx-stage-desc">{step.description}</p>

                  <div className="tx-stage-footer">
                    <span className="tx-stage-code">{step.stageCode}</span>
                    <div className="tx-stage-arrow-btn">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* ───────────────────────────────────────────────────────
          7. INTERNSHIP & CAREER SECTION (Official & Occasional)
      ──────────────────────────────────────────────────────── */}
      <section id="internships" className="tx-internship-section">
        <div className="tx-container">
          <div className="tx-split-box">
            <div className="tx-split-content">
              <span className="tx-section-tag">
                <Compass size={14} /> Career Acceleration
              </span>
              <h2 className="tx-split-title">
                Real Internships, Tangible Deliverables & Industry Evaluation
              </h2>
              <p className="tx-split-desc">
                Recruiters don't just ask where you interned; they ask what you
                engineered. TX-Path-Wing structures student internships around
                actual sprint milestones, mentor pull-request audits, and formal
                skill assessments.
              </p>

              <div className="tx-internship-types">
                <div className="tx-type-card">
                  <div className="tx-type-icon-box">
                    <Building2 size={20} className="text-purple" />
                  </div>
                  <div>
                    <h4 className="tx-type-title">Official Internships</h4>
                    <p className="tx-type-desc">
                      Structured programs with formal eligibility screening,
                      targeted refresher training, milestone tasks, mentor
                      audits, and final certification.
                    </p>
                  </div>
                </div>

                <div className="tx-type-card">
                  <div className="tx-type-icon-box">
                    <Calendar size={20} className="text-blue" />
                  </div>
                  <div>
                    <h4 className="tx-type-title">Occasional Internships</h4>
                    <p className="tx-type-desc">
                      Flexible summer sprints, project-based opportunities, and
                      event-driven challenges designed to fit semester vacation
                      windows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tx-split-cta-row">
                <a href="#register" className="tx-btn-primary">
                  <span>Explore Internship Openings</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Workflow steps column */}
            <div className="tx-workflow-box">
              <h3 className="tx-workflow-header">
                <ShieldCheck size={18} className="text-cyan" />
                <span>The 6-Step Internship Workflow</span>
              </h3>

              <div className="tx-workflow-timeline">
                {INTERNSHIP_WORKFLOW_STEPS.map((item) => (
                  <div key={item.num} className="tx-workflow-step">
                    <div className="tx-step-circle">{item.num}</div>
                    <div className="tx-step-body">
                      <div className="tx-step-title">{item.title}</div>
                      <div className="tx-step-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          8. COLLEGE & LMS SECTION (Institutional Benefits)
      ──────────────────────────────────────────────────────── */}
      <section id="institutions" className="tx-college-section">
        <div className="tx-container">
          <div className="tx-college-banner">
            <div className="tx-college-head">
              <span className="tx-section-tag light">
                <Building2 size={14} /> Institutional LMS
              </span>
              <h2 className="tx-college-title">
                Empowering Colleges & Universities with Dedicated LMS
                Environments
              </h2>
              <p className="tx-college-desc">
                Colleges and institutions can subscribe to TX-Path-Wing LMS for
                complete tenant isolation, automated batch management,
                mentor-student coordination, and real-time accreditation
                reporting.
              </p>
            </div>

            <div className="tx-college-grid">
              {COLLEGE_LMS_BENEFITS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="tx-college-card">
                    <div className="tx-college-icon-circle">
                      <Icon size={20} />
                    </div>
                    <h4 className="tx-college-card-title">{item.title}</h4>
                    <p className="tx-college-card-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="tx-college-footer-bar">
              <div>
                <strong>Need custom LMS deployment for your campus?</strong>
                <p>Support for white-labeling, custom batches, and NAAC outcome tracking.</p>
              </div>
              <a href="#college-demo" className="tx-btn-white">
                Request Institution Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          9. NEWSLETTER / SUBSCRIBE SECTION
      ──────────────────────────────────────────────────────── */}
      <section className="tx-newsletter-section">
        <div className="tx-container">
          <div className="tx-newsletter-box">
            <div className="tx-newsletter-glow" />
            <div className="tx-newsletter-content">
              <span className="tx-section-tag">
                <Sparkles size={14} /> Weekly Curated Digest
              </span>
              <h2 className="tx-newsletter-title">
                Stay Ahead. Keep Learning.
              </h2>
              <p className="tx-newsletter-desc">
                Subscribe to receive fresh articles on student internships,
                coding problem-solving strategies, upcoming hackathons, and
                campus placement blueprints directly in your inbox.
              </p>

              {subscribed ? (
                <div className="tx-newsletter-success">
                  <CheckCircle2 size={22} className="text-green" />
                  <span>
                    Thank you! You are subscribed to the TX-Path-Wing Learning
                    Journal.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="tx-newsletter-form">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your college or personal email..."
                    className="tx-newsletter-input"
                  />
                  <button type="submit" className="tx-btn-primary">
                    <span>Subscribe Now</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
              <div className="tx-newsletter-fineprint">
                No spam. Strictly educational guides and verified opportunities.
                Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          10. FINAL CLOSING CTA SECTION
      ──────────────────────────────────────────────────────── */}
      <section className="tx-final-cta-section">
        <div className="tx-container">
          <div className="tx-final-cta-card">
            <span className="tx-section-tag light">
              <RocketIcon size={14} /> Launch Your Career
            </span>
            <h2 className="tx-final-cta-title">
              Turn Classroom Theory into Production Engineering Skills
            </h2>
            <p className="tx-final-cta-subtitle">
              Join thousands of B.Tech and degree students mastering hands-on
              coding, completing verified internships, and unlocking career
              breakthroughs.
            </p>

            <div className="tx-cta-actions-grid">
              <a href="#courses" className="tx-cta-btn highlight">
                <span>Explore Courses</span>
                <ArrowRight size={16} />
              </a>
              <a href="#internships" className="tx-cta-btn">
                <span>Explore Internships</span>
                <ArrowRight size={16} />
              </a>
              <a href="#events" className="tx-cta-btn">
                <span>Explore Events & Hackathons</span>
                <ArrowRight size={16} />
              </a>
              <a href="#register" className="tx-cta-btn outline">
                <span>Register as Student</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────
          INTERACTIVE FULL ARTICLE MODAL
      ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="tx-modal-backdrop"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="tx-modal-window"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tx-modal-header">
                <div className="tx-modal-badge-row">
                  <span className="tx-category-badge">
                    {selectedArticle.category}
                  </span>
                  <span className="tx-readtime-badge">
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="tx-modal-close-btn"
                  title="Close article"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="tx-modal-body">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="tx-modal-featured-img"
                />

                <h1 className="tx-modal-title">{selectedArticle.title}</h1>

                <div className="tx-modal-meta-row">
                  <div className="tx-author-info">
                    <div className="tx-author-avatar">TX</div>
                    <div>
                      <div className="tx-author-name">
                        {selectedArticle.author}
                      </div>
                      <div className="tx-author-role">
                        {selectedArticle.authorRole}
                      </div>
                    </div>
                  </div>
                  <div className="tx-meta-date">
                    <Calendar size={14} /> {selectedArticle.date}
                    <span className="tx-meta-dot">•</span>
                    <Eye size={14} /> {selectedArticle.views}
                  </div>
                </div>

                {selectedArticle.keyTakeaways && (
                  <div className="tx-modal-takeaways-card">
                    <h4>
                      <CheckCircle2 size={18} className="text-green" />
                      <span>Key Takeaways for Students</span>
                    </h4>
                    <ul>
                      {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="tx-modal-article-text">
                  {selectedArticle.content.split("\n\n").map((para, idx) => {
                    const trimmed = para.trim();
                    if (trimmed.startsWith("### ")) {
                      return <h3 key={idx}>{trimmed.replace("### ", "")}</h3>;
                    }
                    if (trimmed.startsWith("#### ")) {
                      return <h4 key={idx}>{trimmed.replace("#### ", "")}</h4>;
                    }
                    if (trimmed.startsWith("---")) {
                      return <hr key={idx} className="tx-modal-hr" />;
                    }
                    return <p key={idx}>{trimmed}</p>;
                  })}
                </div>

                <div className="tx-modal-tags-row">
                  <strong>Related Topics:</strong>
                  {selectedArticle.tags?.map((t, i) => (
                    <span key={i} className="tx-tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="tx-modal-footer-cta">
                  <div>
                    <h4>Accelerate Your Skills with TX-Path-Wing</h4>
                    <p>Enroll in courses or apply for verified internship batches today.</p>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="tx-btn-primary"
                  >
                    Close & Explore More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple inline rocket icon helper
function RocketIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a14.92 14.92 0 01-6.16 2.58"
      />
    </svg>
  );
}

export default Blog;
