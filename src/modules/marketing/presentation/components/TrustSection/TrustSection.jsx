
import React from "react";
import {
  PlayCircle,
  Stamp,
  Building2,
  LockKeyhole,
  ClipboardCheck,
  ReceiptText,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import "./TrustSection.css";

const securityFeatures = [
  {
    icon: PlayCircle,
    number: "01",
    title: "DRM video delivery",
    description:
      "Widevine and FairPlay-class protection with tokenized, short-lived signed URLs.",
    tag: "Content protection",
  },
  {
    icon: Stamp,
    number: "02",
    title: "Dynamic watermark",
    description:
      "Personalized viewer details help identify the source of leaked recordings.",
    tag: "Smart protection",
  },
  {
    icon: Building2,
    number: "03",
    title: "Tenant isolation",
    description:
      "Separate data boundaries, branding, and domains for every institution.",
    tag: "Data security",
  },
  {
    icon: LockKeyhole,
    number: "04",
    title: "AES-256 & TLS",
    description:
      "Encryption at rest and in transit with gateway authentication and rate limiting.",
    tag: "Encryption",
  },
  {
    icon: ClipboardCheck,
    number: "05",
    title: "Audit logs",
    description:
      "Track admin actions, payment events, and important platform activity.",
    tag: "Full visibility",
  },
  {
    icon: ReceiptText,
    number: "06",
    title: "GST-compliant billing",
    description:
      "Organized invoices, tax lines, refunds, and instructor payout statements.",
    tag: "Transparent billing",
  },
];

export default function TrustSection() {
  return (
    <section className="trust-section" id="platform-security">
      <div className="trust-glow trust-glow-one" />
      <div className="trust-glow trust-glow-two" />

      <div className="trust-container">
        <div className="trust-heading">
          <div className="trust-badge">
            <ShieldCheck size={15} />
            <span>CONTENT PROTECTION & PLATFORM TRUST</span>
          </div>

          <h2>
            Your content deserves
            <span> a safer home.</span>
          </h2>

          <p>
            Enterprise-grade security, transparent operations, and trusted
            infrastructure designed for modern learning platforms.
          </p>
        </div>

        <div className="trust-top-info">
          <div className="trust-mini-stat">
            <ShieldCheck size={19} />
            <div>
              <strong>Secure by design</strong>
              <small>Protection at every layer</small>
            </div>
          </div>

          <div className="trust-mini-stat">
            <LockKeyhole size={19} />
            <div>
              <strong>Built for institutions</strong>
              <small>Privacy-focused infrastructure</small>
            </div>
          </div>
        </div>

        <div className="trust-grid">
          {securityFeatures.map(
            ({ icon: Icon, number, title, description, tag }) => (
              <article className="trust-card" key={title}>
                <div className="trust-card-header">
                  <div className="trust-icon">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <span className="trust-number">{number}</span>
                </div>

                <div className="trust-card-content">
                  <span className="trust-tag">{tag}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>

                <div className="trust-card-footer">
                  <span>Platform protection</span>
                  <ArrowUpRight size={18} />
                </div>
              </article>
            )
          )}
        </div>

        <div className="trust-bottom">
          <div className="trust-bottom-symbol">
            <ShieldCheck size={30} />
          </div>

          <div className="trust-bottom-content">
            <span>TRUSTED INFRASTRUCTURE</span>
            <h3>Security that grows with your platform.</h3>
            <p>
              Give instructors, learners, and institutions the confidence to
              build and learn with TXhub.
            </p>
          </div>

          <div className="trust-bottom-pill">
            <span />
            Protection-first platform
          </div>
        </div>
      </div>
    </section>
  );
}