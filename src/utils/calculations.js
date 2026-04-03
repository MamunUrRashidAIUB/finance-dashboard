// Total income from all transactions
export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Total expenses from all transactions
export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Balance = income - expenses
export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

// Group transactions by month, return array for line chart
// Output: [{ month: "Jan 2026", income: 107000, expenses: 33600 }, ...]
export function getMonthlyTrend(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = date.toLocaleString("default", { month: "short", year: "numeric" });

    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };

    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });

  // Sort chronologically
  return Object.values(map).sort(
    (a, b) => new Date("1 " + a.month) - new Date("1 " + b.month)
  );
}

// Group expenses by category for pie/bar chart
// Output: [{ category: "Housing", amount: 75000 }, ...]
export function getSpendingByCategory(transactions) {
  const map = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += t.amount;
    });

  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

// Highest spending category
export function getHighestCategory(transactions) {
  const breakdown = getSpendingByCategory(transactions);
  return breakdown.length > 0 ? breakdown[0] : null;
}

// Month over month expense comparison
// Returns { current, previous, percentChange }
export function getMonthComparison(transactions) {
  const trend = getMonthlyTrend(transactions);
  if (trend.length < 2) return null;

  const current = trend[trend.length - 1];
  const previous = trend[trend.length - 2];
  const percentChange =
    previous.expenses === 0
      ? 100
      : (((current.expenses - previous.expenses) / previous.expenses) * 100).toFixed(1);

  return {
    currentMonth: current.month,
    previousMonth: previous.month,
    currentExpenses: current.expenses,
    previousExpenses: previous.expenses,
    percentChange: Number(percentChange),
  };
}

// Format number as currency (Indian style)
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Apply filters and sorting to transactions
export function getFilteredTransactions(transactions, filters) {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  if (filters.type !== "all") {
    result = result.filter((t) => t.type === filters.type);
  }

  if (filters.category !== "all") {
    result = result.filter((t) => t.category === filters.category);
  }

  switch (filters.sortBy) {
    case "date-desc":
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "date-asc":
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "amount-desc":
      result.sort((a, b) => b.amount - a.amount);
      break;
    case "amount-asc":
      result.sort((a, b) => a.amount - b.amount);
      break;
  }

  return result;
}