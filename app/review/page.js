import ReviewQueue from "../../components/ReviewQueue.js";
import { createClient } from "../../lib/supabase/server.js";

// Runs on the server, before any entries load.
// The reviewer check here keeps the page tidy; the database is the real gate
// (review_entry refuses anyone who isn't on the reviewers list).
export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: reviewer } = await supabase.rpc("is_reviewer");

  if (reviewer !== true) {
    return <ReviewQueue allowed={false} initialEntries={[]} />;
  }

  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, created_at, title, title_khmer, description, contributor, place, photo_url")
    .eq("status", "pending")
    .order("created_at", { ascending: true }); // oldest first
  if (error) console.error("Loading the review queue failed:", error);

  return <ReviewQueue allowed initialEntries={entries ?? []} loadFailed={Boolean(error)} />;
}
