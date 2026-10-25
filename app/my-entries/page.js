"use client";

import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar.js";
import StatusBadge from "../../components/StatusBadge.js";
import { createClient } from "../../lib/supabase/client.js";
import { formStyles as s } from "../../lib/formStyles.js";

const styles = {
  list: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 },
  item: {
    padding: "16px 18px",
    borderRadius: 14,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
  },
  title: { fontSize: 17, fontWeight: 700, color: "var(--text)", textDecoration: "none" },
  khmer: { display: "block", fontSize: 15, color: "var(--accent)", margin: "2px 0 10px" },
  muted: { color: "var(--muted)" },
};

export default function MyEntriesPage() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(undefined); // undefined = checking
  const [entries, setEntries] = useState(undefined); // undefined = loading, null = error

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(async ({ data }) => {
      const me = data.user ?? null;
      if (!active) return;
      setUser(me);
      if (!me) return;
      const { data: rows, error } = await supabase
        .from("entries")
        .select("id, created_at, title, title_khmer, status")
        .eq("owner", me.id) // only the logged-in person's own entries
        .order("created_at", { ascending: false });
      if (error) console.error("Loading my entries failed:", error);
      if (active) setEntries(error ? null : rows ?? []);
    });
    return () => {
      active = false;
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <main style={s.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <p style={s.kicker}>YOUR CONTRIBUTIONS</p>
      <h1 style={s.title}>My entries</h1>
      {user === undefined ? (
        <p style={styles.muted}>Checking your account…</p>
      ) : user === null ? (
        <p>
          Please <a href="/login" style={s.link}>sign in</a> to see the entries you added.
        </p>
      ) : entries === undefined ? (
        <p style={styles.muted}>Loading your entries…</p>
      ) : entries === null ? (
        <p style={styles.muted}>Your entries couldn't be loaded right now. Please refresh in a moment.</p>
      ) : entries.length === 0 ? (
        <p style={styles.muted}>
          You haven't added anything yet. <a href="/contribute" style={s.link}>Add your first entry</a>.
        </p>
      ) : (
        <ul style={styles.list}>
          {entries.map((e) => (
            <li key={e.id} style={styles.item}>
              <a href={`/entries/${e.id}`} style={styles.title}>{e.title}</a>
              <span lang="km" style={styles.khmer}>{e.title_khmer}</span>
              <StatusBadge status={e.status} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
