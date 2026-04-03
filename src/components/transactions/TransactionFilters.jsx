"use client";
import { useApp } from "@/context/AppContext";

const categories = ["all", "Income", "Housing", "Food", "Transport", "Entertainment", "Health"];

function FancySelect({ value, onChange, children }) {
  return (
    <div className="group relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-white px-3 py-2.5 pr-9 text-sm text-slate-700 shadow-sm ring-0 outline-none transition-all duration-200 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.18)]"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors group-focus-within:text-cyan-600">
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function TransactionFilters() {
  const { filters, setFilters } = useApp();

  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-cyan-100 blur-3xl" />

      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="relative border border-slate-200 bg-slate-50/70 rounded-lg px-3 py-2.5 text-sm w-full sm:col-span-2 xl:col-span-1 focus:outline-none focus:border-cyan-400 focus:bg-white transition-colors"
      />

      {/* Type */}
      <FancySelect value={filters.type} onChange={(e) => update("type", e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </FancySelect>

      {/* Category */}
      <FancySelect value={filters.category} onChange={(e) => update("category", e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All Categories" : c}
          </option>
        ))}
      </FancySelect>

      {/* Sort */}
      <FancySelect value={filters.sortBy} onChange={(e) => update("sortBy", e.target.value)}>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </FancySelect>

      {/* Reset */}
      <button
        onClick={() => setFilters({ search: "", type: "all", category: "all", sortBy: "date-desc" })}
        className="relative text-sm font-semibold text-cyan-700 hover:text-cyan-800 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-left sm:text-center transition-colors"
      >
        Reset
      </button>
    </div>
  );
}