"use client";

import useAuthData from "../../hooks/useAuthData";
import { getCurrencySymbol } from "../../utils/HelpersValues";

export default function IncomeCard({ d }) {
  const formattedMonth =
    d.monthKey ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const { user } = useAuthData(); 
    const symbol = getCurrencySymbol(user?.currency || "USD");

  return (
    <section className="w-full rounded-l overflow-hidden border border-blue-400/20 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-3">
          {/* Month */}
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            {formattedMonth}
          </h1>

          {/* Balance BELOW month */}
          <div>
            <p className="text-3xl md:text-5xl font-semibold">
              {d.loadingIncome
                ? "Loading..."
                : d.balance !== null
                  ? `${symbol}${d.balance.toLocaleString()}`
                  : "N/A"}
            </p>
            <p className="text-white/70 text-sm mt-1">Total Balance</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-white/80 text-xl">
            Income:{" "}
            <span className="font-semibold text-white">
              {symbol}{d.income?.toLocaleString()}
            </span>
          </p>

          <button
            onClick={d.openIncomeModal}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-2xl bg-white text-blue-700 hover:bg-blue-50 active:scale-95 transition-all duration-200 px-6 py-3 font-semibold shadow-md"
          >
            Update income
          </button>
        </div>
      </div>

      {(d.incomeMsg || d.incomeError) && (
        <div className="px-6 md:px-8 pb-6">
          {d.incomeMsg && (
            <div className="rounded-2xl bg-white/15 backdrop-blur-md px-4 py-3 text-sm">
              {d.incomeMsg}
            </div>
          )}
          {d.incomeError && (
            <div className="rounded-2xl bg-red-500/20 px-4 py-3 text-sm mt-3">
              {d.incomeError}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
