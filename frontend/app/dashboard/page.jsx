"use client";

import { useMemo, useState } from "react";
import useDashboardData from "../../src/hooks/useDashboardData";

export default function DashboardPage() {
  const d = useDashboardData();

  // local state za "koja kategorija je trenutno otvorena"
  const [activeCategory, setActiveCategory] = useState(null);

  const activeTx = useMemo(() => {
    if (!activeCategory?.id) return [];
    return d.transactionsByCategory?.[activeCategory.id] || [];
  }, [activeCategory, d.transactionsByCategory]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* INCOME */}
      <section className="border rounded p-4 space-y-2 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Current month</div>
            <div className="font-semibold">{d.monthKey || "(monthKey)"}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-600">Balance (now = income)</div>
            <div className="text-2xl font-bold">
              {d.loadingIncome ? "Loading..." : d.balance}
            </div>
            <div className="text-sm text-gray-600">
              Income: <span className="font-medium">{d.income}</span>
            </div>
          </div>
        </div>

        <button
          onClick={d.openIncomeModal}
          className="px-3 py-2 rounded bg-blue-600 text-white"
        >
          Update income
        </button>

        {d.incomeMsg ? (
          <p className="text-sm text-gray-700">{d.incomeMsg}</p>
        ) : null}
        {d.incomeError ? (
          <p className="text-sm text-red-700">{d.incomeError}</p>
        ) : null}
      </section>

      {/* INCOME MODAL */}
      {d.incomeModalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border rounded p-4 w-full max-w-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Update income</h3>
              <button onClick={d.closeIncomeModal}>✕</button>
            </div>

            <input
              type="number"
              value={d.incomeDraft}
              onChange={(e) => d.setIncomeDraft(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="1500"
            />

            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-2 border rounded"
                onClick={d.closeIncomeModal}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
                onClick={d.saveIncome}
                disabled={d.savingIncome}
              >
                {d.savingIncome ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* CATEGORIES */}
      <section className="border rounded p-4 space-y-3 bg-white">
        <div
          className="flex items-center justify-between"
        >
          <h2 className="font-semibold">Categories</h2>
          <button
            onClick={d.openAddCategoryModal}
            className="px-3 py-2 rounded bg-gray-900 text-white"
          >
            + Add category
          </button>
        </div>

        {d.categoryMsg ? (
          <p className="text-sm text-gray-700">{d.categoryMsg}</p>
        ) : null}
        {d.categoryError ? (
          <p className="text-sm text-red-700">{d.categoryError}</p>
        ) : null}

        {d.loadingCategories ? (
          <p className="text-gray-600">Loading...</p>
        ) : d.categories?.length ? (
          <div className="space-y-2">
            {d.categories.map((c) => (
              <div
                key={c.id}
                className="border rounded p-3 flex items-start justify-between gap-3"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveCategory(c);
                    d.openCategoryForTransaction(c.id); // opens tx modal + loads tx
                  }}
                >
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-gray-600">
                    Budget:{" "}
                    <span className="font-medium">{c.default_budget ?? 0}</span>
                  </div>
                  {c.description ? (
                    <div className="text-sm text-gray-500">{c.description}</div>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(c);
                      d.editCategory?.(c); // opens category modal in edit mode
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 border rounded text-red-700"
                    disabled={d.categoryToDelete === c.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      d.deleteCategoryById(c.id);
                      // optional: if deleting active category, clear
                      if (activeCategory?.id === c.id) setActiveCategory(null);
                    }}
                  >
                    {d.categoryToDelete === c.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No categories yet.</p>
        )}
      </section>

      {/* CATEGORY MODAL (ADD/EDIT) */}
      {d.addCategoryModalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border rounded p-4 w-full max-w-md space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {d.categoryToEdit ? "Edit category" : "Add category"}
              </h3>
              <button onClick={d.closeAddCategoryModal}>✕</button>
            </div>

            <div className="space-y-2">
              <input
                value={d.categoryDraft.name}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
              />

              <input
                type="number"
                value={d.categoryDraft.default_budget}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    default_budget: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Budget"
              />

              <input
                value={d.categoryDraft.description}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Description (optional)"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-2 border rounded"
                onClick={d.closeAddCategoryModal}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded bg-gray-900 text-white disabled:opacity-60"
                onClick={d.saveCategory}
                disabled={d.savingCategory}
              >
                {d.savingCategory ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* TRANSACTION MODAL */}
      {d.addTransactionModalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border rounded p-4 w-full max-w-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Transactions</h3>
                <p className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-medium">{activeCategory?.name}</span>
                </p>
              </div>
              <button onClick={d.closeAddTransactionModal}>✕</button>
            </div>

            {/* Add tx form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="number"
                value={d.transactionDraft.amount}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="border rounded px-3 py-2"
                placeholder="Amount"
              />
              <input
                type="date"
                value={d.transactionDraft.date}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="border rounded px-3 py-2"
              />
              <input
                value={d.transactionDraft.description}
                onChange={(e) =>
                  d.setTransactionDraft((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="border rounded px-3 py-2 sm:col-span-2"
                placeholder="Description (optional)"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={d.createTransaction}
                disabled={d.savingTransaction}
                className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
              >
                {d.savingTransaction ? "Saving..." : "Add transaction"}
              </button>
            </div>

            {d.transactionMsg ? (
              <p className="text-sm text-gray-700">{d.transactionMsg}</p>
            ) : null}
            {d.transactionError ? (
              <p className="text-sm text-red-700">{d.transactionError}</p>
            ) : null}

            {/* List tx */}
            <div className="border rounded p-2">
              <div className="text-sm font-medium mb-2">List</div>

              {d.loadingTransactions ? (
                <p className="text-gray-600">Loading...</p>
              ) : activeTx.length ? (
                <div className="space-y-2">
                  {activeTx.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between border rounded p-2"
                    >
                      <div className="text-sm">
                        <div>
                          <span className="font-medium">{t.amount}</span>{" "}
                          <span className="text-gray-600">{t.date}</span>
                        </div>
                        {t.note ? (
                          <div className="text-gray-600">{t.note}</div>
                        ) : null}
                      </div>

                      <button
                        className="px-2 py-1 border rounded text-red-700"
                        disabled={d.transactionToDelete === t.id}
                        onClick={() =>
                          d.deleteTransactionById(t.id, activeCategory?.id)
                        }
                      >
                        {d.transactionToDelete === t.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No transactions.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
