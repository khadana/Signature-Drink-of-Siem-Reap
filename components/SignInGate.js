// Shown to logged-out visitors under the preview entries.
// Note: this only hides entries on the page. The database's
// "anyone can read entries" policy still allows public reads.
const styles = {
  box: {
    position: "relative",
    marginTop: -60,
    paddingTop: 90,
    textAlign: "center",
    background: "linear-gradient(to bottom, rgba(251,245,234,0), var(--bg) 45%)",
  },
  lock: { fontSize: 32, margin: 0 },
  title: { fontSize: 22, fontWeight: 800, margin: "8px 0 6px" },
  text: { fontSize: 15, color: "var(--muted)", margin: "0 0 20px" },
  actions: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 },
  primary: {
    padding: "12px 22px",
    borderRadius: 999,
    backgroundColor: "var(--accent)",
    color: "var(--on-accent)",
    fontWeight: 700,
    textDecoration: "none",
  },
  secondary: {
    padding: "12px 22px",
    borderRadius: 999,
    border: "2px solid var(--accent)",
    color: "var(--accent)",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default function SignInGate({ hiddenCount }) {
  return (
    <div style={styles.box}>
      <p style={styles.lock} aria-hidden="true">🔒</p>
      <p style={styles.title}>{hiddenCount} more entries in the archive</p>
      <p style={styles.text}>Sign up or sign in to read the whole collection.</p>
      <div style={styles.actions}>
        <a href="/signup" className="btn" style={styles.primary}>
          Sign up — it's free
        </a>
        <a href="/login" className="btn" style={styles.secondary}>
          Sign in
        </a>
      </div>
    </div>
  );
}
