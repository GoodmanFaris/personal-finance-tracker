"use client";

import { useMemo } from "react";

export default function TransactionsModal({ d, activeCategory, onClose }) {
  const open = Boolean(d.addTransactionModalOpen);

  const txList = useMemo(() => {
    const cid = activeCategory?.id;
    if (!cid) return [];
    return d.transactionsByCategory?.[cid] || [];
  }, [activeCategory, d.transactionsByCategory]);

  if (!open) return null;

  const categoryName = activeCategory?.name || "Category";

  const handleClose = () => {
    d.closeAddTransactionModal?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Window */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header / Titlebar (secondary) */}
        <div
          className="relative px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/80">
                Transactions
              </p>
              <h3 className="text-lg font-extrabold tracking-tight">
                {categoryName}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Add a transaction and manage the list below.
              </p>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              <span className="h-3 w-3 rounded-full bg-white/35" />
              <button
                onClick={handleClose}
                className="ml-1 grid h-9 w-9 place-items-center rounded-xl bg-white/15 hover:bg-white/25 transition"
                aria-label="Close"
                type="button"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>
          </div>

          {/* subtle header shine */}
          <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/15 to-transparent" />
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          {/* Add form */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
              {/* Amount */}
              <div className="sm:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-black/60">
                  Amount
                </label>
                <div className="rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
                  <input
                    type="number"
                    value={d.transactionDraft?.amount ?? ""}
                    onChange={(e) =>
                      d.setTransactionDraft((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35"
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="sm:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-black/60">
                  Date
                </label>
                <div className="rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
                  <input
                    type="date"
                    value={d.transactionDraft?.date ?? ""}
                    onChange={(e) =>
                      d.setTransactionDraft((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-black/60">
                  Note
                </label>
                <div className="rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
                  <input
                    value={d.transactionDraft?.description ?? ""}
                    onChange={(e) =>
                      d.setTransactionDraft((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35"
                    placeholder="optional..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={d.createTransaction}
                disabled={d.savingTransaction}
                className="rounded-2xl px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:
                    "rgba(var(--color-primary)",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
                }}
                type="button"
              >
                {d.savingTransaction ? "Saving..." : "Add transaction"}
              </button>
            </div>

            {d.transactionMsg ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                {d.transactionMsg}
              </div>
            ) : null}

            {d.transactionError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {d.transactionError}
              </div>
            ) : null}
          </div>

          {/* List */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-extrabold tracking-tight text-gray-900">
                List
              </p>
              {d.loadingTransactions ? (
                <p className="text-xs text-gray-500">Loading...</p>
              ) : null}
            </div>

            {d.loadingTransactions ? (
              <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-sm text-gray-700">
                Loading transactions...
              </div>
            ) : txList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 bg-white/60 p-5 text-sm text-gray-600">
                No transactions yet for this category.
              </div>
            ) : (
              <div className="space-y-2">
                {txList.map((t) => (
                  <div
                    key={t.id}
                    className="group rounded-2xl border border-black/10 bg-white/70 p-3 transition hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm text-gray-900">
                          <span className="font-extrabold">{t.amount}</span>{" "}
                          <span className="text-gray-500">• {t.date}</span>
                        </div>

                        {t.description ? (
                          <div className="mt-1 text-sm text-gray-700">
                            {t.description}
                          </div>
                        ) : (
                          <div className="mt-1 text-sm text-gray-400">
                            No description
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          d.deleteTransactionById(t.id, activeCategory?.id)
                        }
                        disabled={d.transactionToDelete === t.id}
                        className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-sm font-extrabold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        type="button"
                      >
                        {d.transactionToDelete === t.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            onClick={handleClose}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 transition"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
