"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: 1,
    color: "#97A1B3",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    fontSize: 16,
    color: "#E8EDF2",
    backgroundColor: "#14181F",
    border: "1px solid #2E3644",
    borderRadius: 8,
    outline: "none",
  },
  error: {
    margin: 0,
    fontSize: 14,
    color: "#E5534B",
  },
  button: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 16,
    fontWeight: 700,
    color: "#14181F",
    backgroundColor: "#D4A24C",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#97A1B3",
    marginTop: 24,
  },
  link: {
    color: "#D4A24C",
    textDecoration: "underline",
  },
};

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
    } catch (signUpError) {
      setError(
        signUpError instanceof Error
          ? signUpError.message
          : "Could not create an account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSignUp}>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={styles.input}
          className="search-input"
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={styles.input}
          className="search-input"
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="repeat-password">
          REPEAT PASSWORD
        </label>
        <input
          id="repeat-password"
          type="password"
          required
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          style={styles.input}
          className="search-input"
        />
      </div>
      {error && (
        <p role="alert" style={styles.error}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        style={{ ...styles.button, ...(isLoading ? styles.buttonDisabled : {}) }}
      >
        {isLoading ? "Creating account…" : "Sign up"}
      </button>
      <p style={styles.footer}>
        {"Already have an account? "}
        <a style={styles.link} href="/login">
          Sign in
        </a>
      </p>
    </form>
  );
}