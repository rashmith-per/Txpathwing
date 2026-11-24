import React, { useState } from "react";
import { Settings, CheckCircle2 } from "lucide-react";

export default function OrgSettingsModule({ user }) {
  const [name, setName] = useState(user?.entityName || "Global Tech Foundation");
  const [domain, setDomain] = useState("Open Technology & Engineering Foundation");
  const [savedNotice, setSavedNotice] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice("Organization settings updated successfully.");
    setTimeout(() => setSavedNotice(""), 3000);
  };

  return (
    <div className="portal-module-container">
      <div className="settings-form-card">
        <h3>Organization Configuration & Team Settings</h3>
        {savedNotice && (
          <div className="reg-alert success" role="status">
            <CheckCircle2 size={16} />
            <span>{savedNotice}</span>
          </div>
        )}
        <form onSubmit={handleSave} className="settings-form">
          <div className="settings-field">
            <label>Organization Official Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="settings-field">
            <label>Administrative Email</label>
            <input type="email" defaultValue={user?.email || "contact@org.org"} readOnly />
          </div>
          <div className="settings-field">
            <label>Charter / Focus Area</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <div className="settings-field">
            <label>Member Access Mode</label>
            <input type="text" defaultValue="Admin-Invite & Single Sign-On (SSO)" readOnly />
          </div>
          <button type="submit" className="org-primary-btn">
            <span>Save Organization Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
