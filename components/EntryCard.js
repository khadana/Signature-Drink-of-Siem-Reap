const styles = {
  card: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.3,
  },
  description: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#97A1B3",
    margin: "10px 0 0",
  },
  metaRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #2E3644",
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    color: "#97A1B3",
    margin: 0,
  },
  value: {
    fontSize: 14,
    margin: "6px 0 0",
  },
  metaBlockRight: {
    textAlign: "right",
  },
};

export default function EntryCard({ entry }) {
  return (
    <article style={styles.card}>
      <h2 style={styles.title}>{entry.title}</h2>
      <p style={styles.description}>{entry.description}</p>
      <div style={styles.metaRow}>
        <div>
          <p style={styles.label}>CONTRIBUTED BY</p>
          <p style={styles.value}>{entry.contributor}</p>
        </div>
        <div style={styles.metaBlockRight}>
          <p style={styles.label}>PLACE</p>
          <p style={styles.value}>{entry.place}</p>
        </div>
      </div>
    </article>
  );
}