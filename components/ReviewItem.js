import Bilingual from "./Bilingual.js";
import { REVIEW_WORDS } from "../lib/reviewWords.js";
import { formStyles as s } from "../lib/formStyles.js";

const styles = {
  card: { padding: 20, borderRadius: 14, backgroundColor: "var(--surface)", border: "1px solid var(--border)" },
  photo: { width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 10, display: "block", marginBottom: 14 },
  title: { fontSize: 20, fontWeight: 800, margin: 0 },
  khmer: { fontSize: 17, color: "var(--accent)", margin: "4px 0 10px" },
  text: { fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 12px" },
  meta: { fontSize: 13, color: "var(--faint)", margin: "0 0 16px" },
  actions: { display: "flex", flexWrap: "wrap", gap: 10 },
  publishBtn: { ...s.button, fontFamily: "inherit" }, // buttons don't inherit the Khmer font by default
  returnBtn: { ...s.button, fontFamily: "inherit", backgroundColor: "transparent", color: "var(--accent)", border: "2px solid var(--accent)" },
  error: { ...s.formError, marginTop: 14, marginBottom: 0 },
};

// One pending entry with everything Dana needs to decide (Lab 11, Part 1 question 1).
// No contributor name: the table only holds their id.
export default function ReviewItem({ entry, busy, failed, onDecide }) {
  const submitted = (entry.created_at || "").slice(0, 10); // YYYY-MM-DD
  const label = (w) => `${w.khmer} · ${w.english}`;
  return (
    <li style={styles.card}>
      {entry.photo_url && <img src={entry.photo_url} alt={entry.title} style={styles.photo} />}
      <h2 style={styles.title}>{entry.title}</h2>
      <p lang="km" style={styles.khmer}>{entry.title_khmer}</p>
      <p style={styles.text}>{entry.description}</p>
      <p style={styles.meta}>
        Source: {entry.contributor} · Place: {entry.place} · Submitted: {submitted}
      </p>
      <div style={styles.actions}>
        <button type="button" disabled={busy} style={{ ...styles.publishBtn, ...(busy ? s.buttonBusy : null) }}
          onClick={() => onDecide(entry.id, "published")}>
          {label(REVIEW_WORDS.publish)}
        </button>
        <button type="button" disabled={busy} style={{ ...styles.returnBtn, ...(busy ? s.buttonBusy : null) }}
          onClick={() => onDecide(entry.id, "returned")}>
          {label(REVIEW_WORDS.return)}
        </button>
      </div>
      {failed && (
        <div role="alert" style={styles.error}>
          <Bilingual words={REVIEW_WORDS.failed} style={{ margin: 0 }} />
        </div>
      )}
    </li>
  );
}
