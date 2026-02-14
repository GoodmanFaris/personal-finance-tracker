"use client";

export default function CategoryModal({ d }) {
  if (!d.addCategoryModalOpen) return null;

  const isEdit = Boolean(d.categoryToEdit);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-start justify-between border-b">
          <div>
            <h3 className="text-lg font-semibold">
              {isEdit ? "Edit category" : "Add category"}
            </h3>
            <p className="text-sm text-gray-600">
              {isEdit
                ? "Update name, budget and description."
                : "Create a new category."}
            </p>
          </div>

          <button
            onClick={d.closeAddCategoryModal}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={d.categoryDraft?.name ?? ""}
              onChange={(e) =>
                d.setCategoryDraft((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Food"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget
            </label>
            <input
              type="number"
              value={d.categoryDraft?.default_budget ?? ""}
              onChange={(e) =>
                d.setCategoryDraft((prev) => ({
                  ...prev,
                  default_budget: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use 0 if you don’t want a budget cap.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={d.categoryDraft?.description ?? ""}
              onChange={(e) =>
                d.setCategoryDraft((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional note..."
            />
          </div>

          {d.categoryError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {d.categoryError}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex gap-2 justify-end">
          <button
            onClick={d.closeAddCategoryModal}
            className="rounded-xl border px-4 py-2 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={d.saveCategory}
            disabled={d.savingCategory}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {d.savingCategory ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
