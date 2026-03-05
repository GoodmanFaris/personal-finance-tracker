"use client";

export default function AIModal({ open, insight, loading, error, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Window */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Header */}
        <div
          className="relative px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary-modal))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white/80">
                AI Financial Advisor
              </p>
              <h3 className="text-lg font-extrabold tracking-tight">
                Financial Insights
              </h3>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/50" />
              <span className="h-3 w-3 rounded-full bg-white/35" />

              <button
                onClick={onClose}
                className="ml-1 grid h-9 w-9 place-items-center rounded-xl bg-white/15 hover:bg-white/25 transition"
                aria-label="Close"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/15 to-transparent" />
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          {loading && (
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 text-sm text-gray-700">
              Generating AI insights...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              Failed to load AI insights.
            </div>
          )}

          {!loading && !error && insight && (
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 text-sm text-gray-900 whitespace-pre-line">
              {insight}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
