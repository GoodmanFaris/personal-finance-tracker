"use client";

export default function CategoryHistoryPanel({
  categories = [],
  loading = false,
  onSelect,
}) {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto mt-3 mb-15 overflow-hidden rounded-3xl border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
      style={{ background: "rgb(var(--color-category))" }}
    >
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
            style={{ background: "rgb(var(--color-accent))" }}
          />
          <h3
            className="text-lg font-extrabold tracking-tight "
            style={{ color: "rgb(var(--color-text-reverse2))" }}
          >
            Category History
          </h3>
        </div>
        <p
          className="mt-1 text-sm  "
          style={{ color: "rgb(var(--color-text-reverse))" }}
        >
          All categories you’ve ever had. Click to view transactions.
        </p>
      </div>

      {/* Body */}
      <div className="relative px-4 sm:px-6 py-5">
        <div
          className="rounded-2xl border  overflow-hidden"
          style={{ borderColor: "rgb(var(--color-text-reverse2) / 0.22) " }}
        >
          <div className="max-h-[420px] overflow-auto">
            {loading ? (
              <p className="p-4 text-sm text-gray-500">Loading categories…</p>
            ) : categories.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No categories found.</p>
            ) : (
              <ul
                className="divide-y "
                style={{
                  borderColor: "rgb(var(--color-text-reverse2) / 0.08)",
                }}
              >
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => onSelect(c)}
                      className="group w-full text-left px-4 py-4 flex items-center justify-between gap-4 hover:bg-black/[0.12] transition"
                    >
                      <div className="min-w-0">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: "rgb(var(--color-text-reverse2))" }}
                        >
                          {c.name}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                              c.is_active
                                ? "bg-gray-200 text-green-700 border border-green-200"
                                : "bg-gray-200 text-gray-600 border border-gray-200"
                            }`}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                background: c.active
                                  ? "rgb(var(--color-accent))"
                                  : "#f20723",
                              }}
                            />
                            {c.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <span
                        className="text-sm  group-hover:translate-x-1 transition"
                        style={{ color: "rgb(var(--color-text-reverse2)) " }}
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
