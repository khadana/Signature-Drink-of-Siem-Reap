const styles = {
  card: {
    marginTop: 20,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderLeft: "5px solid var(--accent-2)",
    borderRadius: 14,
  },
  title: { fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.3 },
  titleKhmer: { fontSize: 17, lineHeight: 1.5, color: "var(--accent)", margin: "6px 0 0" },
  description: { fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: "10px 0 0" },
  metaRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px dashed var(--border)",
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    color: "var(--faint)",
    margin: 0,
  },
  value: { fontSize: 14, margin: "6px 0 0" },
  place: {
    display: "inline-block",
    fontSize: 13,
    fontWeight: 600,
    margin: "6px 0 0",
    padding: "4px 10px",
    borderRadius: 999,
    color: "var(--accent)",
    backgroundColor: "rgba(47, 107, 63, 0.1)",
  },
  metaBlockRight: { textAlign: "right" },
};

export default function EntryCard({ entry }) {
  return (
    <article className="entry-card" style={styles.card}>
      <h2 style={styles.title}>{entry.title}</h2>
      {entry.titleKhmer && <p style={styles.titleKhmer}>{entry.titleKhmer}</p>}
      <p style={styles.description}>{entry.description}</p>
      <div style={styles.metaRow}>
        <div>
          <p style={styles.label}>CONTRIBUTED BY</p>
          <p style={styles.value}>{entry.contributor}</p>
        </div>
        <div style={styles.metaBlockRight}>
          <p style={styles.label}>PLACE</p>
          <p style={styles.place}>📍 {entry.place}</p>
        </div>
      </div>
    </article>
  );
}
