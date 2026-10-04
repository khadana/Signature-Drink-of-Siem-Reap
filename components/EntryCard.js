const styles = {
  card: {
    marginTop: 20,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderLeft: "5px solid var(--accent-2)",
    borderRadius: 14,
    overflow: "hidden",
  },
  photo: { display: "block", width: "calc(100% + 48px)", margin: "-24px -24px 20px", aspectRatio: "16 / 9", objectFit: "cover" },
  titleLink: { color: "inherit", textDecoration: "none" },
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
    whiteSpace: "nowrap",
  },
  metaBlockRight: { textAlign: "right" },
};

// large = shown on the entry's own page (no link back to itself).
export default function EntryCard({ entry, large }) {
  return (
    <article className="entry-card" style={styles.card}>
      {entry.photo_url && <img src={entry.photo_url} alt={entry.title} style={styles.photo} />}
      <h2 style={{ ...styles.title, ...(large ? { fontSize: 28 } : null) }}>
        {large ? entry.title : <a href={`/entries/${entry.id}`} style={styles.titleLink}>{entry.title}</a>}
      </h2>
      {entry.titleKhmer && <p style={styles.titleKhmer}>{entry.titleKhmer}</p>}
      <p style={styles.description}>{entry.description}</p>
      <div style={styles.metaRow}>
        <div>
          <p style={styles.label}>CONTRIBUTED BY</p>
          <p style={styles.value}>{entry.contributor}</p>
        </div>
        <div style={styles.metaBlockRight}>
          <p style={styles.label}>PLACE</p>
          <p style={styles.place}>📍&nbsp;{entry.place}</p>
        </div>
      </div>
    </article>
  );
}
