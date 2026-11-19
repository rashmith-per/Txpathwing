import React from "react";
import { Link } from "react-router-dom";
import txIcon from "../../../../../assets/tx-icon.jpg";
import { NAV_LINKS } from "./navLinks";

export function MobileNavDrawer({
  menuOpen,
  closeMenu,
  cartCount,
  isActive,
  isInstitutionLoggedIn,
  isLoggedIn,
  getDashboardDestination,
  getDashboardText,
  openSelectionPopup,
}) {
  return (
    <>
      <div
        className={`scrim${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
      />

      <div className={`mobile-panel${menuOpen ? " open" : ""}`}>
        <div className="mobile-panel-head">
          <Link to="/" onClick={closeMenu}>
            <img src={txIcon} alt="Tx Pathwing" />
          </Link>

          <button
            className="mobile-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1D1830"
              strokeWidth="2.3"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-navigation">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              className={`mobile-link${isActive(item.path) ? " active" : ""}`}
              to={item.path}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <Link
            className={`mobile-link${isActive("/cart") ? " active" : ""}`}
            to="/cart"
            onClick={closeMenu}
          >
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        </nav>

        <div className="mobile-actions">
          {isInstitutionLoggedIn ? (
            <Link
              to="/institution-dashboard"
              className="btn-signin"
              onClick={closeMenu}
            >
              Institution dashboard
            </Link>
          ) : isLoggedIn ? (
            <Link
              to={getDashboardDestination()}
              className="btn-signin"
              onClick={closeMenu}
            >
              {getDashboardText()}
            </Link>
          ) : (
            <button
              type="button"
              className="btn-signin"
              onClick={openSelectionPopup}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </>
  );
}
