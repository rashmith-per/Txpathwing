import React, { useRef } from "react";
import { Upload, X, RefreshCw, Image as ImageIcon } from "lucide-react";
import "./LogoUploadField.css";

export default function LogoUploadField({
  logo,
  onLogoChange,
  error,
  label = "Official Logo",
  required = false,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (.png, .jpg, .jpeg, .svg, .webp).");
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      alert("Logo image size must be less than 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onLogoChange(event.target?.result || null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="logo-upload-wrapper">
      <div className="logo-upload-label-row">
        <label className="logo-upload-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
        <span className="logo-upload-hint">PNG, JPG, SVG up to 2.5MB</span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
        aria-label="Upload logo file"
      />

      {logo ? (
        <div className="logo-preview-card">
          <div className="logo-preview-thumb">
            <img src={logo} alt="Uploaded logo preview" />
          </div>
          <div className="logo-preview-details">
            <span className="logo-status-tag">Logo Selected</span>
            <span className="logo-subtext">Will be displayed on your dashboard header</span>
          </div>
          <div className="logo-preview-actions">
            <button
              type="button"
              className="logo-action-btn change"
              onClick={() => fileInputRef.current?.click()}
              title="Change Logo"
            >
              <RefreshCw size={13} />
              <span>Change</span>
            </button>
            <button
              type="button"
              className="logo-action-btn remove"
              onClick={handleRemove}
              title="Remove Logo"
            >
              <X size={14} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`logo-dropzone ${error ? "has-error" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <div className="logo-dropzone-icon">
            <Upload size={18} />
          </div>
          <div className="logo-dropzone-text">
            <strong>Click to upload entity logo</strong>
            <span>Device local files supported</span>
          </div>
        </div>
      )}

      {error && <span className="logo-field-error">{error}</span>}
    </div>
  );
}
