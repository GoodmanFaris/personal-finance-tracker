"use client";

import useProfileData from "../../hooks/useProfileData";

export default function ProfileStatsCard() {
  const {
    profileData,
    loading,
    usingFor,
    totalIncome,
    totalExpenses,
    currentBalance,
    totalTransactions,
    totalCategories,
  } = useProfileData();

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
        <p className="text-gray-500 text-sm">Loading stats...</p>
      </div>
    );
  }

  const currency = profileData?.currency || "";

  const fmtMoney = (n) => {
    const num = Number(n || 0);
    return `${num.toLocaleString()} ${currency}`.trim();
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Account Statistics
      </h3>

      <div className="grid sm:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-gray-500 text-sm">Using for</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {usingFor || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Income</p>
          <p className="mt-2 text-xl font-semibold text-green-600">
            {fmtMoney(totalIncome)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Spent</p>
          <p className="mt-2 text-xl font-semibold text-red-600">
            {fmtMoney(totalExpenses)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Current Balance</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {fmtMoney(currentBalance)}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Transactions</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {Number(totalTransactions || 0).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Active Categories</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {Number(totalCategories || 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
