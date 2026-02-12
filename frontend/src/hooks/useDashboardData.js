"use client";

import useIncomeData from "./useIncomeData";
import useCategoryTransactionData from "./useCategoryTransactionData";

export default function useDashboardData() {
  const income = useIncomeData(); // current month (internal)
  const catTx = useCategoryTransactionData(); // categories + tx

  return {
    ...income,
    ...catTx,
  };
}
