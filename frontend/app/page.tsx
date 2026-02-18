"use client";

import { useEffect, useState } from "react";
import { fetchMe } from "../src/lib/auth";
import LandingQuickPanel from "../src/components/landing/LandingQuickPanel";
import PublicLanding from "../src/components/landing/PublicLanding";

export default function Page() {
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthed(false);
        setReady(true);
        return;
      }

      try {
        await fetchMe(); 
        setIsAuthed(true);
      } catch {
        localStorage.removeItem("access_token");
        setIsAuthed(false);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return null;

  return isAuthed ? <LandingQuickPanel /> : <PublicLanding />;
}
