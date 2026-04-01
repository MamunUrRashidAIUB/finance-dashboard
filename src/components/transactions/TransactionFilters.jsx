"use client";
import { useApp } from "@/context/AppContext";

const categories = ["all", "Income", "Housing", "Food", "Transport", "Entertainment", "Health"];

export default function TransactionFilters() {
  const { filters, setFilters } = useApp();

  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm flex-1 min-w-[180px] focus:outline-none focus:border-blue-500"
      />

      {/* Type */}
      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All Categories" : c}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sortBy}
        onChange={(e) => update("sortBy", e.target.value)}
        className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>

      {/* Reset */}
      <button
        onClick={() => setFilters({ search: "", type: "all", category: "all", sortBy: "date-desc" })}
        className="text-sm text-blue-600 hover:underline px-2"
      >
        Reset
      </button>
    </div>
  );
}