import { STATUS_WORDS } from "../lib/entryStatus.js";

const styles = {
  badge: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "baseline",
    fontSize: 13,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 999,
    border: "1px solid currentColor",
  },
  english: { fontWeight: 500 },
};

// Shows an entry's review status in plain Khmer and English.
export default function StatusBadge({ status }) {
  const words = STATUS_WORDS[status] || { khmer: status, english: "", color: "var(--muted)" };
  return (
    <span style={{ ...styles.badge, color: words.color }}>
      <span lang="km">{words.khmer}</span>
      <span style={styles.english}>{words.english}</span>
    </span>
  );
}
