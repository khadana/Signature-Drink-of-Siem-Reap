"use client";

import { useEffect, useState } from "react";
import collection from "../collection.config.js";
import entries from "../data/entries.js";
import EntryCard from "../components/EntryCard.js";
import { createClient } from "../lib/supabase/client.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  authBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    marginBottom: 28,
  },
  authEmail: {
    fontSize: 14,
    color: "#97A1B3",
  },
  authLink: {
    fontSize: 14,
    color: "#D4A24C",
    textDecoration: "underline",
  },
  authSeparator: {
    fontSize: 14,
    color: "#5A6373",
  },
  authButton: {
    fontSize: 14,
    color: "#D4A24C",
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    padding: "6px 14px",
    cursor: "pointer",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#D4A24C",
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
    color: "#D4A24C",
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
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out, object = signed in
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (active) setUser(data.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const q = query.trim().toLowerCase();
  const matched = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      (entry.titleKhmer || "").toLowerCase().includes(q)
  );

  return (
    <main style={styles.wrap}>
      <header style={styles.authBar}>
        {user === undefined ? null : user ? (
          <>
            <span style={styles.authEmail}>{user.email}</span>
            <button type="button" style={styles.authButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={styles.authLink}>
              Sign in
            </a>
            <span style={styles.authSeparator}>/</span>
            <a href="/signup" style={styles.authLink}>
              Sign up
            </a>
          </>
        )}
      </header>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <p style={styles.searchLabel}>SEARCH</p>
      <input
        type="search"
        className="search-input"
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
