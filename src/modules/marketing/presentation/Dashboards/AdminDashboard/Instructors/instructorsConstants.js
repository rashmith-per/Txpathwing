export const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #4f46e5, #7c3aed)",
  "linear-gradient(135deg, #0ea5e9, #2563eb)",
  "linear-gradient(135deg, #059669, #10b981)",
  "linear-gradient(135deg, #d97706, #f59e0b)",
  "linear-gradient(135deg, #db2777, #ec4899)",
  "linear-gradient(135deg, #7c3aed, #c026d3)"
];

export function getInitials(name) {
  if (!name) return "IN";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
