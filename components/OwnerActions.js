import { formStyles as s } from "../lib/formStyles.js";

const styles = {
  row: { display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0" },
  edit: { ...s.button, textDecoration: "none", display: "inline-block" },
  del: { ...s.button, backgroundColor: "transparent", color: "var(--error)", border: "2px solid var(--error)" },
};

// Edit and Delete for the entry's owner. Hiding these is politeness;
// the real refusal is the row-level security policies in Supabase.
export default function OwnerActions({ entryId, busy, onDelete }) {
  return (
    <div style={styles.row}>
      <a href={`/entries/${entryId}/edit`} className="btn" style={styles.edit}>
        ✏️ Edit
      </a>
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        style={{ ...styles.del, ...(busy ? s.buttonBusy : null) }}
      >
        {busy ? "Deleting…" : "🗑 Delete"}
      </button>
    </div>
  );
}
