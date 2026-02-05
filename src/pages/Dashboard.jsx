import useExpenses from "../hooks/useExpenses";
import ExpenseTable from "../features/expenses/ExpenseTable";
import SummaryCard from "../components/ui/SummaryCard";
import ExpenseCharts from "../features/expenses/ExpenseCharts";
import { DollarSign, Calendar, Layers } from "lucide-react";

const Dashboard = () => {
  const { expenses, loading, createExpense, editExpense, removeExpense } =
    useExpenses();

  if (loading) return <p>Loading...</p>;

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpense = expenses
    .filter((e) => e.date.startsWith(currentMonth))
    .reduce((s, e) => s + e.amount, 0);

  const categoriesCount = new Set(expenses.map((e) => e.category)).size;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          label="Total Expense"
          value={`฿${totalExpense.toLocaleString()}`}
          icon={<DollarSign size={18} className="text-slate-400" />}
        />
        <SummaryCard
          label="This Month"
          value={`฿${monthlyExpense.toLocaleString()}`}
          icon={<Calendar size={18} className="text-slate-400" />}
        />
        <SummaryCard
          label="Categories"
          value={categoriesCount}
          icon={<Layers size={18} className="text-slate-400" />}
        />
      </div>

      {/* Charts */}
      <ExpenseCharts expenses={expenses} />

      {/* Table */}
      <ExpenseTable
        expenses={expenses}
        onAdd={createExpense}
        onEdit={editExpense}
        onDelete={removeExpense}
      />
    </div>
  );
};

export default Dashboard;
