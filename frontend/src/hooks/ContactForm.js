"use client";

import { useState, useCallback } from "react";
import api from "../lib/api";

export default function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const sendMessage = useCallback(async ({ subject, message }) => {
    setLoading(true);
    setMsg("");

    try {
      await api.post("/contact", { subject, message });
      setMsg("Message sent successfully.");
      return true;
    } catch (err) {
      setMsg(err?.response?.data?.detail || "Failed to send message.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, msg, sendMessage };
}
