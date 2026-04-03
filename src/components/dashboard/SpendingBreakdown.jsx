"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { getSpendingByCategory, formatCurrency } from "@/utils/calculations";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-700 rounded-xl p-3 text-sm shadow-xl">
      <p className="font-semibold">{payload[0].name}</p>
      <p className="text-cyan-300 font-medium">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function SpendingBreakdown() {
  const { transactions } = useApp();
  const data = getSpendingByCategory(transactions);
  const chartData = data.map((d) => ({ name: d.category, value: d.amount }));
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const [isXs, setIsXs] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 420px)");
    const onChange = (e) => setIsXs(e.matches);
    setIsXs(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-blue-100 blur-3xl" />
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">Spending Breakdown</h2>
        <p className="text-xs text-slate-500 mt-1">Expense distribution by category</p>
      </div>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No expense data</p>
      ) : (
        <>
          <div className="relative">
            <ResponsiveContainer width="100%" height={isXs ? 220 : 250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isXs ? 42 : 60}
                  outerRadius={isXs ? 75 : 100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {!isXs && <Legend />}
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-center shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Total</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {chartData.slice(0, 4).map((item, index) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {item.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}