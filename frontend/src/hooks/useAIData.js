import { useState, useEffect, useRef } from "react";
import { getAISummary } from "../lib/ai";

export default function useAIData(startMonth, endMonth, enabled = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastKeyRef = useRef("");

  useEffect(() => {
    if (!enabled) return;
    if (!startMonth || !endMonth) return;

    const key = `${startMonth}__${endMonth}`;
    if (lastKeyRef.current === key && data) return;

    const fetchAI = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("[AI] fetching", { startMonth, endMonth });

        const res = await getAISummary(startMonth, endMonth);
        setData(res);
        lastKeyRef.current = key;
      } catch (err) {
        console.log("[AI] error", err);
        setError(
          err?.response?.data?.detail || err?.message || "Request failed",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [startMonth, endMonth, enabled]); 

  const refetch = async () => {
    if (!startMonth || !endMonth) return;
    lastKeyRef.current = ""; 
    try {
      setLoading(true);
      setError(null);
      const res = await getAISummary(startMonth, endMonth);
      setData(res);
      lastKeyRef.current = `${startMonth}__${endMonth}`;
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
