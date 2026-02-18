"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function formatMonthLabel(monthKey) {
  // monthKey: "YYYY-MM"
  const [y, m] = monthKey.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function formatNumber(n) {
  const num = Number(n || 0);
  return num.toLocaleString();
}

function CustomTooltip({ active, payload, label, currencySymbol }) {
  if (!active || !payload?.length) return null;

  const income = payload.find((p) => p.dataKey === "income")?.value ?? 0;
  const expenses = payload.find((p) => p.dataKey === "expenses")?.value ?? 0;
  const net = Number(income) - Number(expenses);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p className="text-gray-900">
          Income: <span className="font-semibold">{currencySymbol}{formatNumber(income)}</span>
        </p>
        <p className="text-gray-900">
          Expenses: <span className="font-semibold">{currencySymbol}{formatNumber(expenses)}</span>
        </p>
        <p className="text-gray-900">
          Net: <span className="font-semibold">{currencySymbol}{formatNumber(net)}</span>
        </p>
      </div>
    </div>
  );
}

export default function MonthlyIncomeExpenseChart({
  monthlySeries = [],
  currencySymbol = "",
  loading = false,
}) {
  const chartData = (monthlySeries || []).map((x) => ({
    month: x.month,
    label: formatMonthLabel(x.month),
    income: Number(x.income || 0),
    expenses: Number(x.expenses || 0),
    net: Number(x.net || 0),
  }));

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Income vs Expenses
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Monthly totals in the selected period.
          </p>
        </div>

        {loading ? (
          <span className="text-sm text-gray-500">Loading…</span>
        ) : null}
      </div>

      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap={18}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tickMargin={10} />
            <YAxis tickFormatter={(v) => formatNumber(v)} width={70} />
            <Tooltip
              content={<CustomTooltip currencySymbol={currencySymbol} />}
            />
            <Legend />
            <Bar dataKey="income" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
