import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionList from "@/components/transactions/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 via-white to-cyan-50 px-5 py-5 sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute -top-16 -right-8 h-40 w-40 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">Cashflow Control</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Transactions</h1>
          <p className="text-sm text-slate-600 mt-1">Filter, search and manage every inflow and outflow with precision</p>
        </div>
      </div>
      <TransactionFilters />
      <TransactionList />
    </div>
  );
}