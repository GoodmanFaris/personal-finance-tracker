"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchMe } from "../lib/user";
import useCategoryTransactionData from "./useCategoryTransactionData";

export default function useLandingData() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");

  const catTx = useCategoryTransactionData(); 

  const fetchUser = useCallback(async () => {
    setLoadingUser(true);
    setError("");
    try {
      const data = await fetchMe();
      setUser(data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load user");
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loadingUser,
    error,

    categories: catTx.categories,
    loadingCategories: catTx.loading,
    createTransactionWithPayload: catTx.createTransactionWithPayload, 

    transactionError: catTx.transactionError,
    transactionMsg: catTx.transactionMsg,
    savingTransaction: catTx.savingTransaction,
  };
}
