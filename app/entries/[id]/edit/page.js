"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar.js";
import EntryForm from "../../../../components/EntryForm.js";
import { createClient } from "../../../../lib/supabase/client.js";
import { uploadPhoto, photoPathFromUrl } from "../../../../lib/uploadPhoto.js";
import { formStyles as s } from "../../../../lib/formStyles.js";

export default function EditEntryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(undefined);
  const [entry, setEntry] = useState(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    supabase
      .from("entries")
      .select("id, owner, title, title_khmer, description, contributor, place, photo_url")
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

  const save = async (clean, file) => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return "Your session has ended. Please sign in again.";

    // The photo is optional when editing: keep the old one unless a new one was picked.
    let photo = null;
    if (file) {
      try {
        photo = await uploadPhoto(supabase, auth.user.id, file);
      } catch (err) {
        console.error("Photo upload failed:", err);
        return "The new photo couldn't be uploaded. Check that it's a JPG, PNG or WebP under 5 MB.";
      }
    }

    const { data, error } = await supabase
      .from("entries")
      .update({
        title: clean.title,
        title_khmer: clean.title_khmer,
        description: clean.description,
        contributor: clean.contributor,
        place: clean.place,
        photo_url: photo ? photo.url : entry.photo_url,
      })
      .eq("id", id)
      .select("id");

    // Row-level security refuses quietly: no error, zero rows. Check for the row.
    if (error || !data || data.length === 0) {
      console.error("Update returned no row:", error, data);
      if (photo) await supabase.storage.from("photos").remove([photo.path]);
      return "That change wasn't saved.";
    }
    const oldPath = photo ? photoPathFromUrl(entry.photo_url) : null;
    if (oldPath) await supabase.storage.from("photos").remove([oldPath]); // replaced photo
    router.push(`/entries/${id}`);
    return null;
  };

  const ready = user !== undefined && entry !== undefined;
  const isOwner = user && entry && user.id === entry.owner;

  return (
    <main style={s.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <a href={`/entries/${id}`} style={s.link}>← Back to the entry</a>
      <p style={{ ...s.kicker, marginTop: 24 }}>EDIT ENTRY</p>
      <h1 style={s.title}>{entry ? entry.title : "Edit"}</h1>
      {!ready && <p>Loading…</p>}
      {ready && !entry && <p>This entry doesn't exist, or it was deleted.</p>}
      {ready && entry && !isOwner && <p>Only the person who added this entry can edit it.</p>}
      {ready && isOwner && (
        <EntryForm
          initial={entry}
          currentPhotoUrl={entry.photo_url}
          photoRequired={false}
          submitLabel="Save changes"
          onSave={save}
        />
      )}
    </main>
  );
}
