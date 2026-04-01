"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";

const categories = ["Income", "Housing", "Food", "Transport", "Entertainment", "Health"];
const empty = { description: "", amount: "", category: "Food", type: "expense", date: "" };

export default function AddEditModal({ existing, onClose }) {
  const { transactions, setTransactions } = useApp();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) setForm({ ...existing, amount: String(existing.amount) });
  }, [existing]);

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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-base font-semibold mb-4">{existing ? "Edit Transaction" : "Add Transaction"}</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <select
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {existing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}