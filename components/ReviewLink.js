"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client.js";

// Shows the Review link only when the logged-in user is a reviewer.
// Hiding it is politeness; the database still refuses non-reviewers.
export default function ReviewLink({ style }) {
  const [reviewer, setReviewer] = useState(false);

  useEffect(() => {
    let active = true;
    createClient()
      .rpc("is_reviewer")
      .then(({ data }) => {
        if (active) setReviewer(data === true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!reviewer) return null;
  return (
    <a href="/review" style={style}>
      Review
    </a>
  );
}
