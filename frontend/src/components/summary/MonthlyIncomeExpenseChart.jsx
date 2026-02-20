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
    <div className="rounded-xl border border-black/10 bg-white/95 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur">
      <p className="text-xs text-black/50">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p className="text-gray-900">
          Income:{" "}
          <span className="font-extrabold">
            {currencySymbol}
            {formatNumber(income)}
          </span>
        </p>
        <p className="text-gray-900">
          Expenses:{" "}
          <span className="font-extrabold">
            {currencySymbol}
            {formatNumber(expenses)}
          </span>
        </p>
        <p className="text-gray-900">
          Net:{" "}
          <span className="font-extrabold">
            {currencySymbol}
            {formatNumber(net)}
          </span>
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
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* subtle top glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
        style={{ background: "rgb(var(--color-secondary))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      {/* Header */}
      <div className="relative border-b border-black/10 px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--color-secondary))" }}
              />
              <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
                Income vs Expenses
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Monthly totals in the selected period.
            </p>
          </div>

          {loading ? (
            <span className="text-sm text-gray-500">Loading…</span>
          ) : (
            <div className="flex items-center gap-2 text-xs text-black/55">
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "rgb(var(--color-primary))" }}
                />
                Income
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "rgb(var(--color-secondary))" }}
                />
                Expenses
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-2 sm:px-4 py-5">
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.10)" />
              <XAxis
                dataKey="label"
                tickMargin={10}
                tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(0,0,0,0.10)" }}
                tickLine={{ stroke: "rgba(0,0,0,0.10)" }}
              />
              <YAxis
                tickFormatter={(v) => formatNumber(v)}
                width={72}
                tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(0,0,0,0.10)" }}
                tickLine={{ stroke: "rgba(0,0,0,0.10)" }}
              />
              <Tooltip
                content={<CustomTooltip currencySymbol={currencySymbol} />}
              />
              <Legend wrapperStyle={{ paddingTop: 6 }} iconType="circle" />

              {/* ✅ COLORS */}
              <Bar
                dataKey="income"
                name="Income"
                radius={[10, 10, 0, 0]}
                fill="rgb(var(--color-primary))"
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                radius={[10, 10, 0, 0]}
                fill="rgb(var(--color-secondary))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
