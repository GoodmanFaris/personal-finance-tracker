"use client";

import { useEffect, useMemo, useState } from "react";
import { updateIncomesByMonth, getIncomesByMonth } from "../lib/income";
import { listCategoriesActive, createCategory} from "../lib/categories"

const pad2 = (n) => String(n).padStart(2, "0");

const currentMonthKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  return `${y}-${m}`; // YYYY-MM
};



export default function useDashboardData() {
  // Month is fixed to "current month"
  const monthKey = useMemo(() => currentMonthKey(), []);

  // state
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [categoryMsg, setCategoryMsg] = useState("");

  // -------- Transactions --------
  const [transactionsByCategory, setTransactionsByCategory] = useState({});

  // draft za formu u modalu (inicijalno prazno)
  const [transactionDraft, setTransactionDraft] = useState({
    category_id: null,
    amount: "",
    date: "", // npr. "2026-02-11"
    note: "",
  });

  // Modal state
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [incomeDraft, setIncomeDraft] = useState("");
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [categoryDraft, setCategoryDraft] = useState({
    name: "",
    budget: "",
    description: "",
  });

  // UI state
  const [loadingIncome, setLoadingIncome] = useState(false);
  const [savingIncome, setSavingIncome] = useState(false);
  const [incomeError, setIncomeError] = useState("");
  const [incomeMsg, setIncomeMsg] = useState("");
  const [savingTransaction, setSavingTransaction] = useState(false);
  const [transactionError, setTransactionError] = useState("");
  const [transactionMsg, setTransactionMsg] = useState("");

  // For now: balance = income
  const balance = useMemo(() => Number(income) || 0, [income]);

  //income

  const refreshIncome = async () => {
    setIncomeError("");
    setIncomeMsg("");

    try {
      setLoadingIncome(true);
      const data = await getIncomesByMonth(monthKey);

      let amount = 0;
      if (data && typeof data.amount !== "undefined")
        amount = Number(data.amount);
      else if (typeof data === "number") amount = Number(data);

      setIncome(Number.isFinite(amount) ? amount : 0);
    } catch (err) {
      // If no record exists for this month, treat as 0 (no error)
      const status = err?.response?.status;
      if (status === 404) {
        setIncome(0);
      } else {
        setIncomeError("Failed to load income.");
      }
    } finally {
      setLoadingIncome(false);
    }
  };

  useEffect(() => {
    refreshIncome();
    // monthKey is stable due to useMemo([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openIncomeModal = () => {
    setIncomeError("");
    setIncomeMsg("");
    setIncomeDraft(String(income ?? 0));
    setIncomeModalOpen(true);
  };

  const closeIncomeModal = () => {
    setIncomeModalOpen(false);
  };

  const saveIncome = async () => {
    setIncomeError("");
    setIncomeMsg("");

    const amountNum = Number(incomeDraft);
    if (!Number.isFinite(amountNum)) {
      setIncomeError("Income must be a valid number.");
      return;
    }

    try {
      setSavingIncome(true);
      await updateIncomesByMonth(monthKey, { amount: amountNum });

      setIncome(amountNum);
      setIncomeMsg(`Saved income for ${monthKey}.`);
      setIncomeModalOpen(false);
    } catch (err) {
      setIncomeError("Failed to save income.");
    } finally {
      setSavingIncome(false);
    }
  };

  //Category

  const openAddCategoryModal = () => {
    setCategoryError("");
    setCategoryMsg("");
    setCategoryDraft({ name: "", budget: "", description: "" });
    setAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setAddCategoryModalOpen(false);
  };

  const loadCategories = async () => {
    setCategoryError("");
    setCategoryMsg("");

    try {
      setLoadingCategories(true);
      const data = await listCategoriesActive();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setCategoryError("Failed to load categories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // učitaj categories kad se dashboard otvori
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveCategory = async () => {
    setCategoryError("");
    setCategoryMsg("");

    const name = categoryDraft.name?.trim();
    const budgetNum =
      categoryDraft.budget === "" ? 0 : Number(categoryDraft.budget);
    const description = categoryDraft.description?.trim() || "";

    if (!name) {
      setCategoryError("Category name is required.");
      return;
    }
    if (!Number.isFinite(budgetNum)) {
      setCategoryError("Budget must be a number.");
      return;
    }

    try {
      setSavingCategory(true);

      await createCategory({
        name,
        budget: budgetNum,
        description,
      });

      setCategoryMsg("Category saved.");
      setAddCategoryModalOpen(false);
      await loadCategories();
    } catch (err) {
      setCategoryError("Failed to save category.");
    } finally {
      setSavingCategory(false);
    }
  };

  //transactions
  const openCategoryForTransaction = (categoryId) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    setTransactionDraft({
      category_id: categoryId,
      amount: "",
      date: today,
      note: "",
    });
  };

  const createTransaction = async () => {
    setTransactionError("");
    setTransactionMsg("");

    const categoryId = Number(transactionDraft.category_id);
    const amountNum = Number(transactionDraft.amount);

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      setTransactionError("Invalid category.");
      return;
    }
    if (!Number.isFinite(amountNum)) {
      setTransactionError("Amount must be a number.");
      return;
    }
    if (!transactionDraft.date) {
      setTransactionError("Date is required.");
      return;
    }

    const payload = {
      category_id: categoryId,
      amount: amountNum,
      date: transactionDraft.date,
      note: transactionDraft.note?.trim() || "",
    };

    try {
      setSavingTransaction(true);

      // ovo treba da zove POST /transaction/
      const created = await createTransactionApi(payload);

      // Update local map (da UI odmah vidi novu transakciju)
      setTransactionsByCategory((prev) => {
        const current = prev[categoryId] || [];
        return { ...prev, [categoryId]: [created, ...current] };
      });

      setTransactionMsg("Transaction saved.");
    } catch (e) {
      setTransactionError("Failed to save transaction.");
    } finally {
      setSavingTransaction(false);
    }
  };



  return {
    monthKey,

    income,
    balance,

    loadingIncome,
    savingIncome,
    incomeError,
    incomeMsg,

    incomeModalOpen,
    incomeDraft,
    setIncomeDraft,
    openIncomeModal,
    closeIncomeModal,
    saveIncome,

    refreshIncome,

    categories,
    loadingCategories,
    savingCategory,
    categoryError,
    categoryMsg,

    addCategoryModalOpen,
    openAddCategoryModal,
    closeAddCategoryModal,
    categoryDraft,
    setCategoryDraft,
    saveCategory,

    loadCategories,

    transactionDraft,
    setTransactionDraft,
    openCategoryForTransaction,
    createTransaction,
    savingTransaction, 
    transactionError, 
    transactionMsg
  };
}
