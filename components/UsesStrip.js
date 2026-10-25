import Photo from "./Photo.js";
import Glass from "./wc/Glass.js";
import SugarCakes from "./wc/SugarCakes.js";
import ClayJar from "./wc/ClayJar.js";
import PalmTree from "./wc/PalmTree.js";

// Each card shows /public/images/<file> if it exists, otherwise a watercolor drawing.
const uses = [
  { file: "drink.jpg", Art: Glass, en: "A drink", km: "ភេសជ្ជៈ", text: "Fresh sap, chilled, sold by the roadside." },
  { file: "sugar.jpg", Art: SugarCakes, en: "A sugar", km: "ស្ករត្នោត", text: "Boiled down into golden palm sugar." },
  { file: "ferment.jpg", Art: ClayJar, en: "A ferment", km: "ស្រា និង ខ្មេះ", text: "Left to turn into wine and vinegar." },
  { file: "tradition.jpg", Art: PalmTree, en: "A tradition", km: "ប្រពៃណី", text: "Climbed for, tapped, and passed down." },
];

const styles = {
  wrap: { padding: "8px 0 56px" },
  card: {
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
};

export default function UsesStrip() {
  return (
    <section className="uses-grid" style={styles.wrap} aria-label="Uses of palm juice">
      {uses.map((use) => (
        <div key={use.en} className="use-card" style={styles.card}>
          <Photo
            src={`/images/${use.file}`}
            alt={use.en}
            style={styles.photo}
            fallback={<div style={styles.art}><use.Art size={120} /></div>}
          />
          <div style={styles.body}>
            <p style={styles.en}>{use.en}</p>
            <p style={styles.km}>{use.km}</p>
            <p style={styles.text}>{use.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
