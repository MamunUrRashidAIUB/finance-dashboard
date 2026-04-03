import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrend from "@/components/dashboard/BalanceTrend";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-cyan-50 via-white to-blue-50 px-5 py-5 sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute -top-16 -right-8 h-40 w-40 rounded-full bg-cyan-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">Financial Snapshot</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Your financial overview with live trends and category signals</p>
        </div>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
    </div>
  );
}