export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About us", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Careers", path: "/careers" },
  { label: "Explore", path: "/marketplace" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export function readCartCount() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(savedCart) ? savedCart.length : 0;
  } catch {
    return 0;
  }
}
