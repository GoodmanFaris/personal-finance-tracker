"use client";

import { CURRENCIES } from "../../utils/HelpersValues";

export default function EditProfileModal({
  open,
  onClose,
  values,
  onChange,
  onSave,
  saving = false,
  error = "",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Window */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/90 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Titlebar */}
        <div
          className="relative px-5 py-4 text-white"
          style={{ background: "rgb(var(--color-secondary-modal))" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/80">
                Profile settings
              </p>
              <h3 className="truncate text-lg font-extrabold tracking-tight">
                Update Profile
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Change your name, country and currency.
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
                disabled={saving}
                type="button"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>
          </div>

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
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black/70">
              Full Name
            </label>
            <input
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35 focus:border-black/20 focus:bg-white transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black/70">
              Country
            </label>
            <input
              value={values.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-black/35 focus:border-black/20 focus:bg-white transition"
              placeholder="BA"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black/70">
              Currency
            </label>

            <select
              value={values.currency}
              onChange={(e) => onChange("currency", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none focus:border-black/20 focus:bg-white transition"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-black/45">
              Saved as currency code (e.g. EUR).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-black/10 bg-white/70 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black/70 hover:bg-black/5 transition disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex-1 rounded-2xl px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60"
            style={{
              background:
                "rgb(var(--color-primary))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.14)",
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
