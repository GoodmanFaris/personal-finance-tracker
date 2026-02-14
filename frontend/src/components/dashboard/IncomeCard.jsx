"use client";

export default function IncomeCard({ d }) {
  return (
    <section className="rounded-2xl overflow-hidden shadow-sm border bg-gradient-to-r from-blue-700 via-blue-600 to-blue-300 text-white">
      <div className="p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: month + labels */}
        <div className="space-y-1">
          <p className="text-white/80 text-sm">Dashboard</p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {d.monthKey || "Current month"}
          </h1>
          <p className="text-white/80 text-sm">Balance</p>
        </div>

        {/* Right: numbers + button */}
        <div className="sm:text-right flex flex-col gap-3">
          <div>
            <p className="text-3xl sm:text-4xl font-bold leading-none">
              {d.loadingIncome ? "Loading..." : d.balance !== null ? `$${d.balance.toLocaleString()}` : "N/A"}
            </p>
            <p className="text-white/80 text-sm mt-1">
              Income: <span className="font-medium text-white">{d.income}</span>
            </p>
          </div>

          <div className="flex sm:justify-end">
            <button
              onClick={d.openIncomeModal}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/20 active:bg-white/25 transition px-4 py-2 font-medium"
            >
              Update income
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {d.incomeMsg || d.incomeError ? (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          {d.incomeMsg ? (
            <div className="rounded-xl bg-white/15 px-4 py-3 text-sm">
              {d.incomeMsg}
            </div>
          ) : null}
          {d.incomeError ? (
            <div className="rounded-xl bg-red-500/20 px-4 py-3 text-sm mt-2">
              {d.incomeError}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
