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

  const balanceText = d.loadingIncome
    ? "Loading..."
    : d.balance !== null
      ? `${symbol}${d.balance.toLocaleString()}`
      : "N/A";

  return (
    <section className="relative w-full mt-15 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br  text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition hover:shadow-[0_26px_85px_rgba(0,0,0,0.32)]" style={{ background: "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-primary) / 0.7) 100%)", boxShadow: "0 18px 60px rgba(var(--color-shadow), 0.25)" }}>
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
      {/* subtle overlay to smooth gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* LEFT SIDE */}
          <div className="space-y-3">
            {/* Month */}
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/70" />
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-white/95">
                {formattedMonth}
              </h1>
            </div>

            {/* Balance BELOW month */}
            <div>
              <p className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {balanceText}
              </p>
              <p className="mt-1 text-sm text-white/70">Total Balance</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-white/80 text-lg md:text-xl">
              Income:{" "}
              <span className="font-semibold text-white">
                {symbol}
                {d.income?.toLocaleString()}
              </span>
            </p>

            <button
              onClick={d.openIncomeModal}
              className="group w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-6 py-3 font-semibold text-blue-800 shadow-md ring-1 ring-white/20 transition hover:bg-white active:scale-[0.98]"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500/90 transition group-hover:scale-110" />
              Update income
            </button>
          </div>
        </div>

        {/* Messages */}
        {(d.incomeMsg || d.incomeError) && (
          <div className="mt-4">
            {d.incomeMsg && (
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3 text-sm text-white/90">
                {d.incomeMsg}
              </div>
            )}
            {d.incomeError && (
              <div className="mt-3 rounded-2xl border border-red-300/25 bg-red-500/15 px-4 py-3 text-sm text-white/90">
                {d.incomeError}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
