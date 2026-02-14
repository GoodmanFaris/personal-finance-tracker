"use client";

import useIncomeData from "./useIncomeData";
import useCategoryTransactionData from "./useCategoryTransactionData";

export default function useDashboardData() {
  const income = useIncomeData(); 
  const catTx = useCategoryTransactionData(); 

  return {
    ...income,
    ...catTx,
  };
}
