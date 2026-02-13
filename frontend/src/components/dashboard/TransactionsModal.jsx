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

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-start justify-between border-b bg-blue-50">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Transactions
            </h3>
            <p className="text-sm text-gray-700">
              Category: <span className="font-medium">{categoryName}</span>
            </p>
          </div>

          <button
            onClick={() => {
              d.closeAddTransactionModal?.();
              onClose?.();
            }}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Add form */}
        <div className="px-5 py-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <div className="sm:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Amount</label>
              <input
                type="number"
                value={d.transactionDraft?.amount ?? ""}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={d.transactionDraft?.date ?? ""}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Note</label>
              <input
                value={d.transactionDraft?.note ?? ""}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="optional..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={d.createTransaction}
              disabled={d.savingTransaction}
              className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {d.savingTransaction ? "Saving..." : "Add transaction"}
            </button>
          </div>

          {d.transactionMsg ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
              {d.transactionMsg}
            </div>
          ) : null}

          {d.transactionError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {d.transactionError}
            </div>
          ) : null}
        </div>

        {/* List */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-900">List</p>
            {d.loadingTransactions ? (
              <p className="text-xs text-gray-500">Loading...</p>
            ) : null}
          </div>

          {d.loadingTransactions ? (
            <div className="rounded-xl border p-4 text-gray-600 text-sm">
              Loading transactions...
            </div>
          ) : txList.length === 0 ? (
            <div className="rounded-xl border border-dashed p-5 text-gray-600 text-sm">
              No transactions yet for this category.
            </div>
          ) : (
            <div className="space-y-2">
              {txList.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border p-3 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-sm text-gray-900">
                      <span className="font-semibold">{t.amount}</span>{" "}
                      <span className="text-gray-500">• {t.date}</span>
                    </div>
                    {t.note ? (
                      <div className="text-sm text-gray-600 mt-1">{t.note}</div>
                    ) : (
                      <div className="text-sm text-gray-400 mt-1">No note</div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      d.deleteTransactionById(t.id, activeCategory?.id)
                    }
                    disabled={d.transactionToDelete === t.id}
                    className="rounded-lg border px-3 py-1 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {d.transactionToDelete === t.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex justify-end">
          <button
            onClick={() => {
              d.closeAddTransactionModal?.();
              onClose?.();
            }}
            className="rounded-xl border px-4 py-2 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
