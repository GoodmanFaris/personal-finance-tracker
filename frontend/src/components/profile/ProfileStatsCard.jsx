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
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <p className="text-gray-500 text-sm">Loading stats...</p>
      </div>
    );
  }

  const currency = profileData?.currency || "";

  const fmtMoney = (n) => {
    const num = Number(n || 0);
    return `${num.toLocaleString()} ${currency}`.trim();
  };

  const Stat = ({ label, value, accent = "none" }) => {
    const accentDot =
      accent === "primary"
        ? "rgb(var(--color-primary))"
        : accent === "secondary"
          ? "rgb(var(--color-secondary))"
          : accent === "danger"
            ? "rgba(239, 68, 68, 0.95)"
            : "rgba(0,0,0,0.25)";

    const valueColor =
      accent === "primary"
        ? "rgb(var(--color-primary))"
        : accent === "secondary"
          ? "rgb(var(--color-secondary))"
          : accent === "danger"
            ? "rgba(220, 38, 38, 0.95)"
            : "rgb(17, 24, 39)"; // gray-900

    return (
      <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm transition hover:bg-white">
        <div className="flex items-center justify-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accentDot }}
          />
          <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
            {label}
          </p>
        </div>
        <p
          className="mt-3 text-xl sm:text-2xl font-extrabold tracking-tight text-center"
          style={{ color: valueColor }}
        >
          {value}
        </p>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* subtle glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "rgb(var(--color-secondary))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      {/* Header */}
      <div className="relative border-b border-black/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "rgb(var(--color-secondary))" }}
          />
          <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
            Account Statistics
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Quick overview of your account usage and totals.
        </p>
      </div>

      {/* Tiles */}
      <div className="relative px-5 py-6 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Stat label="Using for" value={usingFor || "-"} accent="secondary" />
          <Stat
            label="Total Income"
            value={fmtMoney(totalIncome)}
            accent="primary"
          />
          <Stat
            label="Total Spent"
            value={fmtMoney(totalExpenses)}
            accent="danger"
          />
          <Stat
            label="Current Balance"
            value={fmtMoney(currentBalance)}
            accent="secondary"
          />
          <Stat
            label="Total Transactions"
            value={Number(totalTransactions || 0).toLocaleString()}
            accent="none"
          />
          <Stat
            label="Active Categories"
            value={Number(totalCategories || 0).toLocaleString()}
            accent="none"
          />
        </div>
      </div>
    </div>
  );
}
