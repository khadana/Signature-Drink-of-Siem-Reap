import collection from "../collection.config.js";
import PalmScene from "./PalmScene.js";
import Photo from "./Photo.js";

// Change this to credit whoever took the photo.
const HERO_CREDIT = "Photo: sergk1 / Pexels (Angkor Wat, Siem Reap)";

const styles = {
  wrap: { padding: "40px 0 64px" },
  kicker: {
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    letterSpacing: 2,
    color: "var(--accent-2)",
    margin: 0,
  },
  khmer: { fontSize: 22, color: "var(--accent)", margin: "18px 0 0" },
  title: { fontSize: "clamp(36px, 7vw, 52px)", fontWeight: 800, lineHeight: 1.05, margin: "8px 0 16px" },
  description: { fontSize: 18, lineHeight: 1.6, color: "var(--muted)", margin: 0 },
  actions: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 },
  primary: {
    padding: "14px 22px",
    borderRadius: 999,
    backgroundColor: "var(--accent)",
    color: "var(--on-accent)",
    fontWeight: 700,
    textDecoration: "none",
  },
  secondary: {
    padding: "14px 22px",
    borderRadius: 999,
    border: "2px solid var(--accent)",
    color: "var(--accent)",
    fontWeight: 700,
    textDecoration: "none",
  },
  source: { fontSize: 14, color: "var(--faint)", marginTop: 24 },
  photo: {
    width: "100%",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    borderRadius: 28,
    display: "block",
    boxShadow: "0 18px 40px rgba(58, 39, 22, 0.18)",
  },
  credit: { fontSize: 12, color: "var(--faint)", margin: "8px 0 0", textAlign: "right" },
};

export default function Hero({ user }) {
  return (
    <section className="hero" style={styles.wrap}>
      <div>
        <p style={styles.kicker}>A LIVING ARCHIVE · CURATED BY {collection.curator.toUpperCase()}</p>
        <p style={styles.khmer}>ទឹកត្នោត</p>
        <h1 style={styles.title}>{collection.name}</h1>
        <p style={styles.description}>{collection.description}</p>
        <div style={styles.actions}>
          <a href="#archive" className="btn" style={styles.primary}>
            Explore the archive ↓
          </a>
          {user === null && (
            <a href="/signup" className="btn" style={styles.secondary}>
              Join as a contributor
            </a>
          )}
        </div>
        <p style={styles.source}>Sources: {collection.source}</p>
      </div>
      <figure style={{ margin: 0 }}>
        <Photo
          src="/images/hero.jpg"
          alt="Sugar palm trees in Cambodia"
          style={styles.photo}
          fallback={<PalmScene />}
        />
        <figcaption style={styles.credit}>{HERO_CREDIT}</figcaption>
      </figure>
    </section>
  );
}
