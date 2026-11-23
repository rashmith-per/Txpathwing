export default function StatusTag({ children }) {
  if (!children) return null;
  const className = String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={`status-tag status-${className}`}>{children}</span>;
}
