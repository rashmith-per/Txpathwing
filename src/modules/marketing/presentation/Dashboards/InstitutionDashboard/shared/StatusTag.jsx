export default function StatusTag({ children }) {
  const className = children.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-tag status-${className}`}>{children}</span>;
}
