"use client";

import { useState } from "react";
import useDashboardData from "../../../src/hooks/useDashboardData";

import IncomeCard from "../../../src/components/dashboard/IncomeCard";
import IncomeModal from "../../../src/components/dashboard/IncomeModal";
import CategoriesSection from "../../../src/components/dashboard/CategoriesSection";
import CategoryModal from "../../../src/components/dashboard/CategoryModal";
import useAuthData from "../../../src/hooks/useAuthData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TransactionsModal from "../../../src/components/dashboard/TransactionsModal";
import ProtectedRoute from "../../../src/components/auth/ProtectedRoute"

export default function DashboardPage() {
  const d = useDashboardData();
  const [activeCategory, setActiveCategory] = useState(null);


  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <IncomeCard d={d} />
        <CategoriesSection
          d={d}
        onOpenTransactions={(cat) => {
          setActiveCategory(cat);
          d.openCategoryForTransaction(cat.id); 
        }}
      />

      <IncomeModal d={d} />
      <CategoryModal d={d} />

      <TransactionsModal
        d={d}
        activeCategory={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </div>
    </ProtectedRoute>
  );
}
