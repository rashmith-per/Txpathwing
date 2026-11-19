import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Check, Clock, Share2, Sparkles, X } from "lucide-react";
import blogHeroFallback from "../../../../../../assets/blog_hero_book.jpg";

export function BlogArticleDetailModal({
  selectedArticle,
  onClose,
  bookmarkedIds,
  onToggleBookmark,
  copiedId,
  onShare,
}) {
  return (
    <AnimatePresence>
      {selectedArticle && (
        <div className="blog-modal-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                type="button"
                onClick={onClose}
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

              <h2 className="blog-modal-title">{selectedArticle.title}</h2>

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
                  type="button"
                  onClick={(e) => onToggleBookmark(selectedArticle.id, e)}
                  className="blog-modal-save-btn"
                >
                  <Bookmark
                    size={16}
                    className={
                      bookmarkedIds.includes(selectedArticle.id)
                        ? "blog-bookmark-active"
                        : ""
                    }
                  />
                  {bookmarkedIds.includes(selectedArticle.id)
                    ? "Saved"
                    : "Save Article"}
                </button>

                <div className="blog-modal-actions">
                  <button
                    type="button"
                    onClick={(e) => onShare(selectedArticle, e)}
                    className="blog-modal-share-btn"
                  >
                    {copiedId === selectedArticle.id ? (
                      <>
                        <Check size={16} className="blog-check-icon" /> Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={16} /> Share
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
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
  );
}
