"use client";

export default function SummaryPeriodPicker({
  startMonth,
  endMonth,
  onChangeStart,
  onChangeEnd,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Summary Period
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Choose a start and end month. Data updates automatically.
      </p>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="month"
            value={startMonth}
            onChange={(e) => onChangeStart(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To
          </label>
          <input
            type="month"
            value={endMonth}
            onChange={(e) => onChangeEnd(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
