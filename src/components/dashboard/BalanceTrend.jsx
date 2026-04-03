"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { getMonthlyTrend, formatCurrency } from "@/utils/calculations";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-700 rounded-xl p-3 text-sm shadow-xl">
      <p className="font-semibold mb-1 text-slate-50">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function BalanceTrend() {
  const { transactions } = useApp();
  const data = getMonthlyTrend(transactions);
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
      <div className="pointer-events-none absolute -top-16 -right-12 h-36 w-36 rounded-full bg-cyan-100 blur-3xl" />
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">Balance Trend</h2>
          <p className="text-xs text-slate-500 mt-1">Income vs expense by month</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Income
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Expenses
          </span>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={isXs ? 220 : 250}>
          <LineChart data={data} margin={{ top: 8, right: isXs ? 6 : 12, left: isXs ? 0 : 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: isXs ? 10 : 12 }} minTickGap={isXs ? 18 : 10} />
            <YAxis hide={isXs} width={40} tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            {!isXs && <Legend />}
            <Line type="monotone" dataKey="income" stroke="#059669" strokeWidth={3} dot={isXs ? false : { r: 3 }} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#e11d48" strokeWidth={3} dot={isXs ? false : { r: 3 }} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}