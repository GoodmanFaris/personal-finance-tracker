"use client";

import useDashboardData from "../../src/hooks/useDashboardData";

export default function DashboardPage() {
  const {
    monthKey,
    income,
    balance,
    loadingIncome,
    incomeError,
    incomeMsg,
    incomeModalOpen,
    openIncomeModal,
    closeIncomeModal,
    incomeDraft,
    setIncomeDraft,
    saveIncome,
    savingIncome,

    categories,
    loadingCategories,
    savingCategory,
    categoryError,
    categoryMsg,
    addCategoryModalOpen,
    openAddCategoryModal,
    closeAddCategoryModal,
    categoryDraft,
    setCategoryDraft,
    saveCategory,

    loadCategories,
    transactionDraft,
    setTransactionDraft,
    openCategoryForTransaction,
    createTransaction,
    savingTransaction,
    transactionError,
    transactionMsg,
    
  } = useDashboardData();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      {/* HEADER CARD */}
      <section className="bg-white border rounded-lg p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Current month</p>
          <p className="text-lg font-semibold">{monthKey}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Balance (for now = income)</p>
          <p className="text-3xl font-semibold">
            {loadingIncome ? "Loading..." : balance}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Income: <span className="font-medium">{income}</span>
          </p>

          <button
            onClick={openIncomeModal}
            className="mt-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Update income
          </button>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Categories</h2>

          <button
            onClick={openAddCategoryModal}
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black transition"
          >
            + Add category
          </button>
        </div>

        {categoryMsg ? (
          <div className="text-sm text-gray-700 bg-gray-50 border rounded-md p-3">
            {categoryMsg}
          </div>
        ) : null}

        {categoryError ? (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
            {categoryError}
          </div>
        ) : null}

        {loadingCategories ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((c) => (
              <div key={c.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-gray-600">
                      Budget:{" "}
                      <span className="font-medium">{c.default_budget ?? 0}</span>
                    </p>
                    {c.description ? (
                      <p className="text-sm text-gray-500 mt-1">
                        {c.description}
                      </p>
                    ) : null}
                  </div>

                  {/* kasnije ovdje ide X deactivate + click open modal */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {addCategoryModalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md border shadow-sm p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Add category</h3>
                <p className="text-sm text-gray-600">
                  Create a new budget category
                </p>
              </div>
              <button
                onClick={closeAddCategoryModal}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                value={categoryDraft.name}
                onChange={(e) =>
                  setCategoryDraft((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Food"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Budget</label>
              <input
                type="number"
                value={categoryDraft.budget}
                onChange={(e) =>
                  setCategoryDraft((prev) => ({
                    ...prev,
                    budget: e.target.value,
                  }))
                }
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Description
              </label>
              <textarea
                value={categoryDraft.description}
                onChange={(e) =>
                  setCategoryDraft((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional note..."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
                onClick={closeAddCategoryModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={saveCategory}
                disabled={savingCategory}
              >
                {savingCategory ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* INCOME MODAL */}
      {incomeModalOpen ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm border shadow-sm p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Update income</h3>
                <p className="text-sm text-gray-600">For {monthKey}</p>
              </div>
              <button
                onClick={closeIncomeModal}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Income amount
              </label>
              <input
                type="number"
                value={incomeDraft}
                onChange={(e) => setIncomeDraft(e.target.value)}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1500"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
                onClick={closeIncomeModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={saveIncome}
                disabled={savingIncome}
              >
                {savingIncome ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
