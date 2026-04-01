import InsightsPanel from "@/components/insights/InsightsPanel";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Insights</h1>
        <p className="text-sm text-gray-500 mt-0.5">Understand your spending patterns</p>
      </div>
      <InsightsPanel />
    </div>
  );
}