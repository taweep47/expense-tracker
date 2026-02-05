import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// สี
const COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#f59e0b", // amber
  "#dc2626", // red
  "#7c3aed", // violet
  "#0d9488", // teal
]

const ExpenseCharts = ({ expenses }) => {
  // Group by month
  const monthlyData = Object.values(
    expenses.reduce((acc, e) => {
      const month = e.date.slice(0, 7)
      acc[month] = acc[month] || { month, total: 0 }
      acc[month].total += e.amount
      return acc
    }, {})
  )

  // Group by category
  const categoryData = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || {
        name: e.category,
        value: 0,
      }
      acc[e.category].value += e.amount
      return acc
    }, {})
  )

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-medium text-slate-600 mb-4">
          Monthly Expense
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="total"
              radius={[6, 6, 0, 0]}
              fill="#2563eb"
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-medium text-slate-600 mb-4">
          Expense by Category
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label={{ fill: "#334155", fontSize: 12 }}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.9}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ExpenseCharts
