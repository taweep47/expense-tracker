import { useEffect, useState } from "react";

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const CATEGORIES = [
    { value: "food", label: "🍔 Food" },
    { value: "transport", label: "🚕 Transport" },
    { value: "shopping", label: "🛍 Shopping" },
    { value: "bills", label: "💡 Bills" },
    { value: "entertainment", label: "🎮 Entertainment" },
    { value: "other", label: "📦 Other" },
  ];

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Expense" : "Add Expense"}
      </h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 bg-white"
        required
      >
        <option value="">Select category</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <button
        type="submit"
        className="w-full bg-slate-800 text-white rounded-lg py-2 hover:bg-slate-700"
      >
        Save
      </button>
    </form>
  );
};

export default ExpenseForm;
