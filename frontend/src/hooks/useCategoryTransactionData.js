"use client";

import { useEffect, useMemo, useState } from "react";
import { listCategoriesActive, createCategory, deleteCategory, updateCategory } from "../lib/categories";
import { listTransactionsByCategory, deleteTransaction, createTransaction as createTransactionApi } from "../lib/transactions";

export default function useCategoryTransactionData() {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [savingCategory, setSavingCategory] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [categoryMsg, setCategoryMsg] = useState("");
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const [transactionsByCategory, setTransactionsByCategory] = useState({});
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [transactionError, setTransactionError] = useState("");
    const [transactionMsg, setTransactionMsg] = useState("");
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [savingTransaction, setSavingTransaction] = useState(false);

    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [categoryDraft, setCategoryDraft] = useState({
      name: "",
      default_budget: "0",
      description: "",
    });
    

    const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
    const [transactionDraft, setTransactionDraft] = useState({
      category_id: null,
      amount: "",
      date: "", // npr. "2026-02-11"
      note: "",
    });

    const openAddCategoryModal = () => {
      setCategoryError("");
      setCategoryMsg("");
      setCategoryDraft({ name: "", default_budget: "0", description: "" });
      setCategoryToEdit(null);
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

    useEffect(() => {
       loadCategories();
    }, []);

    const saveCategory = async () => {
      setCategoryError("");
      setCategoryMsg("");

      const name = categoryDraft.name?.trim();
      const budgetNum =
        categoryDraft.default_budget === "" ? 0 : Number(categoryDraft.default_budget);
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

        const payload = { name, default_budget: budgetNum, description };

        if (categoryToEdit) {
          await updateCategory(categoryToEdit.id, payload);
          setCategoryMsg("Category updated.");
        } else {
          await createCategory(payload);
          setCategoryMsg("Category created.");
        }

        setAddCategoryModalOpen(false);
        setCategoryToEdit(null);
        await loadCategories();
      } catch (err) {
        setCategoryError("Failed to save category.");
      } finally {
        setSavingCategory(false);
      }
    };

    const deleteCategoryById = async (id) => {
      setCategoryToDelete(id);
      setCategoryError("");
      setCategoryMsg("");
      try {
        await deleteCategory(id);
        setCategoryMsg("Category deleted.");
        await loadCategories();
      } catch (err) {
        setCategoryError("Failed to delete category.");
      } finally {
        setCategoryToDelete(null);
      }
    };

    const editCategory = (category) => {
      setCategoryError("");
      setCategoryMsg("");
      setCategoryToEdit(category);

      setCategoryDraft({
        name: category.name ?? "",
        default_budget: String(category.default_budget ?? 0),
        description: category.description ?? "",
      });

      setAddCategoryModalOpen(true);
    };


    //transactions
    const openCategoryForTransaction = (categoryId) => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      setTransactionDraft({
        category_id: categoryId,
        amount: "",
        date: today,
        description: "",
      });
      loadTransactionsByCategory(categoryId);
      setAddTransactionModalOpen(true);
    };


    const closeAddTransactionModal = () => {
      setAddTransactionModalOpen(false);
    };

    const createTransaction = async () => {
      setTransactionError("");
      setTransactionMsg("");
      setSavingTransaction(true);
        const categoryId = Number(transactionDraft.category_id);
        const amountNum = Number(transactionDraft.amount);
        if (!Number.isFinite(categoryId) || categoryId <= 0) {
          setTransactionError("Invalid category.");
          setSavingTransaction(false);
          return;
        }
        if (!Number.isFinite(amountNum)) {
            setTransactionError("Amount must be a number.");
            setSavingTransaction(false);
            return;
        }
        if (!transactionDraft.date) {
            setTransactionError("Date is required.");
            setSavingTransaction(false);
            return;
        }
        try {          
            await createTransactionApi({
              category_id: categoryId,
              amount: amountNum,
              type: "expense", // hardcoded for now, can be extended later
              date: transactionDraft.date,
              description: (transactionDraft.description || "").trim(),
            });
          setTransactionMsg("Transaction saved.");
          setAddTransactionModalOpen(false);
          await loadTransactionsByCategory(categoryId);
          await loadCategories(); 
        } catch (err) {
          setTransactionError("Failed to save transaction.");
        } finally {
          setTransactionDraft({
            category_id: null,
            amount: "",
            date: "",
            description: "",
          });
          setSavingTransaction(false);
        }
    };

    const loadTransactionsByCategory = async (categoryId) => {
      setTransactionError("");
      setTransactionMsg("");
        try {
            setLoadingTransactions(true);
            const data = await listTransactionsByCategory(categoryId);
            setTransactionsByCategory((prev) => ({
              ...prev,
              [categoryId]: Array.isArray(data) ? data : [],
            }));
        } catch (err) {
          setTransactionError("Failed to load transactions.");
        } finally {          
            setLoadingTransactions(false);
        }
    };

    const deleteTransactionById = async (transactionId, categoryId) => {
      setTransactionToDelete(transactionId);
      setTransactionError("");
      setTransactionMsg("");
      try {
        await deleteTransaction(transactionId);
        setTransactionMsg("Transaction deleted.");
        if (categoryId) {
          await loadTransactionsByCategory(categoryId);
        } else {
          setTransactionsByCategory({});
        }
      } catch (err) {
        setTransactionError("Failed to delete transaction.");
      } finally {
        setTransactionToDelete(null);
      }
    };

    return {
      categories,
      loadingCategories,
      categoryError,
      categoryMsg,
      addCategoryModalOpen,
      categoryDraft,
      openAddCategoryModal,
      closeAddCategoryModal,
      saveCategory,
      deleteCategoryById,
      editCategory,
      transactionsByCategory,
      loadingTransactions,
      transactionError,
      transactionMsg,
      transactionToDelete,
      openCategoryForTransaction,
      addTransactionModalOpen,
      closeAddTransactionModal,
      createTransaction,
      deleteTransactionById,
      setCategoryDraft,
      transactionDraft,
      setTransactionDraft
    };

}
