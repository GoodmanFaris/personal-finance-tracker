"use client";

export default function CategoriesSection({ d, onOpenTransactions }) {
  return (
    <section className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b bg-blue-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600">
            Add, edit, delete — click a card to open transactions.
          </p>
        </div>

        <button
          onClick={d.openAddCategoryModal}
          className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
        >
          + Add category
        </button>
      </div>

      {/* Messages */}
      {d.categoryMsg || d.categoryError ? (
        <div className="px-5 pt-4 space-y-2">
          {d.categoryMsg ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
              {d.categoryMsg}
            </div>
          ) : null}

          {d.categoryError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {d.categoryError}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Body */}
      <div className="px-5 py-5">
        {d.loadingCategories ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : !d.categories?.length ? (
          <div className="rounded-xl border border-dashed p-6 text-center text-gray-600">
            No categories yet. Click{" "}
            <span className="font-medium">Add category</span> to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {d.categories.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenTransactions?.(c)}
                className="cursor-pointer rounded-2xl border p-4 hover:shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Budget:{" "}
                      <span className="font-semibold text-gray-900">
                        {c.default_budget ?? c.budget ?? 0}
                      </span>
                    </p>
                    {c.description ? (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {c.description}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 mt-2">
                        No description
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      className="rounded-lg border px-3 py-1 text-sm hover:bg-white transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        d.editCategory?.(c);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="rounded-lg border px-3 py-1 text-sm text-red-700 hover:bg-red-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={d.categoryToDelete === c.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        d.deleteCategoryById(c.id);
                      }}
                    >
                      {d.categoryToDelete === c.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Optional: quick tx count if you already loaded */}
                {d.transactionsByCategory?.[c.id]?.length ? (
                  <p className="text-xs text-gray-500 mt-3">
                    Transactions loaded:{" "}
                    <span className="font-medium">
                      {d.transactionsByCategory[c.id].length}
                    </span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
