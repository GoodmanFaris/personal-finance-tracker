"use client";

import { useState } from "react";
import useLandingData from "../../../src/hooks/useLandingData";
import { getCurrencySymbol } from "../../utils/HelpersValues";

export default function LandingQuickPanel() {
  const { user, categories, createTransactionWithPayload, loadingUser } =
    useLandingData();

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currencySymbol = getCurrencySymbol(user?.currency || "BAM");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !categoryId) return;

    setSubmitting(true);

    const success = await createTransactionWithPayload({
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      description,
      category_id: Number(categoryId),
    });

    if (success) {
      setAmount("");
      setDescription("");
      setCategoryId("");
    }

    setSubmitting(false);
  };

  if (loadingUser) {
    return <div className="p-6 text-gray-500 text-sm">Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Hello, {user?.name?.split(" ")[0] || "User"} 👋
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Quickly add a transaction below.
      </p>

      {/* Quick Add Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1 flex items-center rounded-lg border border-gray-300 overflow-hidden">
            <span className="px-3 text-gray-500 text-sm">{currencySymbol}</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 outline-none text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} (ID: {cat.id})
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. Coffee"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
