import useExpenses from "../hooks/useExpenses";
import { CATEGORY_CONFIG } from "../config/categories";
import { normalizeCategory } from "../utils/normalizeCategory";
import MonthComparison from "../features/analytics/MonthComparison";
import SummaryCard from "../features/analytics/SummaryCard";
import { Wallet, Calendar, Star } from "lucide-react";

const Analytics = () => {
  const { expenses, loading } = useExpenses();
  const months = [...new Set(expenses.map((e) => e.date.slice(0, 7)))].sort();

  const currentMonth = months.at(-1);
  const previousMonth = months.at(-2);

  if (loading) return <p>Loading...</p>;

  // ===== totals =====
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const thisMonthTotal = expenses
    .filter((e) => e.date.startsWith(currentMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  const lastMonthTotal = expenses
    .filter((e) => e.date.startsWith(previousMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  // ===== category summary =====
  const categorySummary = expenses.reduce((acc, e) => {
    const key = normalizeCategory(e.category);
    acc[key] = (acc[key] || 0) + e.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categorySummary).sort(
    (a, b) => b[1] - a[1],
  );

  const topCategoryKey = sortedCategories[0]?.[0];
  const topCategory = CATEGORY_CONFIG[topCategoryKey];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Expenses"
          value={`฿${totalAmount.toLocaleString()}`}
          accent="blue"
          icon={Wallet}
        />

        <SummaryCard
          label="This Month"
          value={`฿${thisMonthTotal.toLocaleString()}`}
          accent="red"
          icon={Calendar}
        />

        <SummaryCard
          label="Top Category"
          value={topCategory?.label || "-"}
          accent="green"
          icon={Star}
        />

        <MonthComparison
          thisMonth={thisMonthTotal}
          lastMonth={lastMonthTotal}
        />
      </div>

      {/* Category breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>

        {sortedCategories.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">
            No data available
          </p>
        ) : (
          <div className="space-y-3">
            {sortedCategories.map(([key, amount]) => {
              const config = CATEGORY_CONFIG[key] || CATEGORY_CONFIG.other;

              return (
                <div key={key} className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${config.style}`}
                  >
                    {config.label}
                  </span>

                  <span className="font-medium">
                    ฿{amount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
