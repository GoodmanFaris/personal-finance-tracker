"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSummaryBundle } from "../lib/summary";

function toMonthKey(date) {
  return date.toISOString().slice(0, 7); // YYYY-MM
}

function clampMonthKey(v) {
  if (!v) return "";
  return v.slice(0, 7);
}

export default function useSummaryData({
  defaultRangeMonths = 6,
  topN = 10,
} = {}) {
  const now = useMemo(() => new Date(), []);
  const defaultEnd = useMemo(() => toMonthKey(now), [now]);

  const defaultStart = useMemo(() => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - (defaultRangeMonths - 1));
    return toMonthKey(d);
  }, [now, defaultRangeMonths]);

  const [startMonth, setStartMonth] = useState(defaultStart);
  const [endMonth, setEndMonth] = useState(defaultEnd);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lastKeyRef = useRef("");
  const reqIdRef = useRef(0);

  const setRange = useCallback((start, end) => {
    const s = clampMonthKey(start);
    const e = clampMonthKey(end);

    if (s && e && s > e) {
      setStartMonth(e);
      setEndMonth(s);
    } else {
      setStartMonth(s);
      setEndMonth(e);
    }
  }, []);

  const fetchBundle = useCallback(async () => {
    if (!startMonth || !endMonth) return;

    const key = `${startMonth}:${endMonth}:${topN}`; //Sprijecava React 18+ fetch loop(poziva 2 puta zbog StrictMode) i nepotrebne fetchove kad se mjesec ne promijeni
    if (lastKeyRef.current === key) return; 
    lastKeyRef.current = key;

    const myReqId = ++reqIdRef.current;

    setLoading(true);
    setError("");

    try {
      const bundle = await getSummaryBundle(startMonth, endMonth, topN);

      if (myReqId !== reqIdRef.current) return;

      setData(bundle);
    } catch (err) {
      if (myReqId !== reqIdRef.current) return;
      setError(err?.response?.data?.detail || "Failed to load summary");
      setData(null);
    } finally {
      if (myReqId !== reqIdRef.current) return;
      setLoading(false);
    }
  }, [startMonth, endMonth, topN]);

  useEffect(() => {
    fetchBundle();
  }, [fetchBundle]);

  return {
    startMonth,
    endMonth,
    setStartMonth,
    setEndMonth,
    setRange,

    data,
    loading,
    error,
    refresh: fetchBundle,
  };
}
