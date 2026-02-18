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
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Update Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change your name, country and currency.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
            disabled={saving}
          >
            ✕
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              value={values.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
              placeholder="BA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>

            <select
              value={values.currency}
              onChange={(e) => onChange("currency", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 bg-white"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>

            <p className="mt-1 text-xs text-gray-500">
              Saved as currency code (e.g. EUR).
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
