"use client";

import { useState } from "react";
import collection from "../collection.config.js";
import entries from "../data/entries.js";
import EntryCard from "../components/EntryCard.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#2EE6A8",
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: "#97A1B3",
    lineHeight: 1.6,
    margin: 0,
  },
  searchLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    color: "#97A1B3",
    margin: "48px 0 8px",
  },
  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    fontSize: 16,
    color: "#E8EDF2",
    backgroundColor: "#14181F",
    border: "1px solid #2E3644",
    borderRadius: 8,
    outline: "none",
  },
  empty: {
    marginTop: 24,
    padding: 24,
    textAlign: "center",
    fontSize: 14,
    color: "#97A1B3",
    border: "1px dashed #2E3644",
    borderRadius: 10,
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    marginTop: 48,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid #2E3644",
    fontSize: 13,
    color: "#5A6373",
  },
};

export default function Home() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matched = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      (entry.titleKhmer || "").toLowerCase().includes(q)
  );

  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <p style={styles.searchLabel}>SEARCH</p>
      <input
        type="search"
        style={styles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title…"
      />

      {matched.length > 0 ? (
        matched.map((entry) => (
          <EntryCard key={entry.title} entry={entry} />
        ))
      ) : (
        <p style={styles.empty}>
          No entries match "{query.trim()}". Try another keyword.
        </p>
      )}

      <p style={styles.count}>entries in the archive: {entries.length}</p>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}
