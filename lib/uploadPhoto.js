// Uploads a photo to the "photos" bucket at <user id>/<random uuid>.<ext>
// and returns its public URL. The file's own name is never used.
export async function uploadPhoto(supabase, userId, file) {
  const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("photos")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

// Turns a public photo URL back into its storage path, or null if it isn't one of ours.
export function photoPathFromUrl(url) {
  const marker = "/storage/v1/object/public/photos/";
  const i = (url || "").indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
}
