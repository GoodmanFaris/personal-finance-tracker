"use client";

export default function IncomeModal({ d }) {
  if (!d.incomeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-start justify-between border-b">
          <div>
            <h3 className="text-lg font-semibold">Update income</h3>
            <p className="text-sm text-gray-600">
              Month: <span className="font-medium">{d.monthKey}</span>
            </p>
          </div>
          <button
            onClick={d.closeIncomeModal}
            className="text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Income amount
          </label>
          <input
            type="number"
            value={d.incomeDraft ?? ""}
            onChange={(e) => d.setIncomeDraft(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1500"
          />

          {d.incomeError ? (
            <p className="text-sm text-red-700">{d.incomeError}</p>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex gap-2 justify-end">
          <button
            onClick={d.closeIncomeModal}
            className="rounded-xl border px-4 py-2 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={d.saveIncome}
            disabled={d.savingIncome}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {d.savingIncome ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
