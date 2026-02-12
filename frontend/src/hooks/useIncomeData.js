"use client";

import { use, useEffect, useMemo, useState } from "react";
import { updateIncomesByMonth, getIncomesByMonth } from "../lib/income";

const pad2 = (n) => String(n).padStart(2, "0");

const currentMonthKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  return `${y}-${m}`; // YYYY-MM
};

export default function useIncomeData(monthKey = currentMonthKey()) {
    const [income, setIncome] = useState(0);

    const [incomeModalOpen, setIncomeModalOpen] = useState(false);
    const [incomeDraft, setIncomeDraft] = useState("");

    const [loadingIncome, setLoadingIncome] = useState(false);
    const [savingIncome, setSavingIncome] = useState(false);
    const [incomeError, setIncomeError] = useState("");
    const [incomeMsg, setIncomeMsg] = useState("");

    const balance = useMemo(() => Number(income) || 0, [income]);

    const RefreshIncome = async () => {
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
    RefreshIncome();
  }, [monthKey]);

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

    return {
        income,
        balance,
        incomeModalOpen,
        incomeDraft,
        loadingIncome,
        savingIncome,
        incomeError,
        incomeMsg,
        openIncomeModal,
        closeIncomeModal,
        saveIncome,
    };
}
