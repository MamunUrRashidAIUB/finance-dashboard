"use client";
import { useApp } from "@/context/AppContext";
import { getSpendingByCategory, formatCurrency } from "@/utils/calculations";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm shadow">
      <p className="font-semibold">{payload[0].name}</p>
      <p>{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function SpendingBreakdown() {
  const { transactions } = useApp();
  const data = getSpendingByCategory(transactions);
  const chartData = data.map((d) => ({ name: d.category, value: d.amount }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Spending Breakdown</h2>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No expense data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}