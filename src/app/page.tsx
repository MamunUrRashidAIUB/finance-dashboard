import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrend from "@/components/dashboard/BalanceTrend";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your financial overview</p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
    </div>
  );
}