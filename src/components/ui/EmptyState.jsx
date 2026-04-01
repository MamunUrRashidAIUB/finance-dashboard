export default function EmptyState({ message = "No transactions found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">📭</div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}