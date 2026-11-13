import React from "react";
import { ShieldCheck } from "lucide-react";

export default function CertificatesHeader({ totalCount = 3 }) {
  return (
    <div className="certs-top-row">
      <div>
        <span className="certs-eyebrow">VERIFIED CREDENTIALS • BLOCKCHAIN SECURED</span>
        <h1 className="certs-main-title">My Certificates &amp; Achievements</h1>
        <p className="certs-sub-text">
          {totalCount} verified certificates earned • Shareable on LinkedIn &amp; employer portals
        </p>
      </div>

      <div className="certs-summary-pill">
        <ShieldCheck size={18} color="#16a34a" />
        <span>All {totalCount} Credentials Active &amp; Verified</span>
      </div>
    </div>
  );
}
