import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Check, Clock, Share2 } from "lucide-react";
import blogHeroFallback from "../../../../../../assets/blog_hero_book.jpg";

export function BlogArticleCard({
  post,
  index,
  onSelect,
  bookmarked,
  onToggleBookmark,
  isCopied,
  onShare,
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(post)}
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
            <span className="blog-card-category-badge">{post.category}</span>
            <span className="blog-card-readtime">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-desc">{post.description}</p>
        </div>

        <div className="blog-card-footer">
          <span className="blog-card-read-action">
            Read article <ArrowRight size={13} />
          </span>

          <div className="blog-card-actions">
            <button
              type="button"
              onClick={(e) => onToggleBookmark(post.id, e)}
              title="Bookmark article"
              className="blog-card-action-btn"
            >
              <Bookmark
                size={15}
                className={bookmarked ? "blog-bookmark-active" : ""}
              />
            </button>
            <button
              type="button"
              onClick={(e) => onShare(post, e)}
              title="Share link"
              className="blog-card-action-btn"
            >
              {isCopied ? (
                <Check size={15} className="blog-check-icon" />
              ) : (
                <Share2 size={15} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
