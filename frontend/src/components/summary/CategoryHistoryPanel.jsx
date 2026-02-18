"use client";

export default function CategoryHistoryPanel({
  categories = [],
  loading = false,
  onSelect,
}) {
  return (
    <div className="w-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Category History</h3>
      <p className="mt-1 text-sm text-gray-500">
        All categories you’ve ever had. Click to view transactions.
      </p>

      <div className="mt-5 rounded-xl border border-gray-200 overflow-hidden">
        <div className="max-h-[420px] overflow-auto">
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Loading categories…</p>
          ) : categories.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No categories found.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelect(c)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {c.name} (ID: {c.id})
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        Status: {c.is_active ? "active" : "inactive"}
                      </p>
                    </div>

                    <span className="text-xs text-gray-400">View →</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
