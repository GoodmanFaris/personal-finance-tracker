"use client";

export default function CategoryModal({ d }) {
  if (!d.addCategoryModalOpen) return null;

  const isEdit = Boolean(d.categoryToEdit);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={d.closeAddCategoryModal}
      />

      {/* Window */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header / Titlebar (secondary) */}
        <div
          className="relative px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white/80">Category</p>
              <h3 className="text-lg font-extrabold tracking-tight">
                {isEdit ? "Edit category" : "Add category"}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                {isEdit
                  ? "Update name, budget and description."
                  : "Create a new category."}
              </p>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              <span className="h-3 w-3 rounded-full bg-white/35" />
              <button
                onClick={d.closeAddCategoryModal}
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
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-black/70">
              Name
            </label>
            <div className="mt-2 rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
              <input
                value={d.categoryDraft?.name ?? ""}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35"
                placeholder="e.g. Food"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold text-black/70">
              Budget
            </label>
            <div className="mt-2 rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
              <input
                type="number"
                value={d.categoryDraft?.default_budget ?? ""}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    default_budget: e.target.value,
                  }))
                }
                className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35"
                placeholder="e.g. 300"
              />
            </div>
            <p className="mt-1 text-xs text-black/45">
              Use 0 if you don’t want a budget cap.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black/70">
              Description
            </label>
            <div className="mt-2 rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
              <textarea
                rows={3}
                value={d.categoryDraft?.description ?? ""}
                onChange={(e) =>
                  d.setCategoryDraft((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full resize-none bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35"
                placeholder="Optional note..."
              />
            </div>
          </div>

          {/* Error */}
          {d.categoryError ? (
            <div className="rounded-2xl border border-red-200 bg-red-500/10 px-4 py-3 text-sm text-red-800">
              {d.categoryError}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            onClick={d.closeAddCategoryModal}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 transition"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={d.saveCategory}
            disabled={d.savingCategory}
            className="rounded-2xl px-4 py-2 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(90deg, rgba(var(--color-primary), 0.95), rgba(var(--color-secondary), 0.95))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
            }}
            type="button"
          >
            {d.savingCategory ? "Saving..." : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
