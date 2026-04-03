"use client";
import { useApp } from "@/context/AppContext";
import { getBalance, getTotalIncome, getTotalExpenses, formatCurrency } from "@/utils/calculations";

const cards = (transactions) => [
  {
    label: "Total Balance",
    value: getBalance(transactions),
    tone: "from-blue-600 to-cyan-500",
    accent: "bg-cyan-300/70",
    sub: "Income minus expenses",
  },
  {
    label: "Total Income",
    value: getTotalIncome(transactions),
    tone: "from-emerald-600 to-teal-500",
    accent: "bg-emerald-300/70",
    sub: "All time earnings",
  },
  {
    label: "Total Expenses",
    value: getTotalExpenses(transactions),
    tone: "from-rose-600 to-orange-500",
    accent: "bg-orange-300/70",
    sub: "All time spending",
  },
];

export default function SummaryCards() {
  const { transactions } = useApp();
  const data = cards(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data.map((card, index) => {
        return (
          <div
            key={card.label}
            className={`group relative overflow-hidden rounded-2xl p-5 text-white shadow-lg shadow-slate-300/40 border border-white/20 bg-linear-to-br ${card.tone}`}
          >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl ${card.accent}`} />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.14em] text-white/85">{card.label}</p>
              <p className="text-2xl sm:text-[1.75rem] font-black mt-2 tracking-tight">{formatCurrency(card.value)}</p>
              <p className="text-xs text-white/80 mt-1">{card.sub}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] rounded-full bg-white/20 px-2 py-1 border border-white/25">Live</span>
                <span className="text-sm font-semibold text-white/90">0{index + 1}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}