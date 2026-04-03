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
  const showFancyAllView =
    filters.type === "all" &&
    filters.category === "all" &&
    !filters.search;

  const handleDelete = (id) => {
    if (confirm("Delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t); setModalOpen(true); };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-700">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
          {showFancyAllView && (
            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-700">
              All View
            </span>
          )}
        </div>
        {role === "admin" && (
          <button
            onClick={openAdd}
            className="bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-cyan-600 w-full sm:w-auto shadow-md shadow-blue-200/70"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No transactions match your filters" />
      ) : showFancyAllView ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 p-4 sm:p-5">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-4 shadow-sm"
            >
              <div className="pointer-events-none absolute -top-10 -right-8 h-20 w-20 rounded-full blur-2xl bg-cyan-100" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 wrap-break-word">{t.description}</p>
                  <p className="text-xs text-slate-500 mt-1 wrap-break-word">
                    {t.category} · {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
                    t.type === "income" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {t.type}
                </span>
              </div>

              <div className="relative mt-3 flex items-center justify-between">
                <span className={`text-base font-black ${t.type === "income" ? "text-emerald-600" : "text-rose-500"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
                {role === "admin" && (
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(t)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDelete(t.id)} className="text-xs font-semibold text-rose-500 hover:text-rose-600">Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="relative divide-y divide-slate-100">
          {filtered.map((t) => (
            <li key={t.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-3.5 hover:bg-slate-50/80 transition-colors">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-slate-800">{t.description}</span>
                <span className="text-xs text-slate-500 mt-0.5 wrap-break-word">
                  {t.category} · {t.type} · {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className={`text-sm font-bold ${t.type === "income" ? "text-emerald-600" : "text-rose-500"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
                {role === "admin" && (
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDelete(t.id)} className="text-xs font-semibold text-rose-500 hover:text-rose-600">Delete</button>
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