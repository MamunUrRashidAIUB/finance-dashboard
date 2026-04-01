"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getFilteredTransactions, formatCurrency } from "@/utils/calculations";
import EmptyState from "@/components/ui/EmptyState";
import AddEditModal from "./AddEditModal";

export default function TransactionList() {
  const { transactions, setTransactions, role, filters } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = getFilteredTransactions(transactions, filters);

  const handleDelete = (id) => {
    if (confirm("Delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t); setModalOpen(true); };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
        </p>
        {role === "admin" && (
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState message="No transactions match your filters" />
      ) : (
        <ul className="divide-y divide-gray-50">
          {filtered.map((t) => (
            <li key={t.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{t.description}</span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {t.category} · {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
                {role === "admin" && (
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(t.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <AddEditModal existing={editing} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}