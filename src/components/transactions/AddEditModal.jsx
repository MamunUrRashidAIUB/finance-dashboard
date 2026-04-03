"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

const categories = ["Income", "Housing", "Food", "Transport", "Entertainment", "Health"];
const empty = { description: "", amount: "", category: "Food", type: "expense", date: "" };

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

export default function AddEditModal({ existing, onClose }) {
  const { transactions, setTransactions } = useApp();
  const [form, setForm] = useState(() =>
    existing ? { ...existing, amount: String(existing.amount) } : empty
  );
  const [error, setError] = useState("");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.description.trim()) return "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return "Enter a valid amount";
    if (!form.date) return "Date is required";
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }

    const entry = { ...form, amount: Number(form.amount) };

    if (existing) {
      setTransactions(transactions.map((t) => (t.id === existing.id ? { ...entry, id: existing.id } : t)));
    } else {
      setTransactions([...transactions, { ...entry, id: Date.now() }]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200">
        <div className="pointer-events-none absolute -top-20 -right-10 h-32 w-32 rounded-full bg-cyan-100 blur-3xl" />
        <h2 className="relative text-base font-bold text-slate-800 mb-4">{existing ? "Edit Transaction" : "Add Transaction"}</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="relative flex flex-col gap-3">
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="border border-slate-200 bg-slate-50/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white transition-colors"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
            className="border border-slate-200 bg-slate-50/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white transition-colors"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="border border-slate-200 bg-slate-50/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white transition-colors"
          />
          <FancySelect value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </FancySelect>
          <FancySelect value={form.category} onChange={(e) => update("category", e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </FancySelect>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-5">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-cyan-600 w-full sm:w-auto"
          >
            {existing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}