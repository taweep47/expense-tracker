import { useState } from "react";
import useExpenses from "../hooks/useExpenses";
import { Trash2 } from "lucide-react";
import { CATEGORY_CONFIG } from "../config/categories";
import { normalizeCategory } from "../utils/normalizeCategory";
import ConfirmDeleteModal from "../features/expenses/ConfirmDeleteModal";

const Transactions = () => {
  const { expenses, loading, removeExpense } = useExpenses();

  const [category, setCategory] = useState("all");
  const [month, setMonth] = useState("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (loading) return <p>Loading...</p>;

  const filteredExpenses = expenses.filter((e) => {
    const normalized = normalizeCategory(e.category);

    const matchCategory = category === "all" || normalized === category;

    const matchMonth = month === "all" || e.date.startsWith(month);

    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchMonth && matchSearch;
  });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-slate-800">Transactions</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="all">All categories</option>
          {Object.entries(CATEGORY_CONFIG).map(([key, c]) => (
            <option key={key} value={key}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          type="month"
          value={month === "all" ? "" : month}
          onChange={(e) => setMonth(e.target.value || "all")}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2 text-sm">
        {category !== "all" && (
          <FilterChip
            label={CATEGORY_CONFIG[category]?.label}
            onRemove={() => setCategory("all")}
          />
        )}

        {month !== "all" && (
          <FilterChip label={month} onRemove={() => setMonth("all")} />
        )}

        {search && (
          <FilterChip label={`"${search}"`} onRemove={() => setSearch("")} />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((e) => {
              const config =
                CATEGORY_CONFIG[normalizeCategory(e.category)] ||
                CATEGORY_CONFIG.other;

              return (
                <tr key={e.id} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">{e.date}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${config.style}`}
                    >
                      {config.label}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ฿{e.amount.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteTarget(e)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                                 text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredExpenses.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm delete modal */}
      <ConfirmDeleteModal
        open={!!deleteTarget}
        title="Delete transaction?"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"?`
            : ""
        }
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          removeExpense(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
};

const FilterChip = ({ label, onRemove }) => (
  <span className="flex items-center gap-2 bg-slate-200 px-3 py-1 rounded-full">
    {label}
    <button onClick={onRemove} className="text-slate-600 hover:text-slate-900">
      ×
    </button>
  </span>
);

export default Transactions;
