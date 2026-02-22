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
    <div className="rounded-xl border border-black/10 bg-white/95 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur">
      <p className="text-sm font-extrabold text-gray-900">{name}</p>
      <p className="mt-1 text-sm text-gray-700">
        {currencySymbol}
        {formatNumber(value)}
      </p>
    </div>
  );
}

function EmptyCard({ title, subtitle }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "rgb(var(--color-secondary))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      <div className="relative border-b border-black/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "rgb(var(--color-secondary))" }}
          />
          <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
            {title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="relative px-5 py-6 sm:px-6">
        <div className="h-[280px] flex items-center justify-center text-sm text-gray-500">
          No data for this period.
        </div>
      </div>
    </div>
  );
}


const CATEGORY_COLORS = [
  "#1F3A8A", 
  "#0F766E", 
  "#7C3AED", 
  "#B45309", 
  "#DC2626", 
  "#4B5563", 
  "#0891B2", 
  "#16A34A", 
];

function DonutCard({
  title,
  subtitle,
  data,
  currencySymbol,
  centerLabel,
  colors, 
}) {
  const total = data.reduce((s, x) => s + Number(x.value || 0), 0);

  if (!data?.length || total <= 0) {
    return <EmptyCard title={title} subtitle={subtitle} />;
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.10)]"
      style={{ background: "rgb(var(--color-category))" }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "rgb(var(--color-accent))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      {/* Header */}
      <div className="relative border-b border-black/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "rgb(var(--color-accent))" }}
          />
          <h3
            className="text-lg font-extrabold tracking-tight "
            style={{ color: "rgb(var(--color-text-reverse2))" }}
          >
            {title}
          </h3>
        </div>
        <p
          className="mt-1 text-sm "
          style={{ color: "rgb(var(--color-text-reverse))" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Chart */}
      <div className="relative px-2 sm:px-4 py-5">
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={78}
                outerRadius={112}
                paddingAngle={2}
                stroke="rgba(0,0,0,0.16)"
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      colors?.[i % colors.length] ||
                      CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip currencySymbol={currencySymbol} />}
              />
              <Legend
                verticalAlign="bottom"
                height={44}
                iconType="circle"
                wrapperStyle={{
                  fontSize: 12,
                  color: "rgb(var(--color-text-reverse))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center -translate-y-5">
            <p
              className="text-xs"
              style={{ color: "rgb(var(--color-text-reverse))" }}
            >
              {centerLabel?.top || "Total"}
            </p>
            <p
              className="text-xl font-extrabold tracking-tight "
              style={{ color: "rgb(var(--color-text-reverse2))" }}
            >
              {currencySymbol}
              {formatNumber(total)}
            </p>
            {centerLabel?.bottom ? (
              <p
                className="mt-1 text-xs"
                style={{ color: "rgb(var(--color-text-reverse))" }}
              >
                {centerLabel.bottom}
              </p>
            ) : null}
          </div>
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

  const incomeExpenseColors = ["rgb(24 122 214)", "rgb(var(--color-accent))"]; 

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutCard
          title="Spending by Category"
          subtitle="Where your money went in this period."
          data={byCategoryTop}
          currencySymbol={currencySymbol}
          centerLabel={{ top: "Total spent", bottom: "Top categories + Other" }}
          // categories palette (nice, consistent)
          colors={CATEGORY_COLORS}
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
          colors={incomeExpenseColors}
        />
      </div>
    </div>
  );
}
