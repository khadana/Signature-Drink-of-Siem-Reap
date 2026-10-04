// Shared look for the contribute and edit forms.
export const formStyles = {
  page: { maxWidth: 680, margin: "0 auto", padding: "0 24px 64px" },
  kicker: { fontFamily: "'Courier New', monospace", fontSize: 13, letterSpacing: 2, color: "var(--accent-2)", margin: 0 },
  title: { fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 800, margin: "8px 0 24px" },
  field: { marginBottom: 20 },
  label: { display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6 },
  hint: { fontSize: 12, color: "var(--faint)", marginLeft: 6, fontWeight: 400 },
  input: {
    width: "100%", boxSizing: "border-box", padding: "12px 14px", fontSize: 16,
    color: "var(--text)", backgroundColor: "var(--input)", border: "1px solid var(--border)",
    borderRadius: 10, fontFamily: "inherit",
  },
  inputError: { borderColor: "var(--error)" },
  error: { fontSize: 13, color: "var(--error)", margin: "6px 0 0" },
  formError: {
    fontSize: 14, color: "var(--error)", backgroundColor: "rgba(179, 38, 30, 0.08)",
    padding: "10px 14px", borderRadius: 10, margin: "0 0 16px",
  },
  button: {
    padding: "14px 24px", fontSize: 16, fontWeight: 700, color: "var(--on-accent)",
    backgroundColor: "var(--accent)", border: "none", borderRadius: 999, cursor: "pointer",
  },
  buttonBusy: { opacity: 0.6, cursor: "wait" },
  preview: { width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 12, marginTop: 10, display: "block" },
  link: { color: "var(--accent)", fontWeight: 700 },
};
