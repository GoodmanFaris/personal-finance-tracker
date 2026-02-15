"use client";

import { useEffect, useMemo, useState } from "react";
import { updateIncomesByMonth, getIncomesByMonth } from "../lib/income";
import { getBalance } from "../lib/balance";

const pad2 = (n) => String(n).padStart(2, "0");

const currentMonthKey = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  return `${y}-${m}`; // YYYY-MM
};

export default function useIncomeData(monthKeyProp) {
  const monthKey = useMemo(
    () => monthKeyProp || currentMonthKey(),
    [monthKeyProp],
  );
    const [income, setIncome] = useState(0);

    const [incomeModalOpen, setIncomeModalOpen] = useState(false);
    const [incomeDraft, setIncomeDraft] = useState("");

    const [loadingIncome, setLoadingIncome] = useState(false);
    const [savingIncome, setSavingIncome] = useState(false);
    const [incomeError, setIncomeError] = useState("");
    const [incomeMsg, setIncomeMsg] = useState("");

    const [balance, setBalance] = useState(0);

    const RefreshIncome = async () => {
      setIncomeError("");
      setIncomeMsg("");

      try {
        setLoadingIncome(true);
        const data = await getIncomesByMonth(monthKey);
        const balanceData = await getBalance(); 

        let amount = 0;
        if (data && typeof data.amount !== "undefined")
          amount = Number(data.amount);
        else if (typeof data === "number") amount = Number(data);

        setIncome(Number.isFinite(amount) ? amount : 0);
        setBalance(balanceData?.amount ?? 0);
      } catch (err) {
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

  const RefreshBalance = async () => {
    try {
      const balanceData = await getBalance();
      setBalance(balanceData?.amount ?? 0);
    } catch (err) {
      // Ignore balance loading errors for now
    }
  };

  useEffect(() => {
    RefreshIncome();
    RefreshBalance();
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
        RefreshIncome();
        RefreshBalance();
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
      setIncomeDraft,
      RefreshIncome,
      RefreshBalance,
    };
}
