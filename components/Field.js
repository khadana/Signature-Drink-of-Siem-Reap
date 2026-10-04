import { formStyles as s } from "../lib/formStyles.js";

// One labelled text field with its rule hint and error message.
export default function Field({ name, rule, value, error, onChange }) {
  const Input = rule.multiline ? "textarea" : "input";
  return (
    <div style={s.field}>
      <label htmlFor={name} style={s.label}>
        {rule.label}
        <span style={s.hint}>
          {value.trim().length}/{rule.max}
        </span>
      </label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        rows={rule.multiline ? 6 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{ ...s.input, ...(error ? s.inputError : null) }}
      />
      {error && (
        <p id={`${name}-error`} style={s.error}>
          {error}
        </p>
      )}
    </div>
  );
}
