"use client";

import { useCallback } from "react";
import useIncomeData from "./useIncomeData";
import useCategoryTransactionData from "./useCategoryTransactionData";
import { use } from "react";


export default function useDashboardData() {
  const income = useIncomeData(); 
  const onBalanceChanged = useCallback(async () => {
    await income.RefreshBalance();
  }, [income]);

  const catTx = useCategoryTransactionData({ onBalanceChanged });

  return {
    ...income,
    ...catTx,
  };
}
