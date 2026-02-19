"use client";

export default function IncomeModal({ d }) {
  if (!d.incomeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={d.closeIncomeModal}
      />

      {/* Window */}
      <div className="relative w-full max-w-md overflow-hidden rounded-md border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header / Titlebar (secondary) */}
        <div
          className="px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white/80">Income</p>
              <h3 className="text-lg font-extrabold tracking-tight">
                Update income
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Month: <span className="font-semibold">{d.monthKey}</span>
              </p>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              <span className="h-3 w-3 rounded-full bg-white/35" />
              <button
                onClick={d.closeIncomeModal}
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
        <div className="px-5 py-5">
          <label className="block text-sm font-semibold text-black/70">
            Income amount
          </label>

          <div className="mt-2 rounded-2xl border border-black/10 bg-white/70 focus-within:border-black/20 focus-within:bg-white transition">
            <input
              type="number"
              value={d.incomeDraft ?? ""}
              onChange={(e) => d.setIncomeDraft(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-black/35"
              style={{ color: "rgb(var(--color-text-dark))" }}
              placeholder="e.g. 1500"
            />
          </div>

          {d.incomeError ? (
            <div className="mt-3 rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-800">
              {d.incomeError}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            onClick={d.closeIncomeModal}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 transition"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={d.saveIncome}
            disabled={d.savingIncome}
            className="rounded-2xl px-4 py-2 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:
                "rgb(var(--color-secondary))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
            }}
            type="button"
          >
            {d.savingIncome ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
