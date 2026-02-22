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

  const categoryName = category?.name || "Category";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Window */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header / Titlebar (secondary) */}
        <div
          className="relative px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary-modal))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/80">
                Category transactions
              </p>
              <h3 className="truncate text-lg font-extrabold tracking-tight text-white">
                {categoryName}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                All transactions for this category.
              </p>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              <span className="h-3 w-3 rounded-full bg-white/35" />
              <button
                onClick={onClose}
                className="ml-1 grid h-9 w-9 place-items-center rounded-xl bg-white/15 hover:bg-white/25 transition disabled:opacity-60"
                aria-label="Close"
                disabled={loading}
                type="button"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>
          </div>

          {/* subtle header shine */}
          <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/15 to-transparent" />
        </div>

        {/* Error */}
        {error ? (
          <div className="px-5 pt-5">
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
              {error}
            </div>
          </div>
        ) : null}

        {/* Body */}
        <div className="px-5 py-5">
          {loading ? (
            <p className="text-sm text-gray-600">Loading transactions…</p>
          ) : transactions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/15 bg-white/60 p-5 text-sm text-gray-600">
              No transactions found.
            </div>
          ) : (
            <div className="max-h-[420px] overflow-auto rounded-2xl border border-black/10 bg-white/70">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur">
                  <tr className="text-left">
                    <th className="px-4 py-3 text-xs font-extrabold text-black/60">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-extrabold text-black/60">
                      Description
                    </th>
                    <th className="px-4 py-3 text-xs font-extrabold text-black/60">
                      Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-extrabold text-black/60">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-black/5 hover:bg-white/60 transition"
                    >
                      <td className="px-4 py-3 text-gray-700">
                        {fmtDate(t.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {t.description || (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{t.type}</td>
                      <td className="px-4 py-3 text-right font-extrabold text-gray-900">
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

        {/* Footer */}
        <div className="flex justify-end border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 transition"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
