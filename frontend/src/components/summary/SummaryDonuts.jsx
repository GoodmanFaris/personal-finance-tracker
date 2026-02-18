"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function formatNumber(n) {
  return Number(n || 0).toLocaleString();
}

function CustomTooltip({ active, payload, currencySymbol }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const name = p?.name || "";
  const value = p?.value ?? 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="mt-1 text-sm text-gray-700">
        {currencySymbol}
        {formatNumber(value)}
      </p>
    </div>
  );
}

function EmptyCard({ title, subtitle }) {
  return (
    <div className="w-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      <div className="mt-6 h-[280px] flex items-center justify-center text-sm text-gray-500">
        No data for this period.
      </div>
    </div>
  );
}

function DonutCard({ title, subtitle, data, currencySymbol, centerLabel }) {
  const total = data.reduce((s, x) => s + Number(x.value || 0), 0);

  if (!data?.length || total <= 0) {
    return <EmptyCard title={title} subtitle={subtitle} />;
  }

  return (
    <div className="w-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>

      <div className="mt-6 h-[280px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip currencySymbol={currencySymbol} />}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500">{centerLabel?.top || "Total"}</p>
          <p className="text-lg font-semibold text-gray-900">
            {currencySymbol}
            {formatNumber(total)}
          </p>
          {centerLabel?.bottom ? (
            <p className="text-xs text-gray-500 mt-1">{centerLabel.bottom}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function SummaryDonuts({ bundle, currencySymbol = "" }) {

  const byCatRaw = bundle?.expenses_by_category || [];
  const byCategory = byCatRaw
    .map((x) => ({
      name: x.category || "Unknown",
      value: Number(x.amount || 0),
    }))
    .filter((x) => x.value > 0);

  const sorted = [...byCategory].sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, 6);
  const rest = sorted.slice(6);
  const otherSum = rest.reduce((s, x) => s + x.value, 0);
  const byCategoryTop =
    otherSum > 0 ? [...top, { name: "Other", value: otherSum }] : top;

  const income = Number(bundle?.totals?.income || 0);
  const expenses = Number(bundle?.totals?.expenses || 0);
  const incomeVsExpenses = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ].filter((x) => x.value > 0);

  const net = income - expenses;
  const netLabel = net >= 0 ? "Net positive" : "Net negative";

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutCard
          title="Spending by Category"
          subtitle="Where your money went in this period."
          data={byCategoryTop}
          currencySymbol={currencySymbol}
          centerLabel={{ top: "Total spent", bottom: "Top categories + Other" }}
        />

        <DonutCard
          title="Income vs Expenses"
          subtitle="Quick view of your cashflow split."
          data={incomeVsExpenses}
          currencySymbol={currencySymbol}
          centerLabel={{
            top: netLabel,
            bottom: `Net: ${currencySymbol}${formatNumber(net)}`,
          }}
        />
      </div>
    </div>
  );
}
