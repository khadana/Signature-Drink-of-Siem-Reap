"use client";

import { useEffect, useState } from "react";
import NavBar from "./NavBar.js";
import ReviewItem from "./ReviewItem.js";
import Bilingual from "./Bilingual.js";
import { createClient } from "../lib/supabase/client.js";
import { REVIEW_WORDS } from "../lib/reviewWords.js";
import { formStyles as s } from "../lib/formStyles.js";

const styles = {
  list: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 },
  note: { color: "var(--muted)", fontSize: 16, lineHeight: 1.6 },
};

// The reviewer's queue. Each button goes through review_entry, never a direct update.
export default function ReviewQueue({ allowed, initialEntries, loadFailed }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(undefined);
  const [entries, setEntries] = useState(initialEntries);
  const [failedId, setFailedId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const decide = async (entryId, decision) => {
    setBusyId(entryId);
    setFailedId(null);
    const { data, error } = await supabase.rpc("review_entry", { entry_id: entryId, decision });
    setBusyId(null);
    // review_entry says no by returning false, without an error. Only true means it worked.
    if (data === true) {
      setEntries((list) => list.filter((e) => e.id !== entryId));
    } else {
      console.error("review_entry did not succeed:", error, data);
      setFailedId(entryId);
    }
  };

  return (
    <main style={s.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <p style={s.kicker}>REVIEW QUEUE</p>
      <h1 style={s.title}>Waiting for review</h1>
      {!allowed ? (
        <Bilingual words={REVIEW_WORDS.notReviewer} style={styles.note} />
      ) : loadFailed ? (
        <p style={styles.note}>The queue couldn't be loaded right now. Please refresh in a moment.</p>
      ) : entries.length === 0 ? (
        <Bilingual words={REVIEW_WORDS.empty} style={styles.note} />
      ) : (
        <ul style={styles.list}>
          {entries.map((entry) => (
            <ReviewItem
              key={entry.id}
              entry={entry}
              busy={busyId === entry.id}
              failed={failedId === entry.id}
              onDecide={decide}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
