import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogImage, ogType, canonicalUrl }) => {
  const siteTitle = "TX-Pathwing - Elite Learning Platform";
  const fullTitle = title ? `${title} | TX-Pathwing` : siteTitle;
  const defaultDescription = "TX-Pathwing is the elite learning platform for software development, testing, data science, and more. Transform your career with industry-leading courses.";
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || "learning platform, software development, testing, data science, coding, career growth, TX-Pathwing";
  const siteUrl = "https://txpathwing.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Base */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {canonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={fullCanonicalUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
