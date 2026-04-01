"use client";
import { useApp } from "@/context/AppContext";
import { getBalance, getTotalIncome, getTotalExpenses, formatCurrency } from "@/utils/calculations";

const cards = (transactions) => [
  {
    label: "Total Balance",
    value: getBalance(transactions),
    color: "bg-blue-600",
    sub: "Income minus expenses",
  },
  {
    label: "Total Income",
    value: getTotalIncome(transactions),
    color: "bg-green-600",
    sub: "All time earnings",
  },
  {
    label: "Total Expenses",
    value: getTotalExpenses(transactions),
    color: "bg-red-500",
    sub: "All time spending",
  },
];

export default function SummaryCards() {
  const { transactions } = useApp();
  const data = cards(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data.map((card) => (
        <div key={card.label} className={`${card.color} text-white rounded-xl p-5`}>
          <p className="text-sm opacity-80">{card.label}</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(card.value)}</p>
          <p className="text-xs opacity-60 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}