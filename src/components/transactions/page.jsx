import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionList from "@/components/transactions/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-500 mt-0.5">Filter, search and manage your transactions</p>
      </div>
      <TransactionFilters />
      <TransactionList />
    </div>
  );
}