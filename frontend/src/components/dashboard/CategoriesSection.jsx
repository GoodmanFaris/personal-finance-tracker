"use client";

export default function CategoriesSection({ d, onOpenTransactions }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)] pb-4 mb-80">
      {/* subtle top glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ background: "rgb(var(--color-secondary))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      {/* Header */}
      <div className="relative border-b border-black/10 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--color-secondary))" }}
              />
              <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                Categories
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Add, edit, delete — click a card to open transactions.
            </p>
          </div>

          <button
            onClick={d.openAddCategoryModal}
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:brightness-[1.02] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(90deg, rgba(var(--color-primary)), rgba(var(--color-secondary)))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.10)",
            }}
          >
            + Add category
          </button>
        </div>
      </div>

      {/* Messages */}
      {d.categoryMsg || d.categoryError ? (
        <div className="relative px-5 pt-4 sm:px-6 space-y-2">
          {d.categoryMsg ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {d.categoryMsg}
            </div>
          ) : null}

          {d.categoryError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
              {d.categoryError}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Body */}
      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        {d.loadingCategories ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : !d.categories?.length ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-6 text-center text-gray-600">
            No categories yet. Click{" "}
            <span className="font-semibold text-gray-900">Add category</span> to
            create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.categories.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenTransactions?.(c)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.12)]"
              >
                {/* green rail */}
                <div
                  className="absolute left-0 top-0 h-full w-1.5 opacity-80"
                  style={{ background: "rgb(var(--color-secondary))" }}
                />
                {/* subtle hover wash */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent" />

                <div className="relative flex items-start justify-between gap-3">
                  {/* Content */}
                  <div className="min-w-0">
                    <p className="truncate text-base font-extrabold tracking-tight text-gray-900">
                      {c.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Budget:{" "}
                      <span className="font-extrabold text-gray-900">
                        {c.budget ?? c.default_budget ?? 0}
                      </span>
                    </p>

                    {c.description ? (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {c.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-400">
                        No description
                      </p>
                    )}

                    {/* Optional: tx count */}
                    {d.transactionsByCategory?.[c.id]?.length ? (
                      <p className="mt-3 text-xs text-gray-500">
                        Transactions loaded:{" "}
                        <span className="font-semibold text-gray-800">
                          {d.transactionsByCategory[c.id].length}
                        </span>
                      </p>
                    ) : null}
                  </div>

                  {/* Actions */}
                  <div className="relative flex flex-col gap-2">
                    <button
                      className="rounded-xl px-3 py-1.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-[1.03] active:scale-[0.99]"
                      style={{ background: "rgb(var(--color-accent))" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        d.editCategory?.(c);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-sm font-extrabold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
