"use client";

import { useEffect, useState } from "react";
import { formStyles as s } from "../lib/formStyles.js";

// File picker with a preview. currentUrl is the existing photo when editing.
export default function PhotoInput({ file, currentUrl, required, error, onChange }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const shown = preview || currentUrl;
  return (
    <div style={s.field}>
      <label htmlFor="photo" style={s.label}>
        Photo
        <span style={s.hint}>
          {required ? "required" : "optional — keep the current one"} · JPG, PNG or WebP · max 5 MB
        </span>
      </label>
      <input
        id="photo"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        aria-invalid={Boolean(error)}
        style={{ ...s.input, ...(error ? s.inputError : null) }}
      />
      {error && <p style={s.error}>{error}</p>}
      {shown && <img src={shown} alt="Selected photo" style={s.preview} />}
    </div>
  );
}
