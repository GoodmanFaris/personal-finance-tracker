"use client";

import { useCallback } from "react";
import useIncomeData from "./useIncomeData";
import useCategoryTransactionData from "./useCategoryTransactionData";
import { use } from "react";
import { fetchMe } from "../lib/user";

export default function useDashboardData() {
  const income = useIncomeData(); 
  const onBalanceChanged = useCallback(async () => {
    await income.RefreshBalance();
  }, [income]);
  const profileData = fetchMe();
  const catTx = useCategoryTransactionData({ onBalanceChanged });

  return {
    ...income,
    ...catTx,
    profileData
  };
}
