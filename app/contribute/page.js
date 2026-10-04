"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar.js";
import EntryForm from "../../components/EntryForm.js";
import { createClient } from "../../lib/supabase/client.js";
import { uploadPhoto } from "../../lib/uploadPhoto.js";
import { formStyles as s } from "../../lib/formStyles.js";

export default function ContributePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(undefined); // undefined = checking

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Called by EntryForm after every rule has passed.
  const save = async (clean, file) => {
    // Owner comes from the session, never from the form.
    if (!navigator.onLine) return "You're offline. Check your internet connection, then try again.";
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return "Your session has ended. Please sign in again.";

    let photo;
    try {
      photo = await uploadPhoto(supabase, auth.user.id, file);
    } catch (err) {
      console.error("Photo upload failed:", err);
      return "The photo couldn't be uploaded. Check that it's a JPG, PNG or WebP under 5 MB, then try again.";
    }

    const { data, error } = await supabase
      .from("entries")
      .insert({
        title: clean.title,
        title_khmer: clean.title_khmer,
        description: clean.description,
        contributor: clean.contributor,
        place: clean.place,
        photo_url: photo.url,
        owner: auth.user.id,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Insert failed:", error);
      await supabase.storage.from("photos").remove([photo.path]); // don't leave an orphan photo
      return "Your entry couldn't be saved. Please check each field and try again.";
    }
    router.push(`/entries/${data.id}`);
    return null;
  };

  return (
    <main style={s.page}>
      <NavBar user={user} onLogout={handleLogout} />
      <p style={s.kicker}>ADD TO THE ARCHIVE</p>
      <h1 style={s.title}>Contribute an entry</h1>
      {user === undefined ? (
        <p>Checking your account…</p>
      ) : user === null ? (
        <p>
          You need an account to contribute. <a href="/login" style={s.link}>Sign in</a> or{" "}
          <a href="/signup" style={s.link}>sign up</a>.
        </p>
      ) : (
        <EntryForm photoRequired submitLabel="Add to the archive" onSave={save} />
      )}
    </main>
  );
}
