import { useState, useEffect } from "react";
import txIcon from "../../../../../assets/tx-icon.jpg";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import PortalAuthFlow from "../PortalAuth/PortalAuthFlow";
import { NAV_LINKS } from "./navLinks";
import { useHeaderAuth } from "./useHeaderAuth";
import { MobileNavDrawer } from "./MobileNavDrawer";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authFlowOpen, setAuthFlowOpen] = useState(false);

  const {
    location,
    scrolled,
    cartCount,
    isInstitutionLoggedIn,
    isLoggedIn,
    getDashboardDestination,
    getDashboardText,
  } = useHeaderAuth();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMenuOpen(false);

  const openSelectionPopup = () => {
    closeMenu();
    setAuthFlowOpen(true);
  };

  const closeAllPopups = () => {
    setAuthFlowOpen(false);
  };

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="nav-container">
          <Link className="brand" to="/" onClick={closeMenu}>
            <img src={txIcon} alt="Tx Pathwing" />
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  className={`nav-link${isActive(item.path) ? " active" : ""}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link
              to="/cart"
              className="header-cart"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag
                className="header-cart-icon"
                size={25}
                strokeWidth={2.2}
              />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {isInstitutionLoggedIn ? (
              <Link to="/institution-dashboard" className="btn-signin">
                Institution dashboard
              </Link>
            ) : isLoggedIn ? (
              <Link to={getDashboardDestination()} className="btn-signin">
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

          <div className="mobile-header-actions">
            <Link
              to="/cart"
              className="header-cart header-cart-mobile"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag
                className="header-cart-icon"
                size={22}
                strokeWidth={2.2}
              />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        cartCount={cartCount}
        isActive={isActive}
        isInstitutionLoggedIn={isInstitutionLoggedIn}
        isLoggedIn={isLoggedIn}
        getDashboardDestination={getDashboardDestination}
        getDashboardText={getDashboardText}
        openSelectionPopup={openSelectionPopup}
      />

      <PortalAuthFlow
        isOpen={authFlowOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}
