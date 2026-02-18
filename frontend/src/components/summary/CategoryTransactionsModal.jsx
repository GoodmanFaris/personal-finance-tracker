"use client";

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-GB");
  } catch {
    return d;
  }
}

export default function CategoryTransactionsModal({
  open,
  onClose,
  category,
  transactions = [],
  loading = false,
  error = "",
  currencySymbol = "",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category ? `${category.name} (ID: ${category.id})` : "Category"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              All transactions for this category.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {error ? (
          <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="p-5">
          {loading ? (
            <p className="text-sm text-gray-500">Loading transactions…</p>
          ) : transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions found.</p>
          ) : (
            <div className="max-h-[420px] overflow-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Description
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700">
                      Type
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-700 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">
                        {fmtDate(t.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {t.description || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{t.type}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {currencySymbol}
                        {Number(t.amount || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
