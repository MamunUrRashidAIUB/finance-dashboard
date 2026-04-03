"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  getHighestCategory,
  getMonthComparison,
  getSpendingByCategory,
  getTotalIncome,
  getTotalExpenses,
  formatCurrency,
} from "@/utils/calculations";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];

function InsightCard({ title, children }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
      <div className="pointer-events-none absolute -top-16 -right-10 h-28 w-28 rounded-full bg-cyan-100 blur-3xl" />
      <h3 className="relative text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] mb-3">{title}</h3>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-700 rounded-xl p-3 text-sm shadow-xl">
      <p className="font-semibold">{payload[0].payload.category}</p>
      <p className="text-cyan-300 font-medium">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function InsightsPanel() {
  const { transactions } = useApp();
  const [isXs, setIsXs] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 420px)");
    const onChange = (e) => setIsXs(e.matches);
    setIsXs(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const highest = getHighestCategory(transactions);
  const comparison = getMonthComparison(transactions);
  const breakdown = getSpendingByCategory(transactions);
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const savingsRate = totalIncome > 0
    ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
    : 0;

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-gray-500 text-sm">No data to generate insights</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Top row — 3 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Highest spending category */}
        <InsightCard title="Top Spending Category">
          {highest ? (
            <>
              <p className="text-2xl font-black tracking-tight text-slate-800">{highest.category}</p>
              <p className="text-sm text-slate-600 mt-1">{formatCurrency(highest.amount)} total spent</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">No expense data</p>
          )}
        </InsightCard>

        {/* Savings rate */}
        <InsightCard title="Savings Rate">
          <p className={`text-2xl font-black tracking-tight ${Number(savingsRate) >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
            {savingsRate}%
          </p>
          <p className="text-sm text-slate-600 mt-1">Of total income saved</p>
        </InsightCard>

        {/* Month comparison */}
        <InsightCard title="Month on Month Expenses">
          {comparison ? (
            <>
              <p className={`text-2xl font-black tracking-tight ${comparison.percentChange <= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {comparison.percentChange > 0 ? "+" : ""}{comparison.percentChange}%
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {comparison.currentMonth} vs {comparison.previousMonth}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {formatCurrency(comparison.previousExpenses)} → {formatCurrency(comparison.currentExpenses)}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Need at least 2 months of data</p>
          )}
        </InsightCard>
      </div>

      {/* Bar chart — spending by category */}
      <InsightCard title="Spending by Category">
        {breakdown.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No expense data</p>
        ) : (
          <ResponsiveContainer width="100%" height={isXs ? 240 : 280}>
            <BarChart data={breakdown} margin={{ top: 5, right: isXs ? 4 : 10, left: isXs ? 0 : 10, bottom: isXs ? 20 : 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: isXs ? 10 : 12 }} angle={isXs ? -20 : 0} textAnchor={isXs ? "end" : "middle"} height={isXs ? 48 : 30} interval={0} />
              <YAxis hide={isXs} tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {breakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </InsightCard>

      {/* Observations */}
      <InsightCard title="Observations">
        <ul className="flex flex-col gap-2.5">
          {highest && (
            <li className="text-sm text-slate-700 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <span>Your highest spending category is <strong>{highest.category}</strong> at {formatCurrency(highest.amount)}.</span>
            </li>
          )}
          {comparison && (
            <li className="text-sm text-slate-700 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <span>
                You spent <strong>{Math.abs(comparison.percentChange)}% {comparison.percentChange > 0 ? "more" : "less"}</strong> in {comparison.currentMonth} compared to {comparison.previousMonth}.
              </span>
            </li>
          )}
          <li className="text-sm text-slate-700 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
            <span>
              {Number(savingsRate) >= 20
                ? `Great job — you're saving ${savingsRate}% of your income.`
                : `Your savings rate is ${savingsRate}%. Aim for at least 20%.`}
            </span>
          </li>
          {breakdown.length >= 2 && (
            <li className="text-sm text-slate-700 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <span>
                Your top 2 expense categories are <strong>{breakdown[0].category}</strong> and <strong>{breakdown[1].category}</strong>, accounting for {formatCurrency(breakdown[0].amount + breakdown[1].amount)} combined.
              </span>
            </li>
          )}
        </ul>
      </InsightCard>

    </div>
  );
}