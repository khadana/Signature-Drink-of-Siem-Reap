import collection from "../collection.config.js";
import { formStyles as s } from "../lib/formStyles.js";

const styles = {
  box: {
    padding: 24,
    borderRadius: 14,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
  },
  heading: { fontSize: 22, fontWeight: 800, margin: "0 0 4px" },
  khmer: { fontSize: 17, color: "var(--accent)", margin: "0 0 14px" },
  text: { fontSize: 16, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 18px" },
  actions: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" },
  again: { background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 16, fontFamily: "inherit", ...s.link },
};

// What a contributor sees right after submitting (Lab 10, Part 1 question 1).
export default function SubmittedNote({ onAnother }) {
  return (
    <div role="status" style={styles.box}>
      <h2 style={styles.heading}>Thank you! Your entry is waiting for review.</h2>
      <p lang="km" style={styles.khmer}>អរគុណ! ធាតុរបស់អ្នកកំពុងរង់ចាំការពិនិត្យ។</p>
      <p style={styles.text}>
        {collection.curator} reads every entry before it joins the archive, to keep each
        story true to the people it comes from. You can check its status any time in My entries.
      </p>
      <div style={styles.actions}>
        <a href="/my-entries" style={{ ...s.button, textDecoration: "none" }}>See my entries</a>
        <button type="button" style={styles.again} onClick={onAnother}>Add another entry</button>
      </div>
    </div>
  );
}
