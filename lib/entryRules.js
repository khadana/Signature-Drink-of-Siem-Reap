// Dana's rules from Tuesday, in one place. The form uses these;
// the check constraints in Supabase enforce the same numbers.
export const TEXT_RULES = {
  title: { label: "Title (English)", min: 1, max: 120 },
  title_khmer: { label: "Title (Khmer)", min: 1, max: 120 },
  description: { label: "Description", min: 10, max: 2000, multiline: true },
  contributor: { label: "Contributed by", min: 2, max: 120 },
  place: { label: "Place", min: 2, max: 80 },
};

export const PHOTO_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5 MB, same as the bucket

// Trim every text field. Returns only the columns a contributor may fill in.
export function cleanValues(values) {
  const clean = {};
  for (const key of Object.keys(TEXT_RULES)) clean[key] = (values[key] || "").trim();
  return clean;
}

// Returns { field: "message" } for every rule that is broken.
export function validateText(clean) {
  const errors = {};
  for (const [key, rule] of Object.entries(TEXT_RULES)) {
    const length = clean[key].length;
    if (length === 0) errors[key] = `${rule.label} is required.`;
    else if (length < rule.min) errors[key] = `${rule.label} needs at least ${rule.min} characters.`;
    else if (length > rule.max)
      errors[key] = `${rule.label} can be at most ${rule.max} characters (now ${length}).`;
  }
  return errors;
}

// Checks the file's real first bytes, not just its name or reported type.
async function looksLikeImage(file) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const jpg = b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  const png = b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
  const webp = b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x45;
  return jpg || png || webp;
}

// Returns an error message, or null if the photo is acceptable.
export async function validatePhoto(file, required) {
  if (!file) return required ? "A photo is required." : null;
  if (!PHOTO_TYPES[file.type]) return "Photo must be a JPG, PNG or WebP image. (iPhone HEIC photos need converting first.)";
  if (file.size > PHOTO_MAX_BYTES) return "Photo must be 5 MB or smaller.";
  if (!(await looksLikeImage(file))) return "That file doesn't look like a real image.";
  return null;
}
