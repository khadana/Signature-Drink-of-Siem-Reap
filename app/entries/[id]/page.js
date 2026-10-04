"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar.js";
import EntryCard from "../../../components/EntryCard.js";
import OwnerActions from "../../../components/OwnerActions.js";
import { createClient } from "../../../lib/supabase/client.js";
import { photoPathFromUrl } from "../../../lib/uploadPhoto.js";
import { formStyles as s } from "../../../lib/formStyles.js";

const COLUMNS = "id, owner, title, titleKhmer:title_khmer, description, contributor, place, photo_url";

export default function EntryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(undefined);
  const [entry, setEntry] = useState(undefined); // undefined = loading, null = not found
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    supabase
      .from("entries")
      .select(COLUMNS)
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error("Loading the entry failed:", error);
        setEntry(data ?? null);
      });
  }, [supabase, id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${entry.title}"? This can't be undone.`)) return;
    setBusy(true);
    setMessage("");
    try {
      const { data, error } = await supabase.from("entries").delete().eq("id", id).select("id");
      // Row-level security refuses quietly: no error, zero rows. Check for the row.
      if (error || !data || data.length === 0) {
        console.error("Delete returned no row:", error, data);
        setMessage("That change wasn't saved.");
        return;
      }
      const path = photoPathFromUrl(entry.photo_url);
      if (path) await supabase.storage.from("photos").remove([path]); // tidy up the photo too
      router.push("/");
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("That change wasn't saved. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const isOwner = user && entry && user.id === entry.owner;

  return (
    <main style={s.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <a href="/#archive" style={s.link}>← Back to the archive</a>
      {entry === undefined && <p>Loading entry…</p>}
      {entry === null && <p>This entry doesn't exist, or it was deleted.</p>}
      {entry && (
        <>
          {message && <p role="alert" style={{ ...s.formError, marginTop: 20 }}>{message}</p>}
          <EntryCard entry={entry} large />
          {isOwner && <OwnerActions entryId={entry.id} busy={busy} onDelete={handleDelete} />}
        </>
      )}
    </main>
  );
}
