const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "20px 0",
  },
  brand: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "var(--accent-2)",
    textDecoration: "none",
    fontWeight: 700,
  },
  right: { display: "flex", alignItems: "center", gap: 12 },
  email: { fontSize: 14, color: "var(--muted)" },
  link: { fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" },
  button: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--on-accent)",
    backgroundColor: "var(--accent)",
    border: "none",
    borderRadius: 999,
    padding: "8px 16px",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};

// user: undefined = still checking, null = signed out, object = signed in
export default function NavBar({ user, onLogout }) {
  return (
    <nav style={styles.bar}>
      <a href="/" style={styles.brand}>
        🌴 KHMER LIVING ARCHIVE
      </a>
      <div style={styles.right}>
        {user === undefined ? null : user ? (
          <>
            <span style={styles.email}>{user.email}</span>
            <button type="button" className="btn" style={styles.button} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={styles.link}>
              Sign in
            </a>
            <a href="/signup" className="btn" style={styles.button}>
              Sign up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
