import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="panel"
          style={{
            margin: "24px 0",
            padding: "32px 24px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            background: "var(--surface)",
            border: "1px solid #fecaca",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#fef2f2",
              color: "#dc2626",
              display: "grid",
              placeItems: "center",
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <h3 style={{ margin: "0", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
            Something went wrong loading this section
          </h3>
          <p style={{ margin: "0", fontSize: "12.5px", color: "var(--muted)", maxWidth: "460px" }}>
            {this.state.error?.message || "An unexpected error occurred while rendering this component."}
          </p>
          <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
            <button
              type="button"
              className="primary-action"
              onClick={this.handleReset}
            >
              <RotateCcw size={14} /> Retry
            </button>
            {this.props.onNavigateOverview && (
              <button
                type="button"
                className="secondary-action"
                onClick={() => {
                  this.handleReset();
                  this.props.onNavigateOverview();
                }}
              >
                Go to Overview
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
