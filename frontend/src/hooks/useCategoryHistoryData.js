"use client";

import { useCallback, useEffect, useState } from "react";
import { listCategoriesAll } from "../lib/categories";
import { listTransactionsByCategory } from "../lib/transactions";

export default function useCategoryHistoryData() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    setError("");
    try {
      const data = await listCategoriesAll();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCategory = useCallback(async (cat) => {
    setSelectedCategory(cat);
    setOpen(true);
    setTransactions([]);
    setError("");

    setLoadingTx(true);
    try {
      const tx = await listTransactionsByCategory(cat.id);
      setTransactions(Array.isArray(tx) ? tx : []);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load transactions");
    } finally {
      setLoadingTx(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setSelectedCategory(null);
    setTransactions([]);
    setError("");
    setLoadingTx(false);
  }, []);

  return {
    categories,
    loadingCategories,
    error,

    open,
    selectedCategory,
    transactions,
    loadingTx,

    reloadCategories: loadCategories,
    openCategory,
    closeModal,
  };
}
