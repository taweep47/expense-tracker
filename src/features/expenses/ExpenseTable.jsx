import { useState, useMemo, useEffect } from "react";
import ExpenseModal from "./ExpenseModal";
import ExpenseForm from "./ExpenseForm";
import { CATEGORY_CONFIG } from "../../config/categories";
import { normalizeCategory } from "../../utils/normalizeCategory";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Plus, Pencil, Trash2, Search, ArrowUpDown, Inbox } from "lucide-react";

const ExpenseTable = ({ expenses, onAdd, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------------- actions ---------------- */
  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (expense) => {
    setEditing(expense);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const handleSubmit = (data) => {
    editing ? onEdit(editing.id, data) : onAdd(data);
    close();
  };

  /* ---------------- filter + sort ---------------- */
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((e) =>
        `${e.title} ${e.category}`.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "amount") return b.amount - a.amount;
        return new Date(a.date) - new Date(b.date);
      });
  }, [expenses, search, sortBy]);

  /* ---------------- esc close modal ---------------- */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Expenses</h2>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 px-6 py-3 border-b">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expense..."
            className="pl-9 pr-3 py-2 text-sm border rounded-lg w-56"
          />
        </div>

        <button
          onClick={() => setSortBy(sortBy === "date" ? "amount" : "date")}
          className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowUpDown size={14} />
          Sort by {sortBy}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-center">Category</th>
              <th className="px-6 py-3 text-center">Date</th>
              <th className="px-6 py-3 w-24"></th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <Inbox className="mx-auto mb-3 text-slate-400" />
                  <p className="text-slate-500">No expenses found</p>
                </td>
              </tr>
            ) : (
              filteredExpenses.map((e) => {
                const config =
                  CATEGORY_CONFIG[normalizeCategory(e.category)] ??
                  CATEGORY_CONFIG.other;

                return (
                  <tr
                    key={e.id}
                    onClick={() => openEdit(e)}
                    className="group border-b last:border-0 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium truncate max-w-[220px]">
                      {e.title}
                    </td>

                    <td className="px-6 py-4 text-right font-medium">
                      ฿{e.amount.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${config.style}`}
                      >
                        {config.label}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-slate-600">
                      {new Date(e.date).toLocaleDateString("th-TH")}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-6 py-4"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(e)}
                          className="p-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteTarget(e)}
                          className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 text-xs text-slate-500">
        Total {filteredExpenses.length} items
      </div>

      {/* Modal */}
      <ExpenseModal isOpen={open} onClose={close}>
        <ExpenseForm initialData={editing} onSubmit={handleSubmit} />
      </ExpenseModal>
      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          onDelete(deleteTarget.id);
          setDeleteTarget(null);
        }}
        title="Delete expense?"
        description={`Delete "${deleteTarget?.title}" permanently?`}
      />
    </div>
  );
};

export default ExpenseTable;
