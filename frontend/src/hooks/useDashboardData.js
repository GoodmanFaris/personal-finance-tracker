"use client";

import useIncomeData from "./useIncomeData";
import useCategoryTransactionData from "./useCategoryTransactionData";
import { use } from "react";


export default function useDashboardData() {
  const income = useIncomeData(); 
  const catTx = useCategoryTransactionData({
    onBalanceChanged: async () => {
      await income.RefreshBalance(); 
    },
  }); 

  return {
    ...income,
    ...catTx,
  };
}
