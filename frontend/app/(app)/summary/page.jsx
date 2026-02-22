"use client";

import useSummaryData from "../../../src/hooks/useSummaryData";
import SummaryPeriodPicker from "../../../src/components/summary/SummaryPeriodPicker";
import MonthlyIncomeExpenseChart from "../../../src/components/summary/MonthlyIncomeExpenseChart";
import { getCurrencySymbol } from "../../../src/utils/HelpersValues"; 
import ProtectedRoute from "../../../src/components/auth/ProtectedRoute";
import SummaryDonuts from "../../../src/components/summary/SummaryDonuts";

import useCategoryHistoryData from "../../../src/hooks/useCategoryHistoryData";
import CategoryHistoryPanel from "../../../src/components/summary/CategoryHistoryPanel";
import CategoryTransactionsModal from "../../../src/components/summary/CategoryTransactionsModal";

export default function SummaryPage() {
  const { startMonth, endMonth, setRange, data, loading, error } =
    useSummaryData({ defaultRangeMonths: 6, topN: 10 });

  const currencyCode = "BAM";
  const currencySymbol = getCurrencySymbol(currencyCode);

  const {
    categories,
    loadingCategories,
    open,
    selectedCategory,
    transactions,
    loadingTx,
    openCategory,
    closeModal,
  } = useCategoryHistoryData();

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 space-y-6">
        <SummaryPeriodPicker
          startMonth={startMonth}
          endMonth={endMonth}
          onChangeStart={(v) => setRange(v, endMonth)}
          onChangeEnd={(v) => setRange(startMonth, v)}
        />

        {error ? (
          <div className="w-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm text-red-600">
            {error}
          </div>
        ) : null}

        <MonthlyIncomeExpenseChart
          monthlySeries={data?.monthly_series || []}
          currencySymbol={currencySymbol}
          loading={loading}
        />
      </div>

      <SummaryDonuts bundle={data} currencySymbol={currencySymbol} />

      <div className="space-y-6">
        <CategoryHistoryPanel
          categories={categories}
          loading={loadingCategories}
          onSelect={openCategory}
        />

        <CategoryTransactionsModal
          open={open}
          onClose={closeModal}
          category={selectedCategory}
          transactions={transactions}
          loading={loadingTx}
          error={error}
          currencySymbol={currencySymbol}
        />
      </div>
    </ProtectedRoute>
  );
}
