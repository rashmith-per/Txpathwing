import React, { useState } from "react";
import "./CTA.css";
import txIcon from "./tx-icon.jpg";

const VALID_ID = "PW-2026-4F19-AK73";

export default function VerificationSection() {
  const [inputId, setInputId] = useState(VALID_ID);
  const [status, setStatus] = useState("verified"); // verified | invalid | idle
  const [showCert, setShowCert] = useState(false);
  const [theme, setTheme] = useState("indigo"); // "indigo" | "cyber" | "gold"

  const handleVerify = () => {
    const val = inputId.trim().toUpperCase();
    if (!val) {
      setStatus("idle");
      return;
    }
    if (val === VALID_ID) {
      setStatus("verified");
    } else {
      setStatus("invalid");
    }
  };

  const handleDownload = () => {
    setShowCert(true);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowCert(false);
      }
    };
    if (showCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showCert]);

  return (
    <section className={`verify-section theme-${theme}`}>
      <div className="verify-container">
        {/* Left Content */}
        <div className="left-content">
          <div className="theme-switcher-bar">
            <span className="theme-switcher-title mono-font">THEME:</span>
            <div className="theme-pills">
              <button
                type="button"
                className={`theme-pill-btn ${theme === "indigo" ? "active" : ""}`}
                onClick={() => setTheme("indigo")}
                title="TX Official Brand Gradient Theme"
              >
                <span className="pill-color-dot indigo-dot"></span>
                Official Indigo
              </button>
              <button
                type="button"
                className={`theme-pill-btn ${theme === "cyber" ? "active" : ""}`}
                onClick={() => setTheme("cyber")}
                title="Cryptographic Dark Cyber Security Theme"
              >
                <span className="pill-color-dot cyber-dot"></span>
                Cyber Shield
              </button>
              <button
                type="button"
                className={`theme-pill-btn ${theme === "gold" ? "active" : ""}`}
                onClick={() => setTheme("gold")}
                title="Academic Prestige Gold Theme"
              >
                <span className="pill-color-dot gold-dot"></span>
                Prestige Gold
              </button>
            </div>
          </div>

          <div className="top-badge-wrap">
            <span className="top-badge mono-font">
              <span className="badge-shield-dot" />
              CREDENTIAL VERIFICATION
            </span>
          </div>

          <h1 className="main-heading">
            Any certificate,{" "}
            <span className="heading-gradient">verifiable in public</span>
          </h1>

          <p className="sub-text">
            Every <span className="text-highlight">Pathwing certificate</span> carries a unique ID and QR that resolves
            to this page. <span className="text-dark">Employers check the credential</span> without contacting
            anyone — and see the <span className="assessment-chip mono-font">assessment behind it</span>, not just a name and a
            date.
          </p>

          <div className="trust-features mono-font">
            <span className="trust-item">
              <span className="trust-icon">✓</span> Instant QR Verify
            </span>
            <span className="trust-item">
              <span className="trust-icon">✓</span> Cryptographic ID
            </span>
            <span className="trust-item">
              <span className="trust-icon">✓</span> Tamper-Proof
            </span>
          </div>

          <div className="input-group">
            <div className="input-field-wrap">
              <span className="input-prefix mono-font">ID</span>
              <input
                className="text-input"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="Enter certificate ID (e.g. PW-2026-4F19-AK73)"
              />
            </div>
            <button className="verify-btn mono-font" onClick={handleVerify}>
              Verify Credential ➔
            </button>
          </div>
        </div>
        {/* Right Card */}
        <div className="right-content">
          {status === "verified" && (
            <div className="main-card">
              <div className="card-top">
                <span className="status-pill">
                  <span className="dot-green"></span> Verified credential
                </span>
                <div className="tx-icon-action-area">
                  <div
                    className="tx-logo-badge"
                    onClick={handleDownload}
                    title="TX Certified - Click to view certificate"
                  >
                    <img src={txIcon} alt="TX Logo" className="tx-badge-img" />
                  </div>
                  <button className="down-btn" onClick={handleDownload}>
                    <span>⬇</span> Download
                  </button>
                </div>
              </div>
              <h3 className="card-title">
                Python Full Stack with Django & React
              </h3>
              <p className="card-id">PW-2026-4F19-AK73</p>

              <div className="line-div"></div>

              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">AWARDED TO</span>
                  <span className="info-value">BOMMALA VISHNU</span>
                </div>
                <div className="info-row">
                  <span className="info-label">ISSUED</span>
                  <span className="info-value">04 August 2026</span>
                </div>
                <div className="info-row">
                  <span className="info-label">RESULT</span>
                  <span className="info-value">95%</span>
                </div>
                <div className="info-row">
                  <span className="info-label">ISSUER</span>
                  <span className="info-value">QIS COLLAGE </span>
                </div>
                <div className="info-row">
                  <span className="info-label">VALIDITY</span>
                  <span className="info-value">No expiry</span>
                </div>
              </div>
              <div className="card-foot">
                <img src={txIcon} alt="TX" className="small-logo" />
                <span>TX Verified • pathwing.in/verify</span>
              </div>
            </div>
          )}
          {status === "invalid" && (
            <div className="main-card error-card">
              <span className="error-pill">Not found</span>
              <h3 className="card-title">Credential not found</h3>
              <p className="error-text">
                No certificate found for ID: <b>{inputId}</b>. Please check the
                ID and try again.
              </p>
            </div>
          )}
          {status === "idle" && (
            <div className="main-card idle-card">
              <p>Enter a credential ID to verify</p>
            </div>
          )}
        </div>
      </div>
      {/* Certificate Popup Modal */}
      {showCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setShowCert(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate Preview Popup"
        >
          <div
            className="cert-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Action Bar */}
            <div className="cert-modal-topbar">
              <div className="modal-badge-group">
                <span className="modal-status-chip mono-font">
                  <span className="dot-green" /> OFFICIAL CREDENTIAL
                </span>
                <span className="modal-cert-id mono-font">PW-2026-4F19-AK73</span>
              </div>
              <div className="modal-actions-group">
                <button
                  type="button"
                  className="modal-download-btn mono-font"
                  onClick={handlePrintCertificate}
                  title="Download / Print Certificate"
                >
                  <span>⬇</span> Download Certificate
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowCert(false)}
                  aria-label="Close"
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Certificate Paper Sheet */}
            <div className="cert-sheet">
              <img src={txIcon} alt="TX Logo" className="cert-logo" />

              <h1 className="cert-title">CERTIFICATE OF COMPLETION</h1>
              <h2 className="cert-course">Python Full Stack with Django & React</h2>

              <p className="cert-present">This certificate is proudly presented to</p>
              <h3 className="cert-name">BOMMALA VISHNU</h3>
              <p className="cert-desc">
                for successfully completing Python Full Stack with Django & React
                program with Outstanding performance securing 91%
              </p>
              <div className="cert-grid">
                <div className="cert-item">
                  <span className="cert-label">Certificate ID</span>
                  <span className="cert-value">PW-2026-4F19-AK73</span>
                </div>
                <div className="cert-item">
                  <span className="cert-label">Issued Date</span>
                  <span className="cert-value">04 August 2026</span>
                </div>
                <div className="cert-item">
                  <span className="cert-label">Result</span>
                  <span className="cert-value">95% Outstanding</span>
                </div>
                <div className="cert-item">
                  <span className="cert-label">Issuer</span>
                  <span className="cert-value">QIS COLLAGE</span>
                </div>
              </div>

              <div className="cert-footer">
                <div className="cert-qr">
                  <div className="qr-box"></div>
                  <p className="qr-link">pathwing.in/verify/PW-2026-4F19-AK73</p>
                </div>
                <div className="cert-sign">
                  <div className="sign-line"></div>
                  <p>Dean Academics, KITS Warangal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}