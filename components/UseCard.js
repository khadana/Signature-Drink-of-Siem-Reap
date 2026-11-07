import { useState } from "react";
import Photo from "./Photo.js";

const styles = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    fontFamily: "inherit",
    color: "inherit",
    textAlign: "left",
    cursor: "pointer",
    padding: 0,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    overflow: "hidden",
  },
  photo: { width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" },
  art: { padding: "16px 16px 0", lineHeight: 0 },
  body: { padding: "0 20px 20px" },
  en: { fontSize: 17, fontWeight: 700, margin: "12px 0 2px" },
  km: { fontSize: 14, color: "var(--accent)", margin: 0 },
  text: { fontSize: 14, lineHeight: 1.5, color: "var(--muted)", margin: "10px 0 0" },
  more: { fontSize: 14, lineHeight: 1.5, color: "var(--muted)", margin: "10px 0 0" },
  hint: { display: "block", marginTop: 10, fontSize: 13, fontWeight: 600, color: "var(--accent)" },
};

export default function UseCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className="use-card"
      style={styles.card}
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <Photo
        src={`/images/${item.file}`}
        alt={item.en}
        style={styles.photo}
        fallback={<div style={styles.art}><item.Art size={120} /></div>}
      />
      <div style={styles.body}>
        <p style={styles.en}>{item.en}</p>
        <p style={styles.km}>{item.km}</p>
        <p style={styles.text}>{item.text}</p>
        {open && <p style={styles.more}>{item.more}</p>}
        <span style={styles.hint}>{open ? "− Less · តិច" : "+ More · បន្ថែម"}</span>
      </div>
    </button>
  );
}