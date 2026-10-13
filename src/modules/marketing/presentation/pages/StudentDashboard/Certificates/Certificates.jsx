import React, { useState } from "react";
import { CERTIFICATES_DATA } from "./data/certificates.data";
import CertificatesHeader from "./components/CertificatesHeader";
import CertificateFeaturedPreview from "./components/CertificateFeaturedPreview";
import CertificatesGrid from "./components/CertificatesGrid";
import CertificateModal from "./components/CertificateModal";
import "./Certificates.css";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(CERTIFICATES_DATA[0]);
  const [previewModalCert, setPreviewModalCert] = useState(null);
  const [copiedId, setCopiedId] = useState("");

  const handleCopyVerifyLink = (id) => {
    navigator.clipboard?.writeText(`https://pathwing.edu/verify/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleDownloadCertificate = (cert) => {
    setPreviewModalCert(cert);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="certs-container">
      <CertificatesHeader totalCount={CERTIFICATES_DATA.length} />

      <CertificateFeaturedPreview
        selectedCert={selectedCert}
        copiedId={copiedId}
        onDownload={handleDownloadCertificate}
        onOpenPreview={setPreviewModalCert}
        onCopyLink={handleCopyVerifyLink}
      />

      <CertificatesGrid
        certificates={CERTIFICATES_DATA}
        selectedCert={selectedCert}
        onSelectCert={setSelectedCert}
        onDownload={handleDownloadCertificate}
        onOpenPreview={setPreviewModalCert}
      />

      <CertificateModal
        previewModalCert={previewModalCert}
        onClose={() => setPreviewModalCert(null)}
      />
    </div>
  );
}
