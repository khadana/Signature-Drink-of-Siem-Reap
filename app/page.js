"use client";

import { useEffect, useState } from "react";
import EntryCard from "../components/EntryCard.js";
import NavBar from "../components/NavBar.js";
import Hero from "../components/Hero.js";
import UsesStrip from "../components/UsesStrip.js";
import SignInGate from "../components/SignInGate.js";
import { createClient } from "../lib/supabase/client.js";

const styles = {
  page: { maxWidth: 1040, margin: "0 auto", padding: "0 24px 64px" },
  archive: { maxWidth: 720, margin: "0 auto", scrollMarginTop: 24 },
  sectionKicker: {
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    letterSpacing: 2,
    color: "var(--accent-2)",
    margin: 0,
  },
  sectionTitle: { fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 800, margin: "8px 0 20px" },
  search: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 18px",
    fontSize: 16,
    color: "var(--text)",
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 999,
    outline: "none",
  },
  empty: {
    marginTop: 24,
    padding: 24,
    textAlign: "center",
    fontSize: 14,
    color: "var(--muted)",
    border: "1px dashed var(--border)",
    borderRadius: 14,
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "var(--accent-2)",
    marginTop: 40,
  },
  footer: {
    maxWidth: 720,
    margin: "64px auto 0",
    paddingTop: 24,
    borderTop: "1px solid var(--border)",
    fontSize: 13,
    color: "var(--faint)",
  },
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out, object = signed in
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let active = true;
    supabase
      .from("entries")
      // title_khmer is renamed to titleKhmer so EntryCard needs no changes
      .select("id, created_at, title, titleKhmer:title_khmer, description, contributor, place")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setStatus("error");
        } else {
          setEntries(data ?? []);
          setStatus("ready");
        }
      });
    return () => {
      active = false;
    };
  }, [supabase]);

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

  // Logged-out visitors see only the first half of the archive.
  const signedIn = Boolean(user);
  const previewIds = new Set(entries.slice(0, Math.ceil(entries.length / 2)).map((e) => e.id));
  const visible = signedIn ? matched : matched.filter((e) => previewIds.has(e.id));
  const hiddenCount = signedIn ? 0 : entries.length - previewIds.size;

  return (
    <main style={styles.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <Hero user={user} />
      <UsesStrip />

      <section id="archive" style={styles.archive}>
        <p style={styles.sectionKicker}>THE ARCHIVE</p>
        <h2 style={styles.sectionTitle}>Every drink, every name</h2>
        <input
          type="search"
          className="search-input"
          style={styles.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍  Search in English or Khmer…"
          aria-label="Search entries by title"
        />

        {status === "loading" ? (
          <p style={styles.empty}>Loading entries…</p>
        ) : status === "error" ? (
          <p style={styles.empty}>
            The archive could not be reached right now. Please refresh in a moment.
          </p>
        ) : entries.length === 0 ? (
          <p style={styles.empty}>The archive has no entries yet.</p>
        ) : visible.length > 0 ? (
          visible.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        ) : (
          <p style={styles.empty}>
            No entries match "{query.trim()}". Try another keyword.
          </p>
        )}

        {status === "ready" && hiddenCount > 0 && <SignInGate hiddenCount={hiddenCount} />}

        <p style={styles.count}>entries in the archive: {entries.length}</p>
      </section>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}
