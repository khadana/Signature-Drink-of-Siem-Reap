"use client";

import { useState } from "react";
import Field from "./Field.js";
import PhotoInput from "./PhotoInput.js";
import { TEXT_RULES, cleanValues, validateText, validatePhoto } from "../lib/entryRules.js";
import { formStyles as s } from "../lib/formStyles.js";

const EMPTY = { title: "", title_khmer: "", description: "", contributor: "", place: "" };

// Shared by /contribute and the edit page.
// onSave(cleanValues, photoFile) must return an error message string, or null on success.
export default function EntryForm({ initial = EMPTY, photoRequired, currentPhotoUrl, submitLabel, onSave }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setFormError("");
    const clean = cleanValues(values);
    const found = validateText(clean);
    const photoError = await validatePhoto(file, photoRequired);
    if (photoError) found.photo = photoError;
    setErrors(found);
    if (Object.keys(found).length > 0) return; // nothing is sent

    setBusy(true);
    try {
      const message = await onSave(clean, file);
      if (message) setFormError(message);
    } catch (err) {
      console.error("Saving the entry failed:", err);
      setFormError("Something went wrong while saving. Please check your connection and try again.");
    } finally {
      setBusy(false); // never leave the button stuck
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && <p role="alert" style={s.formError}>{formError}</p>}
      {Object.entries(TEXT_RULES).map(([name, rule]) => (
        <Field key={name} name={name} rule={rule} value={values[name]} error={errors[name]} onChange={handleChange} />
      ))}
      <PhotoInput
        file={file}
        currentUrl={currentPhotoUrl}
        required={photoRequired}
        error={errors.photo}
        onChange={setFile}
      />
      <button type="submit" disabled={busy} style={{ ...s.button, ...(busy ? s.buttonBusy : null) }}>
        {busy ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
